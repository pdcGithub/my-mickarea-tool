/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffTextRadio.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-27
 * @version 1.0.0 
 * @description 这个是 整个动态组件库的 单选组件 类。它 继承自 复选框组件 Checkbox 。它是复选框的一个特殊情况。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { protected_get_myId } from "../base/Bs5EffBaseComponent.js";
import { Bs5EffTextCheckbox } from "./Bs5EffTextCheckbox.js";
import { myRandomNumStr } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";

/**
 * 一个单选 输入组件，它继承自 Bs5EffTextCheckbox 组件。本质上来说，他就是一个 type = 'radio' 的 复选框
 */
class Bs5EffTextRadio extends Bs5EffTextCheckbox {

    /**
     * 一个单选 输入组件，它继承自 Bs5EffTextCheckbox 组件。本质上来说，他就是一个 type = 'radio' 的 复选框。另外，它的选中配置 checked 是一个指定的字符串，不是数组
     * @param {string} id 组件ID
     * @param {object} [option] 关于组件的可选配置参数。
     * @param {boolean} [option.showInline] 是否显示在一行。默认是 true ，如果 为 false，则一行显示一个 ；
     * @param {Map} [option.chkOptions] 这是 复选选项 内容，它是一个 Map。key 是 checkbox 的值，value 是 label 的展示内容 ；
     * @param {string} [option.checked] 这是 复选选项内容，指定的一个选中项 只能为字符串
     * @param {string} [option.cssClass] 输入组件的其它 样式；默认是 空字符串
     * @param {Function} [option.validRule] 默认的输入校验处理。函数，有一个自带参数 html dom 元素 数组 ；
     * @param {Map<string,Function>} [option.customEvent] 自定义事件处理，key 是 事件名字符串，以逗号分隔，value 是 事件处理函数。函数有一个自带参数 event
     */
    constructor(id='txRadio'+myRandomNumStr(), 
        { showInline=true, chkOptions=undefined, checked='', cssClass='', validRule=undefined, customEvent=undefined }={}){

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffTextRadio', 'constructor', 'option', true);

        // 校验 checked 默认值
        let checkedVal = vu.autoVnAofString(checked, 'Bs5EffTextRadio', 'constructor', 'checked');

        // 父类初始化 （父类的 checked 是一个 数组）
        super(id, {type:'radio', role:'', checked:[checkedVal],
            showInline:showInline, chkOptions:chkOptions, cssClass:cssClass, validRule:validRule, customEvent:customEvent});
    }

    /**
     * （重载父类方法，因为这里是 一个单选框，不是多选）给组件设置一些特定的值。(对于 radio 的清空，比较特殊，赋一个空字符串即可)
     * @param {String} val 它的值是字符串。
     */
    setValue(val){
        // 参数转换处理
        let myVals = val
        if(!du.isTargetObject(val, String)){
            // 不是字符串数组，则转换为字符串
            myVals = `${val}`;
        }
        // 获取 html 元素
        let checkboxGroup = document.querySelectorAll(`input[name='${this[protected_get_myId]()}']`);
        if(myVals.trim().length<=0){
            // 清空
            checkboxGroup.forEach(elem=>{
                elem.checked= false;
            });
            this.clearValidStyles();
        }else{
            // 开始循环遍历
            checkboxGroup.forEach(checkbox=>{
                if(myVals === checkbox.value && !checkbox.checked){
                    // 如果是要选中的复选框，并且没有选中，则点一下。
                    checkbox.checked = true;
                }else if(myVals !== checkbox.value && checkbox.checked){
                    // 如果不是要选中的复选框，并且选中，则也点一下。这样就可以取消勾选。
                    checkbox.checked = false;
                }
            });
        }
        // 因为这里没有模拟点击，所以自己传播 change 事件 （list 元素组没有 dispatch ，要 html 元素才有）
        // 传播一次就好了，因为默认监听了全部选项
        checkboxGroup.item(0).dispatchEvent(new Event('change', {bubbles: true, cancelable: true}));
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffTextRadio
}