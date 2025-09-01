/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffFormTextCheckbox.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-28
 * @version 1.0.0 
 * @description  这是关于 表单 复选框 框的一个组件。它由 FormInput 派生出来的表单输入组件。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5EffFormInput, protected_set_MyInputComponent, protected_get_MyInputComponent } from "./Bs5EffFormInput.js";
import { Bs5EffTextCheckbox } from "../inputs/Bs5EffTextCheckbox.js";
import { myRandomNumStr } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 表单 复选框 输入组件，它继承自 FormInput 组件。
 */
class Bs5EffFormTextCheckbox extends Bs5EffFormInput {

    /**
     * 表单 复选框 输入组件，它继承自 FormInput 组件。
     * @param {string} id 组件ID
     * @param {object} [formconfig] 关于表单的可选配置参数。
     * @param {string} [formconfig.formCssClass] 表单组件的样式，影响 input-group 整个容器 ；
     * @param {string} [formconfig.labelInfo] 表单项的标题 ；
     * @param {string} [formconfig.helperInfo] 表单项的帮助信息 ；
     * @param {string} [formconfig.invalidInfo] 表单项校验信息 ；
     * @param {object} [comptconfig] 关于组件的可选配置参数。
     * @param {string} [comptconfig.type] 因为 radio ，和 checkbox 都是一样的，只是 类型不同，所以用这个参数来处理，会简便一些 ；默认 checkbox
     * @param {string} [comptconfig.role] 角色。用于区分 checkbox 和 switch ；默认为 空字符串。
     * @param {boolean} [comptconfig.showInline] 是否显示在一行。默认是 true ，如果 为 false，则一行显示一个 ；
     * @param {Map} [comptconfig.chkOptions] 这是 复选选项 内容，它是一个 Map。key 是 checkbox 的值，value 是 label 的展示内容 ；
     * @param {Array<string>} [comptconfig.checked] 这是 复选选项内容，指定的一个选中项(是一个数组，参数只能为字符串) ；
     * @param {string} [comptconfig.cssClass] 输入组件的其它 样式；默认是 空字符串
     * @param {Function} [comptconfig.validRule] 默认的输入校验处理。函数，有一个自带参数 html dom 元素 数组 ；
     * @param {Map<string,Function>} [comptconfig.customEvent] 自定义事件处理，key 是 事件名字符串，以逗号分隔，value 是 事件处理函数。函数有一个自带参数 event
     */
    constructor(id='fTxCheckbox'+myRandomNumStr(), 
        { formCssClass='', labelInfo='', helperInfo='', invalidInfo='' }={},
        { type='checkbox', role='', showInline=true, chkOptions=undefined, checked=undefined, cssClass='', validRule=undefined, customEvent=undefined }={}
    ){
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffFormTextCheckbox', 'constructor', 'formconfig', true);
        vu.autoVnAofObjectLiteral(arguments[2], 'Bs5EffFormTextCheckbox', 'constructor', 'comptconfig', true);
        let idVal = vu.autoVnAofString(id, 'Bs5EffFormTextCheckbox', 'constructor', 'id', false);
        
        // 父类初始化
        super(idVal, arguments[1], arguments[2]);
        
        // 将内部组件置换 Bs5EffTextCheckbox
        this[protected_set_MyInputComponent](new Bs5EffTextCheckbox(idVal, arguments[2]));
    }

    /**
     * 在写入页面前，给复选框增加选项
     * @param {Map} options Map 这是 复选选项 内容，它是一个 Map。key 是 checkbox 的值，value 是 label 的展示内容 ；
     */
    addOptions(options){
        this[protected_get_MyInputComponent]().addOptions(options);
    }

    // =========== 一些重载的方法

    /**
     * （重载父类方法，因为这里是多个 html 元素）给组件设置一些特定的值。因为是多选框，所以选择的值可以是多个
     * @param {...String} val 一个不定参数，它的值是字符串。
     */
    setValue(...val){
        this[protected_get_MyInputComponent]().setValue(...val);
    }

}

/**
 * 导出公用部分
 */
export {
    Bs5EffFormTextCheckbox
}