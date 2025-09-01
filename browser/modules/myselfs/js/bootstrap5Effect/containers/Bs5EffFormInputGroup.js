/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffFormInputGroup.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-26
 * @version 1.0.0 
 * @description 这个是 整个动态组件库的 整合表单输入组 容器类 。它继承于 InputGroup 。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { protected_set_bootstrapobject, protected_get_bootstrapobject, protected_get_myId } from "../base/Bs5EffBaseComponent.js";
import { Bs5EffInputGroup } from "./Bs5EffInputGroup.js";
import { Bs5EffButton } from "../buttons/Bs5EffButton.js";
import { Bs5EffButtonGroup } from "./Bs5EffButtonGroup.js";
import { Bs5EffInput } from "../inputs/Bs5EffInput.js";
import { Bs5FormInputGroup, myRandomNumStr } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * FormInputGroup 输入组件是一个容器，但是它也有自己的处理。它有子组件，比如 ：文本，Button, ButtonGroup, Input 等等 之类的，都可以。
 * 理论上来说，FormInputGroup 只是 InputGroup 的一个变种。除了容器外，它有一些附带的标签，比如 标题，说明文本，异常文本等等。
 */
class Bs5EffFormInputGroup extends Bs5EffInputGroup {

    /**
     * FormInputGroup 输入组件是一个容器，但是它也有自己的处理。它有子组件，比如 ：文本，Button, ButtonGroup, Input 等等 之类的，都可以。
     * 理论上来说，FormInputGroup 只是 InputGroup 的一个变种。除了容器外，它有一些附带的标签，比如 标题，说明文本，异常文本等等。
     * @param {string} id 组件ID
     * @param {object} [formconfig] 关于表单的可选配置参数。
     * @param {string} [formconfig.formCssClass] 表单组件的样式，影响 input-group 整个容器 ；
     * @param {string} [formconfig.labelInfo] 表单项的标题 ；
     * @param {string} [formconfig.helperInfo] 表单项的帮助信息 ；
     * @param {string} [formconfig.invalidInfo] 表单项校验信息 ；
     * @param {object} [comptconfig] 关于输入组的可选配置参数。
     * @param {Array<String|Bs5EffButton|Bs5EffButtonGroup|Bs5EffInput>} [comptconfig.initChildren] 初始的子组件数组，可以是 字符串 或者 其它组件 ；
     */
    constructor(id=('fInputGroup'+myRandomNumStr()), 
        { formCssClass='', labelInfo='', helperInfo='', invalidInfo='' }={}, 
        { initChildren=undefined }={}){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffFormInputGroup', 'constructor', 'formconfig', true);
        vu.autoVnAofObjectLiteral(arguments[2], 'Bs5EffFormInputGroup', 'constructor', 'comptconfig', true);
        
        // 内部参数校验（表单附属部分）
        let formCssClassVal = vu.autoVnAofString(formCssClass, 'Bs5EffFormInputGroup', 'constructor', 'formCssClass');
        vu.autoVnAofString(labelInfo, 'Bs5EffFormInputGroup', 'constructor', 'labelInfo');
        vu.autoVnAofString(helperInfo, 'Bs5EffFormInputGroup', 'constructor', 'helperInfo');
        vu.autoVnAofString(invalidInfo, 'Bs5EffFormInputGroup', 'constructor', 'invalidInfo');
        // 内部参数校验（组件实际需要部分）
        if(initChildren!==undefined) vu.autoVnAofTargetObjectArray(initChildren, 'Bs5EffFormInputGroup', 'constructor', 'initChildren',
            String, Bs5EffButton, Bs5EffButtonGroup, Bs5EffInput
        );
        
        // 父类初始化
        super(id, arguments[2]);
        
        // 替换掉父类初始化后的 内部 UI 组件 为 
        let tmp = new Bs5FormInputGroup(id, {formObjs:[], labelInfo:labelInfo, helperInfo:helperInfo, invalidInfo:invalidInfo});
        this[protected_set_bootstrapobject](tmp);
        
        // 如果有自定义样式，在这里添加（这里是关于 input-group 容器的样式，不是子组件的）
        if(formCssClassVal.trim().length>0) this[protected_get_bootstrapobject]().addCssClass(formCssClassVal);
    }

    /**
     * 在组件写入页面后，重新设置 标题信息 
     * @param {string} infoString 标题信息 
     */
    resetLabelInfo(infoString){
        // 参数校验
        let val = vu.autoVnAofString(infoString, 'Bs5EffFormInputGroup', 'resetLabelInfo', 'infoString');
        // 
        let target = document.getElementById(this[protected_get_myId]()+'Label');
        if(target){
            target.innerHTML = val;
        }
    }

    /**
     * 在组件写入页面后，重新设置 帮助信息 
     * @param {string} infoString 帮助信息 
     */
    resetHelperInfo(infoString){
        // 参数校验
        let val = vu.autoVnAofString(infoString, 'Bs5EffFormInputGroup', 'resetHelperInfo', 'infoString');
        //
        let target = document.getElementById(this[protected_get_myId]()+'Helper');
        if(target){
            target.innerHTML = val;
        }
    }

    /**
     * 在组件写入页面后，重新设置 校验信息
     * @param {string} infoString 校验信息
     */
    resetValidInfo(infoString){
        // 参数校验 
        let val = vu.autoVnAofString(infoString, 'Bs5EffFormInputGroup', 'resetValidInfo', 'infoString');
        // 
        let target = document.getElementById(this[protected_get_myId]()+'Invalid');
        if(target){
            target.innerHTML = val;
        }
    }

    /**
     * (重载父类方法，因为 FormInputGroup 的 隐藏、显示 不是单单这个 group 而是多个标签的隐藏) 组件的显示操作。
     */
    show(){
        let target = document.getElementById(this[protected_get_myId]());
        if(target.parentElement.classList.contains('col')){
            // 如果在列内，直接把这个列 显示 即可
            target.parentElement.classList.remove('visually-hidden');
        }else{
            // 否则，需要把几个东西显示一下
            document.getElementById(this[protected_get_myId]()+'Label').classList.remove('visually-hidden');
            document.getElementById(this[protected_get_myId]()+'Helper').classList.remove('visually-hidden');
            document.getElementById(this[protected_get_myId]()+'Invalid').classList.remove('visually-hidden');
            target.classList.remove('visually-hidden');
        }
    }

    /**
     * (重载父类方法，因为 FormInputGroup 的 隐藏、显示 不是单单这个 group 而是多个标签的隐藏) 组件的隐藏操作
     */
    hide(){
        let target = document.getElementById(this[protected_get_myId]());
        if(target.parentElement.classList.contains('col')){
            // 如果在列内，直接把这个列 隐藏 即可
            target.parentElement.classList.add('visually-hidden');
        }else{
            // 否则，需要把几个东西隐藏一下
            document.getElementById(this[protected_get_myId]()+'Label').classList.add('visually-hidden');
            document.getElementById(this[protected_get_myId]()+'Helper').classList.add('visually-hidden');
            document.getElementById(this[protected_get_myId]()+'Invalid').classList.add('visually-hidden');
            target.classList.add('visually-hidden');
        }
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffFormInputGroup
}