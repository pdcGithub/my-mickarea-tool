/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5FormEditorObject.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-14
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 表单组件绘制类 的基类。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";
import { Bootstrap5Object } from "../base/Bootstrap5Object.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";

/**
 * 这个是 Bs5FormEditorObject 上 一个私有的方法名，获取 私有属性 #label 对象 它是一个 Bootstrap5Object 类型的数据
 */
const protected_getFormLabelObject = Symbol.for('mybs5_get_form_label_object');
/**
 * 这个是 Bs5FormEditorObject 上 一个私有的方法名，获取 私有属性 #helper 对象 它是一个 Bootstrap5Object 类型的数据
 */
const protected_getFormHelperObject = Symbol.for('mybs5_get_form_helper_object');
/**
 * 这个是 Bs5FormEditorObject 上 一个私有的方法名，获取 私有属性 #invalidInfo 对象 它是一个 Bootstrap5Object 类型的数据
 */
const protected_getFormInvalidInfoObject = Symbol.for('mybs5_get_form_invalid_info_object');

/**
 * 这是一个表单中的可编辑组件的绘制基础类。它主要有几个通用的部分：标题，帮助信息，异常信息，以及自己本身。
 * 比如：FormInput ，它其实是一个 input 标签，但是它可以控制附带的 label, div 等标签；
 * 但是，如果是 FromInputGroup ，它是一个 div 标签，内部是一些其它标签，比如 span, input 。
 */
class Bs5FormEditorObject extends Bootstrap5Object {

    #label ; // 这是标题信息标签
    #helper ; // 这是帮助信息标签
    #invalidInfo ; // 这是校验异常标签

    /**
     * 这里是一个 可编辑组件的绘制基础类 的构造函数。它会初始化一些东西，比如：标题，帮助信息，异常信息，以及自己本身。
     * @param {string} tagName 这个表单编辑组件的实际标签名。比如 input ，div 等等。
     * @param {object} [options] 关于按钮的可选配置参数。
     * @param {string} [options.id] 组件的ID信息，内容必须唯一。非空字符串
     * @param {string} [options.labelInfo] 标题内容。字符串，可为空。
     * @param {string} [options.helperInfo] 帮助信息内容。字符串，可为空。
     * @param {string} [options.invalidInfo] 校验信息内容。字符串，可为空。
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(tagName='formEditor', 
        {id='fEditorObj'+myRandomNumStr(), labelInfo='标题', helperInfo='', invalidInfo=''}={}){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5FormEditorObject', 'constructor', 'options', true);

        // 参数验证（优化）
        let tagVal = vu.autoVnAofString(tagName, 'Bs5FormEditorObject', 'constructor', 'tagName', false);
        let idVal = vu.autoVnAofString(id, 'Bs5FormEditorObject', 'constructor', 'id', false);
        let labelVal = vu.autoVnAofString(labelInfo, 'Bs5FormEditorObject', 'constructor', 'labelInfo');
        let helperInfoVal = vu.autoVnAofString(helperInfo, 'Bs5FormEditorObject', 'constructor', 'helperInfo');
        let invalidVal = vu.autoVnAofString(invalidInfo, 'Bs5FormEditorObject', 'constructor', 'invalidInfo');

        // 值提取
        let labelId = idVal + 'Label';
        let helperIdVal = idVal + 'Helper'; // 根据 ID 生成一个, 帮助信息标签的 helperId
        let invalidIdVal = idVal + 'Invalid';

        // 本标签，调用 父类初始化
        super(tagVal, {id:idVal});

        // 辅助标签初始化
        this.#label = new Bootstrap5Object('label', {id:labelId, for:idVal, class:'form-label'}, [labelVal]);
        this.#helper = new Bootstrap5Object('div', {id:helperIdVal, class:'form-text'}, [helperInfoVal]);
        this.#invalidInfo = new Bootstrap5Object('div', {id:invalidIdVal, class:'invalid-feedback'}, [invalidVal]);

        // aria-describedby 属性处理
        this.addAttribute('aria-describedby', helperIdVal);
    }

    // =============================  这里是一些只有子类知道的函数

    /**
     * 获取 私有属性 #label 对象 它是一个 Bootstrap5Object 类型的数据
     * @returns 私有属性 #label 对象
     */
    [protected_getFormLabelObject](){
        return this.#label;
    }

    /**
     * 获取 私有属性 #helper 对象 它是一个 Bootstrap5Object 类型的数据
     * @returns 私有属性 #helper 对象
     */
    [protected_getFormHelperObject](){
        return this.#helper;
    }

    /**
     * 获取 私有属性 #invalidInfo 对象 它是一个 Bootstrap5Object 类型的数据
     * @returns 私有属性 #invalidInfo 对象
     */
    [protected_getFormInvalidInfoObject](){
        return this.#invalidInfo;
    }

    // =============================

    /**
     * 设置 label 标签的内容，也就是 标题信息。
     * @param {string} labelInfo 标题信息
     * @throws 参数校验时，以及 执行时，都可能发生错误，然后抛出。至于抛出的类型 可能为 ParamValidError， 也可能为 ParameterError。但，ParamValidError 是 ParameterError 的子类。
     */
    setLabelInfo(labelInfo){
        // 参数校验
        vu.autoVnAofString(labelInfo, 'Bs5FormEditorObject', 'setLabelInfo', 'labelInfo');
        // 开始操作
        this.#label.clearContents();
        this.#label.addContentElements(labelInfo);
    }

    /**
     * 设置 帮助信息 的内容
     * @param {string} helperInfo 帮助信息
     * @throws 参数校验时，以及 执行时，都可能发生错误，然后抛出。至于抛出的类型 可能为 ParamValidError， 也可能为 ParameterError。但，ParamValidError 是 ParameterError 的子类。
     */
    setHelperInfo(helperInfo){
        // 参数校验
        vu.autoVnAofString(helperInfo, 'Bs5FormEditorObject', 'setHelperInfo', 'helperInfo');
        // 开始操作
        this.#helper.clearContents();
        this.#helper.addContentElements(helperInfo);
    }

    /**
     * 设置 校验异常 的内容
     * @param {string} invalidInfo 校验异常 的内容
     * @throws 参数校验时，以及 执行时，都可能发生错误，然后抛出。至于抛出的类型 可能为 ParamValidError， 也可能为 ParameterError。但，ParamValidError 是 ParameterError 的子类。
     */
    setInvalidInfo(invalidInfo){
        // 参数校验
        vu.autoVnAofString(invalidInfo, 'Bs5FormEditorObject', 'setInvalidInfo', 'invalidInfo');
        // 开始操作
        this.#invalidInfo.clearContents();
        this.#invalidInfo.addContentElements(invalidInfo);
    }

    /**
     * 将label标签隐藏
     */
    setLabelHidden(){
        this.#label.addCssClass('visually-hidden');
    }
    /**
     * 将label标签显示
     */
    setLabelVisible(){
        this.#label.removeCssClass('visually-hidden');
    }

    /**
     * 将 帮助信息标签 隐藏
     */
    setHelperHidden(){
        this.#helper.addCssClass('visually-hidden');
    }
    /**
     * 将 帮助信息标签 显示
     */
    setHelperVisible(){
        this.#helper.removeCssClass('visually-hidden');
    }

    /**
     * (重载父类的 toHtmlString 方法，因为这里不是一个标签的处理，是几个并排标签的处理)
     * 输出一个带有 Html 标签信息的字符串
     * @returns {string} Html 标签信息的字符串
     */
    toHtmlString(){
        return [this.#label, super.toHtmlString(), this.#helper, this.#invalidInfo].map(value=>{
            // 如果是 Bootstrap5Object 类型的对象，则先输出 html 字符串
            return du.isTargetObject(value, Bootstrap5Object) ? value.toHtmlString() : value;
        }).join('\n');
    }
}

/**
 * 导出公用部分
 */
export{
    protected_getFormHelperObject, protected_getFormLabelObject, protected_getFormInvalidInfoObject,
    Bs5FormEditorObject
}