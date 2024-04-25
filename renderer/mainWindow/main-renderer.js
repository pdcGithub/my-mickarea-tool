// 当页面加载完成，我们开始处理事件绑定
$(document).ready(()=>{
    
    //绑定窗口 最小化，最大化，关闭 3个事件
    $("div[behaviortype='toolbarBtn']").on('click', toolbarBtnClick);
    
    //绑定左侧导航菜单栏的点击处理
    $('.nav-item').on('click', leftNavOnClick);
});

/* 关于顶部工具栏的事件处理（事件处理需要加 await ，因为是异步的） */
async function toolbarBtnClick(){
    //获取按钮的行为信息
    let behavior = $(this).attr('behavior');
    //判断是否在 electron 下运行
    let isApp = window.ElectronAPI ? true : false;
    if(isApp){
        //先定义返回结果对象
        let result = {status:false, info:''};
        //是否发起 ipc 通讯
        let ipc = true;
        //如果是关闭，需要确认处理
        if(behavior=='close'){
            ipc = confirm('确定要关闭窗口吗？关闭后将退出整个程序...');
        }
        //确定发起 ipc 通讯，才执行
        if(ipc) result = await window.ElectronAPI.setWindowBehavior(behavior);
        //如果 执行结果异常，则弹出信息窗口
        if(!result.status && result.info) alert(result.info);
    }
}

/* 关于左边菜单栏的绑定处理 */
function leftNavOnClick(){
    //先移除 active 样式
    $(".nav-item").removeClass('active');
    //再在点击的地方添加 active 样式
    $(this).addClass('active');
    //清空内容区，将菜单对应的内容放入
    $('#fillInArea').html($(this).text());
}