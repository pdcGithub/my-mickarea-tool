/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffFileChooser.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-27
 * @version 1.0.0 
 * @description  这个是 整个动态组件库的 文件选择组件 类。它 继承自 Input 。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { protected_get_bootstrapobject, protected_get_myId } from "../base/Bs5EffBaseComponent.js";
import { Bs5EffInput } from "./Bs5EffInput.js";
import { myRandomNumStr } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 文件选取 输入组件，它继承自 Input 组件。它就是一个 Input 组件的特例，type 值固定为 file。浏览器安全原因，file 选择器是不能设置值的
 */
class Bs5EffFileChooser extends Bs5EffInput {

    /**
     * 文件选取 输入组件，它继承自 Input 组件。它就是一个 Input 组件的特例，type 值固定为 file。浏览器安全原因，file 选择器是不能设置值的
     * @param {string} id 组件ID
     * @param {object} [option] 关于组件的可选配置参数。
     * @param {boolean} [option.multiple] 是否可以选择多个文件，默认为 false ；
     * @param {string} [option.cssClass] 输入组件的其它 样式；默认是 空字符串
     * @param {string} [option.placeholder] 输入默认的提示信息；默认是 空字符串
     * @param {RegExp|Function} [option.validRule] 默认的输入校验处理。可以是正则表达式，也可以是函数。如果是函数，有一个自带参数 html dom 元素
     * @param {Map<string,Function>} [option.customEvent] 自定义事件处理，key 是 事件名字符串，以逗号分隔，value 是 事件处理函数。函数有一个自带参数 event 
     */
    constructor(id=('fChooser'+myRandomNumStr()), { multiple=false, cssClass='', placeholder='', validRule=undefined, customEvent=undefined }={}) {
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffFileChooser', 'constructor', 'option', true);
        
        // 参数校验 （只是比 Input 多了个 multiple 属性，这里只写它就行了）
        let mulitVal = vu.autoVnAofBoolean(multiple, 'Bs5EffFileChooser', 'constructor', 'multiple');

        // 父类初始化(已经有 valueof 处理，所以不同额外处理)
        super(id, arguments[1]);

        // 将 input 的 type 由 text 改为 file
        this[protected_get_bootstrapobject]().addAttribute('type', 'file');

        // 如果是多选，可以设置一下
        if(mulitVal) this[protected_get_bootstrapobject]().addAttribute('multiple', 'true');
    }

    /**
     * (重载父类方法) 获取组建的值。因为，file 文件选择 可以单选，也可以多选，但 value 值只会返回第一个文件，所以要重写。
     * @returns 一般是字符串，如果有特殊情况，会重载，并说明。
     */
    getValue(){
        let elem = document.getElementById(this[protected_get_myId]());
        return Array.from(elem.files).map(file=>file.name);
    }

    /**
     * (重载父类方法) 给组件设置一个特定的值。因为 file 文件选择 不能设置值，只能置空，所以要重写。
     * @param {*} val 可以是任意类型，但是赋值时，都会转换成 字符串 ，再设置
     */
    setValue(val){
        // 获取当前 html dom 元素
        let thisElem = document.getElementById(this[protected_get_myId]());
        // 赋值内容
        thisElem.value = '';
        // 传递一个 change 事件 （因为很多时候，setValue 方法处理完毕，这个 change 事件不起效，所以决定手动传递一个）
        thisElem.dispatchEvent(new Event('change', {bubbles: true, cancelable: true}));
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffFileChooser
}