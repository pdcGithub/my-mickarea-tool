/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffFormInput.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-27
 * @version 1.0.0 
 * @description  这是关于表单输入组件的一个基础类，它将派生出其它 表单专属的 输入组件。当然，它继承于 表单输入组 FromInputGroup 
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { myRandomNumStr } from "../../bootstrap5UI.js";
import { Bs5EffFormInputGroup } from "../containers/Bs5EffFormInputGroup.js";
import { Bs5EffInput } from "../inputs/Bs5EffInput.js";


// 定义一些框架内部使用的方法名，外部一般是不需要的。

/**
 * 获取 内置的输入组件
 */
const protected_get_MyInputComponent = Symbol.for('bs5_eff_protected_get_MyInputComponent');

/**
 * 替换 表单输入组件的内置输入组件
 */
const protected_set_MyInputComponent = Symbol.for('bs5_eff_protected_set_MyInputComponent');

/**
 * 这是一个基类，一般不会直接 new 创建对象，主要用于继承。 这里是一个抽象类，它是作为 其它输入组件的父类来处理的。这个类会包含一些 输入组件公用 的处理方法
 */
class Bs5EffFormInput extends Bs5EffFormInputGroup {

    #myInputComponent; // 这是这个表单输入组件的内置输入组件

    /**
     * 这是一个基类，一般不会直接 new 创建对象，主要用于继承。 这里是一个抽象类，它是作为 其它输入组件的父类来处理的。这个类会包含一些 输入组件公用 的处理方法
     * @param {string} id 组件ID
     * @param {object} [formconfig] 关于表单的可选配置参数。
     * @param {string} [formconfig.formCssClass] 表单组件的样式，影响 input-group 整个容器 ；
     * @param {string} [formconfig.labelInfo] 表单项的标题 ；
     * @param {string} [formconfig.helperInfo] 表单项的帮助信息 ；
     * @param {string} [formconfig.invalidInfo] 表单项校验信息 ；
     * @param {object} [comptconfig] 关于输入组的可选配置参数。
     * @param {string} [comptconfig.cssClass] 输入组件的其它 样式；默认是 空字符串
     * @param {string} [comptconfig.type] 输入组件的类型信息；默认是 text 
     * @param {string} [comptconfig.defaultValue] 输入组件的默认值；默认是 空字符串
     * @param {string} [comptconfig.placeholder] 输入默认的提示信息；默认是 空字符串
     * @param {RegExp|Function} [comptconfig.validRule] 默认的输入校验处理。可以是正则表达式，也可以是函数。如果是函数，有一个自带参数 html dom 元素
     * @param {Map<string,Function>} [comptconfig.customEvent] 自定义事件处理，key 是 事件名字符串，以逗号分隔，value 是 事件处理函数。函数有一个自带参数 event
     */
    constructor(id='fInput'+myRandomNumStr(), 
        { formCssClass='', labelInfo='', helperInfo='', invalidInfo='' }={}, 
        { cssClass='', type='text', defaultValue='', placeholder='', validRule=undefined, customEvent=undefined }={}
    ){
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffFormInput', 'constructor', 'formconfig', true);
        vu.autoVnAofObjectLiteral(arguments[2], 'Bs5EffFormInput', 'constructor', 'comptconfig', true);
        let idVal = vu.autoVnAofString(id, 'Bs5EffFormInput', 'constructor', 'id', false);

        // 父类初始化
        let groupId = idVal+'group';
        super(groupId, arguments[1], arguments[2]);

        // 创建内置对象
        this.#myInputComponent = new Bs5EffInput(id, arguments[2]);
        this.addChildren(this.#myInputComponent);
    }

    /**
     * 修改表单输入组件的内置输入组件
     * @param {Bs5EffInput} compt 新的输入组件，它应该是 Bs5EffInput 的子孙类
     */
    [protected_set_MyInputComponent](compt){
        //参数校验
        vu.autoVnAofTargetObject(compt, 'Bs5EffFormInput', 'protected_set_MyInputComponent', 'compt', Bs5EffInput);
        //
        this.#myInputComponent = compt;
        this.clearChildren();
        this.addChildren(this.#myInputComponent);
    }

    /**
     * 获取内置的输入组件
     * @returns {Bs5EffInput} 返回 表单输入组件的内置输入组件
     */
    [protected_get_MyInputComponent](){
        return this.#myInputComponent;
    }

    // get  和 set =============================== 转发到 内置的输入组件来处理

    getValue(){
        return this.#myInputComponent.getValue();
    }

    setValue(val){
        this.#myInputComponent.setValue(val);
    }

    // disable 和 enable ========================= 转发到 内置的输入组件来处理

    disable(){
        this.#myInputComponent.disable();
    }

    enable(){
        this.#myInputComponent.enable();
    }

    // valid 校验 ================================ 转发到 内置的输入组件来处理

    valid(){
        return this.#myInputComponent.valid();
    }

    // 至于 事件绑定 ============================== 转发到 内置的输入组件来处理

    defaultBinding(){
        this.#myInputComponent.defaultBinding();
    }

    customBinding(){
        this.#myInputComponent.customBinding();
    }

}

/**
 * 导出公用部分
 */
export {
    Bs5EffFormInput, protected_get_MyInputComponent, protected_set_MyInputComponent
}