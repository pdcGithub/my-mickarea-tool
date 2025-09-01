/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "transform.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-11
 * @version 1.0.0 
 * @description  这是作为数据类型处理的一个 数据转换 工具包
 * 
 * 整个文件是基础的数据类型判断 和 获取。所以不能使用 valid.js 来简化异常抛出。因为，抛异常的处理，引用了 这个文件的 API。会造成循环引用，然后报错。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { isString, isNumber, isBoolean, valueOfBoolean, valueOfString, valueOfNumber } from "./base.js";
import { isObject, isFunction } from "./object.js"
import { ParameterError } from "../../modules/myselfs/js/errors.js";

//==============================  这里处理一些特殊的 对象转化

/**
 * 将一个对象的键值对，转换为一个 Map 对象。它的键和值，都是字符串。(如果可以保存 function 作为 value，则为 function)
 * 如果对象包含 Symbol 键，则会被过滤。因为 Object.keys 方法 不包含 Symbol 属性。
 * @param {object} object 待处理对象
 * @param {boolean} canKeyBeEmpty 键信息，能否为空字符串。默认是 true
 * @param {boolean} canValueBeFunction 值信息，能否为函数。默认是 false
 */
function objToMap(object, canKeyBeEmpty=true, canValueBeFunction=false){
    // 参数校验
    if(!isObject(object) || Array.isArray(object)){
        throw new ParameterError(`objToMap 函数, 接收的参数异常. object=${object} 不是一个合法对象。`);
    }
    if(!isBoolean(canKeyBeEmpty)){
        throw new ParameterError(`objToMap 函数, 接收的参数异常. canKeyBeEmpty=${canKeyBeEmpty} 不是一个布尔值。`);
    }
    if(!isBoolean(canValueBeFunction)){
        throw new ParameterError(`objToMap 函数, 接收的参数异常. canValueBeFunction=${canValueBeFunction} 不是一个布尔值。`);
    }
    // 值提取
    let canEmpty = valueOfBoolean(canKeyBeEmpty);
    let canFunc = valueOfBoolean(canValueBeFunction);
    // 定义返回结果
    let map = new Map();
    // 如果有传入初始属性信息，则遍历赋值。首先要明确，Object.keys 得出的 key 都是字符串形式的
    Object.keys(object).filter(key=>{
        // 如果 key 不能为空字符串，但是 key 是空字符串，则过滤掉
        if(!canEmpty && isEmptyString(key)) return false;
        // 如果 value 不能为 function ，但是 value 是 function，则过滤
        if(!canFunc && isFunction(object[key])) return false;
        // 其它处理
        return true;
    }).forEach(key=>{
        // 遍历，然后写入 这个 Map 当中
        let keyString = valueOfString(key).trim();
        let value = object[key];
        let valueString = `${value}`;
        if(isString(value)){
            valueString = valueOfString(value).replaceAll('"','').trim();
        }
        if(isBoolean(value)){
            valueString = `${valueOfBoolean(value)}`;
        }
        if(isNumber(value)){
            valueString = `${valueOfNumber(value)}`;
        }
        if(isFunction(value)){
            // 假如可以存放 function ，还是保持原值吧。
            valueString = value;
        }
        // 最后处理（把值保存到 map 中）
        map.set(keyString, valueString);
    });
    // 返回结果
    return map;
}

/**
 * 这是一个构建函数，它可以快速构建一个 Map 对象。可以没有参数。当没有参数，它会创建一个空的 Map 对象。
 * @param  {...any} params Map 对象的内部键值对，以 key1, value1, key2, value2, ... 的方式添加，参数保持是 2 的倍数即可。
 * @returns {Map} 一个 Map 对象
 * @throws 如果传入的参数数量 不是 2的倍数（即不是双数），则抛出 ParameterError 异常。
 */
function genMap(...params){
    // 参数校验
    if(params.length % 2 !== 0){
        throw new ParameterError(`genMap 函数, 所接收到的参数 params=${params}, 数量异常，它应该是 2 的倍数, 并且以 key, value 间隔的方式填写。`);
    }
    // 创建 Map
    let map = new Map();
    // 如果有参数，则添加进去
    if(params.length>0){
        for(let i=0;i<=params.length-2;i+=2){
            map.set(params[i], params[i+1]);
        }
    }
    // 返回
    return map;
}

/**
 * 这里导出 这个模块的 所有内容
 */
export {
    objToMap, /* 将对象转 Map */
    genMap    /* 快速生成一个 Map */
}