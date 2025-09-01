/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5FormInput.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-14
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 表单输入框 组件绘制类。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { Bs5FormEditorObject } from "./Bs5FormEditorObject.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";

/**
 * 这个是 Bootstrap 5 中 表单里面的一个 input 输入框。它不是一个标签，它有一些附带的标签，比如 标题，说明文本，异常文本等等。
 * 它继承了 FormEditorObject 类 (这个类是 Bootstrap5Object 类的子类) 。它的操作方法，操作的是这个输入框标签 &lt;input&gt; 本身。
 * 同时，它还附带了 FormEditorObject 中一些附属标签的处理方法。
 */
class Bs5FormInput extends Bs5FormEditorObject {
    
    /**
     * 这里是 Bs5FormInput 的构造函数。它不是一个标签，它有一些附带的标签，比如 标题，说明文本，异常文本等等。
     * @param {string} id 这是 input 标签的 id 信息。它必须唯一。
     * @param {object} [options] 关于按钮的可选配置参数。
     * @param {string} [options.type] 这是 input 标签的 type 信息。
     * @param {string} [options.placeholder] 这是 input 标签的 placeholder 属性信息。
     * @param {string} [options.labelInfo] 标题内容。字符串，可为空。
     * @param {string} [options.helperInfo] 帮助信息内容。字符串，可为空。
     * @param {string} [options.invalidInfo] 校验信息内容。字符串，可为空。
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id=('fInput'+myRandomNumStr()), 
        {labelInfo='标题', type='text', placeholder='', helperInfo='', invalidInfo=''}={}){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5FormInput', 'constructor', 'options', true);

        // 参数值获取
        let typeVal = vu.autoVnAofString(type, 'Bs5FormInput', 'constructor', 'type', false);
        let placeholderVal = vu.autoVnAofString(placeholder, 'Bs5FormInput', 'constructor', 'placeholder');

        // 调用父类的构造函数，初始化（id，labelInfo，helperInfo，invalidInfo 在父类有校验，这里不做重复校验了。）
        super('input', {id:id, labelInfo:labelInfo, helperInfo:helperInfo, invalidInfo:invalidInfo});

        // 开始自己的调整
        this.addAttributeByObject({type:typeVal, placeholder:placeholderVal, autocomplete:'off'});
        this.addCssClass('form-control');
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5FormInput
}