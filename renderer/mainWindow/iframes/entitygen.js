// 定义关于 Electron 暴露的 api 对象（因为是 iframe 所以，只有父页面有 api 对象）
let ElectronAPI;
try{ ElectronAPI = window.parent.ElectronAPI}catch(e){ElectronAPI=undefined};
// 判断是否在 app 中运行
let isApp = ElectronAPI ? true : false;

//设计一个对象，用于信息填充处理
let mydbconfig = [
    [{id:'', type:'', colWidth:'', validReg:null, invalidInfo:null}],
];

// 当文档加载完毕，执行这个函数
$(document).ready(()=>{
    
});