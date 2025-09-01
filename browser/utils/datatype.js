/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "datatype.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-06-20
 * @version 1.0.2
 * @description 这里是一个 数据处理的工具包，它划分了3个模块：base (基础数据类型处理)、object (对象类型数据处理)、 transform (数据转换处理)。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import {
    isNullValue, NotNullValue, /* 异常值 */
    isStringValue, isStringObject, isString, isEmptyString, valueOfString, /* 字符串 */
    isBooleanValue, isBooleanObject, isBoolean, valueOfBoolean, /* 布尔值 */
    isNumberValue, isNumberObject, isNumber, valueOfNumber, /* 数值 */
    isSymbol, isRegexp, isRegexpOk /* Symbol 值 和 正则 */
} from "./datatype/base.js";

import {
    isFunction, isClass, isTargetClass, isObject,  /* 基础对象 和 类 判断 */
    isObjectLiteral, /* 对象字面量判断 */
    isTargetObject, isTargetObjectSet, isTargetObjectArray, isTargetObject2DArray,  /* 目标对象和数组判断 */
    isContentObject, isContentObjectArray, isContentObjectSet,   /* UI组件内容对象和数组判断 */
    isChildrenComponent, isChildrenComponentArray,               /* 动态组件内容对象和数组判断 */
    isHtmlElement, isHtmlElementList                             /* Html元素对象和数组判断 */
} from "./datatype/object.js";

import { 
    objToMap, /* 将对象转 Map */
    genMap    /* 快速生成一个 Map */
 } from "./datatype/transform.js";

/**
 * 这是一个 数据处理的工具 常量。之前是一个静态类，由于要分开实现，所以改为一个常量。
 */
const DataUtil = {
    isNullValue, NotNullValue, /* 异常值 */
    isStringValue, isStringObject, isString, isEmptyString, valueOfString, /* 字符串 */
    isBooleanValue, isBooleanObject, isBoolean, valueOfBoolean, /* 布尔值 */
    isNumberValue, isNumberObject, isNumber, valueOfNumber, /* 数值 */
    isSymbol, isRegexp, isRegexpOk, /* Symbol 值 和 正则 */

    isFunction, isClass, isTargetClass, isObject,  /* 基础对象 和 类 判断 */
    isObjectLiteral, /* 对象字面量判断 */
    isTargetObject, isTargetObjectSet, isTargetObjectArray, isTargetObject2DArray,  /* 目标对象和数组判断 */
    isContentObject, isContentObjectArray, isContentObjectSet,   /* UI组件内容对象和数组判断 */
    isChildrenComponent, isChildrenComponentArray,               /* 动态组件内容对象和数组判断 */
    isHtmlElement, isHtmlElementList,                             /* Html元素对象和数组判断 */

    objToMap, /* 将对象转 Map */
    genMap,    /* 快速生成一个 Map */
}

// 导出公用的模块
export { DataUtil }