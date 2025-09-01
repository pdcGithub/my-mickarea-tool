/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "base.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-11
 * @version 1.0.0 
 * @description  这是作为数据类型处理的一个基础函数集合
 * 
 * 整个文件是基础的数据类型判断 和 获取。所以不能使用 valid.js 来简化异常抛出。因为，抛异常的处理，引用了 这个文件的 API。会造成循环引用，然后报错。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ParameterError } from "../../modules/myselfs/js/errors.js";

//============================== 这里处理特殊类型   ==========================================

/**
 * 判断内容是否为空内容。在 JavaScript 中 undefined、null、NaN 是特殊的空内容。
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果 value 为 undefined、null、NaN 中的一个，则返回 true；否则，返回 false
 */
function isNullValue(value){
    return value===undefined || value===null || Number.isNaN(value);
}

/**
 * 判断内容是否为非空内容。在 JavaScript 中 undefined、null、NaN 是特殊的空内容。（判断是否不是这些内容）
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果 value 不为 undefined、null、NaN 中的任何一个，则返回 true；否则，返回 false
 */
function NotNullValue(value){
    return !isNullValue(value);
}

//============================== 这里处理字符串类型 ===========================================

/**
 * 判断内容是否为字符串。在 Javascript 中，字符串 可以这样创建 let s1 = 'aaa'; 
 * 如果要判断 new String()，则使用 isStringObject 函数
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果 value 为 string ，则返回 true；否则，返回 false
 */
function isStringValue(value){
    return typeof value === 'string' ;
}

/**
 * 判断内容是否为字符串对象 Object。在 Javascript 中，字符串对象是 let s2 = new String('a'); 这种方式创建出来的。
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果 value 为 String 对象 ，则返回 true；否则，返回 false
 */
function isStringObject(value){
    return value instanceof String;
}

/**
 * 判断内容是否为 字符串值 或者 字符串对象。它整合自 isStringValue 和 isStringObject
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果 value 为 string 值 或者 String 对象 ，则返回 true；否则，返回 false
 */
function isString(value){
    return isStringValue(value) || isStringObject(value);
}

/**
 * 判断内容是否为空字符串。（对于不是字符串的参数，直接返回 false）
 * 首先，入参得是字符串类型，然后它去掉首尾空白字符后，应该是长度为0。
 * @param {string} value 待处理的参数
 * @returns {boolean} 如果 value 的值为空 或者 只有空白字符，则返回 true；否则，返回 false
 */
function isEmptyString(value){
    // 默认为 false
    let re = false;
    // 如果是字符串，才判断，否则直接 为 false
    if(isString(value)) re = valueOfString(value).trim().length<=0;
    // 
    return re;
}

/**
 * 获取一个字符串参数的值。因为字符串参数 有2种可能，基础类型 string 或者 对象 String。所以处理方式有点不同（对于不是字符串的参数，直接返回 null）
 * @param {*} value 待处理的参数
 * @returns {string} 不管传入的是字符串值，还是字符串对象，都可以返回其字符串值。不是字符串的参数，直接返回 null
 */
function valueOfString(value){
    // 默认为 null 
    let re = null;
    // 如果是字符串，则判断，究竟是字符串对象 还是 字符串值
    if(isString(value)) re = isStringObject(value) ? value.valueOf() : value ;
    //
    return re;
}

//============================== 这里处理布尔类型 ===========================================

/**
 * 判断传来的值，是否为 一个 布尔值
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果 value 为 布尔值 ，则返回 true；否则，返回 false
 */
function isBooleanValue(value){
    return typeof value === 'boolean';
}

/**
 * 判断传来的值，是否为 一个 布尔对象 （这里跟 isBooleanValue 不同，这里判断的是对象，不是值）
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果 value 为 布尔对象 ，则返回 true；否则，返回 false
 */
function isBooleanObject(value){
    return value instanceof Boolean;
}

/**
 * 判断传来的值，是否为 一个 布尔值 或者 一个布尔对象
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果 value 为 布尔值 或者 布尔对象 ，则返回 true；否则，返回 false
 */
function isBoolean(value){
    return isBooleanValue(value) || isBooleanObject(value);
}

/**
 * 获取传来的 布尔值 或者 布尔对象 的 具体值。（对于不是布尔类型的参数，直接返回空字符串 null）
 * @param {*} value 待处理的参数
 * @returns {boolean} 具体的布尔值。对于不是布尔类型的参数，直接返回空字符串 null
 */
function valueOfBoolean(value){
    // 默认为 为 null
    let re = null;
    // 如果是布尔值，则判断，究竟是 布尔对象 还是 布尔值
    if(isBoolean(value)) re = isBooleanObject(value)? value.valueOf() : value;
    // 
    return re;
}

//============================== 这里处理数字类型 ===========================================

/**
 * 判断传来的值，是否为 一个 数字值。如果为 NaN 这里判断为 false。因为它属于异常值
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果 value 为 数字值 ，则返回 true；否则，返回 false
 */
function isNumberValue(value){
    return typeof value === 'number' && !Number.isNaN(value);
}

/**
 * 判断传来的值，是否为 一个 数字对象
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果 value 为 数字对象 ，则返回 true；否则，返回 false
 */
function isNumberObject(value){
    return value instanceof Number;
}

/**
 * 判断传来的值，是否为 一个 数字对象 或者 一个数字值
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果 value 为 数字对象 或者 数字值 ，则返回 true；否则，返回 false
 */
function isNumber(value){
    return isNumberValue(value) || isNumberObject(value);
}

/**
 * 获取传来的 数字值 或者 数字对象 的 具体值。（对于不是数字类型的参数，直接返回空字符串 null）
 * @param {*} value 待处理的参数
 * @returns {number} 具体的数值。对于不是数字类型的参数，直接返回空字符串 null
 */
function valueOfNumber(value){
    // 默认为 为 null
    let re = null;
    // 如果是数字类型，则根据类型来获取具体的值。
    if(isNumber(value)) re = isNumberObject(value)? value.valueOf(): value;
    // 返回
    return re;
}

//============================== 这里处理 Symbol 类型 ===================================

/**
 * 判断传来的值，是否为 一个 Symbol 值
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果 value 为 Symbol 值 ，则返回 true；否则，返回 false
 */
function isSymbol(value){
    return typeof value === 'symbol';
}

//============================== 这里处理正则 ===========================================

/**
 * 判断传入的参数，是否为一个正则表达式。
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果 value 为 正则表达式 ，则返回 true；否则，返回 false
 */
function isRegexp(value){
    return value instanceof RegExp;
}

/**
 * 判断传来的参数，是否与传来的正则表达式匹配。
 * @param {string} value 待检验的字符串参数
 * @param {RegExp} regexp 要匹配的正则表达式
 * @returns {boolean} 如果 value 与 正则表达式 匹配，则返回 true；否则，返回 false
 * @throws 如果 value 不是字符串，或者 regexp 不是正则表达式，则抛出 ParameterError 异常。
 */
function isRegexpOk(value, regexp){
    if(!isString(value)){
        throw new ParameterError(`参数 ${value} 不是字符串，不能用非字符串的值来匹配正则表达式`);
    }
    if(!isRegexp(regexp)){
        throw new ParameterError(`参数 ${regexp} 不是正则表达式，无法匹配`);
    }
    return regexp.test(valueOfString(value));
}

/**
 * 这里导出 这个模块的 所有内容
 */
export {
    isNullValue, NotNullValue, /* 异常值 */
    isStringValue, isStringObject, isString, isEmptyString, valueOfString, /* 字符串 */
    isBooleanValue, isBooleanObject, isBoolean, valueOfBoolean, /* 布尔值 */
    isNumberValue, isNumberObject, isNumber, valueOfNumber, /* 数值 */
    isSymbol, isRegexp, isRegexpOk /* Symbol 值 和 正则 */
}