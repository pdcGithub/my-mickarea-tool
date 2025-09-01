/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffFormTextInput.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-28
 * @version 1.0.0 
 * @description  这是关于 表单文字输入框的一个组件。它由 FormInput 派生出来的表单输入组件。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5EffFormInput } from "./Bs5EffFormInput.js";
import { TEXT_INPUT_TYPE } from "../inputs/Bs5EffTextInput.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { myRandomNumStr } from "../../bootstrap5UI.js";

/**
 * 文字 输入组件，它继承自 FormInput 组件，这个类会限制 Input 的 type 类型。只可以使用 文字类的输入类型。参考常量 TEXT_INPUT_TYPE
 */
class Bs5EffFormTextInput extends Bs5EffFormInput {

    /**
     * 文字 输入组件，它继承自 FormInput 组件，这个类会限制 Input 的 type 类型。只可以使用 文字类的输入类型。参考常量 TEXT_INPUT_TYPE
     * @param {string} id 组件ID
     * @param {object} [formconfig] 关于表单的可选配置参数。
     * @param {string} [formconfig.formCssClass] 表单组件的样式，影响 input-group 整个容器 ；
     * @param {string} [formconfig.labelInfo] 表单项的标题 ；
     * @param {string} [formconfig.helperInfo] 表单项的帮助信息 ；
     * @param {string} [formconfig.invalidInfo] 表单项校验信息 ；
     * @param {object} [comptconfig] 关于输入组的可选配置参数。
     * @param {string} [comptconfig.cssClass] 输入组件的其它 样式；默认是 空字符串
     * @param {string} [comptconfig.type] 输入组件的类型信息；默认是 text 。只可以使用 文字类的输入类型。参考常量 TEXT_INPUT_TYPE
     * @param {string} [comptconfig.defaultValue] 输入组件的默认值；默认是 空字符串
     * @param {string} [comptconfig.placeholder] 输入默认的提示信息；默认是 空字符串
     * @param {RegExp|Function} [comptconfig.validRule] 默认的输入校验处理。可以是正则表达式，也可以是函数。如果是函数，有一个自带参数 html dom 元素
     * @param {Map<string,Function>} [comptconfig.customEvent] 自定义事件处理，key 是 事件名字符串，以逗号分隔，value 是 事件处理函数。函数有一个自带参数 event
     */
    constructor(id='fTxInput'+myRandomNumStr(), 
        { formCssClass='', labelInfo='', helperInfo='', invalidInfo='' }={},
        { cssClass='', type='text', defaultValue='', placeholder='', validRule=undefined, customEvent=undefined }={}
    ){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffFormTextInput', 'constructor', 'formconfig', true);
        vu.autoVnAofObjectLiteral(arguments[2], 'Bs5EffFormTextInput', 'constructor', 'comptconfig', true);
        let idVal = vu.autoVnAofString(id, 'Bs5EffFormTextInput', 'constructor', 'id', false);
        
        // 本质上来说，只是 type 有点限制，先校验 type ，然后 调用父类初始化就行了。
        vu.autoVnAofString(type, 'Bs5EffFormTextInput', 'constructor', 'type');
        if(type.trim().length>0){
            vu.throwParameterValidError(
                !TEXT_INPUT_TYPE.includes(type.toLowerCase()),
                `Bs5EffFormTextInput 构造函数，参数 type=${type} 不合规，它应该是常量 TEXT_INPUT_TYPE=${TEXT_INPUT_TYPE} 中的一个值。`
            );
        };

        // 父类初始化（这里是 动态组件 Bs5Eff 相关类，不是 UI 组件）
        super(idVal, arguments[1], arguments[2]);
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffFormTextInput
}