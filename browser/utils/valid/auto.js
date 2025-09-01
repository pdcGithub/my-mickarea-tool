/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "auto.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-12
 * @version 1.0.0 
 * @description  这个模块，主要用作参数自动化处理（参数自动校验，自动赋值）
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { valueOfBoolean, valueOfNumber, valueOfString } from "../datatype/base.js";
import { valid2DArray, validArray, validBoolean, validHtmlElement, validHtmlElementList, validNumber, validObjectLiteral, validRegExp, validString, validTargetObject, validTargetObject2DArray, validTargetObjectArray, validTargetObjectSet } from "./verify.js";

/**
 * 校验字符串类型的参数。如果不是字符串类型的参数，则抛出异常 ParamValidError ；如果是字符串类型参数，则自动获取其值，并返回。
 * @param {*} param 待校验的参数
 * @param {string} className 要输出的类名
 * @param {string} methodName 要输出的方法名
 * @param {string} paramName 要输出的参数名
 * @param {boolean} canBeEmpty 是否可以为空字符串，默认为 true，可以为空字符串
 * @returns {string} 参数 param 的字符串值
 * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
 */
function autoVnAofString(param, className='', methodName='', paramName='', canBeEmpty=true){
    // 其他参数校验
    validString(className, `autoVnAofString 函数的参数 className=${className} 异常，他不是字符串`);
    validString(methodName, `autoVnAofString 函数的参数 methodName=${methodName} 异常，他不是字符串`);
    validString(paramName, `autoVnAofString 函数的参数 paramName=${paramName} 异常，他不是字符串`);
    validBoolean(canBeEmpty, `autoVnAofString 函数的参数 canBeEmpty=${canBeEmpty} 异常，他不是布尔值`);
    //
    let clsName = valueOfString(className);
    let mthName = valueOfString(methodName);
    let praName = valueOfString(paramName);
    let beEmpty = valueOfBoolean(canBeEmpty);
    // 先校验，如果抛出异常，后面是不会执行的。
    validString(param, `${clsName} - ${mthName} - ${praName}=${param} 参数异常, 它应该是一个 ${beEmpty?'可空字符串':'非空字符串'}`, beEmpty);
    // 获取值
    return valueOfString(param);
}

/**
 * 校验数字值类型的参数。如果不是数字值类型的参数，则抛出异常 ParamValidError ；如果是数字值类型参数，则自动获取其值，并返回。
 * @param {*} param 待校验的参数
 * @param {string} className 要输出的类名
 * @param {string} methodName 要输出的方法名
 * @param {string} paramName 要输出的参数名
 * @returns {number} 参数 param 的数字值
 * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
 */
function autoVnAofNumber(param, className='', methodName='', paramName=''){
    // 其他参数校验
    validString(className, `autoVnAofNumber 函数的参数 className=${className} 异常，他不是字符串`);
    validString(methodName, `autoVnAofNumber 函数的参数 methodName=${methodName} 异常，他不是字符串`);
    validString(paramName, `autoVnAofNumber 函数的参数 paramName=${paramName} 异常，他不是字符串`);
    //
    let clsName = valueOfString(className);
    let mthName = valueOfString(methodName);
    let praName = valueOfString(paramName);
    // 先校验，如果抛出异常，后面是不会执行的。
    validNumber(param, `${clsName} - ${mthName} - ${praName}=${param} 参数异常, 它应该是一个数字`);
    // 获取值
    return valueOfNumber(param);
}

/**
 * 校验布尔值类型的参数。如果不是布尔值类型的参数，则抛出异常 ParamValidError ；如果是布尔值类型参数，则自动获取其值，并返回。
 * @param {*} param 待校验的参数
 * @param {string} className 要输出的类名
 * @param {string} methodName 要输出的方法名
 * @param {string} paramName 要输出的参数名
 * @returns {boolean} 参数 param 的布尔值
 * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
 */
function autoVnAofBoolean(param, className='', methodName='', paramName=''){
    // 其他参数校验
    validString(className, `autoVnAofBoolean 函数的参数 className=${className} 异常，他不是字符串`);
    validString(methodName, `autoVnAofBoolean 函数的参数 methodName=${methodName} 异常，他不是字符串`);
    validString(paramName, `autoVnAofBoolean 函数的参数 paramName=${paramName} 异常，他不是字符串`);
    //
    let clsName = valueOfString(className);
    let mthName = valueOfString(methodName);
    let praName = valueOfString(paramName);
    // 先校验，如果抛出异常，后面是不会执行的。
    validBoolean(param, `${clsName} - ${mthName} - ${praName}=${param} 参数异常, 它应该是一个布尔值`);
    // 获取值
    return valueOfBoolean(param); 
}

/**
 * 校验 正则表达式 类型的参数。如果不是 正则表达式 类型的参数，则抛出异常 ParamValidError ；如果是 正则表达式 类型参数，则自动获取其值，并返回。
 * @param {*} param 待校验的参数
 * @param {string} className 要输出的类名
 * @param {string} methodName 要输出的方法名
 * @param {string} paramName 要输出的参数名
 * @returns {RegExp} 参数 param 的 正则表达式 
 * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
 */
function autoVnAofRegExp(param, className='', methodName='', paramName=''){
    //
    let clsName = autoVnAofString(className, '', 'autoVnAofRegExp', 'className');
    let mthName = autoVnAofString(methodName, '', 'autoVnAofRegExp', 'methodName');
    let praName = autoVnAofString(paramName, '', 'autoVnAofRegExp', 'paramName');
    // 先校验，如果抛出异常，后面是不会执行的。
    validRegExp(param, `${clsName} - ${mthName} - ${praName}=${param} 参数异常, 它应该是一个 正则表达式 `);
    // 获取值
    return param;
}

/**
 * 校验Map ( 图 )类型的参数。如果不是Map ( 图 )类型的参数，则抛出异常 ParamValidError ；如果是Map ( 图 )类型参数，则自动获取其值，并返回。
 * @param {*} param 待校验的参数
 * @param {string} className 要输出的类名
 * @param {string} methodName 要输出的方法名
 * @param {string} paramName 要输出的参数名
 * @returns {Map} 参数 param 的Map ( 图 )
 * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
 */
function autoVnAofMap(param, className='', methodName='', paramName=''){
    //
    let clsName = autoVnAofString(className, '', 'autoVnAofMap', 'className');
    let mthName = autoVnAofString(methodName, '', 'autoVnAofMap', 'methodName');
    let praName = autoVnAofString(paramName, '', 'autoVnAofMap', 'paramName');
    // 先校验，如果抛出异常，后面是不会执行的。
    validTargetObject(param, `${clsName} - ${mthName} - ${praName}=${param} 参数异常, 它应该是一个Map ( 图 )`, Map);
    // 获取值
    return param;
}

/**
 * 校验Set (集合) 类型的参数。如果不是Set (集合) 类型的参数，则抛出异常 ParamValidError ；如果是Set (集合) 类型参数，则自动获取其值，并返回。
 * @param {*} param 待校验的参数
 * @param {string} className 要输出的类名
 * @param {string} methodName 要输出的方法名
 * @param {string} paramName 要输出的参数名
 * @returns {Set} 参数 param 的Set (集合) 
 * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
 */
function autoVnAofSet(param, className='', methodName='', paramName=''){
    //
    let clsName = autoVnAofString(className, '', 'autoVnAofSet', 'className');
    let mthName = autoVnAofString(methodName, '', 'autoVnAofSet', 'methodName');
    let praName = autoVnAofString(paramName, '', 'autoVnAofSet', 'paramName');
    // 先校验，如果抛出异常，后面是不会执行的。
    validTargetObject(param, `${clsName} - ${mthName} - ${praName}=${param} 参数异常, 它应该是一个Set (集合) `, Set);
    // 获取值
    return param;
}

/**
 * 校验Array (数组)类型的参数。如果不是Array (数组)类型的参数，则抛出异常 ParamValidError ；如果是Array (数组)类型参数，则自动获取其值，并返回。
 * @param {*} param 待校验的参数
 * @param {string} className 要输出的类名
 * @param {string} methodName 要输出的方法名
 * @param {string} paramName 要输出的参数名
 * @returns {Array} 参数 param 的Array (数组)
 * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
 */
function autoVnAofArray(param, className='', methodName='', paramName=''){
    //
    let clsName = autoVnAofString(className, '', 'autoVnAofArray', 'className');
    let mthName = autoVnAofString(methodName, '', 'autoVnAofArray', 'methodName');
    let praName = autoVnAofString(paramName, '', 'autoVnAofArray', 'paramName');
    // 先校验，如果抛出异常，后面是不会执行的。
    validArray(param, `${clsName} - ${mthName} - ${praName}=${param} 参数异常, 它应该是一个Array (数组)`);
    // 获取值
    return param;
}

/**
 * 校验2D Array (二维数组)类型的参数。如果不是2D Array (二维数组)类型的参数，则抛出异常 ParamValidError ；如果是2D Array (二维数组)类型参数，则自动获取其值，并返回。
 * @param {*} param 待校验的参数
 * @param {string} className 要输出的类名
 * @param {string} methodName 要输出的方法名
 * @param {string} paramName 要输出的参数名
 * @returns {Array<Array<object>} 参数 param 的2D Array (二维数组)
 * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
 */
function autoVnAof2DArray(param, className='', methodName='', paramName=''){
    //
    let clsName = autoVnAofString(className, '', 'autoVnAof2DArray', 'className');
    let mthName = autoVnAofString(methodName, '', 'autoVnAof2DArray', 'methodName');
    let praName = autoVnAofString(paramName, '', 'autoVnAof2DArray', 'paramName');
    // 先校验，如果抛出异常，后面是不会执行的。
    valid2DArray(param, `${clsName} - ${mthName} - ${praName}=${param} 参数异常, 它应该是一个2D Array (二维数组)`);
    // 获取值
    return param;
}

/**
 * 校验 对象字面量 类型的参数。如果不是 对象字面量 类型的参数，则抛出异常 ParamValidError ；如果是 对象字面量 类型参数，则自动获取其值，并返回。
 * @param {*} param 待校验的参数
 * @param {string} className 要输出的类名
 * @param {string} methodName 要输出的方法名
 * @param {string} paramName 要输出的参数名
 * @param {boolean} canBeUndefined 是否可以为 undefined ，默认 false 不可以 。
 * @returns {object} 参数 param 的 对象字面量
 * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
 */
function autoVnAofObjectLiteral(param, className='', methodName='', paramName='', canBeUndefined=false){
    //
    let clsName = autoVnAofString(className, '', 'autoVnAofObjectLiteral', 'className');
    let mthName = autoVnAofString(methodName, '', 'autoVnAofObjectLiteral', 'methodName');
    let praName = autoVnAofString(paramName, '', 'autoVnAofObjectLiteral', 'paramName');
    let canBenUn = autoVnAofBoolean(canBeUndefined, '', 'autoVnAofObjectLiteral', 'canBeUndefined');
    // 先校验，如果抛出异常，后面是不会执行的。
    validObjectLiteral(param, `${clsName} - ${mthName} - ${praName}=${param} 参数异常, 它应该是一个 对象字面量。比如：{'a':1, 'b':2}`, canBenUn);
    // 获取值
    return param;
}

/**
 * 校验 指定 类型的参数。如果不是 参数不是自定的类型与指定的类型不同，则抛出异常 ParamValidError ；如果是 符合 指定的类型，则自动获取其值，并返回。
 * @param {*} param 待校验的参数
 * @param {string} className 要输出的类名
 * @param {string} methodName 要输出的方法名
 * @param {string} paramName 要输出的参数名
 * @param  {...class} targetType 指定的数据类型（不定参数）。比如：String, Number, Boolean 等等。需要是类型
 * @returns {object} 参数 param 的 具体类型值
 * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
 */
function autoVnAofTargetObject(param, className='', methodName='', paramName='', ...targetType){
    // 
    let clsName = autoVnAofString(className, '', 'autoVnAofTargetObject', 'className');
    let mthName = autoVnAofString(methodName, '', 'autoVnAofTargetObject', 'methodName');
    let praName = autoVnAofString(paramName, '', 'autoVnAofTargetObject', 'paramName');
    // 先校验，如果抛出异常，后面是不会执行的。
    validTargetObject(param, `${clsName} - ${mthName} - ${praName}=${param} 参数异常, 它应该是 targetType 所指定的类型中的一个`, ...targetType);
    // 获取值
    return param;
}

/**
 * 校验 Set 集合 以及其内部的 元素 类型。如果不是 Set 集合 或者 Set 集合内部元素不在指定的类型中，则抛出异常 ParamValidError ；否则，则自动获取其值，并返回。
 * @param {*} param 待校验的参数
 * @param {string} className 要输出的类名
 * @param {string} methodName 要输出的方法名
 * @param {string} paramName 要输出的参数名
 * @param  {...class} targetType 定的数据类型（不定参数）。比如：String, Number, Boolean 等等。需要是类型
 * @returns {Set} 参数 param 的 具体类型值
 * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
 */
function autoVnAofTargetObjectSet(param, className='', methodName='', paramName='', ...targetType){
    // 
    let clsName = autoVnAofString(className, '', 'autoVnAofTargetObjectSet', 'className');
    let mthName = autoVnAofString(methodName, '', 'autoVnAofTargetObjectSet', 'methodName');
    let praName = autoVnAofString(paramName, '', 'autoVnAofTargetObjectSet', 'paramName');
    // 先校验，如果抛出异常，后面是不会执行的。
    validTargetObjectSet(param, `${clsName} - ${mthName} - ${praName}=${param} 参数异常, 它应该是一个 Set, 并且 内部元素 是 targetType 所指定的类型中的一个`, ...targetType);
    // 获取值
    return param;
}

/**
 * 校验 Array 数组 以及其内部的 元素 类型。如果不是 Array 数组 或者 Array 数组内部元素不在指定的类型中，则抛出异常 ParamValidError ；否则，则自动获取其值，并返回。
 * @param {*} param 待校验的参数
 * @param {string} className 要输出的类名
 * @param {string} methodName 要输出的方法名
 * @param {string} paramName 要输出的参数名
 * @param  {...class} targetType 定的数据类型（不定参数）。比如：String, Number, Boolean 等等。需要是类型
 * @returns {Array} 参数 param 的 具体类型值
 * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
 */
function autoVnAofTargetObjectArray(param, className='', methodName='', paramName='', ...targetType){
    // 
    let clsName = autoVnAofString(className, '', 'autoVnAofTargetObjectArray', 'className');
    let mthName = autoVnAofString(methodName, '', 'autoVnAofTargetObjectArray', 'methodName');
    let praName = autoVnAofString(paramName, '', 'autoVnAofTargetObjectArray', 'paramName');
    // 先校验，如果抛出异常，后面是不会执行的。
    validTargetObjectArray(param, `${clsName} - ${mthName} - ${praName}=${param} 参数异常, 它应该是一个 Array, 并且 内部元素 是 targetType 所指定的类型中的一个`, ...targetType);
    // 获取值
    return param;
}

/**
 * 校验 Array 二维数组 以及其内部的 元素 类型。如果不是 Array 二维数组 或者 Array 二维数组内部元素不在指定的类型中，则抛出异常 ParamValidError ；否则，则自动获取其值，并返回。
 * @param {*} param 待校验的参数
 * @param {string} className 要输出的类名
 * @param {string} methodName 要输出的方法名
 * @param {string} paramName 要输出的参数名
 * @param  {...class} targetType 定的数据类型（不定参数）。比如：String, Number, Boolean 等等。需要是类型
 * @returns {Array<Array<object>>} 参数 param 的 具体类型值
 * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
 */
function autoVnAofTargetObject2DArray(param, className='', methodName='', paramName='', ...targetType){
    // 
    let clsName = autoVnAofString(className, '', 'autoVnAofTargetObject2DArray', 'className');
    let mthName = autoVnAofString(methodName, '', 'autoVnAofTargetObject2DArray', 'methodName');
    let praName = autoVnAofString(paramName, '', 'autoVnAofTargetObject2DArray', 'paramName');
    // 先校验，如果抛出异常，后面是不会执行的。
    validTargetObject2DArray(param, `${clsName} - ${mthName} - ${praName}=${param} 参数异常, 它应该是一个 二维数组, 并且 内部元素 是 targetType 所指定的类型中的一个`, ...targetType);
    // 获取值
    return param;
}

/**
 * 校验 Html 元素 类型的参数。如果不是 Html 元素 类型的参数，则抛出异常 ParamValidError ；如果是 Html 元素 类型参数，则自动获取其值，并返回。
 * @param {*} param 待校验的参数
 * @param {string} className 要输出的类名
 * @param {string} methodName 要输出的方法名
 * @param {string} paramName 要输出的参数名
 * @returns {HTMLElement} 参数 param 的 具体类型值
 * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
 */
function autoVnAofHtmlElement(param, className='', methodName='', paramName=''){
    // 
    let clsName = autoVnAofString(className, '', 'autoVnAofHtmlElement', 'className');
    let mthName = autoVnAofString(methodName, '', 'autoVnAofHtmlElement', 'methodName');
    let praName = autoVnAofString(paramName, '', 'autoVnAofHtmlElement', 'paramName');
    // 先校验，如果抛出异常，后面是不会执行的。
    validHtmlElement(param, `${clsName} - ${mthName} - ${praName}=${param} 参数异常, 它应该是一个 Html 元素对象`);
    // 获取值
    return param;
}

/**
 * 校验 html 元素 集合对象 ( HTMLCollection 或者 NodeList )类型的参数。如果不是 html 元素 集合对象 ( HTMLCollection 或者 NodeList )类型的参数，则抛出异常 ParamValidError ；如果是html 元素 集合对象 ( HTMLCollection 或者 NodeList )类型参数，则自动获取其值，并返回。
 * @param {*} param 待校验的参数
 * @param {string} className 要输出的类名
 * @param {string} methodName 要输出的方法名
 * @param {string} paramName 要输出的参数名
 * @returns {HTMLCollection|NodeList} 参数 param 的 具体类型值
 * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
 */
function autoVnAofHtmlElementList(param, className='', methodName='', paramName=''){
    // 
    let clsName = autoVnAofString(className, '', 'autoVnAofHtmlElementList', 'className');
    let mthName = autoVnAofString(methodName, '', 'autoVnAofHtmlElementList', 'methodName');
    let praName = autoVnAofString(paramName, '', 'autoVnAofHtmlElementList', 'paramName');
    // 先校验，如果抛出异常，后面是不会执行的。
    validHtmlElementList(param, `${clsName} - ${mthName} - ${praName}=${param} 参数异常, 它应该是一个 html 元素 集合对象 ( HTMLCollection 或者 NodeList )`);
    // 获取值
    return param;
}

/**
 * 导出公用内容
 */
export {
    autoVnAofString, autoVnAofNumber, autoVnAofBoolean, autoVnAofRegExp,
    autoVnAofMap, autoVnAofSet, 
    autoVnAofArray, autoVnAof2DArray,
    autoVnAofObjectLiteral, autoVnAofTargetObject, autoVnAofTargetObjectSet, autoVnAofTargetObjectArray, autoVnAofTargetObject2DArray,
    autoVnAofHtmlElement, autoVnAofHtmlElementList
}