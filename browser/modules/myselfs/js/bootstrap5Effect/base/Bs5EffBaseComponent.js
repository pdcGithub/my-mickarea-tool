/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffBaseComponent.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-25
 * @version 1.0.0 
 * @description  这个是 整个动态组件库的基础类。他有些 protected 的方法 用于操作内部对象。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

// 导入外部模块

import { Bootstrap5Object, myRandomNumStr } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";
import { ParamValidError } from "../../errors.js";


// ======== Symbol 变量，用于定义一些 非常规的方法名。这些方法一般不会用到，也不需要用。只有扩展子类时，会用到。

const protected_get_myId = Symbol.for('bs5_eff_protected_get_myId');
const protected_set_myId = Symbol.for('bs5_eff_protected_set_myId');

const protected_get_myCssClass = Symbol.for('bs5_eff_protected_get_myCssClass');
const protected_set_myCssClass = Symbol.for('bs5_eff_protected_set_myCssClass');

const protected_get_mySubConfig = Symbol.for('bs5_eff_projected_get_mySubConfig');
const protected_set_mySubConfig = Symbol.for('bs5_eff_projected_set_mySubConfig');

const protected_get_bootstrapobject = Symbol.for('bs5_eff_protected_get_bootstrapobject');
const protected_set_bootstrapobject = Symbol.for('bs5_eff_protected_set_bootstrapobject');

/**
 * 这是一个基础的组件类。它是作为其它组件的父类的存在。它定义了一些规范的函数接口，以及一些通用的属性。
 * 对于派生的子类，可以在这个类的基础上，进一步开发。
 * 
 * 他有4个私有属性 #myId; #myCssClass; #mySubConfig; #bootstrapObject; 可通过 protected 的 Symbol 方法名 来进行 get 和 set 操作
 */
class Bs5EffBaseComponent {

    #myId;        // 组件ID，用于定位组件
    #myCssClass;  // 组件样式，用于渲染
    #mySubConfig; // 组件的二级配置对象，用于其它处理

    #bootstrapObject ; // bootstrap5 的 Button UI 组件

    /**
     * Bs5EffBaseComponent 的构造函数。主要用于初始化 #myId、#myCssClass、#mySubConfig、#bootstrapObject 内置对象
     * @param {string} id 组件ID，用于定位组件。如果不填，默认会生成一个随机ID
     * @param {string} cssClass 组件样式，用于渲染
     * @param {object} subconfig 组件的二级配置对象，用于其它处理
     */
    constructor(id=('Bs5EffBaseComponent'+myRandomNumStr()), cssClass='', subconfig={}){
        // 参数校验 + 赋值
        this.#myId = vu.autoVnAofString(id, 'Bs5EffBaseComponent', 'constructor', 'id', false);
        this.#myCssClass = vu.autoVnAofString(cssClass, 'Bs5EffBaseComponent', 'constructor', 'cssClass');
        this.#mySubConfig = vu.autoVnAofObjectLiteral(subconfig, 'Bs5EffBaseComponent', 'constructor', 'subconfig');
        // ui 组件对象
        this.#bootstrapObject = new Bootstrap5Object('div', {'id':this.#myId, 'class':this.#myCssClass});
    }

    // ====================== 关于私有属性的 getter 和 setter 处理

    [protected_get_myId](){
        return this.#myId;
    }

    [protected_get_myCssClass](){
        return this.#myCssClass;
    }

    [protected_get_mySubConfig](){
        return this.#mySubConfig;
    }

    [protected_get_bootstrapobject](){
        return this.#bootstrapObject;
    }

    [protected_set_myId](id){
        // 设置
        this.#myId = vu.autoVnAofString(id, 'Bs5EffBaseComponent', 'protected_set_myId', 'id', false);
    }

    [protected_set_myCssClass](cssClass){
        // 设置
        this.#myCssClass = vu.autoVnAofString(cssClass, 'Bs5EffBaseComponent', 'protected_set_myCssClass', 'cssClass');
    }

    [protected_set_mySubConfig](subconfig){
        // 设置
        this.#mySubConfig = vu.autoVnAofObjectLiteral(subconfig, 'Bs5EffBaseComponent', 'protected_set_mySubConfig', 'subconfig');
    }

    [protected_set_bootstrapobject](object){
        // 设置
        this.#bootstrapObject = vu.autoVnAofTargetObject(object, 'Bs5EffBaseComponent', 'protected_set_bootstrapobject', 'object', Bootstrap5Object);
    }

    // ====================== 关于私有属性的 getter 和 setter 处理  =========== 结束

    /**
     * 获取这个组件的 html 字符串
     * @returns {string} 组件的 html 字符串
     */
    getHtmlString(){
        return this.#bootstrapObject.toHtmlString();
    }

    /**
     * 获取这个组件的 html dom 对象数组。
     * @returns {Array<object>} 组件的 html dom 对象数组。
     */
    getHtmlDomObjectArray(){
        return this.#bootstrapObject.toHtmlDomObject();
    }

    /**
     * 将这个组件写入到页面的对应 html 元素中。
     * @param {*} target 页面的对应 html 元素。如果不填，默认是 document.body 对象
     */
    writeToPage(target=document.body){

        // 参数校验
        vu.throwError(
            !du.isHtmlElement(target) && target!==document.body, 
            `调用 Bs5EffBaseComponent 的 writeToPage 方法出错，参数 target=${target} 不是 html元素 对象`, ParamValidError);

        // 获取当前组件的 html dom 对象数组。它将写入页面
        target.append(...this.getHtmlDomObjectArray());
    }

    /**
     * 组件的显示操作
     */
    show(){
        document.getElementById(this.#myId).classList.remove('visually-hidden');
    }

    /**
     * 组件的隐藏操作
     */
    hide(){
        document.getElementById(this.#myId).classList.add('visually-hidden');
    }

    /**
     * 组件的禁用操作
     */
    disable(){
        document.getElementById(this.#myId).setAttribute('disabled','true');
    }

    /**
     * 组建的启用操作
     */
    enable(){
        document.getElementById(this.#myId).removeAttribute('disabled');
    }
}

/**
 * 导出公用部分
 */
export{
    Bs5EffBaseComponent, 

    protected_get_myId, protected_get_myCssClass, protected_get_mySubConfig, protected_get_bootstrapobject,
    protected_set_myId, protected_set_myCssClass, protected_set_mySubConfig, protected_set_bootstrapobject
}