/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffButton.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-25
 * @version 1.0.0 
 * @description  这个是 整个动态组件库的 按钮 基础类。它可以派生出其它按钮类，比如下拉按钮。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5EffBaseComponent, 
    protected_set_bootstrapobject, protected_get_bootstrapobject, protected_get_mySubConfig, protected_get_myId 
} from "../base/Bs5EffBaseComponent.js";
import { Bs5Button, myRandomNumStr, BTN_COR, BTN_SIZE } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";
import { ParamValidError } from "../../errors.js";

/**
 * 按钮组件，它主要是用于生成普通的按钮。伴随着按钮，它还有一个点击事件处理。必填属性有：组件ID 和 按钮名称。其它属性为选填，由 btnConfig 提供。
 */
class Bs5EffButton extends Bs5EffBaseComponent {

    /**
     * 按钮组件，它主要是用于生成普通的按钮。伴随着按钮，它还有一个点击事件处理。必填属性有：组件ID 和 按钮名称。其它属性为选填，由 btnConfig 提供。
     * @param {string} id 组件ID
     * @param {object} [btnConfig] 关于按钮的可选配置参数。
     * @param {string} [btnConfig.name] 按钮的展示信息，也可称为名称。默认与 ID 相同
     * @param {string} [btnConfig.color] 按钮颜色。请使用 BTN_COR 常量 ；默认为 BTN_COR.primary
     * @param {boolean} [btnConfig.outline] 按钮是否为 outline 样式 ；默认为 false
     * @param {string} [btnConfig.cssClass] 按钮的其它 样式 ；默认为 空字符串
     * @param {string} [btnConfig.size] 按钮的大小。请使用 BTN_SIZE 常量 ； 默认为 BTN_SIZE.normal
     * @param {boolean} [btnConfig.disabled] 按钮是否为禁用 ； 默认为 false
     * @param {Function} [btnConfig.click] 按钮的点击事件 ；默认为 undefined 即没有处理
     * @param {object} [btnConfig.customAttributes] 自定义的属性信息 ；默认为 undefined
     */
    constructor(id=('button'+myRandomNumStr()), 
        {name=id, color=BTN_COR.primary, outline=false, cssClass='', size=BTN_SIZE.normal, disabled=false, click=undefined, customAttributes=undefined}={}){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffButton', 'constructor', 'btnConfig', true);
        
        // 参数校验
        vu.autoVnAofString(id, 'Bs5EffButton', 'constructor', 'id', false);
        // buttonConfig 内部属性校验
        vu.autoVnAofString(name, 'Bs5EffButton', 'constructor', 'name', false);
        vu.autoVnAofString(color, 'Bs5EffButton', 'constructor', 'color');
        vu.autoVnAofBoolean(outline, 'Bs5EffButton', 'constructor', 'outline');
        vu.autoVnAofString(cssClass, 'Bs5EffButton', 'constructor', 'cssClass');
        vu.autoVnAofString(size, 'Bs5EffButton', 'constructor', 'size');
        vu.autoVnAofBoolean(disabled, 'Bs5EffButton', 'constructor', 'disabled');
        if(click!==undefined) vu.autoVnAofTargetObject(click, 'Bs5EffButton', 'constructor', 'click', Function);
        vu.autoVnAofObjectLiteral(customAttributes, 'Bs5EffButton', 'constructor', 'customAttributes', true);
        
        // 父类初始化
        super(id, cssClass, arguments[1]);

        // 子类 UI 组件初始化。将内置 UI 对象改为 bootstrap5UI.js 中的 Bs5Button 
        let tmp = new Bs5Button(id, {content:name, color:color, outline:outline, cssClass:cssClass, size:size, disabled:disabled});
        this[protected_set_bootstrapobject](tmp);

        // 处理自定义属性
        if(customAttributes !== undefined){
            this[protected_get_bootstrapobject]().addAttributeByObject(customAttributes);
        }
    }

    // ======================

    /**
     * (重载父类方法) 将这个组件写入到页面的对应 html 元素中。
     * @param {*} target 页面的对应 html 元素。如果不填，默认是 document.body 对象
     */
    writeToPage(target=document.body){
        // 参数校验
        vu.throwError(
            !du.isHtmlElement(target) && target!==document.body, 
            `调用 Bs5EffButton 的 writeToPage 方法出错，参数 target=${target} 不是 html元素 对象`, ParamValidError);
        
        // 调用父类的方法，先插入页面
        super.writeToPage(target);

        // 先获取 2级 配置（这里在构造函数已经处理过了，参数都是安全的）
        let mySubConfig = this[protected_get_mySubConfig]();
        let myId = this[protected_get_myId]();

        // 如果有 click 事件处理函数，就绑定，否则不绑定
        if(mySubConfig.click!==undefined){
            document.getElementById(myId).addEventListener('click', mySubConfig.click);
        }
    }

}

/**
 * 导出公用部分
 */
export {
    Bs5EffButton
}