/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "ClassCreationError.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-29
 * @version 1.0.0 
 * @description  这是一个自定义异常类
 */
"use strict"; // 这是严格模式下的 Javascript 代码

/**
 * 自定义的一个 Error 类。它用于表示 类创建对象时的异常
 */
class ClassCreationError extends Error {
    constructor(message){
        super(message);
        this.name = ClassCreationError.name;
    }
}

/**
 * 导出公用部分
 */
export {
    ClassCreationError
}