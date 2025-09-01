/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffInputGroup.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-26
 * @version 1.0.0 
 * @description  这个是 整个动态组件库的 输入组 容器类 。它继承于 Container 。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5EffContainer, protected_get_children } from "./Bs5EffContainer.js";
import { Bs5EffButton } from "../buttons/Bs5EffButton.js";
import { Bs5EffInput } from "../inputs/Bs5EffInput.js";
import { protected_set_bootstrapobject, protected_get_bootstrapobject, protected_get_myId, 
    Bs5EffBaseComponent } from "../base/Bs5EffBaseComponent.js";
import { myRandomNumStr, Bootstrap5Object } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";
import { Bs5EffButtonGroup } from "./Bs5EffButtonGroup.js";
import { ParamValidError } from "../../errors.js";

/**
 * InputGroup 输入组 组件，它主要是作为 其它输入组件的容器。它有子组件，比如 ：文本，Button, ButtonGroup, Input 等等 之类的，都可以。
 * 理论上来说，InputGroup 只是 Container 的一个变种。
 */
class Bs5EffInputGroup extends Bs5EffContainer {

    /**
     * InputGroup 输入组 组件，它主要是作为 其它输入组件的容器。它有子组件，比如 ：字符串、按钮、输入 3者的一种或者多种。
     * 理论上来说，InputGroup 只是 Container 的一个变种。
     * @param {string} id 组件ID
     * @param {object} [option] 关于容器的可选配置参数。
     * @param {string} [option.cssClass] 容器的其它 样式 ；默认为 空字符串
     * @param {Array<String|Bs5EffButton|Bs5EffButtonGroup|Bs5EffInput>} [option.initChildren] 初始的子组件数组，可以是 字符串、按钮、输入 3者的一种或者多种
     */
    constructor(id=('inputGroup'+myRandomNumStr()), { cssClass='', initChildren=undefined }={}){

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffInputGroup', 'constructor', 'option', true);

        // 参数校验
        vu.autoVnAofString(id, 'Bs5EffInputGroup', 'constructor', 'id', false);
        vu.autoVnAofString(cssClass, 'Bs5EffInputGroup', 'constructor', 'cssClass');
        if(initChildren!==undefined) vu.autoVnAofTargetObjectArray(initChildren, 'Bs5EffInputGroup', 'constructor', 'initChildren',
            String, Bs5EffButton, Bs5EffButtonGroup, Bs5EffInput
        );
        
        // 父类初始化
        super(id, arguments[1]);

        // 替换掉父类初始化后的 内部 UI 组件 为 Bootstrap5Object ，因为 InputGroup 在 mybs5 暂时没有现成的 组件。
        let tmp = new Bootstrap5Object('div', {id:du.valueOfString(id), class:'input-group'});
        this[protected_set_bootstrapobject](tmp);
        
        // 如果有自定义样式，在这里添加
        if(cssClass.trim().length>0) this[protected_get_bootstrapobject]().addCssClass(cssClass);
    }

    /**
     * (重载父类方法) 在程序写入页面之前，给组件添加 子组件。（这里只能添加 字符串、按钮、输入 3者的一种或者多种）
     * @param  {...String|Bs5EffButton|Bs5EffButtonGroup|Bs5EffInput} compts 它应该是 字符串、按钮、输入 3者的一种或者多种 的一个 数组
     * @throws 如果参数不符合处理要求，会抛出异常 ParamValidError
     */
    addChildren(...compts){
        // 参数校验
        vu.autoVnAofTargetObjectArray(compts, 'Bs5EffInputGroup', 'addChildren', 'compts',
            String, Bs5EffButton, Bs5EffButtonGroup, Bs5EffInput
        );
        // 调用父类添加
        super.addChildren(...compts);
    }

    /**
     * (重载父类方法) 程序写入页面后，给页面追加子元素（这里只能添加 字符串、按钮、输入 3者的一种或者多种）
     * 注意：这里重写是因为，字符串 在 InputGroup 要转换为 span 标签。
     * @param  {...String|Bs5EffButton|Bs5EffButtonGroup|Bs5EffInput} compts 它应该是一个只包含 字符串 和 组件 的一个 数组
     */
    appendToPage(...compts){
        // 参数校验
        vu.autoVnAofTargetObjectArray(compts, 'Bs5EffInputGroup', 'appendToPage', 'compts',
            String, Bs5EffButton, Bs5EffButtonGroup, Bs5EffInput
        );
        // 先获取 ID 
        let myId = this[protected_get_myId]();
        // 循环遍历 compt，然后写入这个容器内
        let elemArray = document.querySelectorAll('#'+myId);
        if(elemArray.length>0){
            let thisElem = elemArray[0];
            compts.forEach(elem=>{
                if(du.isString(elem)){
                    // 字符串 在 InputGroup 要转换为 span 标签
                    let span = new Bootstrap5Object('span', {class:'input-group-text'}, [du.valueOfString(elem)]);
                    thisElem.append(...span.toHtmlDomObject());
                }else if(du.isTargetObject(elem, Bs5EffBaseComponent)){
                    // 组件需要调用自己的 writeToPage 方法
                    elem.writeToPage(thisElem);
                }
            });
        }
    }

    /**
     * (重载父类方法) 将这个组件写入到页面的对应 html 元素中。（因为这是容器，所以，它并不会有事件处理，但是它的子组件可能有事件处理）
     * 注意：这里重写是因为，字符串 在 InputGroup 要转换为 span 标签。
     * @param {*} target 页面的对应 html 元素。如果不填，默认是 document.body 对象
     */
    writeToPage(target=document.body){
        // 参数校验
        vu.throwError(
            !du.isHtmlElement(target) && target!==document.body, 
            `调用 InputGroup 的 writeToPage 方法出错，参数 target=${target} 不是 html元素 对象`, ParamValidError);

        // 先清空原始的 content，避免一开始就添加了内容，子组件再添加会重复。
        this[protected_get_bootstrapobject]().clearContents();

        // 调用 基类（BaseComponent） 的方法，先插入页面
        // super.writeToPage(target); (这里的父级是 Container ，所以要直接调 BaseComponent)
        Bs5EffBaseComponent.prototype.writeToPage.call(this, target);

        // 先获取 ID 
        let myId = this[protected_get_myId]();

        // 循环遍历子组件，然后写入这个容器内
        let elemArray = document.querySelectorAll('#'+myId);
        if(elemArray.length>0){
            let thisElem = elemArray[0];
            this[protected_get_children]().forEach(elem=>{
                if(du.isString(elem)){
                    // 字符串 在 InputGroup 要转换为 span 标签
                    let span = new Bootstrap5Object('span', {class:'input-group-text'}, [du.valueOfString(elem)]);
                    thisElem.append(...span.toHtmlDomObject());
                }else if(du.isTargetObject(elem, Bs5EffBaseComponent)){
                    // 组件需要调用自己的 writeToPage 方法
                    elem.writeToPage(thisElem);
                }
            });
        }
    }

}

/**
 * 导出公用部分
 */
export {
    Bs5EffInputGroup
}