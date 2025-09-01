/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "valid.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-12
 * @version 1.0.1 
 * @description  这是一个用于校验信息的模块，它附带一些处理
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { 
    throwError, throwCreationError, throwCannotNewError, throwParameterError, 
    throwParameterValidError
} from "./valid/throw.js";

import { 
    validString, validBoolean, validNumber, validRegExp, validFunction, validClass,
    validTargetClass, validObject, validObjectLiteral, 
    validTargetObject, validTargetObjectSet, validTargetObjectArray, validTargetObject2DArray,
    validHtmlElement, validHtmlElementList
} from "./valid/verify.js";

import {
    autoVnAofString, autoVnAofNumber, autoVnAofBoolean, autoVnAofRegExp,
    autoVnAofMap, autoVnAofSet, 
    autoVnAofArray, autoVnAof2DArray,
    autoVnAofObjectLiteral, autoVnAofTargetObject, autoVnAofTargetObjectSet, autoVnAofTargetObjectArray, autoVnAofTargetObject2DArray,
    autoVnAofHtmlElement, autoVnAofHtmlElementList
} from "./valid/auto.js";

/**
 * 这是一个 数据校验处理的工具 常量。之前是一个静态类，由于要分开实现，所以改为一个常量。
 */
const ValidUtil = {

    /* 抛异常处理 */
    throwError, throwCreationError, throwCannotNewError, throwParameterError, throwParameterValidError,

    /* 便捷校验 */
    validString, validBoolean, validNumber, validRegExp, validFunction, validClass,
    validTargetClass, validObject, validObjectLiteral, 
    validTargetObject, validTargetObjectSet, validTargetObjectArray, validTargetObject2DArray,
    validHtmlElement, validHtmlElementList,

    /* 自动校验与赋值 */
    autoVnAofString, autoVnAofNumber, autoVnAofBoolean, autoVnAofRegExp,
    autoVnAofMap, autoVnAofSet, 
    autoVnAofArray, autoVnAof2DArray,
    autoVnAofObjectLiteral, autoVnAofTargetObject, autoVnAofTargetObjectSet, autoVnAofTargetObjectArray, autoVnAofTargetObject2DArray,
    autoVnAofHtmlElement, autoVnAofHtmlElementList
}

// 导出共享的内容
export { ValidUtil }