/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffTextSwitch.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-27
 * @version 1.0.0 
 * @description  这个是 整个动态组件库的 开关组件 类。它 继承自 复选框组件 Checkbox 。它是复选框的一个特殊情况。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5EffTextCheckbox } from "./Bs5EffTextCheckbox.js";
import { myRandomNumStr } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 一个变种的复选框 输入组件，它继承自 TextCheckbox 组件。本质上来说，他就是一个 checkbox ，但是它显示为一个开关。
 */
class Bs5EffTextSwitch extends Bs5EffTextCheckbox {

    /**
     * 一个变种的复选框 输入组件，它继承自 TextCheckbox 组件。本质上来说，他就是一个 checkbox ，但是它显示为一个开关。
     * @param {string} id 组件ID
     * @param {object} [option] 关于组件的可选配置参数。
     * @param {boolean} [option.showInline] 是否显示在一行。默认是 true ，如果 为 false，则一行显示一个 ；
     * @param {Map} [option.chkOptions] 这是 复选选项 内容，它是一个 Map。key 是 checkbox 的值，value 是 label 的展示内容 ；
     * @param {Array<string>} [option.checked] 这是 复选选项内容，指定的一个选中项(是一个数组，参数只能为字符串) ；
     * @param {string} [option.cssClass] 输入组件的其它 样式；默认是 空字符串
     * @param {Function} [option.validRule] 默认的输入校验处理。函数，有一个自带参数 html dom 元素 数组 ；
     * @param {Map<string,Function>} [option.customEvent] 自定义事件处理，key 是 事件名字符串，以逗号分隔，value 是 事件处理函数。函数有一个自带参数 event
     */
    constructor(id='txSwitch'+myRandomNumStr(), 
        { showInline=true, chkOptions=undefined, checked=undefined, cssClass='', validRule=undefined, customEvent=undefined }={}){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffTextSwitch', 'constructor', 'option', true);
        
        // 父类初始化 （因为type 和 switch 为指定的值，外部没有收集， 所以这里参数要自己写）
        super(id, {type:'checkbox', role:'switch', 
            showInline:showInline, chkOptions:chkOptions, checked:checked, cssClass:cssClass, validRule:validRule, customEvent:customEvent});
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffTextSwitch
}