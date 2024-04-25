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

};

//导出模块
module.exports = MyIpc;

