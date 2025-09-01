/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffContainer.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-25
 * @version 1.0.0 
 * @description  这个是 整个动态组件库的 容器 基础类。它可以派生出其它容器类，比如 From Col Row 等等。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

/**
 * 导入模块
 */
import { Bs5EffBaseComponent, 
    protected_set_bootstrapobject, protected_get_myId, protected_get_bootstrapobject } from "../base/Bs5EffBaseComponent.js";
import { myRandomNumStr, Bs5Container } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";
import { ParamValidError } from "../../errors.js";

/**
 * 这是属于容器组件的一个 protected 函数名，用于获取子组件用。这里用 Symbol 声明
 */
const protected_get_children = Symbol.for('bs5_eff_protected_get_children');

/**
 * 容器组件，它主要是作为一个其它组件的载体而存在，比如：form, 按钮组 之类的。
 */
class Bs5EffContainer extends Bs5EffBaseComponent {

    #children ; // 这是容器内部的其它组件，比如 在 form 里面的 row ，或者 row 里面的 col。它应该是用数组装载的

    /**
     * 容器组件，它主要是作为一个其它组件的载体而存在，比如：form, 按钮组 之类的。
     * @param {string} id 组件ID
     * @param {object} [option] 关于容器的可选配置参数。
     * @param {boolean} [option.isFluid] 容器宽度是否铺满。默认 false
     * @param {string} [option.cssClass] 容器的其它 样式。默认 空字符串
     * @param {Array<String|Bs5EffBaseComponent>} [option.initChildren] 初始的子组件数组，可以是 字符串 或者 其它组件。默认 undefined
     */
    constructor(id=('container'+myRandomNumStr()), {isFluid=false, cssClass='', initChildren=undefined}={}){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffDropdownButton', 'constructor', 'option', true);

        // 参数校验
        vu.autoVnAofString(id, 'Bs5EffContainer', 'constructor', 'id', false);
        // option 内部属性校验
        vu.autoVnAofBoolean(isFluid, 'Bs5EffContainer', 'constructor', 'isFluid');
        vu.autoVnAofString(cssClass, 'Bs5EffContainer', 'constructor', 'cssClass');
        if(initChildren!==undefined) vu.autoVnAofTargetObjectArray(initChildren, 'Bs5EffContainer', 'constructor', 'initChildren', String, Bs5EffBaseComponent);

        // 父类初始化 Bs5EffBaseComponent
        super(id, cssClass, arguments[1]);

        // 处理初始子组件的数组
        this.#children = [];
        if(initChildren !== undefined) this.addChildren(...initChildren);

        // 将内置 UI 对象改为 bootstrap5UI.js 中的 Bs5Container
        let tmp = new Bs5Container(id, isFluid);
        if(cssClass !== undefined) tmp.addCssClass(cssClass);
        this[protected_set_bootstrapobject](tmp);
    }

    // ====================== 关于私有属性的 getter 和 setter 处理

    [protected_get_children](){
        return this.#children;
    }

    // ======================

    /**
     * 在程序写入页面之前，给组件添加 子组件。
     * @param  {...String|Bs5EffBaseComponent} compt 它应该是一个只包含 字符串 和 组件 的一个 数组
     */
    addChildren(...compt){
        // 参数校验
        vu.autoVnAofTargetObjectArray(compt, 'Bs5EffContainer', 'addChildren', 'compt', String, Bs5EffBaseComponent);
        // 数组合并（因为原始可能有值，只能合并，不能替换）
        this.#children = this.#children.concat(compt);
    }

    /**
     * 在程序写入页面之前，清空 子组件。
     */
    clearChildren(){
        // 循环遍历，都 pop 掉 （这种做法可能比较慢，但是比直接 赋值 [] ，在内存处理上要好一点）
        while(this.#children.length>0){
            this.#children.pop();
        }
    }

    /**
     * 程序写入页面后，清空页面上的子元素
     */
    clearPage(){
        // 先获取 ID 
        let myId = this[protected_get_myId]();
        // 清空
        document.getElementById(myId).innerHTML = '';
    }

    /**
     * 程序写入页面后，给页面追加子元素
     * @param  {...String|Bs5EffBaseComponent} compt 它应该是一个只包含 字符串 和 组件 的一个 数组
     */
    appendToPage(...compt){
        // 参数校验
        vu.autoVnAofTargetObjectArray(compt, 'Bs5EffContainer', 'appendToPage', 'compt', String, Bs5EffBaseComponent);
        
        // 先获取 ID 
        let myId = this[protected_get_myId]();

        // 循环遍历 compt，然后写入这个容器内
        let elemArray = document.querySelectorAll('#'+myId);
        if(elemArray.length>0){
            let thisElem = elemArray[0];
            compt.forEach(elem=>{
                if(du.isString(elem)){
                    // 字符串直接追加
                    thisElem.append(du.valueOfString(elem));
                }else if(du.isTargetObject(elem, Bs5EffBaseComponent)){
                    // 组件需要调用自己的 writeToPage 方法
                    elem.writeToPage(thisElem);
                }
            });
        }
    }

    /**
     * (重载父类方法) 将这个组件写入到页面的对应 html 元素中。（因为这是容器，所以，它并不会有事件处理，但是它的子组件可能有事件处理）
     * @param {*} target 页面的对应 html 元素。如果不填，默认是 document.body 对象
     */
    writeToPage(target=document.body){
        // 参数校验
        vu.throwError(
            !du.isHtmlElement(target) && target!==document.body, 
            `调用 Container 的 writeToPage 方法出错，参数 target=${target} 不是 html元素 对象`, ParamValidError);
        
        // 先清空原始的 content，避免一开始就添加了内容，子组件再添加会重复。
        this[protected_get_bootstrapobject]().clearContents();

        // 调用 基类 Bs5EffBaseComponent 的方法，先插入页面
        super.writeToPage(target);
        
        // 先获取 ID 
        let myId = this[protected_get_myId]();
        // 循环遍历子组件，然后写入这个容器内
        let elemArray = document.querySelectorAll('#'+myId);
        if(elemArray.length>0){
            let thisElem = elemArray[0];
            this.#children.forEach(elem=>{
                if(du.isString(elem)){
                    // 字符串直接追加
                    thisElem.append(du.valueOfString(elem));
                }else if(du.isTargetObject(elem, Bs5EffBaseComponent)){
                    // 组件需要调用自己的 writeToPage 方法
                    elem.writeToPage(thisElem);
                }
            });
        }
    }

    /**
     * (重载父类的处理，因为容器本身并不需要禁用，要禁用的是子组件) 组件的禁用操作
     */
    disable(){
        this.#children.forEach(elem=>{
            if(du.isTargetObject(elem, Bs5EffBaseComponent)){
                elem.disable();
            }
        });
    }

    /**
     * (重载父类的处理，因为容器本身并不需要启用，要启用的是子组件) 组建的启用操作
     */
    enable(){
        this.#children.forEach(elem=>{
            if(du.isTargetObject(elem, Bs5EffBaseComponent)){
                elem.enable();
            }
        });
    }

}

/**
 * 导出公用部分
 */
export{
    Bs5EffContainer, protected_get_children
}