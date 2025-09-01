/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5DropdownButton.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-14
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 下拉按钮 类
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";
import { BTN_COR, BTN_SIZE, myRandomNumStr } from "../base/myBasicToolkit.js";
import { Bootstrap5Object } from "../base/Bootstrap5Object.js";
import { Bs5Button } from "./Bs5Button.js";

/**
 * Bootstrap 5 样式的按钮对象 类 （这个是下拉按钮，不是普通按钮，它带有下拉信息）。
 * 它首先是个 button 标签，然后它后面还附带一个 ul 列表，用于显示下拉信息
 */
class Bs5DropdownButton extends Bs5Button {

    #dropdownInfoMap ; // 定义一个私有属性 用于存储下拉信息 ，它是一个 map

    /**
     * 创建一个 Bootstrap 5 样式的 下拉按钮对象。
     * @param {string} id 按钮 id
     * @param {object} [options] 关于按钮的可选配置参数。
     * @param {string} [options.content] 按钮的展示信息，也可称为名称。默认与 ID 相同
     * @param {string} [options.color] 按钮颜色。请使用 BTN_COR 常量。默认 BTN_COR.primary
     * @param {boolean} [options.outline] 按钮是否为 outline 样式。默认为 false
     * @param {string} [options.cssClass] 按钮的其它 样式。默认为 空字符串
     * @param {string} [options.size] 按钮的大小。请使用 BTN_SIZE 常量，默认为 BTN_SIZE.normal
     * @param {boolean} [options.disabled] 按钮是否为禁用。默认为 false
     * @param {Map} [options.dropdownOptions] 这里是下拉信息，一般以 Map 比如: new Map([['option1', '测试1'], ['option2', '测试2']]) 的形式处理。如果 value = 'divider'，则显示为分割线
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id="dBtn"+myRandomNumStr(), 
        {content=id, color=BTN_COR.primary, outline=false, cssClass="", size=BTN_SIZE.normal, disabled=false, dropdownOptions=new Map()}={}){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5DropdownButton', 'constructor', 'options', true);

        // 参数校验（优化）
        let ddoptionsVal = vu.autoVnAofMap(dropdownOptions, 'Bs5DropdownButton', 'constructor', 'dropdownOptions');
        
        // 父类初始化（这里面有参数校验，所以不用重复了。）
        super(id, {content, color, outline, cssClass, size, disabled});
        
        // 私有属性初始化
        this.#dropdownInfoMap = new Map();
        // 参数初始化
        this.addDropdownInfoByObject(ddoptionsVal);

        // 添加一些固有属性 data-bs-toggle="dropdown" aria-expanded="false"
        this.addAttribute('data-bs-toggle', 'dropdown');
        this.addAttribute('aria-expanded', 'false');
        // 添加一个固有样式 到按钮上 class='dropdown-toggle'
        this.addCssClass('dropdown-toggle');
    }

    //============================ 下拉信息的增\删\改\操作

    /**
     * 以一个 Map (图) 的方式，添加下拉信息。如果需要显示分界线，请写 一个 value 为 'divider' 的键值对。
     * @param {Map} myOptions 一般以 Map 比如: new Map([['option1', '测试1'], ['option2', '测试2']]) 的形式处理
     * @throws 如果参数异常会抛出 ParamValidError  
     */
    addDropdownInfoByObject(myOptions){
        // 参数校验（优化）
        vu.autoVnAofMap(myOptions, 'Bs5DropdownButton', 'addDropdownInfoByObject', 'myOptions');
        // 如果有传入初始属性信息，则遍历赋值
        myOptions.forEach((value, key)=>{
            // 将键值对，交给 另外一个 函数处理（如果键信息为 字符串 的话）
            if(du.isString(key)) this.addDropdownInfo(key, value);
        });
    }

    /**
     * 以键值对的方式，添加下拉信息。如果需要显示分界线，请写 一个 value 为 'divider' 的键值对。
     * @param {string} key 键名，将显示为 li 标签的属性值
     * @param {string|boolean|number} value 值，将显示为 li 标签的内容
     * @throws 如果参数异常会抛出 ParameterError 
     */
    addDropdownInfo(key, value){

        // 参数校验（优化）
        vu.autoVnAofString(key, 'Bs5DropdownButton', 'addDropdownInfo', 'key', false);
        vu.autoVnAofTargetObject(value, 'Bs5DropdownButton', 'addDropdownInfo', 'value', String, Number, Boolean);

        // 插入值（首先要保证，key值没有空字符；value 只能为简单值，字符串、数字、布尔型）
        let keyString = du.valueOfString(key).replace(/[\s]+/g, '');

        // 对于简单的 字符串，数字，布尔 对象，直接 打印即可。
        let valueString = `${value}`;

        // 最后处理（把值保存到 map 中）
        this.#dropdownInfoMap.set(keyString, valueString);
    }

    /**
     * 删除一个下拉信息，给出键名即可。
     * @param {string} key 下拉的键名
     * @throws 如果参数异常会抛出 ParameterError 
     */
    removeDropdownInfo(key){
        // 参数校验（优化）
        vu.autoVnAofString(key, 'Bs5DropdownButton', 'removeDropdownInfo', 'key', false);
        // 
        this.#dropdownInfoMap.delete(du.valueOfString(key));
    }

    /**
     * 清空下拉信息
     */
    clearDropdownInfo(){
        this.#dropdownInfoMap.clear();
    }

    //============================ 输出函数（重载）

    /**
     * 这里重载了父类的 toHtmlString 函数。因为 DropdownButton 不是一个简单的标签。它还附带 ul 和 li 标签。
     * @returns 一个 Html 的标签字符串
     */
    toHtmlString(){
        // 先获取 button 的标签输出结果
        let btnStr = super.toHtmlString();
        // 循环拼接 li 标签信息
        let liBuffer = '';
        this.#dropdownInfoMap.forEach((value, key)=>{
            // 如果内容是 'divider' ，则表示这里是一个分割线
            if(value.toLowerCase()==='divider'){
                liBuffer += `<li><hr class="dropdown-divider" /></li>\n`;
            }else{
                liBuffer += `<li>${new Bootstrap5Object('a', {class:'dropdown-item', href:'####', option:key}, [value]).toHtmlString()}</li>\n`;
            }
        });
        liBuffer = liBuffer.trim();
        // 下面拼接 ul 和 li 作为下拉信息
        let dropdownBtnStr = `${btnStr}\n<ul class="dropdown-menu">${ liBuffer.length>0 ? '\n'+liBuffer+'\n' : liBuffer }</ul>\n`;
        // 输出
        return dropdownBtnStr.trim();
    }
}

/**
 * 导出公用模块
 */
export {
    Bs5DropdownButton
}