//添加 electron 依赖
const { dialog, shell, BrowserWindow } = require('electron')
const { execSync } = require('node:child_process')
const os = require('node:os')
const path = require('node:path')
const fs = require('node:fs')
const { mylogger } =  require('./my-log')
const { myParams } = require('./static-parameters')
const iconv = require('iconv-lite')
const { resourceUsage } = require('node:process')

//主进程 ipc 相关处理
function MyIpc() {

    //关于窗口一些行为的处理
    this.windowBtnBehavior = function(event, behavior, window){
        let result = {status:true, info:''};
        try{
            switch(behavior){
                case 'min':
                    if(!window.isMinimized()) window.minimize();
                    break;
                case 'max':
                    if(window.isMaximized()){
                        window.unmaximize();
                    }else{
                        window.maximize();
                    }
                    break;
                case 'close':
                    if(!window.isDestroyed()) window.close();
                    break;
                case 'appLog':
                    let appLogDirExists = fs.existsSync(myParams.MY_SOFTWARE_LOG_DIR);
                    if(appLogDirExists){
                        this.openFilePath(myParams.MY_SOFTWARE_LOG_DIR);
                    }else{
                        throw new Error(`本软件的执行日志文件夹[${myParams.MY_SOFTWARE_LOG_DIR}]尚未创建`);
                    }
                    break;
                case 'jarLog':
                    // 设置 Jar 文件执行的 日志文件夹 路径
                    let jarLogDir = path.resolve('./logs/');
                    //校验路径是否存在
                    if(fs.existsSync(jarLogDir)){
                        this.openFilePath(jarLogDir);
                    }else{
                        throw new Error(`Jar 执行异常的 日志文件夹 暂未生成，请操作后再查询日志。`);
                    }
                    break;
                case 'blog':
                    // 这里要创建一个子窗口，用于打开 博客网站
                    let childWin = new BrowserWindow({parent:window, modal:true, fullscreenable:false});
                    childWin.maximize();
                    childWin.loadURL('https://www.mickarea.net');
                    break;
                default:
                    throw new Error(`获取的行为参数 ${behavior} 异常，没有可匹配的处理。`);
                    break;
            }
        }catch(error){
            //如果主进程报错，则返回错误信息给 渲染进程
            result.status = false;
            result.info = error.message;
        }
        return result;
    };

    //消息弹窗的处理方法 alert
    this.alert = function(event, message, window){
        let option = {type:'warning', message:message, title:'温馨提示'};
        return dialog.showMessageBox(window, option);
    };

    //消息弹窗的处理方法 confirm （如果点击窗口的关闭图标，返回 -1 ）
    this.confirm = function(event, message, window){
        let option = {type:'warning', message:message, title:'温馨提示', buttons:['确定', '取消'], cancelId:-1};
        return dialog.showMessageBox(window, option);
    };

    /**
     * 文件选择弹窗，通过配置 可以单选，也可以多选；另外还可以选择文件夹
     * @param {Electron.IpcMainInvokeEvent} event IPC 事件对象
     * @param {object} options 参考 Electron 的 dialog 模块的 showOpenDialogSync 函数 的 options 参数
     * @param {BrowserWindow} window 这是对话框的父窗口
     * @returns {Array<string>} 返回一个字符串数组。如果没有选择，则返回空的数组。
     */
    this.fileselect = function(event, options, window){

        // 先将外部配置参数 复制一下
        let myOptions = Object.assign({}, options); 

        // 这里处理一下默认配置
        if(myOptions.title === undefined) myOptions.title = '请选择文件';
        if(myOptions.filters === undefined) myOptions.filters = [ {name:'所有文件', extensions: ['*']} ];

        // 开始调用文件选择框（返回 string[] | undefined, 用户选择的文件路径，如果对话框被取消了 ，则返回undefined。）
        let result = dialog.showOpenDialogSync(window, myOptions);
        if(result===undefined){
            return [];
        }else{
            return result;
        }
    };

    /**
     * 这是新的 jar 执行处理。以往的方式，中文乱码以及执行处理有些问题。这里重写一下试试
     * @param {Electron.IpcMainInvokeEvent} event IPC 事件对象
     * @param {string} javaCommand java 虚拟机路径。一般是 java.exe 的完整路径
     * @param {string} jarPath jar 程序包的路径。
     * @param {Array<string>} jarArguments 一个命令参数数组，内部是字符串内容。
     * @returns {object} 一个信息对象。比如：{status:'ok', info:'', data:undefined}
     */
    this.execJar = function(event, javaCommand, jarPath, jarArguments){

        //定义一个返回的结果对象
        let result = {status:'ok', info:'', data:undefined};

        //构造命令
        let myCommand = '"'+javaCommand.replaceAll('"','\\"')+'" -jar "'+jarPath.replaceAll('"','\\"')+'" ';
        if(jarArguments && jarArguments.length>0){
            for(arg of jarArguments){
                myCommand += ' "'+arg.replaceAll('"','\\"')+'" ';
            }
        }

        //打印命令
        mylogger.debug('execJar 打印命令...');
        mylogger.debug(myCommand);

        // 开始执行
        try{
            let timeout = 600000; // 600 秒
            let encoding = 'buffer';

            // 执行
            let buffer = execSync(myCommand, {timeout:timeout, encoding:encoding});

            // 如果是 简中的Windows系统，终端是 cp936 字符集，要转码。
            let strResult = os.platform()==='win32'?iconv.decode(buffer, 'cp936'):buffer.toString();

            //将返回的 json 字符串 转为 对象
            let jarResult = JSON.parse(strResult);

            // 打印 接收到的对象
            mylogger.debug('执行 jar 完成，接收到结果如下：');
            mylogger.debug(jarResult);

            // 接收到的结果处理
            if(jarResult.status === 'success'){
                //对于 请求成功的处理，可能返回消息，也可能返回数据字符串
                result.status='ok';
                if(jarResult.oriMessage.indexOf('[')===0 || jarResult.oriMessage.indexOf('{')===0){
                    // 如果后台有数据返回，一般都是以 Array 或者 Map 的字符串形式返回
                    result.data = JSON.parse(jarResult.oriMessage);
                    result.info = "后台数据获取成功";
                }else{
                    //普通消息
                    result.info = jarResult.oriMessage;
                }
            }else if (jarResult.status === 'error' || jarResult.status === 'FAULT'){
                result.status='error';
                result.info=jarResult.oriMessage;
            }else{
                result.status='error';
                result.info='执行异常, jar 包程序没有内容返回.';
            }

        }catch(error){
            mylogger.error(`调用的命令出错 ( ${myCommand} )。具体异常信息，已记录到日志中`);
            // 因为有些脚本把 stderr 重定向了，所以 异常处理要捕捉后，要获取 error.stdout 才能有信息
            let buffer = error.stderr.length>0?error.stderr:error.stdout;
            // 如果是 简中的Windows系统，终端是 cp936 字符集，要转码。
            let errMessage = os.platform()==='win32'? iconv.decode(buffer, 'cp936') : buffer.toString();
            mylogger.error(errMessage);
            // 设置返回信息
            result.status = 'error';
            result.info = errMessage;
        }

        // 返回
        return result;
    };

    /**
     * 保存配置 
     * @param {Electron.IpcMainInvokeEvent} event IPC 事件对象
     * @param {object} myOwnConfig 要保存的配置信息对象
     * @returns {object} 是一个信息对象 比如：{status:'ok', info:'', configFileName:''}
     */
    this.saveConfig = function(event, myOwnConfig){
        //定义一个返回的结果对象
        let result = {status:'ok', info:'', configFileName:''};
        try{
            // 记录日志
            mylogger.debug('即将保存配置信息，配置如下：');
            mylogger.debug(myOwnConfig);

            //文件夹不存在，则创建
            if(!fs.existsSync(myParams.MY_SOFTWARE_CONFIG_DIR)){
                fs.mkdirSync(myParams.MY_SOFTWARE_CONFIG_DIR, {recursive:true});
            }
            if(typeof myOwnConfig !== 'object' || Array.isArray(myOwnConfig)) throw new Error(`传来的配置对象 ${myOwnConfig} 不是一个有效的配置对象`);
            
            let keys = Object.keys(myOwnConfig);
            let newKeys = keys.filter(key=>typeof myOwnConfig[key]==='string'); // 只要字符串类型的键值对

            if(newKeys.length<=0) throw new Error(`经过校验，当前传入的参数 ${myOwnConfig} 没有符合的键值对可用于存储。`);
            if(!newKeys.includes('filename')) throw new Error('经过校验，当前传入的参数中，没有 filename 键值对，无法执行保存');
            
            //构造文件名
            let fileName = myOwnConfig['filename'];
            let filePath = myParams.MY_SOFTWARE_CONFIG_DIR + path.sep + fileName;

            //删除同名文件
            fs.rmSync(filePath, {force:true});
            // 写入
            newKeys.forEach(key=>{
                let tmpData = key.trim() + '=' + myOwnConfig[key].trim() + os.EOL;
                fs.writeFileSync(filePath, tmpData, {flag:'a+'});
            });
            
            //返回结果
            result.info = `配置 ${fileName} 保存成功`;
            result.configFileName = filePath;
            
            mylogger.debug(result);

        }catch(error){
            result.status='error';
            result.info=error.message;
            result.configFileName='';
            mylogger.error(error);
        }
        return result;
    };

    /**
     * 读取配置
     * @param {Electron.IpcMainInvokeEvent} event IPC 事件对象
     * @param {string} configName 配置文件名
     * @returns {object} 是一个信息对象 比如：{status:'ok', info:'', data:{}}
     */
    this.readConfig = function(event, configName){
        let result = {status:'ok', info:'', data:{}}
        //文件名校验正则
        let fileRegexp = /^[0-9a-zA-Z\-]+\.properties$/;
        try{
            let filePath = myParams.MY_SOFTWARE_CONFIG_DIR + path.sep + configName;
            //参数检查
            if(typeof configName !== 'string' || !fileRegexp.test(configName)) throw new Error('传来的配置文件名['+configName+']异常，请检查!');
            if(!fs.existsSync(filePath)) throw new Error('本地文件['+filePath+']不存在');
            //读取文件
            let bufResult = fs.readFileSync(filePath).toString().trim();
            if(bufResult.length<=0) throw new Error('本地文件['+filePath+']内容为空');
            // 解析文件
            let rows = bufResult.split(os.EOL);
            rows.filter(row=>row.trim().length>0 && row.trim().includes('=')).map(row=>row.trim()).forEach(row=>{
                let eqIndex= row.indexOf('=');
                let key = row.substring(0, eqIndex);
                let value = row.substring(eqIndex+1);
                result.data[key]=value;
            })

            result.info = '配置读取成功';
            mylogger.debug(result);
        }catch(error){
            result.status='error';
            result.info=error.message;
            mylogger.error(error);
        }
        return result;
    };

    /**
     * 根据前缀 获取当前所储存的所有配置文件名
     * @param {Electron.IpcMainInvokeEvent} event IPC 事件对象
     * @param {string} preffix 一个配置文件的前缀字符串
     * @returns {object} 是一个信息对象 比如：{status:'ok', info:'', data:[]}
     */
    this.getAllConfigId = function(event, preffix){
        let result = {status:'ok', info:'', data:[]}
        try{
            if(fs.existsSync(myParams.MY_SOFTWARE_CONFIG_DIR)){
                //如果文件夹存在，才执行遍历
                let filesArray = fs.readdirSync(myParams.MY_SOFTWARE_CONFIG_DIR, {withFileTypes:true});
                filesArray
                .filter(file=>file.isFile()) /* 只获取文件 */
                .filter(file=>preffix===undefined || file.name.startsWith(preffix)) /* 如果 preffix 有传递，则只获取 preffix 前缀的文件 */
                .forEach(file=>{
                    result.data.push(file.name); /* 将符合的文件名，放入 data 数组 */
                });
            }
        }catch(error){
            result.status='error';
            result.info=error.message;
        }
        return result;
    };

    /**
     * 根据前缀 删除所有的配置文件
     * @param {Electron.IpcMainInvokeEvent} event IPC 事件对象
     * @param {string} preffix 一个配置文件的前缀字符串
     * @returns {object} 是一个信息对象 比如：{status:'ok', info:''}
     */
    this.removeAllConfigFile = function(event, preffix){
        let result = {status:'ok', info:''}
        try{
            //如果有配置文件夹，则执行删除
            if(fs.existsSync(myParams.MY_SOFTWARE_CONFIG_DIR)){
                //遍历文件夹下的所有配置文件
                let filesArray = fs.readdirSync(myParams.MY_SOFTWARE_CONFIG_DIR, {withFileTypes:true});
                filesArray
                .filter(file=>file.isFile()) /* 只获取文件 */
                .filter(file=>preffix===undefined || file.name.startsWith(preffix)) /* 如果 preffix 有传递，则只获取 preffix 前缀的文件 */
                .forEach(file=>{
                    // 遍历删除
                    fs.rmSync(myParams.MY_SOFTWARE_CONFIG_DIR+path.sep+file.name, {force:true});
                });
            }
        }catch(error){
            result.status='error';
            result.info=error.message;
        }
        return result;
    };

    //获取静态配置参数
    this.getStaticParam = function(name){
        return myParams[name];
    };

    //打开文件夹、或者文件
    this.openFilePath = function(path){
        return shell.openPath(path);
    };

    //打开 Jar 的执行日志 文件夹
    this.openJarExecLogDir = function(event, window){
        let msg = '';
        // 设置 Jar 文件执行的 日志文件夹 路径
        let jarLogDir = path.resolve('./logs/');
        //校验路径是否存在
        if(fs.existsSync(jarLogDir)){
            this.openFilePath(jarLogDir);
        }else{
            this.alert(event, 'Jar 执行异常的 日志文件夹 暂未生成，请操作后再查询日志。', window);
        }
    }

    /**
     * 获取当前操作系统的一些信息，用于显示到介绍页面
     * @param {*} event 这是 Electron 的 IPC 事件对象，一般用不上。
     * @returns 一个信息对象字面量
     */
    this.getOsVersionInfo = function(event) {
        // 定义一个对象字面量，用于返回
        let osInfo = {
            version:os.version(),
            platform:os.platform(),
            type:os.type(),
            release:os.release(),
            machine:os.machine()
        }
        // 
        //console.log(new Date(), osInfo);
        // 返回
        return osInfo;
    }

    /**
     * 获取当前安装的 Java 语言环境信息，用于显示到介绍页面
     * @param {*} event 这是 Electron 的 IPC 事件对象，一般用不上。
     */
    this.getJavaVersionInfo = function(event) {
        // 定义返回的结果
        let result = {info1:'', info2:'', info3:''};
        // 要执行的 命令 （这里 将 stderr 重定向到 stdout (2>&1)，并尝试获取输出）
        let cmdstring1 = 'java -version 2>&1';
        let timeout = 60000; // 60 秒
        let encoding = 'buffer';
        //打印命令
        mylogger.debug('getJavaVersionInfo 开始获取 本地 Java 环境信息');
        mylogger.debug('将要执行的命令为', cmdstring1);
        try{
            // 执行
            let buffer = execSync(cmdstring1, {timeout:timeout, encoding:encoding});
            // 如果是 简中的Windows系统，终端是 cp936 字符集，要转码。
            let strResult = os.platform()==='win32'?iconv.decode(buffer, 'cp936'):buffer.toString();
            let javaInfoArr = strResult.split(os.EOL).filter(str=>str.trim().length>0);
            mylogger.debug('获得结果为以下信息');
            mylogger.debug(strResult);
            // 赋值
            result.info1 = javaInfoArr[0];
            result.info2 = javaInfoArr[1];
            result.info3 = javaInfoArr[2];
        }catch(error){
            result.info1 = '本地 Java 环境变量尚未配置，请检查。';
            result.info2 = '检测命令为: java -version';
            result.info3 = '请检查本地设置';
            mylogger.error(`调用的命令出错 ( ${cmdstring1} )。具体异常信息，已记录到日志中`);
            // 因为把 stderr 重定向了，所以 异常处理要捕捉后，要获取 error.stdout 才能有信息
            let buffer = error.stderr.length>0?error.stderr:error.stdout;
            // 如果是 简中的Windows系统，终端是 cp936 字符集，要转码。
            let errMessage = os.platform()==='win32'? iconv.decode(buffer, 'cp936') : buffer.toString();
            mylogger.error(errMessage);
        }
        //
        return result;
    }

};

//导出模块
module.exports = MyIpc;