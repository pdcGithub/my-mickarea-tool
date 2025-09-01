/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5SingleTextArea.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-15
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 多行文本输入框 组件绘制类。这里没有 form 相关的标签
 */
"use strict";

import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";
import { Bs5FormTextArea } from "../forminputs/Bs5FormTextArea.js";
import { Bootstrap5Object } from "../base/Bootstrap5Object.js";

 // 这是严格模式下的 Javascript 代码

/**
 * 这是一个简单的 textarea 输入框，不附带任何内容，就是 输入框标签 &lt;textarea&gt; 本身
 */
class Bs5SingleTextArea extends Bs5FormTextArea {

    /**
     * 这里是 TextArea 类的构造函数。因为它只是一个标签，所以并没有太多的特殊处理
     * @param {string} id 这是 textarea 标签的 id 信息。它必须唯一。
     * @param {object} [options] 关于按钮的可选配置参数。
     * @param {number} [options.rows] 这是 textarea 标签的 rows 信息。指的是 &lt;textarea&gt; 的 rows 属性
     * @param {string} [options.placeholder] 这是 input 标签的 placeholder 属性信息。
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id='singleTextArea'+myRandomNumStr(), {rows=3, placeholder=''}={}){

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5SingleTextArea', 'constructor', 'options', true);

        // 调用父类的构造函数，初始化
        super(id, {rows:rows, placeholder:placeholder});

        // 去掉多余属性
        this.removeAttribute('aria-describedby');
    }

    /**
     * (重载父类的 toHtmlString 方法，因为这里不是 FromTextArea，是 一个 textarea，不需要输出 FromTextArea 附带的标签，只需要中间的 textarea 标签 )
     * 输出一个带有 Html 标签信息的字符串
     * @returns {string} Html 标签信息的字符串
     */
    toHtmlString(){
        // 这里调用的是 祖宗类 Bootstrap5Object 的 toHtmlString 方法
        return Bootstrap5Object.prototype.toHtmlString.call(this);
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5SingleTextArea
}