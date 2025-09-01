/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffTextSelect.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-27
 * @version 1.0.0 
 * @description  这个是 整个动态组件库的 下拉选择组件 类。它 继承自 Input 。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { protected_get_bootstrapobject, protected_get_myId, protected_set_bootstrapobject } from "../base/Bs5EffBaseComponent.js";
import { Bs5EffInput } from "./Bs5EffInput.js";
import { myRandomNumStr } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";
import { Bs5SingleSelect } from "../../bootstrap5UI.js";

/**
 * 下拉文本 输入组件，它继承自 Input 组件。
 */
class Bs5EffTextSelect extends Bs5EffInput {

    /**
     * 下拉文本 输入组件，它继承自 Input 组件。
     * @param {string} id 组件ID
     * @param {object} [option] 关于组件的可选配置参数。
     * @param {Map} [option.downOptions] 这是 下拉选项 内容，它是一个 Map。key是option 的值，value 是option 的展示内容 ；
     * @param {string} [option.selected] 这是 下拉选项内容，指定的一个选中项。
     * @param {string} [option.cssClass] 输入组件的其它 样式；默认是 空字符串
     * @param {string} [option.placeholder] 输入默认的提示信息；默认是 空字符串
     * @param {RegExp|Function} [option.validRule] 默认的输入校验处理。可以是正则表达式，也可以是函数。如果是函数，有一个自带参数 html dom 元素
     * @param {Map<string,Function>} [option.customEvent] 自定义事件处理，key 是 事件名字符串，以逗号分隔，value 是 事件处理函数。函数有一个自带参数 event
     */
    constructor(id=('txtSelect'+myRandomNumStr()), {downOptions=undefined, selected='', cssClass='', placeholder='', validRule=undefined, customEvent=undefined}={}){

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffTextSelect', 'constructor', 'option', true);

        // 参数校验 （只是比 Input 多了个 options 属性，这里只写它就行了）
        if(downOptions!==undefined) vu.autoVnAofTargetObject(downOptions, 'Bs5EffTextSelect', 'constructor', 'downOptions', Map);
        let selectedVal = vu.autoVnAofString(selected, 'Bs5EffTextSelect', 'constructor', 'selected');

        // 父类初始化(已经有 valueof 处理，所以不同额外处理)
        super(id, arguments[1]);

        // 将内置 UI 对象改为 bootstrap5UI.js 中的 Bs5SingleSelect (已经有 valueof 处理，所以不同额外处理)
        let tmp = new Bs5SingleSelect(id, {dropDownOpts:downOptions, placeholder:placeholder});
        this[protected_set_bootstrapobject](tmp);

        // 如果有自定义样式，则添加
        if(cssClass.trim().length>0) this[protected_get_bootstrapobject]().addCssClass(cssClass);
        
        // 如果有指定的项，则选中
        if(selectedVal.trim().length>0) this[protected_get_bootstrapobject]().selected(selectedVal.trim());
    }

    /**
     * 这是在写入页面之前，增加下拉选项
     * @param {Map} options 这是 下拉选项 内容，它是一个 Map。key是option 的值，value 是option 的展示内容 ；
     * @param {string} selectedValue 这是 下拉选项内容，指定的一个选中项。
     */
    addOptions(options=new Map(), selectedValue=''){
        // 参数校验
        vu.autoVnAofTargetObject(options, 'Bs5EffTextSelect', 'addOptions', 'options', Map);
        let selectedVal = vu.autoVnAofString(selectedValue, 'Bs5EffTextSelect', 'addOptions', 'selectedValue');
        // 添加，并设置选中项 
        if(options.size>0) {
            this[protected_get_bootstrapobject]().addOptionsByObject(options);
            if(selectedVal.trim().length>0) this[protected_get_bootstrapobject]().selected(selectedVal.trim());
        }
    }

    /**
     * 这是在组件写入页面后，在页面 刷新下拉选项。方式有2种（清空再添加 和 直接追加）。
     * @param {Map} options 这是 下拉选项 内容，它是一个 Map。key是option 的值，value 是option 的展示内容 ；
     * @param {string} selectedValue 这是 下拉选项内容，指定的一个选中项。
     * @param {boolean} clearAndUpd 默认为true 。如果是
     */
    refresh(options= new Map(), selectedValue='', clearAndUpd=true){
        // 参数校验
        vu.autoVnAofTargetObject(options, 'Bs5EffTextSelect', 'refresh', 'options', Map);
        let selectedVal = vu.autoVnAofString(selectedValue, 'Bs5EffTextSelect', 'refresh', 'selectedValue');
        let clearAndUpdVal = vu.autoVnAofBoolean(clearAndUpd, 'Bs5EffTextSelect', 'refresh', 'clearAndUpd');

        // 获取页面元素
        let elem = document.getElementById(this[protected_get_myId]());

        // 根据条件看看是否需要删除原有信息
        if(clearAndUpdVal) elem.innerHTML = '';

        // 给页面添加新的选项（这里通过临时的组件处理，因为自己拼，可能与 UI 组件不统一）
        let tmpSel = new Bs5SingleSelect('tmpSel', {dropDownOpts:options});
        elem.append(...Array.from(tmpSel.toHtmlDomObject()[0].childNodes).filter(optElem=>{
            if(clearAndUpdVal){
                // 如果是清空模式，则可以有空选项
                return true;
            }else{
                // 否则，不能有空选项
                return du.isHtmlElement(optElem) && optElem.value.trim().length>0;
            }
        }));

        // 处理 select 选中项
        Array.from(elem.childNodes).filter(myelem=>{
            return du.isHtmlElement(myelem);
        }).forEach(myelem=>{
            myelem.removeAttribute('selected');
            if(selectedVal.trim() === myelem.value) myelem.setAttribute('selected', 'true');
        });

        // 清空样式
        this.clearValidStyles();
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffTextSelect
}