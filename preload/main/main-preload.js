const { contextBridge, ipcRenderer} = require('electron');

//这里将全局信息暴露出来，以供 页面的 js 使用
contextBridge.exposeInMainWorld('ElectronAPI', {
    //nodejs 的版本号
    getNodeJsVersion:()=>process.versions.node,
    //chrome 的版本号
    getChromeVersion:()=>process.versions.chrome,
    //electron 的版本号
    getElectronVersion:()=>process.versions.electron,
    //关于本软件的版本号
    getAppVersion:()=>ipcRenderer.invoke('base:appversion'),
    
    // 这里暴漏一个 处理窗口最小化、最大化、以及关闭的方法
    // behavior 是操作类型的字符串
    setWindowBehavior:(behavior)=> ipcRenderer.invoke('winbtn:behavior', behavior)
});