/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffFormTextRadio.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-28
 * @version 1.0.0 
 * @description  这是关于 表单 单选框 的一个组件。它由 FormTextCheckbox 派生出来的表单输入组件。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { protected_set_MyInputComponent, protected_get_MyInputComponent } from "./Bs5EffFormInput.js";
import { Bs5EffFormTextCheckbox } from "./Bs5EffFormTextCheckbox.js";
import { Bs5EffTextRadio } from "../inputs/Bs5EffTextRadio.js";
import { myRandomNumStr } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 一个 表单 单选框组件，它继承自 Bs5EffFormTextCheckbox 组件。本质上来说，他就是一个 type = 'radio' 的 复选框
 */
class Bs5EffFormTextRadio extends Bs5EffFormTextCheckbox {

    /**
     * 一个 表单 单选框组件，它继承自 Bs5EffFormTextCheckbox 组件。本质上来说，他就是一个 type = 'radio' 的 复选框
     * @param {string} id 组件ID
     * @param {object} [formconfig] 关于表单的可选配置参数。
     * @param {string} [formconfig.formCssClass] 表单组件的样式，影响 input-group 整个容器 ；
     * @param {string} [formconfig.labelInfo] 表单项的标题 ；
     * @param {string} [formconfig.helperInfo] 表单项的帮助信息 ；
     * @param {string} [formconfig.invalidInfo] 表单项校验信息 ；
     * @param {object} [comptconfig] 关于组件的可选配置参数。
     * @param {boolean} [comptconfig.showInline] 是否显示在一行。默认是 true ，如果 为 false，则一行显示一个 ；
     * @param {Map} [comptconfig.chkOptions] 这是 复选选项 内容，它是一个 Map。key 是 checkbox 的值，value 是 label 的展示内容 ；
     * @param {string} [comptconfig.checked] 这是 复选选项内容，指定的一个选中项 只能为字符串
     * @param {string} [comptconfig.cssClass] 输入组件的其它 样式；默认是 空字符串
     * @param {Function} [comptconfig.validRule] 默认的输入校验处理。函数，有一个自带参数 html dom 元素 数组 ；
     * @param {Map<string,Function>} [comptconfig.customEvent] 自定义事件处理，key 是 事件名字符串，以逗号分隔，value 是 事件处理函数。函数有一个自带参数 event
     */
    constructor(id='fTxRadio'+myRandomNumStr(), 
        { formCssClass='', labelInfo='', helperInfo='', invalidInfo='' }={},
        { showInline=true, chkOptions=undefined, checked='', cssClass='', validRule=undefined, customEvent=undefined }={}
    ){
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffFormTextRadio', 'constructor', 'formconfig', true);
        vu.autoVnAofObjectLiteral(arguments[2], 'Bs5EffFormTextRadio', 'constructor', 'comptconfig', true);
        let idVal = vu.autoVnAofString(id, 'Bs5EffFormTextRadio', 'constructor', 'id', false);
        
        // 这里有个参数 checked 要处理。因为 radio 的是 字符串，而 checkbox 是 字符串 数组。所以要处理下
        let tmpObject2 = {
            type:'radio', role:'', 
            showInline:showInline, chkOptions:chkOptions, checked:[checked], cssClass:cssClass, 
            validRule:validRule, customEvent:customEvent
        }
        
        // 父类初始化 (这里初始化的是 Bs5EffFormTextCheckbox )
        super(idVal, arguments[1], tmpObject2);
        
        // 将内部组件置换 （这里可以保证，调用的是 Bs5EffTextRadio ）
        this[protected_set_MyInputComponent](new Bs5EffTextRadio(idVal, arguments[2]));
    }

    // =========== 一些重载的方法

    /**
     * （这里重载父类方法）因为父类 Bs5EffFormTextCheckbox 是需要传入不定参数。这里只需要传入一个字符串值。
     * @param {string} val 要选中的选项值
     */
    setValue(val){
        this[protected_get_MyInputComponent]().setValue(val);
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffFormTextRadio
}