/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "myBasicToolkit.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-14
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 一些函数 和 常量的 工具模块
 */
"use strict"; // 这是严格模式下的 Javascript 代码

/**
 * 按钮组大小常量
 */
const BTN_GROUP_SIZE = {
    small : 'btn-group-sm', normal:'', big : 'btn-group-lg'
}

/**
 * 按钮颜色常量
 */
const BTN_COR = {
    primary : "primary", secondary : "secondary", success : "success", info : "info", 
    warning : "warning", danger : "danger", light : "light", dark : "dark",
    link : "link"
}

/**
 * 按钮大小常量
 */
const BTN_SIZE = {
    small : "btn-sm", normal : "", big : "btn-lg"
}

/**
 * 这个是这个模块，内部使用的一个随机数字生成的函数。
 * @returns {string} 一个随机的数字（大约是8位）字符串
 */
function myRandomNumStr(){
    return (Math.random()+"").substring(10);
}

/**
 * 导出公用内容
 */
export{
    BTN_GROUP_SIZE, BTN_COR, BTN_SIZE, myRandomNumStr
}