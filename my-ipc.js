//添加 electron 依赖
const { dialog } = require('electron')
const { execSync } = require('node:child_process')
const os = require('node:os')
const path = require('node:path')

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
        let myCommand = '"'+javaCommand+'" -jar "'+jarPath+'" ';
        if(jarArguments && jarArguments.length>0){
            for(arg of jarArguments){
                myCommand += ' "'+arg+'" ';
            }
        }
        //打印命令
        //console.log(myCommand);
        //执行命令
        let buffer = execSync(myCommand, {timeout:5000})
        //console.log(buffer.toString());
        //返回结果
        return buffer.toString();
    };

    //保存配置
    this.saveConfig = function(event, dbConfig){
        let result = {status:'ok', info:'', configFileName:''}
        result.configFileName = dbConfig['poolName']+'.properties';
        return result;
    };

    //读取配置
    this.readConfig = function(event, configName){
        let result = {status:'ok', info:'', data:undefined}
        return result;
    };

    //获取当前所储存的所有配置文件名
    this.getAllConfigId = function(){
        let result = {status:'ok', info:'', data:['file1.properties','file2.properties','file3.properties']}
        let homedir = os.homedir();
        let separator = path.sep;
        console.log('homedir='+homedir);
        console.log('separator='+separator);
        return result;
    }

};

//导出模块
module.exports = MyIpc;

