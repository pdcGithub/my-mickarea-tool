/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffTextArea.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-27
 * @version 1.0.0 
 * @description 这个是 整个动态组件库的 多行文字输入组件 类。它 继承自 Input 。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { protected_set_bootstrapobject, protected_get_bootstrapobject } from "../base/Bs5EffBaseComponent.js";
import { Bs5EffInput } from "./Bs5EffInput.js";
import { Bs5SingleTextArea, myRandomNumStr } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 多行文字 输入组件，它继承自 Input 组件
 */
class Bs5EffTextArea extends Bs5EffInput {

    /**
     * 多行文字 输入组件，它继承自 Input 组件
     * @param {string} id 组件ID
     * @param {object} [option] 关于组件的可选配置参数。
     * @param {number} [option.rows] 多行文本的行数，一般用于显示的高度处理。默认是 3 。
     * @param {string} [option.cssClass] 输入组件的其它 样式；默认是 空字符串
     * @param {string} [option.defaultValue] 输入组件的默认值；默认是 空字符串
     * @param {string} [option.placeholder] 输入默认的提示信息；默认是 空字符串
     * @param {RegExp|Function} [option.validRule] 默认的输入校验处理。可以是正则表达式，也可以是函数。如果是函数，有一个自带参数 html dom 元素
     * @param {Map<string,Function>} [option.customEvent] 自定义事件处理，key 是 事件名字符串，以逗号分隔，value 是 事件处理函数。函数有一个自带参数 event 
     */
    constructor(id=('textarea'+myRandomNumStr()), { rows=3, cssClass='', defaultValue='', placeholder='', validRule=undefined, customEvent=undefined }={}){

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffTextArea', 'constructor', 'option', true);

        // 参数校验 （只是比 Input 多了个 rows 属性，这里只写它就行了）
        let rowsVal = vu.autoVnAofNumber(rows, 'Bs5EffTextArea', 'constructor', 'rows');

        // 父类初始化(已经有 valueof 处理，所以不同额外处理)
        super(id, arguments[1]);

        // 将内置 UI 对象改为 bootstrap5UI 中的 Bs5SingleTextArea (已经有 valueof 处理，所以不同额外处理)
        let tmp = new Bs5SingleTextArea(id, {rows:rowsVal, placeholder:placeholder});
        this[protected_set_bootstrapobject](tmp);

        // 设置额外的样式
        if(cssClass.trim().length>0) this[protected_get_bootstrapobject]().addCssClass(cssClass);

        // 默认值的设置(textarea 的默认值应该是在里面的, 而不是 value 属性)
        if(defaultValue.trim().length>0){
            this[protected_get_bootstrapobject]().removeAttribute('value');
            this[protected_get_bootstrapobject]().clearContents();
            this[protected_get_bootstrapobject]().addContentElements(defaultValue);
        }
        // 如果有 rows 参数，则设置
        if(rowsVal>0){
            this[protected_get_bootstrapobject]().addAttribute('rows', rowsVal);
        }
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffTextArea
}