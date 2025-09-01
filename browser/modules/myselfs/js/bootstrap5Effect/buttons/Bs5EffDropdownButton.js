/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffDropdownButton.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-25
 * @version 1.0.0 
 * @description  这个是 整个动态组件库的 下拉按钮 类。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5EffButton } from "./Bs5EffButton.js";
import {
    protected_set_bootstrapobject, protected_get_bootstrapobject, protected_get_mySubConfig, protected_get_myId, 
    Bs5EffBaseComponent} from "../base/Bs5EffBaseComponent.js";
import { Bs5DropdownButton, myRandomNumStr, BTN_COR, BTN_SIZE } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";
import { ParamValidError } from "../../errors.js";

/**
 * 下拉按钮组件，它主要是用于生成下拉按钮。伴随着按钮，它还有一个点击事件处理。必填属性有：组件ID 和 按钮名称。其它属性为选填，由 btnConfig 提供。
 * 如果需要显示分界线，请写 一个 value 为 'divider' 的键值对。比如 ：{d1:'divider', d2:'divider'} ；按钮的点击事件，点击处理绑定在所属的下拉选项上
 */
class Bs5EffDropdownButton extends Bs5EffButton {
    
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
     * @param {Function} [btnConfig.click] 按钮的点击事件（点击处理绑定在所属的下拉选项上）；默认为 undefined 即没有处理
     * @param {Map} [btnConfig.dropdownOptions] 这里是下拉信息，一般以 Map 比如: new Map([['option1', '测试1'], ['option2', '测试2']]) 的形式处理。如果 value = 'divider'，则显示为分割线；
     */
    constructor(id=('dropDown'+myRandomNumStr()), 
        {name=id, color=BTN_COR.primary, outline=false, cssClass='', size=BTN_SIZE.normal, disabled=false, click=undefined, dropdownOptions=undefined}={}){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffDropdownButton', 'constructor', 'btnConfig', true);
        
        // 参数校验
        vu.autoVnAofString(id, 'Bs5EffDropdownButton', 'constructor', 'id', false);
        // buttonConfig 内部属性校验
        vu.autoVnAofString(name, 'Bs5EffDropdownButton', 'constructor', 'name', false);
        vu.autoVnAofString(color, 'Bs5EffDropdownButton', 'constructor', 'color');
        vu.autoVnAofBoolean(outline, 'Bs5EffDropdownButton', 'constructor', 'outline');
        vu.autoVnAofString(cssClass, 'Bs5EffDropdownButton', 'constructor', 'cssClass');
        vu.autoVnAofString(size, 'Bs5EffDropdownButton', 'constructor', 'size');
        vu.autoVnAofBoolean(disabled, 'Bs5EffDropdownButton', 'constructor', 'disabled');
        if(click!==undefined) vu.autoVnAofTargetObject(click, 'Bs5EffDropdownButton', 'constructor', 'click', Function);
        if(dropdownOptions!==undefined) vu.autoVnAofTargetObject(dropdownOptions, 'Bs5EffDropdownButton', 'constructor', 'dropdownOptions', Map);

        // 父类构造函数初始化
        super(id, arguments[1]);

        // 将内置 UI 对象改为 bootstrap5UI.js 中的 Bs5DropdownButton 
        let tmp = new Bs5DropdownButton(id, {content:name, color:color, outline:outline, cssClass:cssClass, size:size, disabled:disabled, dropdownOptions:dropdownOptions});
        this[protected_set_bootstrapobject](tmp);
    }

    /**
     * (重载父类方法) 将这个组件写入到页面的对应 html 元素中。
     * @param {*} target 页面的对应 html 元素。如果不填，默认是 document.body 对象
     */
    writeToPage(target=document.body){
        // 参数校验
        vu.throwError(
            !du.isHtmlElement(target) && target!==document.body, 
            `调用 DropdownButton 的 writeToPage 方法出错，参数 target=${target} 不是 html元素 对象`, ParamValidError);
        
        // 调用 基类（BaseComponent） 的方法，先插入页面
        Bs5EffBaseComponent.prototype.writeToPage.call(this, target);
        
        // 先获取 2级 配置（这里在构造函数已经处理过了，参数都是安全的）
        let mySubConfig = this[protected_get_mySubConfig]();
        let myId = this[protected_get_myId]();

        // 如果有 click 事件处理函数，就绑定，否则不绑定
        if(mySubConfig.click!==undefined){
            // 对于下拉按钮，事件是绑定在 选项上的，而不是按钮上。
            document.querySelectorAll(`#${myId} ~ ul a`).forEach((elem)=>{
                elem.addEventListener('click', mySubConfig.click);
            });
        }
    }

    /**
     * 在尚未写入到页面前，给下拉按钮，添加一些选项（如果需要显示分界线，请写 一个 value 为 'divider' 的键值对。比如 ：[d1,'divider]）
     * @param {Map} options 一个键值对，它将作为选项。
     */
    addDropdownOptions(options){
        // 参数校验
        vu.autoVnAofTargetObject(options, 'Bs5EffDropdownButton', 'addDropdownOptions', 'options', Map);
        // 获取内置的 下拉按钮 UI 组件对象，然后设置选项内容
        this[protected_get_bootstrapobject]().addDropdownInfoByObject(options);
    }

    /**
     * 这里的数据刷新，指的是在标签已经生成，并且插入页面后，对于页面上的数据进行刷新。
     * @param {Map} dataOptions 一个键值对，它将作为选项。
     * @param {boolean} clearAndUpdate 是否清空原有信息，再更新。默认是，false，不清空。
     */
    refresh(dataOptions, clearAndUpdate=false){
        // 参数校验
        vu.autoVnAofTargetObject(dataOptions, 'Bs5EffDropdownButton', 'refresh', 'dataOptions', Map);
        //
        let clsAndUpd = vu.autoVnAofBoolean(clearAndUpdate, 'Bs5EffDropdownButton', 'refresh', 'clearAndUpdate');
        let myId = this[protected_get_myId]();
        let mySubconfig = this[protected_get_mySubConfig]();

        // 首先，把原页面上的下拉 点击 事件进行清理。
        document.querySelectorAll(`#${myId} ~ ul a`).forEach((elem)=>{
            elem.removeEventListener('click', mySubconfig.click);
        });

        // 然后根据条件，判断是完全清理，还是追加
        if(clsAndUpd){
            // 全部清理，再设置。
            this[protected_get_bootstrapobject]().clearDropdownInfo();
            this[protected_get_bootstrapobject]().addDropdownInfoByObject(dataOptions);
        }else{
            // 只是追加
            this[protected_get_bootstrapobject]().addDropdownInfoByObject(dataOptions);
        }

        // 清理页面
        document.querySelector(`#${myId} ~ ul`).innerHTML = '';
        // 重构 li 标签 (这里利用内置 UI 组件对象，进行 li 元素生成)
        let tmpLis = this[protected_get_bootstrapobject]().toHtmlDomObject().filter(elem=>{
            return elem.constructor.name.toLowerCase() === 'htmlulistelement';
        })[0].childNodes;
        // 写入到页面上的 ul 标签内
        document.querySelector(`#${myId} ~ ul`).append(...Array.from(tmpLis));
        // 重新绑定点击事件
        document.querySelectorAll(`#${myId} ~ ul a`).forEach((elem)=>{
            elem.addEventListener('click', mySubconfig.click);
        });
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffDropdownButton
}