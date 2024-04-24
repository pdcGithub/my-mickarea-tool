const { contextBridge, ipcRenderer} = require('electron');

//这里将全局信息暴露出来，以供 页面的 js 使用
contextBridge.exposeInMainWorld('ElectronAPI', {
    //nodejs 的版本号
    getNodeJsVersion:()=>process.versions.node,
    //chrome 的版本号
    getChromeVersion:()=>process.versions.chrome,
    //electron 的版本号
    getElectronVersion:()=>process.versions.electron
});