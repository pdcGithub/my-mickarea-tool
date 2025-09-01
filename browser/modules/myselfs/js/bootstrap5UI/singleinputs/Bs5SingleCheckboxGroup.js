/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5SingleCheckboxGroup.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-15
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 复选框绘制类。没有 form 处理
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5FormCheckboxGroup } from "../forminputs/Bs5FormCheckboxGroup.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 这是一个纯粹的 checkbox UI 组件 ，继承自 FormCheckboxGroup
 */
class Bs5SingleCheckboxGroup extends Bs5FormCheckboxGroup {

    /**
     * 这是一个纯粹的 checkbox UI 组件 ，继承自 FormCheckboxGroup
     * @param {string} id 这是 Bs5SingleCheckboxGroup 组件的 id 信息。它必须唯一。
     * @param {object} [options] 关于可选配置参数。
     * @param {Map} [options.checkboxObjs] 这个是复选框的选项。它应该是一个 Map 。键值对对应 选项的值 和 名称
     * @param {boolean} [options.showInline] 这些复选框是否显示为 一行，默认 true
     * @param {string} [options.type] 这些复选框的类型，默认是 checkbox 。
     * @param {string} [options.role] 这些复选框的角色，默认是 空字符串
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id='chkBox'+myRandomNumStr(), {checkboxObjs=new Map(), showInline=true, type='checkbox', role=''}={}){

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5SingleCheckboxGroup', 'constructor', 'options', true);

        // 父类初始化（因为参数父类都有校验，这里不校验了）
        super(id, {checkboxObjs:checkboxObjs, showInline:showInline, type:type, role:role});
    }

    /**
     * (重载父类的 toHtmlString 方法，因为这里不是一个标签的处理，是几个并排标签的处理)
     * 输出一个带有 Html 标签信息的字符串
     * @returns {string} Html 标签信息的字符串
     */
    toHtmlString(){
        return this.getCheckboxArray().map(bsobj=>bsobj.toHtmlString()).join('\n');
    }

}

/**
 * 导出公用部分
 */
export {
    Bs5SingleCheckboxGroup
}