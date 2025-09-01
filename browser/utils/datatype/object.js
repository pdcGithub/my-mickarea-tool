/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "object.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-11
 * @version 1.0.0 
 * @description  这是作为数据类型处理的一个 类、对象、函数 相关的函数集合
 * 
 * 整个文件是基础的数据类型判断 和 获取。所以不能使用 valid.js 来简化异常抛出。因为，抛异常的处理，引用了 这个文件的 API。会造成循环引用，然后报错。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { NotNullValue, isString, isNumber, isBoolean, isSymbol, isRegexpOk } from "./base.js";
import { ParameterError} from "../../modules/myselfs/js/errors.js"
import { Bs5EffBaseComponent } from "../../modules/myselfs/js/bootstrap5Effect.js"
import { Bootstrap5Object } from "../../modules/myselfs/js/bootstrap5UI.js";

//==============================  这里处理 函数  ==========================================

/**
 * 判断传入的参数，是否为一个函数。
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果是一个函数，则返回 true ；否则，返回 false
 */
function isFunction(value){
    return typeof value === 'function';
}

//==============================  这里处理 类  ===========================================

/**
 * 判断传入的参数，是否为一个可以创建对象的类。在 JS 中 function 和 class 都可以 new 对象，它们都是类。
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果可实例化，则返回 true ；否则，返回 false
 */
function isClass(value){
    // null 和 undefined 没有 toString 方法，所以要先排除 异常值 
    return NotNullValue(value) && (isFunction(value) || /^[\s]*class/i.test(value.toString()));
}

/**
 * 根据 JS 的原型链，判断 currentClass 是否为 targetClass 或者 它的子类。如果继承关系来自 函数，也是可以判断的。
 * 如果 currentClass 或者 targetClass，不是数据类型，则直接返回 false。
 * @param {*} currentClass 待判断的类名
 * @param {*} targetClass 目标类名
 * @returns 如果 currentClass 为 targetClass 或者 它的子类，则返回 true；否则返回 false 。
 */
function isTargetClass(currentClass, targetClass){
    //
    let re = false;
    // 参数校验（当 2个参数都是 类型 ，才处理，否则默认 false）
    if(isClass(currentClass) && isClass(targetClass)){
        // 赋值
        let current = currentClass;
        while(current){
            if(current === targetClass) {
                re = true;
            };
            current = Object.getPrototypeOf(current);
        }
    }
    //
    return re;
}

//==============================  这里处理 对象  ===========================================

/**
 * 判断传来的参数，是否是一个对象
 * @param {*} value 待处理的参数
 * @returns {boolean} 如果 value 为 对象 ，则返回 true；否则，返回 false
 */
function isObject(value){
    return NotNullValue(value) && typeof value === 'object';
}

/**
 * 判断传来的参数，是否是一个对象 字面量，比如：{1:'1', a:'A'}。因为，Array 的 typeof 值，也是一个 object ，所以要排除。
 * @param {*} value 待判断参数
 * @returns {boolean} 如果 value 为 对象 字面量 ，则返回 true；否则，返回 false
 */
function isObjectLiteral(value){
    return isObject(value) && !Array.isArray(value);
}

/**
 * 判断传来的参数，是否是一个指定类型的对象（JS 中 函数 和 类 都是可以 new 创建对象的）。
 * 使用方式很简单，比如 ： isTargetObject(new String('ss'), String); 或者 多个 isTargetObject(1, String, Number) ;
 * @param {object} value 待处理的参数
 * @param {...class} targetClass (这个是不定参数) 指定的对象类型名称，请注意是 类名，不是变量。
 * @returns {boolean} 如果 value 为 targetClass 所对应的类型的一个实例 ，则返回 true；否则，返回 false 。
 * @throws 如果 targetClass 没有传入，或者 它包含了一些不是类型的内容，则抛出 ParameterError 异常。
 */
function isTargetObject(value, ...targetClass){
    // 参数校验
    if(targetClass.length<=0){
        throw new ParameterError('isTargetObject 函数，接收的参数异常。不定参数 targetClass 没有内容，请检查。');
    }
    let notClassNum = targetClass.filter(cls=>!isClass(cls)).length;
    if(notClassNum>0){
        throw new ParameterError(`isTargetObject 函数，接收的参数异常。不定参数 targetClass=${targetClass} 包含了一些不是类型(Class, Function)的内容，请检查。`);
    }
    // 开始初始赋值
    let re = false;
    // 因为可能有多个 可选的 类型，所以要循环遍历。(为了方便循环跳出，用 for 而不是 forEach)
    for(let i=0;i<targetClass.length;i++){
        // 首先，这个 targetClass 是一个不定参数，所以可能有多个 目标类 要判断，得分类型
        switch(targetClass[i]){
        case String:
            // 如果目标是字符串类型，则要判断
            re = isString(value);
            break;
        case Number:
            // 如果目标是数字类型，则需要判断
            re = isNumber(value);
            break;
        case Boolean:
            // 如果目标是布尔类型，则需要判断
            re = isBoolean(value);
            break;
        case Symbol:
            // 如果目标是 Symbol 值，则需要判断
            re = isSymbol(value);
            break;
        default:
            re = value instanceof targetClass[i];
            break;
        }
        // 只要有一个符合，则可以跳出
        if(re === true){
            break;
        }
    }
    // 返回结果
    return re;
}

/**
 * 判断传来的 Set 集合 是否 全部元素 都是 targetClass 类型的 对象
 * @param {Set} pSet 待判断的集合。如果传来的是不是集合，则返回 false。
 * @param {...class} targetClass (不定参数) 指定的对象类型名称，请注意是 类名，不是变量。
 * @returns 如果传来的集合，它里面 每一个值 都是 targetClass 类型的 对象，则为 true ； 否则为 false。
 * @throws 如果 targetClass 没有传入，或者 它包含了一些不是类型的内容，则抛出 ParameterError 异常。
 */
function isTargetObjectSet(pSet, ...targetClass){
    // 先赋值一个初始值
    let re = false;
    // 如果是 Set 对象，则处理，否则都是 false
    if(isTargetObject(pSet, Set)){
        // 转 array
        let tempArr = [...pSet];
        // 根据 前面的函数，得出结果。
        re = isTargetObjectArray(tempArr, ...targetClass);
    }
    // 返回结果
    return re;
}

/**
 * 判断传来的数组 是否 全部元素 都是 targetClass 类型的 对象
 * @param {Array} pArray 待判断的数组。如果传来的是不是数组，则返回 false。
 * @param {...class} targetClass (不定参数) 指定的对象类型名称，请注意是 类名，不是变量。
 * @returns 如果传来的数组，它里面 每一个值 都是 targetClass 类型的 对象，则为 true ； 否则为 false。
 * @throws 如果 targetClass 没有传入，或者 它包含了一些不是类型的内容，则抛出 ParameterError 异常。
 */
function isTargetObjectArray(pArray, ...targetClass){
    let re = false;
    // 如果是数组，遍历一下
    if(Array.isArray(pArray)){
        // 找出不是 targetClass 对象的数量
        let tempArray = pArray.filter(value=>!isTargetObject(value, ...targetClass));
        // 如果数量为0，则返回 true
        if(tempArray.length<=0){
            re = true;
        }
    }
    // 返回结果
    return re;
}

/**
 * 判断传来的数组 是否 是二维数组，并且 全部元素 都是 targetClass 类型的 对象。
 * @param {Array<Array<object>>} pArray2d 待判断的数组。如果传来的是不是数组，则返回 false。
 * @param {...Class} targetClass (不定参数) 指定的对象类型名称，请注意是 类名，不是变量。
 * @returns 如果传来的数组，它里面 每一个值 都是 targetClass 类型的 对象，则为 true ； 否则为 false。
 * @throws 如果 targetClass 没有传入，或者 它包含了一些不是类型的内容，则抛出 ParameterError 异常。
 */
function isTargetObject2DArray(pArray2d, ...targetClass){
    let re = false;
    // 如果是数组则遍历
    if(Array.isArray(pArray2d)){
        // 计算符合的数量，如果全部二级数组都符合，则返回 true 。
        re = pArray2d.filter(arr=>isTargetObjectArray(arr, ...targetClass)).length === pArray2d.length
    }
    return re;
}

//==============================  这里处理特定对象 ( 一般用于自定义的对象处理，比如 BootstrapObject )  ================

/**
 * 判断是否为可用的 Bootstrap 组件中，Html 标签对象的 content 内容。一般只有 2 种，一是字符串值或对象，二是 BootstrapObject 对象
 * @param {string|BootstrapObject} object 一般只有 2 种，一是字符串值或对象，二是 BootstrapObject 对象
 * @returns {boolean} 如果传来的值是 字符串 或者 BootstrapObject 对象，则为 true ； 否则为 false
 */
function isContentObject(object){
    return isTargetObject(object, String, Bootstrap5Object);
}

/**
 * 判断传来的数组 是否 全部元素 都是 可用的 Bootstrap 组件中 Html 标签对象的 content 内容。
 * 内容一般只有 2 种，一是字符串值或对象，二是 BootstrapObject 对象
 * @param {Array} pArray 待判断的数组。如果传来的是不是数组，则返回 false。
 * @returns {boolean} 如果传来的数组，它里面 每一个值 都是 字符串 或者 BootstrapObject 对象，则为 true ； 否则为 false
 */
function isContentObjectArray(pArray){
    return isTargetObjectArray(pArray, String, Bootstrap5Object);
}

/**
 * 判断传来的集合 是否 全部元素 都是 可用的 Bootstrap 组件中 Html 标签对象的 content 内容。
 * 内容一般只有 2 种，一是字符串值或对象，二是 BootstrapObject 对象
 * @param {Set} pSet 待判断的集合。如果传来的是不是集合，则返回 false。
 * @returns {boolean} 如果传来的集合，它里面 每一个值 都是 字符串 或者 BootstrapObject 对象，则为 true ； 否则为 false
 */
function isContentObjectSet(pSet){
    // 先赋值一个初始值
    let re = false;
    // 如果是 Set 对象，则处理，否则都是 false
    if(isTargetObject(pSet, Set)){
        // 转 array
        let tempArr = [...pSet];
        // 根据 前面的函数，得出结果。
        re = isContentObjectArray(tempArr);
    }
    // 返回结果
    return re;
}

/**
 * 判断是否为可用的 Bs5EffBaseComponent 组件。一般只有 2 种，一是字符串值或对象，二是 Bs5EffBaseComponent 对象
 * @param {string|Bs5EffBaseComponent} object 一般只有 2 种，一是字符串值或对象，二是 Bs5EffBaseComponent 对象
 * @returns {boolean} 如果传来的值是 字符串 或者 Bs5EffBaseComponent 对象，则为 true ； 否则为 false
 */
function isChildrenComponent(object){
    return isTargetObject(object, String, Bs5EffBaseComponent);
}

/**
 * 判断传来的数组 是否 全部元素 都是 可用的 Bs5EffBaseComponent 组件。
 * 内容一般只有 2 种，一是字符串值或对象，二是 Bs5EffBaseComponent 对象
 * @param {Array} cArray 待判断的数组。如果传来的是不是数组，则返回 false。
 * @returns {boolean} 如果传来的数组，它里面 每一个值 都是 字符串 或者 Bs5EffBaseComponent 对象，则为 true ； 否则为 false
 */
function isChildrenComponentArray(cArray){
    return isTargetObjectArray(cArray, String, Bs5EffBaseComponent);
}

//==============================  这里处理 Html 页面元素对象  ================

/**
 * 判断传入的对象是否为 html 元素对象。
 * 一般来说，document.get* 和 document.query* 这些返回的都是 html 元素对象 或者 html 元素对象的一个集合类 ( HTMLCollection 或者 NodeList )
 * @param {object} element 一个待检测的对象
 * @returns 一个布尔值，如果是 html 元素对象，则返回 true；否则，返回 false。
 */
function isHtmlElement(element) {
    // 先设定默认结果为 false
    let result = false;
    // 定义一个 html 元素的类名校验 正则表达式
    let regHtmlElem = /^html.*element$/i;
    // 然后判断是否为 html 元素对象，根据构造器的名称来判断
    if(NotNullValue(element) && isRegexpOk(element.constructor.name, regHtmlElem)){
        // 如果都满足，就是 html 元素对象
        result = true;
    }
    //返回结果
    return result;
}

/**
 * 判断传入的对象是否为 html 元素 集合对象 ( HTMLCollection 或者 NodeList )
 * @param {object} elementList 一个待检测的对象
 * @returns {boolean} 一个布尔值，如果是 html 元素 集合对象，则返回 true；否则，返回 false。
 */
function isHtmlElementList(elementList) {
    // 先设定默认结果为 false
    let result = false;
    // 
    if(NotNullValue(elementList) 
        && (elementList.constructor.name.toLowerCase() === 'nodelist' || elementList.constructor.name.toLowerCase() === 'htmlcollection')){
            // 如果都满足，就是 html 元素对象
            result = true;
    }
    //返回结果
    return result;
}

/**
 * 这里导出 这个模块的 所有内容
 */
export {
    isFunction, isClass, isTargetClass, isObject,  /* 基础对象 和 类 判断 */
    isObjectLiteral, /* 对象字面量判断 */
    isTargetObject, isTargetObjectSet, isTargetObjectArray, isTargetObject2DArray,  /* 目标对象和数组判断 */
    isContentObject, isContentObjectArray, isContentObjectSet,   /* UI组件内容对象和数组判断 */
    isChildrenComponent, isChildrenComponentArray,               /* 动态组件内容对象和数组判断 */
    isHtmlElement, isHtmlElementList                             /* Html元素对象和数组判断 */
}