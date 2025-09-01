/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffFormTextSelect.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-28
 * @version 1.0.0 
 * @description 这是关于 表单 下拉选择 输入框的一个组件。它由 FormInput 派生出来的表单输入组件。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5EffFormInput, protected_set_MyInputComponent, protected_get_MyInputComponent } from "./Bs5EffFormInput.js";
import { Bs5EffTextSelect } from "../inputs/Bs5EffTextSelect.js";
import { myRandomNumStr } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 表单 下拉选择 输入框的一个组件，它继承自 FormInput 组件。
 */
class Bs5EffFormTextSelect extends Bs5EffFormInput {

    /**
     * 表单 下拉选择 输入框的一个组件，它继承自 FormInput 组件。
     * @param {string} id 组件ID
     * @param {object} [formconfig] 关于表单的可选配置参数。
     * @param {string} [formconfig.formCssClass] 表单组件的样式，影响 input-group 整个容器 ；
     * @param {string} [formconfig.labelInfo] 表单项的标题 ；
     * @param {string} [formconfig.helperInfo] 表单项的帮助信息 ；
     * @param {string} [formconfig.invalidInfo] 表单项校验信息 ；
     * @param {object} [comptconfig] 关于组件的可选配置参数。
     * @param {Map} [comptconfig.downOptions] 这是 下拉选项 内容，它是一个 Map。key是option 的值，value 是option 的展示内容 ；
     * @param {string} [comptconfig.selected] 这是 下拉选项内容，指定的一个选中项。
     * @param {string} [comptconfig.cssClass] 输入组件的其它 样式；默认是 空字符串
     * @param {string} [comptconfig.placeholder] 输入默认的提示信息；默认是 空字符串
     * @param {RegExp|Function} [comptconfig.validRule] 默认的输入校验处理。可以是正则表达式，也可以是函数。如果是函数，有一个自带参数 html dom 元素
     * @param {Map<string,Function>} [comptconfig.customEvent] 自定义事件处理，key 是 事件名字符串，以逗号分隔，value 是 事件处理函数。函数有一个自带参数 event
     */
    constructor(id='fTxSelect'+myRandomNumStr(), 
        { formCssClass='', labelInfo='', helperInfo='', invalidInfo='' }={},
        { downOptions=undefined, selected='', cssClass='', placeholder='', validRule=undefined, customEvent=undefined}={}
    ){
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffFormTextSelect', 'constructor', 'formconfig', true);
        vu.autoVnAofObjectLiteral(arguments[2], 'Bs5EffFormTextSelect', 'constructor', 'comptconfig', true);
        let idVal = vu.autoVnAofString(id, 'Bs5EffFormTextSelect', 'constructor', 'id', false);

        // 父类初始化
        super(idVal, arguments[1], arguments[2]);

        // 将内部组件置换 为 Bs5EffTextSelect
        this[protected_set_MyInputComponent](new Bs5EffTextSelect(idVal, arguments[2]));
    }

    /**
     * 这是在写入页面之前，增加下拉选项
     * @param {Map} options 这是 下拉选项 内容，它是一个 Map。key是option 的值，value 是option 的展示内容 ；
     * @param {string} selectedValue 这是 下拉选项内容，指定的一个选中项。
     */
    addOptions(options=new Map(), selectedValue=''){
        this[protected_get_MyInputComponent]().addOptions(options, selectedValue);
    }

    /**
     * 这是在组件写入页面后，在页面 刷新下拉选项。方式有2种（清空再添加 和 直接追加）。
     * @param {Map} options 这是 下拉选项 内容，它是一个 Map。key是option 的值，value 是option 的展示内容 ；
     * @param {string} selectedValue 这是 下拉选项内容，指定的一个选中项。
     * @param {boolean} clearAndUpd 默认为 true ，即刷新时清空旧的内容再添加 ；如果为 false 则直接追加
     */
    refresh(options= new Map(), selectedValue='', clearAndUpd=true){
        this[protected_get_MyInputComponent]().refresh(options, selectedValue, clearAndUpd);
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffFormTextSelect
}