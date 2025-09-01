/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "init.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-06-04
 * @lastEditors  Micheal Pang (Dongcan Pang)
 * @lastEditTime  2025-08-04 16:23:33
 * @filePath  D:\mygit-repo\js-learning\browser\modules\myselfs\init.js
 * @description  这是一个初始化调用的模块，它用于存放一些通用的 js 处理
 * @todo 
 * @version 1.0.0 
 */
"use strict"; // 这是严格模式下的 Javascript 代码

/**
 * 这里导入一些模块的内容，比如一些自定义异常
 */
import { ValidUtil as vu } from "../../../../utils/valid.js";
import { DataUtil as du } from "../../../../utils/datatype.js";

/**
 * 模仿 JQuery 的 ready 方法的处理
 * @param {function} callback 回调方法的名字
 */
function documentReady(callback) {
    // 判断传入的是否是一个函数，不是则抛出异常
    vu.throwParameterError(!du.isFunction(callback), `函数 documentReady 回调函数校验错误，接收到的不是一个有效函数`);
    // IE9+
    // 注册监听事件(但是，请注意，如果事件已经发射，回调将不会被执行。为了确保回调总是运行，jQuery检查文档(reference) 的“readyState”属性，如果属性值变为 complete，则立即执行回调函数)
    if(document.readyState==="complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)){
        //console.log("这里是立即执行");
        callback();
    }else{
        //console.log("这里是回调执行");
        document.addEventListener('DOMContentLoaded', callback);
    }
}

/**
 * 将 html 元素 集合对象 ( HTMLCollection 或者 NodeList ) 转换为 数组对象
 * @param {HTMLCollection | NodeList} elementList html 元素 集合对象
 * @returns {Array<object>} 数组对象
 */
function htmlElementListToArray(elementList){
    // 参数校验
    vu.throwParameterError(
        !du.isHtmlElementList(elementList),
        `函数 htmlElementListToArray 接受的参数异常 elementList=${elementList} html 元素 集合对象 ( HTMLCollection 或者 NodeList )`
    )
    // 返回结果
    return Array.from(elementList);
}

/**
 * 这是一个事件绑定的方法，可以对 html 的元素进行事件响应绑定。（对于 document 对象 和 document 的 body 对象，也是可以的）
 * @param {NodeList | HTMLCollection | Array<htmlElement>} elements html 的元素对象。可以为单个 htmlElement，也可以为 NodeList 或者 HTMLCollection 或者 Array<htmlElement>
 * @param {string} eventTypeString 事件类型字符串。如果有多个事件需要绑定，以逗号分隔。比如：'click, focus, keyup' 
 * @param {function} actionFunction 事件响应的回调函数，函数有一个 event 事件对象作为入参
 */
function actionBinding(elements, eventTypeString, actionFunction) {
    
    // 先定义一个用于最后执行的 数组
    let elementArray = [];

    // 参数校验

    // 开始判断 elements 是否符合要求
    if(elements === document || elements === document.body){
        // 对于 document 对象，也是可以的
        elementArray.push(elements);
    }else if(Array.isArray(elements)){
        // 如果传入的是数组，则一个个校验
        elementArray = elements.filter(du.isHtmlElement);
    }else if(du.isHtmlElement(elements)){
        // 如果传入的是单个 htmlElement
        elementArray.push(elements);
    }else if(du.isHtmlElementList(elements)){
        // 如果传入的是一个 NodeList 或者 HTMLCollection
        elementArray = htmlElementListToArray(elements);
    }else{
        vu.throwParameterError(
            true,
            `函数 actionBinding 接收到的参数 elements=${elements} 不符合要求。它只能为单个 htmlElement, 或者 ( NodeList, HTMLCollection, Array<htmlElement> ) 中的一个。`
        );
    }

    // 开始校验 eventTypeString 事件类型
    vu.throwParameterError(!du.isString(eventTypeString), `函数 actionBinding 接收到的参数 eventTypeString=${eventTypeString} 异常。它需要是一个字符串`);
    // 开始校验 actionFunction 事件的回调函数
    vu.throwParameterError(!du.isFunction(actionFunction), `函数 actionBinding 接收到的参数 actionFunction=${actionFunction} 异常。它需要是一个函数`);

    // 如果没有可绑定的对象
    if(elementArray.length<=0){
        console.warn(
            `函数 actionBinding 没有可用于事件绑定的目标html元素对象。`, 
            'eventTypeString', eventTypeString, 'elements', elements, 'actionFunction', actionFunction);
    }
    
    // 先获取 事件类型 数组 （如果没有内容，返回一个空数组。如果有内容就是 小写的事件名）
    let eventArray = du.valueOfString(eventTypeString).split(/[,，]/).map(value=>value.replace(/\s+/g,'').toLowerCase()).filter(value=>/[a-zA-Z]/.test(value));
    vu.throwParameterError(eventArray.length<=0, `函数 actionBinding 接收到的参数 eventTypeString=${eventTypeString} 异常。没有可用事件类型。`);

    // 开始处理
    elementArray.forEach(element=>{
        eventArray.forEach(eventType=>{
            element.addEventListener(eventType, actionFunction);
        });
    });

}

/**
 * 这是一个事件绑定的方法，可以对 html 的元素进行事件响应绑定。这个方法有别于 actionBinding 。它直接提供 css 选择器的字符串就行了。不用传递 htmlElement 对象
 * @param {string} selector css 选择器的字符串
 * @param {string} eventTypeString 事件类型字符串。如果有多个事件需要绑定，以逗号分隔。比如：'click, focus, keyup' 
 * @param {function} actionFunction 事件响应的回调函数，函数有一个 event 事件对象作为入参
 */
function actionBindingBySelector(selector, eventTypeString, actionFunction) {
    // 参数验证
    vu.throwParameterError(
        !(du.isString(selector) && du.valueOfString(selector).replace(/\s+/g,'').length>=0),
        `函数 actionBingingBySelector 参数中 selector 参数异常, 值为: ${selector}`
    );
    // 如果是有效的选择器字符串，则直接调用 actionBinding 来处理(选择器字符串，中间可能有空格，不能把空格全部删掉)
    let mySelector = du.valueOfString(selector).replace(/\s+/g,' ').trim();
    actionBinding(document.querySelectorAll(mySelector), eventTypeString, actionFunction);
}

// 导出可以公用的部分
export { documentReady }
export { htmlElementListToArray }
export { actionBinding, actionBindingBySelector }