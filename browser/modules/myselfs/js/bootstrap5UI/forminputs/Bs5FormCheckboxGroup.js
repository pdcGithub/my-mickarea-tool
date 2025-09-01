/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5FormCheckboxGroup.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-15
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 表单 复选框绘制类。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5FormInputGroup } from "./Bs5FormInputGroup.js";
import { Bootstrap5Object } from "../base/Bootstrap5Object.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { Bs5SingleInput } from "../singleinputs/Bs5SingleInput.js";

/**
 * 这是一个 checkbox 组，它不是一个单个的组件，它可能在一个组里面，有一个或者多个 checkbox。在处理上，它是继承自 FormInputGroup 输入组的。
 */
class Bs5FormCheckboxGroup extends Bs5FormInputGroup {

    #checkboxGroupId ; // 这是勾选框组 的 ID，一般用于 name 属性。
    #checkboxType ; // 这是复选框的类型，方便复用
    #checkboxRole ; // 这是复选框的 role 值，一般用于 switch 。
    #checkboxMap ; // 勾选框内容，这里是一个 Map 集合
    #checkedValue ; // 选中的内容，这里是一个 Set 集合。因为 checkbox 可以选中多个。
    #showInline ;  // 是否将复选框都 显示为 一个行内。如果为 false ，则 一个一行；true 则 全部在一行。
    #isEnable ; //是否可用

    /**
     * 这是一个 checkbox 组，它不是一个单个的组件，它可能在一个组里面，有一个或者多个 checkbox。在处理上，它是继承自 FormInputGroup 输入组的。
     * @param {string} id 这是 Bs5FormCheckboxGroup 组件的 id 信息。它必须唯一。
     * @param {object} [options] 关于可选配置参数。
     * @param {Map} [options.checkboxObjs] 这个是复选框的选项。它应该是一个 Map 。键值对对应 选项的值 和 名称
     * @param {boolean} [options.showInline] 这些复选框是否显示为 一行，默认 true
     * @param {string} [options.type] 这些复选框的类型，默认是 checkbox 。
     * @param {string} [options.role] 这些复选框的角色，默认是 空字符串
     * @param {string} [options.labelInfo] 这是 附带的 label 标签信息。即标题。
     * @param {string} [options.helperInfo] 这是 附带的 div 帮助标签的信息。
     * @param {string} [options.invalidInfo] 这是 附带的 div 校验异常标签的信息。
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id='fChkboxGroup'+myRandomNumStr(), 
        {checkboxObjs=new Map(), showInline=true, labelInfo='标题', helperInfo='', invalidInfo='', type='checkbox', role=''}={}){

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5FormCheckboxGroup', 'constructor', 'options', true);
        
        // 参数校验
        vu.autoVnAofMap(checkboxObjs, 'Bs5FormCheckboxGroup', 'constructor', 'checkboxObjs');

        // 调用父类的构造函数，初始化
        super(id, {labelInfo:labelInfo, helperInfo:helperInfo, invalidInfo:invalidInfo});

        // 数值处理（私有值）
        this.#checkboxGroupId = vu.autoVnAofString(id, 'Bs5FormCheckboxGroup', 'constructor', 'id', false);
        this.#checkboxType = vu.autoVnAofString(type, 'Bs5FormCheckboxGroup', 'constructor', 'type');
        this.#checkboxRole = vu.autoVnAofString(role, 'Bs5FormCheckboxGroup', 'constructor', 'role');
        this.#checkboxMap = new Map();
        this.#checkedValue = new Set();
        this.#showInline = vu.autoVnAofBoolean(showInline, 'Bs5FormCheckboxGroup', 'constructor', 'showInline');
        this.#isEnable = true;
        // 设置 checkbox
        this.addCheckboxByObject(checkboxObjs);
    }

    // ========================== 一些关于 checkbox 的操作 ==== 增、删、选中、清空、获取html字符串 =====

    /**
     * 以一个 Map 的形式，为组件添加 复选框的内容信息
     * @param {Map} checkboxObjs 这个是复选框的选项。它应该是一个 Map 。键值对对应 选项的值 和 名称
     */
    addCheckboxByObject(checkboxObjs=new Map()){
        // 参数校验
        vu.autoVnAofMap(checkboxObjs, 'Bs5FormCheckboxGroup', 'addCheckboxByObject', 'checkboxObjs');

        // 如果有传入初始属性信息，则遍历赋值
        checkboxObjs.forEach((value, key)=>{
            // 在存储时，全部转为字符串形式
            this.#checkboxMap.set(`${key}`, `${value}`);
        });
    }

    /**
     * 删除一个 复选框的内容信息。因为内容都是以字符串的形式存储，所以参数需要是字符串
     * @param {string} checkboxKey 要删除的内容 所对应的 键信息
     */
    removeCheckbox(checkboxKey){
        this.#checkboxMap.delete(`${checkboxKey}`);
    }

    /**
     * 设置复选框，所选中的内容信息。选中的内容会有一个 checked 属性
     * @param  {...string} keys 要选中的复选框，他们的键信息。不定参数
     */
    checked(...keys){
        keys.forEach(value=>{
            this.#checkedValue.add(`${value}`);
        });
    }

    /**
     * 清空选中信息
     */
    unchecked(){
        this.#checkedValue.clear();
    }

    /**
     * 清空复选框的内容信息
     */
    clearCheckboxes(){
        this.#checkboxMap.clear();
    }

    /**
     * 根据 复选框的内容信息 构建一个 form-check 标签对象。它内部有2个标签， label 和 input[type=checkbox]
     * @param {number} index 复选框的序号，一般又遍历程序提供
     * @param {string} key 复选框的值，显示为 input 的 value
     * @param {string} value 复选框的名称，显示为 label 信息
     * @returns {Bootstrap5Object} 一个 form-check 标签对象
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。 
     */
    createFormCheck(index, key, value){
        // 参数校验
        let i = vu.autoVnAofNumber(index, 'Bs5FormCheckboxGroup', 'createFormCheck', 'index');
        let kVal = vu.autoVnAofString(key, 'Bs5FormCheckboxGroup', 'createFormCheck', 'key');
        let vVal = vu.autoVnAofString(value, 'Bs5FormCheckboxGroup', 'createFormCheck', 'value');
        //
        let checkboxId = this.#checkboxGroupId+'_'+i;
        let label = new Bootstrap5Object('label', {class:'form-check-label', for:checkboxId}, [vVal]);
        let input = new Bs5SingleInput(checkboxId, {type:this.#checkboxType});
        input.addAttributeByObject({name:this.#checkboxGroupId, value:kVal});
        input.clearCssClasses();
        input.addCssClass('form-check-input');
        // 去掉 placeholder
        input.removeAttribute('placeholder');
        // 如果role有值，还需要设置 role
        if(this.#checkboxRole.trim().length>0){
            input.addAttribute('role', this.#checkboxRole.trim());
        }
        // 如果是选中，还需要加 checked 属性
        if(this.#checkedValue.has(kVal)){
            input.addAttribute('checked', true);
        }
        // 如果禁用，增加 disabled 属性
        if(!this.#isEnable){
            input.disable();
        }
        // 组装(根据排版动态处理)
        let formCheck = new Bootstrap5Object('div', {class:`form-check${this.#showInline?' form-check-inline':''}`});
        if(this.#checkboxRole.trim().toLowerCase()==='switch'){
            // 如果是 switch ，还需要加一个样式
            formCheck.addCssClass('form-switch');
        }
        if(!this.#showInline){
            // 如果不是显示为一行，需要去掉 input-group 样式
            this.removeCssClass('input-group');
        }
        formCheck.addContentElements(input, label);
        // 输出
        return formCheck;
    }

    /**
     * 根据复选框的配置信息，生成一个 复选框 对象的数组，便于后续处理
     * @returns {Array} 复选框 对象的数组，便于后续处理
     */
    getCheckboxArray(){
        // 先处理 选项
        let arr = [];
        //
        let count = 0;
        this.#checkboxMap.forEach((myvalue, mykey)=>{
            // 先生成一个 option 标签
            arr.push(this.createFormCheck(count, mykey, myvalue));
            count += 1;
        });
        //输出数组
        return arr;
    }

    /**
     * (这里重载了父类的 enable 方法，因为 checkbox 不是直接放入 content 中的。它是存放在一个 map 中。所以在 enable 和 disable 的处理要按状态来。) 
     * 按钮组的启用
     */
    enable(){
        this.#isEnable = true;
    }

    /**
     * (这里重载了父类的 disable 方法，因为 checkbox 不是直接放入 content 中的。它是存放在一个 map 中。所以在 enable 和 disable 的处理要按状态来。) 
     * 按钮组的禁用
     */
    disable(){
        this.#isEnable = false;
    }

    /**
     * (重载父类的 toHtmlString 方法，因为这里不是一个标签的处理，是几个并排标签的处理)
     * 输出一个带有 Html 标签信息的字符串
     * @returns {string} Html 标签信息的字符串
     */
    toHtmlString() {
        // 先将 option 数组放入 contents
        this.clearContents();
        this.addContentElements(...this.getCheckboxArray());
        // 再调用父类的输出
        return super.toHtmlString();
    }

}

/**
 * 导出公用部分
 */
export{
    Bs5FormCheckboxGroup
}