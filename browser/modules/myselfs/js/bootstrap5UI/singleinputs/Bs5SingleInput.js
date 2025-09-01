/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5SingleInput.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-14
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 表单输入框 组件绘制类。这里没有 form 相关的标签
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { Bs5FormInput } from "../forminputs/Bs5FormInput.js";
import { Bootstrap5Object } from "../base/Bootstrap5Object.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";

/**
 * 这是一个简单的 input 输入框，不附带任何内容，就是 输入框标签 &lt;input&gt; 本身
 */
class Bs5SingleInput extends Bs5FormInput {
    
    /**
     * 这里是 Input 类的构造函数。因为它只是一个标签，所以并没有太多的特殊处理
     * @param {string} id 这是 input 标签的 id 信息。它必须唯一。
     * @param {object} [options] 关于按钮的可选配置参数。
     * @param {string} [options.type] 这是 input 标签的 type 信息。
     * @param {string} [options.placeholder] 这是 input 标签的 placeholder 属性信息。
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id=('singleInput'+myRandomNumStr()), {type='text', placeholder=''}={}){

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5SingleInput', 'constructor', 'options', true);
        
        // 本标签，调用 父类初始化（父类有校验，这里不做过多处理）
        super(id, {type:type, placeholder:placeholder});

        // 移除一个不需要的属性
        this.removeAttribute('aria-describedby');
    }

    /**
     * (重载父类的 toHtmlString 方法，因为这里不是 FormInput，是 一个 input，不需要输出 FormInput 附带的标签，只需要中间的 input 标签 )
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
    Bs5SingleInput
}