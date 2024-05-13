//添加 electron 依赖
const { dialog } = require('electron')
const { execSync } = require('node:child_process')
const os = require('node:os')
const path = require('node:path')
const fs = require('node:fs')
const { mylogger } =  require('./my-log')
const { myParams } = require('./static-parameters')

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
            }
        }catch(e){
            //如果主进程报错，则返回错误信息给 渲染进程
            result.status = false;
            result.info = e;
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

    //文件选择弹窗
    this.fileselect = function(event, myFileFilter, window){
        let fileFilters = [
            {name:'所有文件', extensions: ['*']}
        ];
        if(myFileFilter){
            fileFilters = myFileFilter;
        }
        return dialog.showOpenDialog(window, {title:'请选择一个文件', filters:fileFilters});
    };

    //jar 执行处理
    this.execJar = function(event, javaCommand, jarPath, jarArguments){
        //定义一个返回的结果对象
        let result = {status:'ok', info:'', data:undefined};
        //构造命令
        let myCommand = '"'+javaCommand+'" -jar "'+jarPath+'" ';
        if(jarArguments && jarArguments.length>0){
            for(arg of jarArguments){
                myCommand += ' "'+arg+'" ';
            }
        }
        //打印命令
        mylogger.debug('打印命令...');
        mylogger.debug(myCommand);
        //执行命令
        try{
            result.info = execSync(myCommand, {timeout:5000}).toString();
            result.status='ok';
        }catch(error){
            result.info=error.message;
            if(result.info.indexOf('Command failed')>=0){
                result.info = '调用的命令出错，请检查 jar 包是否可执行，以及 命令是否正确。具体异常信息，已记录到日志中。';
            }
            result.status='error';
            mylogger.error('执行出错，异常信息如下：');
            mylogger.error(error);
        }
        mylogger.debug(result);
        //返回结果
        return result;
    };

    //保存配置 
    this.saveConfig = function(event, dbConfig){
        //定义一个返回的结果对象
        let result = {status:'ok', info:'', configFileName:''};
        try{
            //文件夹不存在，则创建
            if(!fs.existsSync(myParams.MY_SOFTWARE_CONFIG_DIR)){
                fs.mkdirSync(myParams.MY_SOFTWARE_CONFIG_DIR, {recursive:true});
            }
            //校验传来参数是否完整
            let isOk = true;
            let errObj = undefined;
            for(obj in dbConfig){
                if(!dbConfig[obj]) {
                    isOk=false;
                    errObj=obj+'';
                    break;
                }
            }
            if(!isOk){
                throw new Error('传来的参数['+errObj+']没有填写完整，请检查!');
            }else{
                //构造文件名
                let fileName = dbConfig['poolName']+'.properties';
                let filePath = myParams.MY_SOFTWARE_CONFIG_DIR + path.sep + fileName;
                //删除同名文件
                fs.rmSync(filePath, {force:true});
                //循环遍历对象内容，以追加形式插入信息
                for(obj in dbConfig){
                    let tmpData = obj + '=' + dbConfig[obj] + os.EOL;
                    fs.writeFileSync(filePath, tmpData, {flag:'a+'});
                }
                //返回结果
                result.configFileName = fileName;
            }
        }catch(error){
            result.status='error';
            result.info=error.message;
            result.configFileName='';
        }
        return result;
    };

    //读取配置
    this.readConfig = function(event, configName){
        let result = {status:'ok', info:'', data:{}}
        //文件名校验正则
        let fileRegexp = /^[0-9a-zA-Z]+\.properties$/;
        try{
            let filePath = myParams.MY_SOFTWARE_CONFIG_DIR + path.sep + configName;
            //参数检查
            if(typeof configName !== 'string' || !fileRegexp.test(configName)) throw new Error('传来的配置文件名['+configName+']异常，请检查!');
            if(!fs.existsSync(filePath)) throw new Error('本地文件['+filePath+']不存在');
            //读取文件
            let bufResult = fs.readFileSync(filePath).toString();
            if(!bufResult) throw new Error('本地文件['+filePath+']内容为空');
            //解析文件
            let rows = bufResult.split(os.EOL);
            for(kv of rows){
                if(kv.length<=0) continue;
                let eqIndex= kv.indexOf('=');
                let key = kv.substring(0, eqIndex);
                let value = kv.substring(eqIndex+1);
                result.data[key]=value;
            }
            //console.log(result.data);
        }catch(error){
            result.status='error';
            result.info=error.message;
        }
        return result;
    };

    //获取当前所储存的所有配置文件名
    this.getAllConfigId = function(){
        let result = {status:'ok', info:'', data:[]}
        try{
            if(fs.existsSync(myParams.MY_SOFTWARE_CONFIG_DIR)){
                //如果文件夹存在，才执行遍历
                let filesArray = fs.readdirSync(myParams.MY_SOFTWARE_CONFIG_DIR, {withFileTypes:true});
                if(filesArray && filesArray.length>0){
                    for(file of filesArray){
                        if(file.isFile()) result.data.push(file.name);
                    }
                }
            }
        }catch(error){
            result.status='error';
            result.info=error.message;
        }
        return result;
    };

    //删除所有的配置文件
    this.removeAllConfigFile = function(){
        let result = {status:'ok', info:''}
        try{
            //如果有配置文件夹，则执行删除
            if(fs.existsSync(myParams.MY_SOFTWARE_CONFIG_DIR)){
                //遍历文件夹下的所有配置文件
                let filesArray = fs.readdirSync(myParams.MY_SOFTWARE_CONFIG_DIR, {withFileTypes:true});
                if(filesArray && filesArray.length>0){
                    for(file of filesArray){
                        //判断是否为 配置文件，要与文件后缀匹配
                        if(file.isFile() && /^.+\.properties$/.test(file.name)){
                            fs.rmSync(myParams.MY_SOFTWARE_CONFIG_DIR+path.sep+file.name, {force:true});
                        }
                    }
                }
            }
        }catch(error){
            result.status='error';
            result.info=error.message;
        }
        return result;
    };

};

//导出模块
module.exports = MyIpc;

