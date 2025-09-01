/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5FormSwitchGroup.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-15
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 表单 复选框绘制类（另外一个变种，以 switch 方式显示）。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5FormCheckboxGroup } from "./Bs5FormCheckboxGroup.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 这是一个 switch 组，它不是一个单个的组件，它可能在一个组里面，有一个或者多个 switch。在处理上，它是继承自 Bs5FormCheckboxGroup 表单复选框组的。
 * 这个 switch 是 checkbox 的一个变种。
 */
class Bs5FormSwitchGroup extends Bs5FormCheckboxGroup {

    /**
     * 这是一个 switch 组，它不是一个单个的组件，它可能在一个组里面，有一个或者多个 switch。在处理上，它是继承自 Bs5FormCheckboxGroup 输入组的。
     * @param {string} id 这是 Bs5FormSwitchGroup 组件的 id 信息。它必须唯一。
     * @param {object} [options] 关于可选配置参数。
     * @param {Map} [options.checkboxObjs] 这个是复选框的选项。它应该是一个 Map 。键值对对应 选项的值 和 名称
     * @param {boolean} [options.showInline] 这些复选框是否显示为 一行，默认 true
     * @param {string} [options.labelInfo] 这是 附带的 label 标签信息。即标题。
     * @param {string} [options.helperInfo] 这是 附带的 div 帮助标签的信息。
     * @param {string} [options.invalidInfo] 这是 附带的 div 校验异常标签的信息。
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id=('fSwitchGroup'+myRandomNumStr()), 
        {checkboxObjs=new Map(), showInline=true, labelInfo='标题', helperInfo='', invalidInfo=''}={}){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5FormCheckboxGroup', 'constructor', 'options', true);
        
        // 调用父类初始化
        super(id, {
            checkboxObjs:checkboxObjs, showInline:showInline, labelInfo:labelInfo, helperInfo:helperInfo, invalidInfo:invalidInfo,
            type:'checkbox', role:'switch'
        });
    }

}

/**
 * 导出公用部分
 */
export {
    Bs5FormSwitchGroup
}