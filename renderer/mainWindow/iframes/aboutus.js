// 定义关于 Electron 暴露的 api 对象（因为是 iframe 所以，只有父页面有 api 对象）
let ElectronAPI;
try{ ElectronAPI = window.parent.ElectronAPI}catch(e){ElectronAPI=undefined};
// 判断是否在 app 中运行
let isApp = ElectronAPI ? true : false;

// 当文档加载完毕，执行这个函数
$(document).ready(()=>{
    //填充页面信息
    fillInPageInfo();
});

/**
 * 填充页面信息
 */
async function fillInPageInfo(){
    if(isApp){
        $("#chromeinfo").html(ElectronAPI.getChromeVersion());
        $("#electroninfo").html(ElectronAPI.getElectronVersion());
        $("#nodejsinfo").html(ElectronAPI.getNodeJsVersion());
        $("#myAppVersion").html(await ElectronAPI.getAppVersion());
    }else{
        $("#chromeinfo").html('浏览器UI测试');
        $("#electroninfo").html('浏览器UI测试');
        $("#nodejsinfo").html('浏览器UI测试');
        $("#myAppVersion").html('浏览器UI测试');
    }
}