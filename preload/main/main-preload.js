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
    setWindowBehavior:(behavior)=> ipcRenderer.invoke('winbtn:behavior', behavior),

    // 这里暴露2个 消息弹窗的处理方法
    showAlert:(message)=>ipcRenderer.invoke('base:alert', message),
    showConfirm:(message)=>ipcRenderer.invoke('base:confirm', message),

    // 这里暴露一个 文件选择框的处理方法
    showFileDialog:(fileFilters)=>ipcRenderer.invoke('file:fileselect', fileFilters),

    //这里暴露一个 java 程序的调用方法
    execJar:(javaCommand, jarPath, jarArguments)=>ipcRenderer.invoke('shell:jar', javaCommand, jarPath, jarArguments),

    //这里暴露4个 关于数据库配置文件的读写方法
    saveConfig:(dbConfig)=>ipcRenderer.invoke('db:saveconfig', dbConfig),
    readConfig:(configName)=>ipcRenderer.invoke('db:readconfig', configName),
    getAllConfigId:()=>ipcRenderer.invoke('db:getallconfigid'),
    removeAllConfig:()=>ipcRenderer.invoke('db:removeallconfig')

});