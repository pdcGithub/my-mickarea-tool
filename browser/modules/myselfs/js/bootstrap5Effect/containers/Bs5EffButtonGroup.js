/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffButtonGroup.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-26
 * @version 1.0.0 
 * @description  这个是 整个动态组件库的 按钮组 容器类 。它继承于 Container 。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5EffContainer } from "./Bs5EffContainer.js";
import { Bs5EffButton } from "../buttons/Bs5EffButton.js";
import { protected_set_bootstrapobject, protected_get_bootstrapobject } from "../base/Bs5EffBaseComponent.js";
import { myRandomNumStr, Bs5ButtonGroup, BTN_GROUP_SIZE } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 按钮组 组件，它主要是作为 Button 的容器组件。它只可以放按钮，不能放其它内容。
 */
class Bs5EffButtonGroup extends Bs5EffContainer {

    /**
     * 按钮组 组件，它主要是作为 Button 的容器组件。它只可以放按钮，不能放其它内容。
     * @param {string} id 组件ID
     * @param {object} [option] 关于容器的可选配置参数。
     * @param {string} [option.cssClass] 容器的其它 样式 ；默认为 空字符串
     * @param {string} [option.size] 显示的大小参数，用 BTN_GROUP_SIZE 常量 ；
     * @param {boolean} [option.isVertical] 当为 true 时，按钮组将按垂直方式排列按钮。默认为 false ；
     * @param {Array<Bs5EffButton|Bs5EffButtonGroup>} [option.initChildren] 初始的子组件数组，只能为 Button 或者 ButtonGroup 类，又或者他们的子类 所创建的组件对象
     */
    constructor(id=('btnGroup'+myRandomNumStr()), {cssClass='', size=BTN_GROUP_SIZE.normal, isVertical=false, initChildren=undefined}={}){

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffButtonGroup', 'constructor', 'option', true);

        // 参数校验
        vu.autoVnAofString(id, 'Bs5EffButtonGroup', 'constructor', 'id', false);
        vu.autoVnAofString(cssClass, 'Bs5EffButtonGroup', 'constructor', 'cssClass');
        vu.autoVnAofString(size, 'Bs5EffButtonGroup', 'constructor', 'size');
        vu.autoVnAofBoolean(isVertical, 'Bs5EffButtonGroup', 'constructor', 'isVertical');
        if(initChildren!==undefined) vu.autoVnAofTargetObjectArray(initChildren, 'Bs5EffButtonGroup', 'constructor', 'initChildren', Bs5EffButton, Bs5EffButtonGroup);

        // 父类初始化
        super(id, arguments[1]);

        // 替换掉父类初始化后的 内部 UI 组件 为 Bs5ButtonGroup
        // 因为 UI 组件的子组件 是另外一套，所以不能直接赋值，要转换
        let uiButtons = [];
        if(initChildren !== undefined) {
            uiButtons = initChildren.map(obj=>{
                return obj[protected_get_bootstrapobject]();
            });
        }
        let tmp = new Bs5ButtonGroup(id, {buttons:uiButtons, size:size, isVertical:isVertical})
        this[protected_set_bootstrapobject](tmp);
        
        // 如果有自定义样式，在这里添加
        if(cssClass.trim().length>0) this[protected_get_bootstrapobject]().addCssClass(cssClass);
    }

    /**
     * (重载父类方法) 在程序写入页面之前，给组件添加 子组件。（这里只能添加 Bs5EffButton 或者 Bs5EffButtonGroup）
     * @param {...Bs5EffButton|Bs5EffButtonGroup} buttons 它应该是一个只包含 字符串 和 组件 的一个 数组
     * @throws 如果参数不符合处理要求，会抛出异常 ParamValidError
     */
    addChildren(...buttons){
        // 参数校验
        vu.autoVnAofTargetObjectArray(buttons, 'Bs5EffButtonGroup', 'addChildren', 'buttons', Bs5EffButton, Bs5EffButtonGroup);
        // 调用父类添加
        super.addChildren(...buttons);
    }

    /**
     * (重载父类方法) 程序写入页面后，给页面追加子元素（这里只能添加 Button 或者 ButtonGroup）
     * @param  {...Array<Button|ButtonGroup>} buttons 它应该是一个只包含 字符串 和 组件 的一个 数组
     */
    appendToPage(...buttons){
        // 参数校验
        vu.autoVnAofTargetObjectArray(buttons, 'Bs5EffButtonGroup', 'appendToPage', 'buttons', Bs5EffButton, Bs5EffButtonGroup);
        // 调用父类添加
        super.appendToPage(...buttons);
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffButtonGroup
}