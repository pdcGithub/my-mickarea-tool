// 当页面加载完成，我们开始处理事件绑定
$(document).ready(()=>{
    
    //绑定窗口 最小化，最大化，关闭 3个事件
    $('.win-min').on('click', ()=>{
        alert('你点击了最小化处理');
    });
    $('.win-max').on('click', ()=>{
        alert('你点击了最大化处理');
    });
    $('.win-close').on('click', ()=>{
        var choose = confirm('确定要关闭窗口吗？关闭后将退出整个程序...');
        if(choose){
            alert('执行关闭');
        }
    });
    
    //绑定左侧导航菜单栏的点击处理
    $('.nav-item').on('click', leftNavOnClick);
});

/* 关于左边菜单栏的绑定处理 */
function leftNavOnClick(){
    //先移除 active 样式
    $(".nav-item").removeClass('active');
    //再在点击的地方添加 active 样式
    $(this).addClass('active');
    //清空内容区，将菜单对应的内容放入
    $('#fillInArea').html($(this).text());
}