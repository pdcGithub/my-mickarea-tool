/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "html.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-06-09
 * @lastEditors  Micheal Pang (Dongcan Pang)
 * @lastEditTime  2025-07-09 16:29:28
 * @filePath  D:\mygit-repo\js-learning\browser\utils\html.js
 * @description  这是一个 html 绘制工具
 * @todo 
 * @version 1.0.0 
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { DataUtil as du } from "./datatype.js";
import { ValidUtil as vu } from "../utils/valid.js";

let tmpParser ;
try{
    tmpParser = new DOMParser();
} catch (error) {
    console.warn(new Date(), '你当前环境没有 DOMParser 类，这里执行一个模拟处理 ...');
    tmpParser = {
        parseFromString : (valueStr, typeStr)=>{
            console.warn('这里是模拟的 domParser 请注意 ...');
        }
    };
}
/**
 * 这是一个将字符串，转换为 DOM Document 对象的一个转换器。但是目前只能在浏览器用。
 */
const domParser = tmpParser;


/**
 * 一些没有结束标签的标签名
 */
const singleTags = ["meta", "link", "br", "hr"];

/**
 * 这是一个静态工具类，用于绘制 html 标签，它不应该被 new 创建
 */
class HtmlUtil {

    /**
     * 这个构造函数，用于避免类被初始化
     * @throws 这是一个不能初始化的类，如果 new 创建实例，则抛异常 ClassCreationError 。
     */
    constructor(){
        vu.throwCannotNewError(new.target === HtmlUtil, HtmlUtil);
    }

    /**
     * 绘制一个简单的标签
     * @param {string} tagName 标签名
     * @param {object|string} tagAttributes 一个装载了属性信息键值对的对象，或者一个属性信息字符串。
     * @param {string} contents 标签内容
     * @returns {string} 返回一段 Html 标签字符串。
     */
    static drawTag(tagName="unknow", tagAttributes={}, contents=''){
        //先做参数检查
        vu.throwParameterError(du.isNullValue(tagName) || du.isEmptyString(tagName), `传入的参数 tagName=${tagName} 异常，它应该是有内容的字符串。`);
        vu.throwParameterError(!du.isObject(tagAttributes) && !du.isString(tagAttributes), `传入的参数 tagAttributes=${tagAttributes} 异常，它应该是一个 object 对象 或者字符串。`);
        vu.throwParameterError(!du.isString(contents), `传入的参数 contents=${contents} 异常，它应该是字符串类型的数据，可以为空。`);
        //开始拼接属性 ==========================
        let attrs = "";
        if(du.isString(tagAttributes)){
            // 如果传入的是字符串，不用拼接了。
            attrs = du.valueOfString(tagAttributes);
        }else{
            Object.keys(tagAttributes).forEach(key=>{
                //对于属性值有双引号的，直接去掉。然后属性内部，首尾不能有空白字符
                attrs += `${key}="${tagAttributes[key].replaceAll("\"", "").replace(/[\s]+/g,' ').trim()}" `;
            });
        }
        //去掉属性字符串的最后一个空格
        attrs = attrs.trim();
        attrs = attrs.length>0?" "+attrs:"";
        //开始处理标签名==========================
        let tag = tagName.toLowerCase();
        //开始拼接     ==========================
        return singleTags.indexOf(tag)>=0 ? `<${tag}${attrs}/>`:`<${tag}${attrs}>${contents}</${tag}>`;
    }

}

// 导出
export { HtmlUtil, domParser }