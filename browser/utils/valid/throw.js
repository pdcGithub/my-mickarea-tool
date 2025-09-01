/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "throw.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-12
 * @version 1.0.0 
 * @description  这是校验处理的基础模块，它负责抛出异常
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ParameterError, ClassCreationError, ParamValidError } from "../../modules/myselfs/js/errors.js";
import { DataUtil as du } from "../datatype.js";

/**
 * （ 这个是所有 throwError 的基础 ）当满足 condition 这个条件时，将抛出一个异常。而 异常的类型 和 信息，将由你自己指定。
 * @param {boolean} condition 这个是要抛出异常时，所满足的条件。比如 1===1 。它应该是一个 布尔值 boolean。
 * @param {string} errorInfo 这个是抛出异常时，所携带的报错信息。比如 '温馨提示，这里报错了'。它应该是一个字符串 string 。
 * @param {Error} errorType 这个时要抛出的异常类型，默认是 Error。可以用其他类型比如：TypeError 或者一些自定义类型
 * @throws 函数如果 condition 为 true，则抛出一个指定的 errorType 异常。
 */
function throwError(condition=true, errorInfo='这是一条默认的异常信息，说明你抛出异常了', errorType=Error){
    // 参数校验
    if(!du.isBoolean(condition)) throw new ParameterError(`throwError 函数, 参数 condition=${condition} 不是布尔型数据，请检查。`);
    if(!du.isString(errorInfo) || du.isEmptyString(errorInfo)) throw new ParameterError(`throwError 函数, 参数 errorInfo=${errorInfo} 不是非空字符串数据，请检查。`);
    if(!du.isTargetClass(errorType, Error)) throw new ParameterError(`throwError 函数, 参数 errorType=${errorType} 不是合法的异常类型，请检查。`);
    // 收集结果
    let tempCondition = du.valueOfBoolean(condition);
    let tempErrorInfo = du.valueOfString(errorInfo);
    // 根据条件值来判断，是否抛指定的异常
    if(tempCondition) throw new errorType(tempErrorInfo);
}

/**
 * 当满足 condition 这个条件时，将抛出一个 ClassCreationError 异常。而信息，将由你自己指定。
 * @param {boolean} condition 这个是要抛出异常时，所满足的条件。比如 1===1 。它应该是一个 布尔值 boolean。
 * @param {string} errorInfo 这个是抛出异常时，所携带的报错信息。比如 '温馨提示，这里报错了'。它应该是一个字符串 string 。
 * @throws 函数如果 condition 为 true，则抛出一个 ClassCreationError 异常。
 */
function throwCreationError(condition=true, errorInfo='这是 throwCreationError 的默认异常信息，说明你抛出异常了'){
    throwError(condition, errorInfo, ClassCreationError);
}

/**
 * 当满足 condition 这个条件时，将抛出一个 ClassCreationError 异常。异常信息已经写好，只需要指定静态类的类名
 * @param {boolean} condition 这个是要抛出异常时，所满足的条件。比如 1===1 。它应该是一个 布尔值 boolean。
 * @param {class} functionOrClass 这个是类名，一般是静态类。因为报错信息都是差不多的。所以，传递一个静态类名即可。用 isClass 函数校验。
 * @throws 函数如果 condition 为 true，则抛出一个 ClassCreationError 异常。
 */
function throwCannotNewError(condition=true, functionOrClass){
    if(!du.isClass(functionOrClass)){
        throw new ParameterError(`throwCannotNewError 函数，接收的参数 functionOrClass=${functionOrClass} 不是一个类或者函数。`);
    }
    let errorMessage = `请注意，${functionOrClass.name} 是一个静态工具类，它不能被直接实例化`;
    // 抛出一个 ClassCreationError 异常
    throwCreationError(condition, errorMessage);
}

/**
 * 当满足 condition 这个条件时，将抛出一个 ParameterError 异常。而信息，将由你自己指定。
 * @param {boolean} condition 这个是要抛出异常时，所满足的条件。比如 1===1 。它应该是一个 布尔值 boolean。
 * @param {string} errorInfo 这个是抛出异常时，所携带的报错信息。比如 '温馨提示，这里报错了'。它应该是一个字符串 string 。
 * @throws 函数如果 condition 为 true，则抛出一个 ParameterError 异常。
 */
function throwParameterError(condition=true, errorInfo='这是 throwParameterError 的默认异常信息，说明你抛出异常了'){
    throwError(condition, errorInfo, ParameterError);
}

/**
 * 当满足 condition 这个条件时，将抛出一个 ParamValidError 异常。而信息，将由你自己指定。
 * @param {boolean} condition 这个是要抛出异常时，所满足的条件。比如 1===1 。它应该是一个 布尔值 boolean。
 * @param {string} errorInfo 这个是抛出异常时，所携带的报错信息。比如 '温馨提示，这里报错了'。它应该是一个字符串 string 。
 * @throws 函数如果 condition 为 true，则抛出一个 ParamValidError 异常。
 */
function throwParameterValidError(condition=true, errorInfo='这是 throwParamValidError 的默认异常信息，说明你抛出异常了'){
    throwError(condition, errorInfo, ParamValidError);
}

/**
 * 导出公用内容
 */
export { throwError, throwCreationError, throwCannotNewError, throwParameterError, throwParameterValidError }