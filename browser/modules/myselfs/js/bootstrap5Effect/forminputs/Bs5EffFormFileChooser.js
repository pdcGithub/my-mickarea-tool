/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffFormFileChooser.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-28
 * @version 1.0.0 
 * @description  这是关于 表单 文件选择 输入框的一个组件。它由 FormInput 派生出来的表单输入组件。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5EffFormInput, protected_set_MyInputComponent } from "./Bs5EffFormInput.js";
import { Bs5EffFileChooser } from "../inputs/Bs5EffFileChooser.js";
import { myRandomNumStr } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 表单 文件选取 输入组件，它继承自 Bs5EffFormInput 组件。
 * 它就是一个 Bs5EffFormInput 组件的特例，type 值固定为 file。浏览器安全原因，file 选择器是不能设置值的
 */
class Bs5EffFormFileChooser extends Bs5EffFormInput {

    /**
     * 表单 文件选取 输入组件，它继承自 Bs5EffFormInput 组件。
     * @param {string} id 组件ID
     * @param {object} [formconfig] 关于表单的可选配置参数。
     * @param {string} [formconfig.formCssClass] 表单组件的样式，影响 input-group 整个容器 ；
     * @param {string} [formconfig.labelInfo] 表单项的标题 ；
     * @param {string} [formconfig.helperInfo] 表单项的帮助信息 ；
     * @param {string} [formconfig.invalidInfo] 表单项校验信息 ；
     * @param {object} [comptconfig] 关于输入组的可选配置参数。
     * @param {boolean} [comptconfig.multiple] 是否可以选择多个文件，默认为 false ；
     * @param {string} [comptconfig.cssClass] 输入组件的其它 样式；默认是 空字符串
     * @param {string} [comptconfig.placeholder] 输入默认的提示信息；默认是 空字符串
     * @param {RegExp|Function} [comptconfig.validRule] 默认的输入校验处理。可以是正则表达式，也可以是函数。如果是函数，有一个自带参数 html dom 元素
     * @param {Map<string,Function>} [comptconfig.customEvent] 自定义事件处理，key 是 事件名字符串，以逗号分隔，value 是 事件处理函数。函数有一个自带参数 event 
     */
    constructor(id='fFileChooser'+myRandomNumStr(), 
        { formCssClass='', labelInfo='', helperInfo='', invalidInfo='' }={},
        { multiple=false, cssClass='', placeholder='', validRule=undefined, customEvent=undefined }={}
    ){
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffFormFileChooser', 'constructor', 'formconfig', true);
        vu.autoVnAofObjectLiteral(arguments[2], 'Bs5EffFormFileChooser', 'constructor', 'comptconfig', true);
        let idVal = vu.autoVnAofString(id, 'Bs5EffFormFileChooser', 'constructor', 'id', false);
        
        // 父类初始化
        super(idVal, arguments[1], arguments[2]);
        
        // 将内部组件置换 为 Bs5EffFileChooser
        this[protected_set_MyInputComponent](new Bs5EffFileChooser(idVal, arguments[2]));
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffFormFileChooser
}