const {app, BrowserWindow, Menu} = require('electron')
const path = require('node:path')

//应用主窗口创建函数
let mainWindow;
let createMainWindow = () => {
    //主窗口
    mainWindow = new BrowserWindow({
        width:1000,
        height:600,
        webPreferences:{
            //加载主窗口专属 preload 脚本
            preload: path.join(__dirname, 'preload/main/main-preload.js')
        },
        title:'月光下的火山石（通用工具）',
        frame:false /* 去掉窗口的默认边框 */
    })
    //主窗口加载页面
    mainWindow.loadFile('renderer/mainWindow/main.html')
    //开发者工具
    mainWindow.webContents.openDevTools()
}

//设置一个主函数
async function main(){

    //启用全局沙盒化，安全设置
    app.enableSandbox()

    //设置应用的菜单信息（去掉默认菜单）
    Menu.setApplicationMenu(null)

    //Squirrel 在 程序在 安装、更新、卸载等阶段，会通过调起主程序的方式通知到主程序，
    //我们要把这些启动方式和用户主动打开的方式区别开来。
    if(require('electron-squirrel-startup')){
        app.quit()
        return ;
    }

    //当 app 就绪，开始主窗口的处理
    await app.whenReady().then(()=>{
        //创建主窗口
        createMainWindow();
        //窗口全部关闭事件
        app.on('window-all-closed', ()=>{
            //如果用户不是在 macOS(darwin) 上运行程序，则调用 app.quit()。
            if(process.platform !== 'darwin') app.quit()
        })
        app.on('activate', ()=>{
            if(BrowserWindow.getAllWindows().length()===0) createWindow()
        })
    })
}

//主程序启动
main().catch(console.error)