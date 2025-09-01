/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5Button.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-14
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 按钮类
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { Bootstrap5Object } from "../base/Bootstrap5Object.js";
import { BTN_COR, BTN_SIZE, myRandomNumStr } from "../base/myBasicToolkit.js";

/**
 * Bootstrap 5 样式的按钮对象 类
 */
class Bs5Button extends Bootstrap5Object {

    /**
     * 创建一个 Bootstrap 5 样式的按钮对象。
     * @param {string} id 按钮 id
     * @param {object} [options] 关于按钮的可选配置参数。
     * @param {string} [options.content] 按钮的展示信息，也可称为名称。默认与 ID 相同
     * @param {string} [options.color] 按钮颜色。请使用 BTN_COR 常量。默认 BTN_COR.primary
     * @param {boolean} [options.outline] 按钮是否为 outline 样式。默认为 false
     * @param {string} [options.cssClass] 按钮的其它 样式。默认为 空字符串
     * @param {string} [options.size] 按钮的大小。请使用 BTN_SIZE 常量，默认为 BTN_SIZE.normal
     * @param {boolean} [options.disabled] 按钮是否为禁用。默认为 false
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id=("btn"+myRandomNumStr()), 
            {content=id, color=BTN_COR.primary, outline=false, cssClass="", size=BTN_SIZE.normal, disabled=false}={}) {

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5Button', 'constructor', 'options', true);

        // 参数验证（优化）
        let idVal = vu.autoVnAofString(id, 'Bs5Button', 'constructor', 'id', false);
        let contentVal = vu.autoVnAofString(content, 'Bs5Button', 'constructor', 'content');
        let colorVal = vu.autoVnAofString(color, 'Bs5Button', 'constructor', 'color');
        let outlineVal = vu.autoVnAofBoolean(outline, 'Bs5Button', 'constructor', 'outline');
        let cssVal = vu.autoVnAofString(cssClass, 'Bs5Button', 'constructor', 'cssClass');
        let sizeVal = vu.autoVnAofString(size, 'Bs5Button', 'constructor', 'size');
        let disableVal = vu.autoVnAofBoolean(disabled, 'Bs5Button', 'constructor', 'disabled');

        // 调用父类构造函数（初始化）；这里如果参数异常，父类会抛出参数校验异常。
        super('button', {id:idVal, type:'button', class:'btn'}, [contentVal]);

        // 设置初始属性
        if(disableVal){
            this.addAttribute('disabled', true);
        }

        // 因为按钮默认是有 btn 样式的，后面的追加就行了。
        this.addCssClass(`btn${outlineVal?'-outline':''}${'-'+colorVal} ${sizeVal} ${cssVal}`);
    }

}

/**
 * 导出公用内容
 */
export{ Bs5Button }