// 左侧导航栏的动画是否已经停止
let isPanelLeftAnimationStop = true;

// 当页面加载完成，我们开始处理事件绑定
$(document).ready(()=>{

    //动画处理事件监听
    addAnimationListener();

    //绑定窗口 最小化，最大化，关闭 3个事件
    $("div[behaviortype='toolbarBtn']").on('click', toolbarBtnClick);
    
    //绑定左侧导航菜单栏的点击处理
    $('.nav-item').on('click', leftNavOnClick);

    //默认一开始，点击一下第一个菜单
    $("#entitygen").click();
});

/* 添加关于动画事件的监听 */
function addAnimationListener(){
    //监听左侧导航栏的动画事件
    $("#left").on('animationstart',(jqueryEvent)=>{isPanelLeftAnimationStop=false;});
    $("#left").on('animationcancel',(jqueryEvent)=>{isPanelLeftAnimationStop=true;});
    $("#left").on('animationend',(jqueryEvent)=>{isPanelLeftAnimationStop=true;});
}

/* 关于顶部工具栏的事件处理（事件处理需要加 await ，因为是异步的） */
async function toolbarBtnClick(){
    //获取按钮的行为信息
    let behavior = $(this).attr('behavior');
    //判断是否在 electron 下运行
    let isApp = window.ElectronAPI ? true : false;
    //web 界面处理
    if(behavior=='toggle-left'){
        //这里只是页面动态处理，没有后台交互
        leftNavToggled();
    }else{
        //后端 交互处理
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
}

/* 关于左边菜单栏的隐藏与显示处理 */
function leftNavToggled(){
    //左侧导航栏宽度
    var leftWidth = $("#left").width();
    //要注意，上一个动画结束才触发
    if(isPanelLeftAnimationStop){
        if(leftWidth>0){
            //隐藏(左侧)，扩大右侧
            $("#left nav").css('display','none');
            $("#left").css('animation','panel-left-close 1s');
            $("#right").css('animation','panel-right-extend 1s');
            setTimeout(()=>{
                //因为动画需要运行 1秒，所以 等他运行完 再清空原有设置
                $("#left").css('width', '0px');
                $("#right").css('paddingLeft', '0px');
            }, 900);
        }else{
            //显示(左侧)，缩小右侧
            $("#left").css('animation','panel-left-open 1s');
            $("#right").css('animation','panel-right-curtail 1s');
            setTimeout(()=>{
                //因为动画需要运行 1秒，所以 等他运行完 再清空原有设置
                $("#left nav").css('display','');
                $("#left").css('width', '');
                $("#right").css('paddingLeft', '');
            }, 900);
        }
    }
}

/* 关于左边菜单栏的绑定处理 */
function leftNavOnClick(){
    //先移除 active 样式
    $(".nav-item").removeClass('active');
    //再在点击的地方添加 active 样式
    $(this).addClass('active');
    //获取当前处理的id信息
    let id = $(this).attr('id');
    //根据不同id，切换不同页面
    let url = './iframes/none.html';
    switch(id){
        case 'entitygen':
            url = './iframes/'+id+'.html';
            break;
        case 'funcgen':
            break;
        case 'others':
            break;
        case 'aboutus':
            url = './iframes/'+id+'.html';
            break;
    }
    //跳转 对应功能
    $('#fillInArea').attr('src', url);
}