/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "apis.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-29
 * @version 1.0.0 
 * @description  这里是 apis 模块对外的统一接口
 */
"use strict"; // 这是严格模式下的 Javascript 代码

/**
 * 导入 apis 模块的 子模块
 */
import { myapi } from "./apis/electronapi.js";
import { documentReady, htmlElementListToArray, actionBinding, actionBindingBySelector } from "./apis/init.js";

/**
 * 导出公用部分：自定义 api 对象
 */
export {
    myapi
}

/**
 * 导出公用部分：自定义 函数
 */
export {
    documentReady, htmlElementListToArray, actionBinding, actionBindingBySelector
}