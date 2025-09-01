/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bootstrap5Object.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-13
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的基础类
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { DataUtil as du } from "../../../../../utils/datatype.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { domParser, HtmlUtil } from "../../../../../utils/html.js";

/**
 * 这个是 Bootstrap5Object 上 一个私有的方法名，用于获取 私有属性 #content 数组。内部元素可能是字符串，也可能是 Bootstrap5Object 对象
 */
const protected_getContent = Symbol.for('mybs5_get_bootstrap_object_content');

/**
 * 一个 适配 Bootstrap 5 UI 工具包的 页面元素对象类（这个类是基础类，一般不会直接用，都是基于它进行扩展）
 */
class Bootstrap5Object {

    #tagName ; // 定义一个私有属性 Html标签名
    #cssClassSet ; // 定义一个私有属性 Html标签的 css 样式类名 集合
    #attributesMap ; // 定义一个私有属性 Html 标签的 属性信息 map
    #content; //定义一个私有属性 html 标签的 innerHtml 信息。它以数组为载体，内部元素可能是字符串，也可能是 Bootstrap5Object 对象。

    /**
     * 创建一个 页面元素对象类 的实例
     * @param {string} tagName 页面元素对应的标签名
     * @param {object} initAttributes 标签的 属性信息。它是一个对象字面量，默认为 {} 空对象
     * @param {Array<string|Bootstrap5Object>} initContent 标签的 innerHtml 信息。它可能是字符串，也可能是 Bootstrap5Object 对象。默认为 [] 空数组
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(tagName='unknow', initAttributes={}, initContent=[]) {
        // 参数校验（优化后）
        this.#tagName = vu.autoVnAofString(tagName, 'Bootstrap5Object', 'constructor', 'tagName', false);
        vu.autoVnAofObjectLiteral(initAttributes, 'Bootstrap5Object', 'constructor', 'initAttributes');
        vu.autoVnAofTargetObjectArray(initContent, 'Bootstrap5Object', 'constructor', 'initContent', String, Bootstrap5Object);
        // 开始赋值
        this.#cssClassSet = new Set();
        this.#attributesMap = new Map();
        this.#content = [];
        // 如果有传入初始属性信息，则遍历赋值
        this.addAttributeByObject(initAttributes);
        // 因为属性对象里面，可能有 class 所以，要赋值一次（这里是构造函数，初始化处理）
        if(this.hasAttribute('class')){
            // 先将样式信息添加到 cssClass 集合
            this.addCssClass(this.#attributesMap.get('class'));
            // 再从属性里面，删除 class 信息
            this.removeAttribute('class');
        }
        // 使用统一的api 初始化 innerHtml 内容
        this.addContentElements(...initContent);
    }

    /**
     * 获取 私有属性 #content 数组。内部元素可能是字符串，也可能是 Bootstrap5Object 对象
     * @returns 私有属性 #content 数组
     */
    [protected_getContent]() {
        return this.#content;
    }

    /**
     * 启用
     */
    enable(){
        this.removeAttribute('disabled');
    }

    /**
     * 禁用
     */
    disable(){
        this.addAttribute('disabled', true);
    }

    // =============================  get 处理，为了获取私有属性的内容，但是不能直接返回私有属性  ===========================

    /**
     * 提取 标签名 字符串
     * @returns 签名字符串
     */
    getTagNameString() {
        return du.valueOfString(this.#tagName);
    }

    /**
     * 获取 标签 class 属性字符串。这里的属性用 Set 对象存储，调用时合并为一个字符串。
     * @returns class 属性字符串
     */
    getCssClassString() {
        // 这里需要过滤掉 非字符串 的内容，然后取值，再合并
        return [...this.#cssClassSet].filter(value=>du.isString(value) && !du.isEmptyString(value)).map(value=>du.valueOfString(value)).join(' ');
    }

    /**
     * 获取 标签 属性字符串。将属性信息，拼接为一个 带等号的 字符串
     * @returns 属性字符串
     */
    getAttributeString() {
        let buffer = '';
        // 插入 css 的 class 样式属性（对于同名的key，会覆盖原有的值）
        let cssString = this.getCssClassString();
        if(this.#attributesMap.has('class') && cssString.length<=0){
            this.#attributesMap.delete('class');
        } else if(cssString.length>0){
            this.#attributesMap.set('class', cssString);
        }
        // 遍历 拼接 value 和 key
        this.#attributesMap.forEach((value, key)=>{
            // 
            let attrStr = `${key}="${du.isString(value)?du.valueOfString(value).replaceAll("\"", "").replace(/[\s]+/g,' ').trim():value}"`;
            buffer = buffer + attrStr + ' ';
        });
        // 去掉最后的空格
        buffer = buffer.trim();
        // 返回
        return buffer;
    }

    /**
     * 获取 标签 内嵌元素的字符串。比如标签 <div>aaa</div> 中，内嵌的就是 'aaa' 这个字符串。内嵌元素，一般是 Bootstrap5Object 或者 字符串
     * @returns 内嵌元素的字符串
     */
    getContentString() {
        // 循环
        return this.#content.map(value=>{
            return du.isTargetObject(value, Bootstrap5Object) ? value.toHtmlString() : du.valueOfString(value).trim();
        }).join('\n');
    }

    // ========================  add 处理，为了设置私有属性的内容。比如 标签的属性，或者 css 样式 或者 innerHtml 内容 ==========================

    /**
     * 给页面元素对象 添加一个 css 样式 类信息。处理时 以空白字符为标准 分割。请注意 css 样式类，区分大小写的。
     * @param {string} className 一个 css 样式 类信息。应该为字符串。可以为单个 'btn' ，也可以为 多个 'btn btn-primary mb-2'。 
     * @throws 如果参数异常会抛出 ParameterError 
     */
    addCssClass(className) {
        // 参数校验
        let clsNameString = vu.autoVnAofString(className, 'Bootstrap5Object', 'addCssClass', 'className');
        // 拆解样式字符串为数组（以空白字符为分界线，然后排除掉空的字符串）
        let classNameArr = clsNameString.split(/[\s]+/).filter(value=>value.length>0);
        // 遍历添加到样式集合
        classNameArr.forEach(value=>{
            this.#cssClassSet.add(value);
        });
    }

    /**
     * 给页面元素对象 添加一个 属性键值对信息。
     * @param {string} key 属性名
     * @param {string|boolean|number} value 属性值
     * @throws 如果参数异常会抛出 ParameterError 
     */
    addAttribute(key, value) {
        // 参数校验（优化）
        let tmpKey = vu.autoVnAofString(key, 'Bootstrap5Object', 'addAttribute', 'key', false);
        let tmpValue = vu.autoVnAofTargetObject(value, 'Bootstrap5Object', 'addAttribute', 'value', String, Boolean, Number);
        // 插入值（首先要保证，key值没有空字符，然后转小写；value 只能为简单值，字符串、数字、布尔型）
        let keyString = tmpKey.replace(/[\s]+/g, '').toLowerCase();
        let valueString = `${tmpValue}`;
        if(du.isString(value)){
            valueString = du.valueOfString(value).replaceAll('"','').trim();
        }
        if(du.isBoolean(value)){
            valueString = `${du.valueOfBoolean(value)}`;
        }
        if(du.isNumber(value)){
            valueString = `${du.valueOfNumber(value)}`;
        }
        // 最后处理
        this.#attributesMap.set(keyString, valueString);
    }

    /**
     * 给页面元素对象 添加 属性。这个函数与 addAttribute 不同。 这里是传入一个对象字面量，比如：{id:1, name:'jack'} 这样的一个入参
     * @param {object} attrObject 标签的 属性信息。它是一个对象字面量
     * @throws 如果参数异常会抛出 ParameterError 
     */
    addAttributeByObject(attrObject) {
        // 参数校验（优化）
        vu.autoVnAofObjectLiteral(attrObject, 'Bootstrap5Object', 'addAttributeByObject', 'attrObject');
        // 如果有传入初始属性信息，则遍历赋值
        Object.keys(attrObject).filter(key=>{
            // keys 函数不包含 Symbol 属性，排除 function ；还要排除 key 为空字符串的情况，如果 key 为空字符串 addAttribute 会报错
            // key 为空字符串 ，需要跳过
            return (du.isString(key) && !du.isEmptyString(key) && !du.isFunction(attrObject[key]));
        }).forEach(key=>{
            // 在赋值时，将处理交给 addAttribute ，特殊处理都放里面，不要额外再写。
            this.addAttribute(du.valueOfString(key), attrObject[key]);
        });
    }

    /**
     * 给页面元素对象 添加一个 或者 多个 innerHtml 信息。它将放在一个内置数组中，等待输出时转换。
     * @param {...string|Bootstrap5Object} contentElems innerHtml 信息 (它是一个不定参数, 可以写多个) 举例: addContentElements('a', 'b', 'c');
     * @throws 如果参数异常会抛出 ParameterError 
     */
    addContentElements(...contentElems) {
        // 参数校验（优化）
        vu.autoVnAofTargetObjectArray(contentElems, 'Bootstrap5Object', 'addContentElements', 'contentElems', String, Bootstrap5Object);
        //循环赋值
        contentElems.forEach(value=>{
            this.#content.push(value);
        });
    }

    // =====================  remove 处理，为了设置私有属性的内容。比如 标签的属性，或者 css 样式 =============================

    /**
     * 给页面元素对象 删除一个 css 样式 类信息。
     * @param {string} className css 样式 类信息
     * @throws 如果参数异常会抛出 ParameterError 
     */
    removeCssClass(className) {
        // 参数校验（优化）
        let tmpStr = vu.autoVnAofString(className, 'Bootstrap5Object', 'removeCssClass', 'className');
        // 删除样式
        this.#cssClassSet.delete(tmpStr);
    }

    /**
     * 给页面元素对象 删除一个 属性信息。
     * @param {string} key 属性信息的属性名
     * @throws 如果参数异常会抛出 ParameterError 
     */
    removeAttribute(key) {
        // 参数校验（优化）
        let tmpKey = vu.autoVnAofString(key, 'Bootstrap5Object', 'removeAttribute', 'key', false);
        // 删除属性
        this.#attributesMap.delete(tmpKey);
    }

    // =====================  has 处理，用于判断是否有一些内容，比如 属性 或者 css 样式类  =============================

    /**
     * 判断对象中是否有一个 名为 入参字符串 的属性
     * @param {string} key 要查找的属性名称，不区分大小写，因为统一转小写再判断
     * @returns {boolean} 如果有则 true，否则为 false 。
     * @throws 如果参数异常会抛出 ParameterError 
     */
    hasAttribute(key) {
        // 参数校验（优化）
        let tmpKey = vu.autoVnAofString(key, 'Bootstrap5Object', 'hasAttribute', 'key', false);
        // 检验
        return this.#attributesMap.has(tmpKey.trim().toLowerCase());
    }

    /**
     * 判断对象中是否有一个 名为 入参字符串 的 css 样式类
     * @param {string} cssClassName 要查找的css样式类名称，区分大小写。
     * @returns {boolean} 如果有则 true，否则为 false 。
     * @throws 如果参数异常会抛出 ParameterError 
     */
    hasCssClass(cssClassName) {
        // 参数校验（优化）
        let tmpCss = vu.autoVnAofString(cssClassName, 'Bootstrap5Object', 'hasCssClass', 'cssClassName', false);
        // 检验
        return this.#cssClassSet.has(tmpCss.trim());
    }

    // =====================  clear 处理，清空属性 或者 清空 css 样式类 =============================

    /**
     * 清空所有的属性内容，包括 css 样式类的信息。虽然它单独存储，但是清空所有属性时，一同清空css样式类的信息。
     */
    clearAttributes() {
        this.clearCssClasses();
        this.#attributesMap.clear();
    }

    /**
     * 清空所有的 css 样式类 信息。
     */
    clearCssClasses() {
        this.#cssClassSet.clear();
    }

    /**
     * 清空所有的 innerHtml 内容。
     */
    clearContents() {
        // 循环遍历，都 pop 掉 （这种做法可能比较慢，但是比直接 赋值 [] ，在内存处理上要好一点）
        while(this.#content.length>0){
            this.#content.pop();
        }
    }

    // ================================  输出处理，以字符串的形式 输出构造的内容 ================================

    /**
     * 输出一个带有 Html 标签信息的字符串
     * @returns {string} Html 标签信息的字符串
     */
    toHtmlString() {
        return HtmlUtil.drawTag(this.getTagNameString(), this.getAttributeString(), this.getContentString());
    }
    
    /**
     * 将这个 Bootstrap5Object 转换为 html dom 中的 标签对象
     * @returns {Array<object>} html 的 标签对象数组
     */
    toHtmlDomObject(){
        // 先通过 domParser 转为 dom 对象
        let tempDom = domParser.parseFromString(this.toHtmlString(), 'text/html');
        // 将临时 dom 对象的 body 中的内容（NodeList 或者 HtmlCollection）取出，并转换为有效的数组
        let tmpArr = Array.from(tempDom.body.childNodes).map(value=>{
            if(value instanceof Text){
                return new Text(value.wholeText.replaceAll('\n', ''));
            }else{
                return value;
            }
        });
        // 返回处理好的数组
        return tmpArr;
    }
}

/**
 * 导出公用内容
 */
export {
    Bootstrap5Object, protected_getContent
}