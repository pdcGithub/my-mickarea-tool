/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "myEvent.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-29
 * @version 1.0.0 
 * @description  这是一些我自己定义的事件对象。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

/**
 * 定义一个事件：命令行脚本执行中
 */
const pdcCmdRunning = new Event('pdc.cmd.running', {bubbles:true, cancelable:true, composed:true});

/**
 * 定义一个事件：命令行脚本执行完成
 */
const pdcCmdDone = new Event('pdc.cmd.done', {bubbles:true, cancelable:true, composed:true});

// 导出
export {pdcCmdDone, pdcCmdRunning}