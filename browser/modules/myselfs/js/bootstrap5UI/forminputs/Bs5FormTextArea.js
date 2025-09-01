/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5FormTextArea.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-15
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 表单多行文本输入 组件绘制类。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { Bs5FormEditorObject } from "./Bs5FormEditorObject.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";

/**
 * 这个是 Bootstrap 5 中 表单里面的一个 textarea 输入框。它不是一个标签，它有一些附带的标签，比如 标题，说明文本，异常文本等等。
 * 它继承了 FormEditorObject 类 (这个类是 Bootstrap5Object 类的子类) 。它的操作方法，操作的是这个输入框标签 &lt;textarea&gt; 本身。
 * 同时，它还附带了 FormEditorObject 中一些附属标签的处理方法。
 */
class Bs5FormTextArea extends Bs5FormEditorObject {

    /**
     * 这里是 Bs5FormTextArea 的构造函数。它不是一个标签，它有一些附带的标签，比如 标题，说明文本，异常文本等等。
     * @param {string} id 这是 textarea 标签的 id 信息。它必须唯一。
     * @param {object} [options] 关于按钮的可选配置参数。
     * @param {number} [options.rows] 这是 textarea 标签的 rows 信息。指的是 &lt;textarea&gt; 的 rows 属性
     * @param {string} [options.labelInfo] 这是 附带的 label 标签信息。即标题。
     * @param {string} [options.placeholder] 这是 input 标签的 placeholder 属性信息。
     * @param {string} [options.helperInfo] 这是 附带的 div 帮助标签的信息。
     * @param {string} [options.invalidInfo] 这是 附带的 div 校验异常标签的信息。
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id=('fTextArea'+myRandomNumStr()), {rows=3, labelInfo='标题', placeholder='', helperInfo='', invalidInfo=''}={}){

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5FormTextArea', 'constructor', 'options', true);

        // 参数校验（父类有校验的参数，子类就不用写了）
        let rowsVal = vu.autoVnAofNumber(rows, 'Bs5FormTextArea', 'constructor', 'rows');
        let placeholderVal = vu.autoVnAofString(placeholder, 'Bs5FormTextArea', 'constructor', 'placeholder');
        
        // 调用父类的构造函数，初始化
        super('textarea', {id:id, labelInfo:labelInfo, helperInfo:helperInfo, invalidInfo:invalidInfo});

        // 开始自己的调整
        this.addAttributeByObject({rows:rowsVal, placeholder:placeholderVal, autocomplete:'off'});
        this.addCssClass('form-control');
    }

}

/**
 * 导出公用部分
 */
export{
    Bs5FormTextArea
}