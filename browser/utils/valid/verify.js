/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "verify.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-12
 * @version 1.0.0 
 * @description  这是校验处理的基础模块，它负责 一些简便的 校验处理
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ParamValidError } from "../../modules/myselfs/js/errors.js";
import { throwError, throwParameterError } from "./throw.js";
import { DataUtil as du } from "../datatype.js";

/**
 * 这是一个简便的参数校验方法，校验参数是否为 字符串。
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @param {boolean} canBeEmpty 是否可以为空字符串，默认是 true 。
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validString(param, errorInfo='测试', canBeEmpty=true){
    // 对于有类型限制的参数，进行校验
    throwParameterError(!du.isBoolean(canBeEmpty), `validString 函数参数异常, canBeEmpty=${canBeEmpty} 应该为布尔值`);
    // 提取数值
    let tempCanBeEmpty = du.valueOfBoolean(canBeEmpty);
    // 开始参数判断（对于字符串，需要判断 能否为空字符串。）
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    if(tempCanBeEmpty){
        throwError(!du.isString(param), errorInfo, ParamValidError);
    }else{
        throwError(!du.isString(param) || du.isEmptyString(param), errorInfo, ParamValidError);
    }
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 布尔值。
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validBoolean(param, errorInfo='测试') {
    // 开始参数判断
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    throwError(!du.isBoolean(param), errorInfo, ParamValidError);
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 数字。
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validNumber(param, errorInfo='测试') {
    // 开始参数判断
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    throwError(!du.isNumber(param), errorInfo, ParamValidError);
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 正则表达式。
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validRegExp(param, errorInfo='测试') {
    // 开始参数判断
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    throwError(!du.isRegexp(param), errorInfo, ParamValidError);
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 一个函数。
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validFunction(param, errorInfo='测试') {
    // 开始参数判断
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    throwError(!du.isFunction(param), errorInfo, ParamValidError);
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 一个类。
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validClass(param, errorInfo='测试') {
    // 开始参数判断
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    throwError(!du.isClass(param), errorInfo, ParamValidError);
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 一个目标类。
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validTargetClass(param, errorInfo='测试', targetClass) {
    // 开始参数判断
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    throwError(!du.isTargetClass(param, targetClass), errorInfo, ParamValidError);
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 一个对象（对象可能是 object 也可能是 一个 Array）。
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validObject(param, errorInfo='测试') {
    // 开始参数判断
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    throwError(!du.isObject(param), errorInfo, ParamValidError);
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 一个数组
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validArray(param, errorInfo='测试') {
    // 开始参数判断
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    throwError(!Array.isArray(param), errorInfo, ParamValidError);
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 一个二维数组
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function valid2DArray(param, errorInfo='测试') {
    // 开始参数判断
    let condition = true;
    if(Array.isArray(param)){
        // 首先它是数组(并且，它的子元素 全都是数组)
        condition = param.filter(value=>Array.isArray(value)).length === param.length ;
    }else{
        condition = false;
    }
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    throwError(!condition, errorInfo, ParamValidError);
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 对象字面量。
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @param {boolean} canBeUndefined 是否可以为 undefined ，默认 false 不可以 。
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validObjectLiteral(param, errorInfo='测试', canBeUndefined=false) {
    // 对于有类型限制的参数，进行校验
    throwParameterError(!du.isBoolean(canBeUndefined), `validObjectLiteral 函数参数异常, canBeUndefined=${canBeUndefined} 应该为布尔值`);
    // 提取数值
    let tmpCanBeUndefined = du.valueOfBoolean(canBeUndefined);
    // 开始参数判断（对于参数 param ，有时候可以为 undefined ，有时候，不可以，所以增加一个判断）
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    if(!tmpCanBeUndefined) {
        // 不可以为 undefined
        throwError(!du.isObjectLiteral(param), errorInfo, ParamValidError);
    }else{
        // 可以为 undefined，当不是 undefined 才校验
        if(param!==undefined) throwError(!du.isObjectLiteral(param), errorInfo, ParamValidError);
    }
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 指定的数据类型。（在 isTargetObject 里面，有对于 targetType 的类型校验）
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @param {...class} targetType 指定的数据类型这是不定参数，可能为 class 也可能为 function。因为 JS 种 class 就是一个 特殊的 function 。
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validTargetObject(param, errorInfo='测试', ...targetType) {
    // 开始参数判断（在 isTargetObject 里面，有对于 targetType 的类型校验）
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    throwError(!du.isTargetObject(param, ...targetType), errorInfo, ParamValidError);
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 集合 ，而且 全部元素 都是 targetClass 类型的 对象
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @param {...class} targetClass 指定的数据类型这是不定参数，可能为 class 也可能为 function。因为 JS 种 class 就是一个 特殊的 function 。
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validTargetObjectSet(param, errorInfo='测试', ...targetClass){
    // 开始参数判断（在 isTargetObjectArray 里面，有对于 targetClass 的类型校验）
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    throwError(!du.isTargetObjectSet(param, ...targetClass), errorInfo, ParamValidError);
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 数组 ，而且 全部元素 都是 targetClass 类型的 对象
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @param {...class} targetClass 指定的数据类型这是不定参数，可能为 class 也可能为 function。因为 JS 种 class 就是一个 特殊的 function 。
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validTargetObjectArray(param, errorInfo='测试', ...targetClass){
    // 开始参数判断（在 isTargetObjectArray 里面，有对于 targetClass 的类型校验）
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    throwError(!du.isTargetObjectArray(param, ...targetClass), errorInfo, ParamValidError);
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 二维数组 ，而且 全部元素 都是 targetClass 类型的 对象
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @param {...class} targetClass 指定的数据类型这是不定参数，可能为 class 也可能为 function。因为 JS 种 class 就是一个 特殊的 function 。
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validTargetObject2DArray(params, errorInfo='测试', ...targetClass) {
    // 开始参数判断（在 isTargetObject2DArray 里面，有对于 targetClass 的类型校验）
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    throwError(!du.isTargetObject2DArray(params, ...targetClass), errorInfo, ParamValidError);
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 一个 Html 元素对象
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validHtmlElement(params, errorInfo='测试'){
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    throwError(!du.isHtmlElement(params), errorInfo, ParamValidError);
}

/**
 * 这是一个简便的参数校验方法，校验参数是否为 一个 html 元素 集合对象 ( HTMLCollection 或者 NodeList )
 * @param {object} param 待校验的变量
 * @param {string} errorInfo 如果校验不通过，抛出的异常信息
 * @throws 对于抛出异常有2种：第一种，是 ParameterError 这个函数本身的参数异常导致抛出；第二种，是 ParamValidError 业务上的校验异常。
 */
function validHtmlElementList(params, errorInfo='测试'){
    // 对于 errorInfo 在 throwError 里面有完整的校验 和 提取值处理
    throwError(!du.isHtmlElementList(params), errorInfo, ParamValidError);
}

/**
 * 导出公用内容
 */
export {
    validString, validBoolean, validNumber, validRegExp, validFunction, validClass,
    validTargetClass, validObject, validArray, valid2DArray, validObjectLiteral, 
    validTargetObject, validTargetObjectSet, validTargetObjectArray, validTargetObject2DArray,
    validHtmlElement, validHtmlElementList
}