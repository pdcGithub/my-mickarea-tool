/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffTextInput.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-27
 * @version 1.0.0 
 * @description  这个是 整个动态组件库的 文字输入组件 类。它 继承自 Input 。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5EffInput } from "./Bs5EffInput.js";
import { myRandomNumStr } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 这是输入组件中，关于文字输入组件(TextInput)的 type 的合法值。因为 Input 组件处理上，有些 type 值，不是文字，不能让它们写到 文字输入组件(TextInput) 中
 */
const TEXT_INPUT_TYPE = ['date', 'month', 'week', 'datetime', 'datetime-local', 'time', 'email', 'hidden', 'number', 'password', 'tel', 'text', 'url'];

/**
 * 文字 输入组件，它继承自 Input 组件，这个类会限制 Input 的 type 类型。只可以使用 文字类的输入类型。参考常量 TEXT_INPUT_TYPE
 */
class Bs5EffTextInput extends Bs5EffInput {

    /**
     * 文字 输入组件，它继承自 Input 组件，这个类会限制 Input 的 type 类型。只可以使用 文字类的输入类型。参考常量 TEXT_INPUT_TYPE
     * @param {string} id 组件ID
     * @param {object} [option] 关于组件的可选配置参数。
     * @param {string} [option.cssClass] 输入组件的其它 样式；默认是 空字符串
     * @param {string} [option.type] 输入组件的类型信息 参考常量 TEXT_INPUT_TYPE；默认是 text
     * @param {string} [option.defaultValue] 输入组件的默认值；默认是 空字符串
     * @param {string} [option.placeholder] 输入默认的提示信息；默认是 空字符串
     * @param {RegExp|Function} [option.validRule] 默认的输入校验处理。可以是正则表达式，也可以是函数。如果是函数，有一个自带参数 html dom 元素
     * @param {Map<string,Function>} [option.customEvent] 自定义事件处理，key 是 事件名字符串，以逗号分隔，value 是 事件处理函数。函数有一个自带参数 event 
     */
    constructor(id=('txtInput'+myRandomNumStr()), { cssClass='', type='text', defaultValue='', placeholder='', validRule=undefined, customEvent=undefined }={}){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffTextInput', 'constructor', 'option', true);

        // 本质上来说，只是 type 有点限制，先校验 type ，然后 调用父类初始化就行了。
        vu.autoVnAofString(type, 'Bs5EffTextInput', 'constructor', 'type');
        if(type.trim().length>0){
            vu.throwParameterValidError(
                !TEXT_INPUT_TYPE.includes(type.toLowerCase()),
                `Bs5EffTextInput 构造函数，参数 type=${type} 不合规，它应该是常量 TEXT_INPUT_TYPE=${TEXT_INPUT_TYPE} 中的一个值。`
            );
        }
        
        // 父类初始化
        super(id, arguments[1]);
    }

}

/**
 * 导出公用部分
 */
export {
    Bs5EffTextInput, TEXT_INPUT_TYPE
}