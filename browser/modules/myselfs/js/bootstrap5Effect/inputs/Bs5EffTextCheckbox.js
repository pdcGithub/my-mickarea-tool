/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffTextCheckbox.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-27
 * @version 1.0.0 
 * @description  这个是 整个动态组件库的 复选框组件 类。它 继承自 Input 。由于复选框的操作与普通的输入不同，所以很多函数都是重写的。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { protected_set_bootstrapobject, protected_get_bootstrapobject,protected_get_myId, protected_get_mySubConfig } from "../base/Bs5EffBaseComponent.js";
import { Bs5EffInput } from "./Bs5EffInput.js";
import { Bs5SingleCheckboxGroup, myRandomNumStr } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";
import { actionBinding, actionBindingBySelector } from "../../apis.js";

/**
 * 复选框 输入组件，它继承自 Input 组件。
 */
class Bs5EffTextCheckbox extends Bs5EffInput {

    /**
     * 复选框 输入组件，它继承自 Input 组件。
     * @param {string} id 组件ID
     * @param {object} [option] 关于组件的可选配置参数。
     * @param {string} [option.type] 因为 radio ，和 checkbox 都是一样的，只是 类型不同，所以用这个参数来处理，会简便一些 ；默认 checkbox
     * @param {string} [option.role] 角色。用于区分 checkbox 和 switch ；默认为 空字符串。
     * @param {boolean} [option.showInline] 是否显示在一行。默认是 true ，如果 为 false，则一行显示一个 ；
     * @param {Map} [option.chkOptions] 这是 复选选项 内容，它是一个 Map。key 是 checkbox 的值，value 是 label 的展示内容 ；
     * @param {Array<string>} [option.checked] 这是 复选选项内容，指定的一个选中项(是一个数组，参数只能为字符串) ；
     * @param {string} [option.cssClass] 输入组件的其它 样式；默认是 空字符串
     * @param {Function} [option.validRule] 默认的输入校验处理。函数，有一个自带参数 html dom 元素 数组 ；
     * @param {Map<string,Function>} [option.customEvent] 自定义事件处理，key 是 事件名字符串，以逗号分隔，value 是 事件处理函数。函数有一个自带参数 event
     */
    constructor(id=('txCheckbox'+myRandomNumStr()), 
        { type='checkbox', role='', showInline=true, chkOptions=undefined, checked=undefined, cssClass='', validRule=undefined, customEvent=undefined }={}){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffTextCheckbox', 'constructor', 'option', true);
        // 内部参数校验
        vu.autoVnAofString(type, 'Bs5EffTextCheckbox', 'constructor', 'type', false);
        vu.autoVnAofString(role, 'Bs5EffTextCheckbox', 'constructor', 'role');
        vu.autoVnAofBoolean(showInline, 'Bs5EffTextCheckbox', 'constructor', 'showInline');
        if(chkOptions!==undefined) vu.autoVnAofTargetObject(chkOptions, 'Bs5EffTextCheckbox', 'constructor', 'chkOptions', Map);
        if(checked!==undefined) vu.autoVnAofTargetObjectArray(checked, 'Bs5EffTextCheckbox', 'constructor', 'checked', String);
        vu.autoVnAofString(cssClass, 'Bs5EffTextCheckbox', 'constructor', 'cssClass');
        // 这里 校验规则 只能是 函数，跟 Bs5EffInput 不一样
        if(validRule!==undefined) vu.autoVnAofTargetObject(validRule, 'Bs5EffTextCheckbox', 'constructor', 'validRule', Function);
        if(customEvent!==undefined){
            // 首先是个 Map
            vu.autoVnAofTargetObject(customEvent, 'Bs5EffTextCheckbox', 'constructor', 'customEvent', Map);
            //
            let tmpKeys = Array.from(customEvent.keys());
            let tmpValues = Array.from(customEvent.values());
            // 然后校验 key 是不是 字符串
            vu.autoVnAofTargetObjectArray(tmpKeys, 'Bs5EffTextCheckbox', 'constructor', 'tmpKeys', String);
            // 然后校验 value 是不是 函数
            vu.autoVnAofTargetObjectArray(tmpValues, 'Bs5EffTextCheckbox', 'constructor', 'tmpValues', Function);
        }
        
        // 父类初始化
        super(id, arguments[1]);

        // 将内置 UI 对象改为 bootstrap5UI.js 中的 Bs5SingleCheckboxGroup (已经有 valueof 处理，所以不同额外处理)
        let tmp = new Bs5SingleCheckboxGroup(id, {checkboxObjs:chkOptions, showInline:showInline, type:type, role:role});
        this[protected_set_bootstrapobject](tmp);

        // 如果有指定的项，则选中
        if(checked !== undefined) this[protected_get_bootstrapobject]().checked(...checked);

        // 样式
        if(cssClass.trim().length>0) this[protected_get_bootstrapobject]().addCssClass(cssClass.trim());
    }

    /**
     * 在写入页面前，给复选框增加选项
     * @param {Map} options Map 这是 复选选项 内容，它是一个 Map。key 是 checkbox 的值，value 是 label 的展示内容 ；
     */
    addOptions(options){
        // 参数校验
        vu.autoVnAofTargetObject(options, 'Bs5EffTextCheckbox', 'addOptions', 'options', Map);
        // 
        this[protected_get_bootstrapobject]().addCheckboxByObject(options);
    }

    // 关于 value 的 get 和 set ================== 

    /**
     * （重载父类方法，因为这里是多个 html 元素）获取复选框的值。它将返回一个字符串数组
     * @returns {Array<String>} 一般是一个字符串数组，如果有特殊情况，会重载，并说明。
     */
    getValue(){
        let checkboxGroup = document.querySelectorAll(`input[name='${this[protected_get_myId]()}']`);
        return Array.from(checkboxGroup).map((checkbox)=>{
            return checkbox.checked?checkbox.value:null;
        }).filter(value=>{
            return du.isString(value);
        });
    }

    /**
     * （重载父类方法，因为这里是多个 html 元素）给组件设置一些特定的值。因为是多选框，所以选择的值可以是多个
     * @param {...String} val 一个不定参数，它的值是字符串。
     */
    setValue(...val){
        // 参数转换处理
        let myVals = val
        if(!du.isTargetObjectArray(val, String)){
            // 不是字符串数组，则转换为字符串
            myVals = val.map(value=>`${value}`);
        }
        // 获取 html 元素
        let checkboxGroup = document.querySelectorAll(`input[name='${this[protected_get_myId]()}']`);
        // 开始循环遍历
        checkboxGroup.forEach(checkbox=>{
            if(myVals.indexOf(checkbox.value)>=0 && !checkbox.checked){
                // 如果是要选中的复选框，并且没有选中，则点一下。
                checkbox.click();
            }else if(myVals.indexOf(checkbox.value)<0 && checkbox.checked){
                // 如果不是要选中的复选框，并且选中，则也点一下。这样就可以取消勾选。
                checkbox.click();
            }
        });
    }

    // 关于启用 和 禁用 ===========================

    /**
     * （重载父类方法，因为这里是多个 html 元素）组件的禁用操作。因为 输入框有校验样式，启用 和 禁用时，应该清空原有的校验样式
     */
    disable(){
        // 获取 html 元素
        let checkboxGroup = document.querySelectorAll(`input[name='${this[protected_get_myId]()}']`);
        // 循环遍历，每个复选都要设置
        checkboxGroup.forEach(elem=>{
            elem.setAttribute('disabled','true');
        });
        // 清空校验样式
        this.clearValidStyles();
    }

    /**
     * （重载父类方法，因为这里是多个 html 元素）组建的启用操作。因为 输入框有校验样式，启用 和 禁用时，应该清空原有的校验样式
     */
    enable(){
        // 获取 html 元素
        let checkboxGroup = document.querySelectorAll(`input[name='${this[protected_get_myId]()}']`);
        // 循环遍历，每个复选都要设置
        checkboxGroup.forEach(elem=>{
            elem.removeAttribute('disabled');
        });
        // 清空校验样式
        this.clearValidStyles();
    }

    // 关于显示 和 隐藏 ===========================

    /**
     * （重载父类方法，因为这里是多个 html 元素）组件的显示操作
     */
    show(){
        // 获取 html 元素
        let checkboxGroup = document.querySelectorAll(`input[name='${this[protected_get_myId]()}']`);
        // 循环遍历，每个复选都要设置
        checkboxGroup.forEach(elem=>{
            elem.parentElement.classList.remove('visually-hidden');
        });
    }

    /**
     * （重载父类方法，因为这里是多个 html 元素）组件的隐藏操作
     */
    hide(){
        // 获取 html 元素
        let checkboxGroup = document.querySelectorAll(`input[name='${this[protected_get_myId]()}']`);
        // 循环遍历，每个复选都要设置
        checkboxGroup.forEach(elem=>{
            elem.parentElement.classList.add('visually-hidden');
        });
    }

    // ===========================================

    /**
     * （重载父类方法，因为这里是多个 html 元素）将组件设置为校验 通过
     */
    setValidPassed(){
        // 获取 html 元素
        let checkboxGroup = document.querySelectorAll(`input[name='${this[protected_get_myId]()}']`);
        // 循环遍历
        checkboxGroup.forEach(elem=>{
            elem.classList.remove('is-invalid');
            elem.classList.add('is-valid');
        });
        // 如果 组件在 input group 中，随便给 input group 增加样式处理
        let target = checkboxGroup[0].parentElement;
        if(target.parentElement.classList.contains('input-group')){
            target.parentElement.classList.remove('is-invalid');
            target.parentElement.classList.add('is-valid');
        }
    }

    /**
     * （重载父类方法，因为这里是多个 html 元素）将组件设置为校验 不通过
     */
    setValidFailed(){
        // 获取 html 元素
        let checkboxGroup = document.querySelectorAll(`input[name='${this[protected_get_myId]()}']`);
        // 循环遍历
        checkboxGroup.forEach(elem=>{
            elem.classList.remove('is-valid');
            elem.classList.add('is-invalid');
        });
        // 如果 组件在 input group 中，随便给 input group 增加样式处理
        let target = checkboxGroup[0].parentElement;
        if(target.parentElement.classList.contains('input-group')){
            target.parentElement.classList.remove('is-valid');
            target.parentElement.classList.add('is-invalid');
        }
    }

    /**
     * （重载父类方法，因为这里是多个 html 元素）清空组件设置的校验样式
     */
    clearValidStyles(){
        // 获取 html 元素
        let checkboxGroup = document.querySelectorAll(`input[name='${this[protected_get_myId]()}']`);
        // 循环遍历
        checkboxGroup.forEach(elem=>{
            elem.classList.remove('is-valid');
            elem.classList.remove('is-invalid');
        });
        // 如果 组件在 input group 中，随便给 input group 增加样式处理
        let target = checkboxGroup[0].parentElement;
        if(target.parentElement.classList.contains('input-group')){
            target.parentElement.classList.remove('is-valid');
            target.parentElement.classList.remove('is-invalid');
        }
    }

    // 关于 value 的 数据校验 ================== 

    /**
     * （重载父类方法，因为这里是多个 html 元素）组件的校验处理函数（因为复选框不是单纯的字符值，是一个选项数组，所以要修改。这里没法用正则）
     * @returns 校验通过，返回 true ； 校验不通过，返回 false 。
     */
    valid(){
        // 先获取配置 (这里不能用 this ，因为 这是回调函数， this 指的是 当前 html dom 对象)
        let rule = this[protected_get_mySubConfig]().validRule;
        
        // 先查看校验规则，如果没有设置，则不需要校验（如果这里返回了，后面不会执行）
        if(rule === undefined) return true;

        // 正则 和 回调函数 才需要详细处理
        let re = false;
        if(du.isRegexp(rule)){
            // 如果是 正则，直接返回 false。因为 checkbox 不能用正则处理
            re = false;
            console.error(new Date(), `ID 为 ${this[protected_get_myId]()} 的组件，它的值为一个数组，不能使用正则来校验，请检查。`);
        }else if(du.isFunction(rule)){
            // 如果是 回调函数(默认传递本 Html Element 对象 作为入参)
            // 获取 html 元素
            let checkboxGroup = document.querySelectorAll(`input[name='${this[protected_get_myId]()}']`);
            re = rule(Array.from(checkboxGroup));
        }
        // 设置 校验处理 样式
        re?this.setValidPassed():this.setValidFailed();
        // 返回校验结果
        return re;
    }

    // 关于默认的事件绑定处理 =================== 复选框和输入框不同 只绑定 click、change、focus

    /**
     * （重载父类方法，因为这里是多个 html 元素）默认的组件事件绑定处理
     */
    defaultBinding(){
        // 事件绑定（这里是一组 html 元素，不是一个）
        let targets = document.querySelectorAll(`input[name='${this[protected_get_myId]()}']`);
        // 能找到对象才处理，否则不用绑定
        if(targets.length>0){
            actionBinding(targets, 'click, change, focus', (event)=>{
                // (chk) 这里不能直接丢 valid 方法给 listener ，因为当事件响应时，valid函数内部的 this 的指向 会变成 html dom 。
                this.valid();
            });
        }
    }

    // 关于自定义的事件绑定处理 =================

    /**
     * （重载父类方法，因为这里是多个 html 元素）自定义的组件事件绑定处理
     */
    customBinding(){
        // 先获取配置
        let cEventAction = this[protected_get_mySubConfig]().customEvent;
        // 先查看自定义事件处理有没有设置，如果没有设置，则不需要绑定
        if(cEventAction !== undefined){
            // 首先过滤 事件名信息，把空字符串 都过滤掉。然后再绑定
            let keysArr = Array.from(cEventAction.keys()).filter(key=>du.isString(key) && !du.isEmptyString(key));
            keysArr.forEach(key=>{
                // 这里是一组元素
                actionBindingBySelector(`input[name='${this[protected_get_myId]()}']`, key, cEventAction.get(key));
            });
        }
    }

}

/**
 * 导出公用部分
 */
export {
    Bs5EffTextCheckbox
}