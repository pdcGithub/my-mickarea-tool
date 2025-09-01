/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5FormRaidoGroup.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-15
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 表单 单选框绘制类。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5FormCheckboxGroup } from "./Bs5FormCheckboxGroup.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 这是一个 radio 组，它不是一个单个的组件，它可能在一个组里面，有一个或者多个 radio。在处理上，它是继承自 Bs5FormCheckboxGroup 表单复选框组的。
 */
class Bs5FormRaidoGroup extends Bs5FormCheckboxGroup {

    /**
     * 这是一个 radio 组，它不是一个单个的组件，它可能在一个组里面，有一个或者多个 radio。在处理上，它是继承自 FormInputGroup 输入组的。
     * @param {string} id 这是 Bs5FormRaidoGroup 组件的 id 信息。它必须唯一。
     * @param {object} [options] 关于可选配置参数。
     * @param {Map} [options.radioObjs] 这个是单选框的选项。它应该是一个 Map 。键值对对应 选项的值 和 名称
     * @param {boolean} [options.showInline] 这些单选框是否显示为 一行，默认 true
     * @param {string} [options.labelInfo] 这是 附带的 label 标签信息。即标题。
     * @param {string} [options.helperInfo] 这是 附带的 div 帮助标签的信息。
     * @param {string} [options.invalidInfo] 这是 附带的 div 校验异常标签的信息。
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id='fRadioGroup'+myRandomNumStr(), 
        {radioObjs=new Map(), showInline=true, labelInfo='标题', helperInfo='', invalidInfo=''}={}){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5FormRaidoGroup', 'constructor', 'options', true);

        // 调用父类初始化（参数父类都有校验，这里不校验了。）
        super(id, {
            checkboxObjs:radioObjs, showInline:showInline, labelInfo:labelInfo, helperInfo:helperInfo, invalidInfo:invalidInfo, 
            type:'radio', role:''
        });
    }

    /**
     * 设置单选框，所选中的内容信息。与复选框不同，它只能选中一个
     * @param  {string} keys 要选中的复选框，他们的键信息
     */
    checked(key){
        super.unchecked();
        super.checked(`${key}`);
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5FormRaidoGroup
}