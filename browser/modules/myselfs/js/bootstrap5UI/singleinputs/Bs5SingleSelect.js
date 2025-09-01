/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5SingleSelect.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-15
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 下拉选择 组件绘制类。这里没有 form 相关的标签
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { Bs5FormSelect } from "../forminputs/Bs5FormSelect.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";
import { Bootstrap5Object } from "../base/Bootstrap5Object.js";

/**
 * 这是一个简单的 select 输入框，不附带任何内容，就是 选择框标签 &lt;select&gt; 本身
 */
class Bs5SingleSelect extends Bs5FormSelect {

    /**
     * 这里是 Select 类的构造函数。因为它只是一个标签，所以并没有太多的特殊处理
     * @param {string} id 这是 select 标签的 id 信息。它必须唯一。
     * @param {object} [options] 关于按钮的可选配置参数。
     * @param {Map} [options.dropDownOpts] 这是 select 标签的子标签 option 标签的内容。这是 下拉选项 内容，它是一个 Map。key是option 的值，value 是option 的展示内容 ；
     * @param {string} [options.placeholder] 这是 select 标签的 placeholder 属性信息。(可以不写，但是如果写了，会显示为第一个选项)
     */
    constructor(id='singleSelect'+myRandomNumStr(), { dropDownOpts=new Map(), placeholder='' }={}){

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5SingleInput', 'constructor', 'options', true);

        // 调用父类的构造函数，初始化（父类有校验，这里不做过多校验）
        super(id, {dropDownOpts:dropDownOpts, placeholder:placeholder});

        // 去掉多余的属性
        this.removeAttribute('aria-describedby');
    }

    /**
     * (重载父类的 toHtmlString 方法，因为这里不是 FormSelect，是 一个 select，不需要输出 FormSelect 附带的标签，只需要中间的 select 标签 )
     * 输出一个带有 Html 标签信息的字符串
     * @returns {string} Html 标签信息的字符串
     */
    toHtmlString(){
        // 先将 option 数组放入 contents
        this.clearContents();
        this.addContentElements(...this.getOptionArray());
        // 这里调用的是 祖宗类 Bootstrap5Object 的 toHtmlString 方法
        return Bootstrap5Object.prototype.toHtmlString.call(this);
    }

}

/**
 * 导出公用部分
 */
export {
    Bs5SingleSelect
}