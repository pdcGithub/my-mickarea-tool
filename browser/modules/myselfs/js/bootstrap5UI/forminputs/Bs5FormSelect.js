/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5FormSelect.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-15
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 表单下拉框 组件绘制类。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { DataUtil as du } from "../../../../../utils/datatype.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { Bs5FormEditorObject } from "./Bs5FormEditorObject.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";
import { Bootstrap5Object } from "../base/Bootstrap5Object.js";

/**
 * 这个是 Bootstrap 5 中 表单里面的一个 select 选择框。它不是一个标签，它有一些附带的标签，比如 标题，说明文本，异常文本等等。
 * 它继承了 FormEditorObject 类 (这个类是 Bootstrap5Object 类的子类) 。它的操作方法，操作的是这个选择框标签 &lt;select&gt; 本身。
 * 同时，它还附带了 FormEditorObject 中一些附属标签的处理方法。
 */
class Bs5FormSelect extends Bs5FormEditorObject {

    #myDropDownOpts ; // 这是 select 标签的选项
    #mySelectedKey ; // 这是 select 标签选中的选项 生成时 对应的 option 会增加一个 selected 属性

    /**
     * 这里是 Bs5FormSelect 的构造函数。它不是一个标签，它有一些附带的标签，比如 标题，说明文本，异常文本等等。
     * @param {string} id 这是 select 标签的 id 信息。它必须唯一。
     * @param {object} [options] 关于按钮的可选配置参数。
     * @param {Map} [options.dropDownOpts] 这是 select 标签的子标签 option 标签的内容。这是 下拉选项 内容，它是一个 Map。key是option 的值，value 是option 的展示内容 ；
     * @param {string} [options.placeholder] 这是 select 标签的 placeholder 属性信息。(可以不写，但是如果写了，会显示为第一个选项)
     * @param {string} [options.labelInfo] 标题内容。字符串，可为空。
     * @param {string} [options.helperInfo] 帮助信息内容。字符串，可为空。
     * @param {string} [options.invalidInfo] 校验信息内容。字符串，可为空。
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id='fSelect'+myRandomNumStr(), 
        {dropDownOpts=new Map(), placeholder='', labelInfo='标题', helperInfo='', invalidInfo=''}={}){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5FormSelect', 'constructor', 'options', true);
        
        // 参数校验（父类有参数校验，同样的参数无需过多校验）
        vu.autoVnAofMap(dropDownOpts, 'Bs5FormSelect', 'constructor', 'dropDownOpts');
        let placeholderVal = vu.autoVnAofString(placeholder, 'Bs5FormSelect', 'constructor', 'placeholder');

        // 调用父类的构造函数，初始化
        super('select', {id:id, labelInfo:labelInfo, helperInfo:helperInfo, invalidInfo:invalidInfo});

        // 开始自己的调整
        this.addCssClass('form-select');

        // 私有对象初始化
        this.#myDropDownOpts = new Map();
        this.#mySelectedKey = null;

        // 填入第一个选项（如果有 placeholder 信息的话）
        if(placeholderVal.trim().length>0){
            this.addOptionsByObject(du.genMap('', placeholderVal.trim()));
        }else{
            // 默认给一个空的选项吧，否则 后面的内容会显示为第一个
            this.addOptionsByObject(du.genMap('', ''));
        }
        // 然后填入其它选项
        this.addOptionsByObject(dropDownOpts);
    }

    // ========================== 一些关于 options 的操作 ==== 增、删、选中、清空、获取html字符串 =====

    /**
     * 添加 select 标签的选项内容。即 &lt;option&gt; 标签。
     * @param {Map} dropDownOpts 这是 select 标签的子标签 option 标签的内容。这是 下拉选项 内容，它是一个 Map。key是option 的值，value 是option 的展示内容 ；
     * @throws 如果参数 param 校验不通过，会抛出 ParamValidError 异常 ； 运行时，也可能抛出其它异常
     */
    addOptionsByObject(dropDownOpts){
        // 参数校验
        vu.autoVnAofMap(dropDownOpts, 'Bs5FormSelect', 'addOptionsByObject', 'dropDownOpts');
        // 如果有传入初始属性信息，则遍历赋值
        dropDownOpts.forEach((value, key)=>{
            // 在存储时，全部转为字符串形式
            this.#myDropDownOpts.set(`${key}`, `${value}`);
        });
    }

    /**
     * 添加 select 标签的选项内容。即 &lt;option&gt; 标签。
     * @param {*} optionKey 添加 option 时的 key 值
     */
    removeOption(optionKey){
        this.#myDropDownOpts.delete(optionKey);
    }

    /**
     * 将一个 &lt;option&gt; 标签 标记为 选中。即增加一个 selected 属性。
     * @param {*} optionKey 
     */
    selected(optionKey){
        this.#mySelectedKey = optionKey+'';
    }

    /**
     * 将 &lt;option&gt; 标签的 选中标记移除。
     */
    unselected(){
        this.#mySelectedKey = null;
    }

    /**
     * 将标签 &lt;select&gt; 内部登记的 所有 &lt;option&gt; 标签相关的信息清空。
     */
    clearOptions(){
        this.#myDropDownOpts.clear();
    }

    /**
     * 获取当前所有的 &lt;option&gt; 标签相关的信息
     * @returns {Array<Bootstrap5Object>}一个数组，内部元素是 Bootstrap5Object 类型的 &lt;option&gt; 标签 对象
     */
    getOptionArray(){
        // 先处理 选项
        let optionArr = [];
        //
        this.#myDropDownOpts.forEach((myvalue, mykey)=>{
            // 先生成一个 option 标签
            let tmpOption = new Bootstrap5Object('option', {value:mykey}, [myvalue]);
            // 判断是否需要 加 selected 属性
            if((mykey+'')===this.#mySelectedKey){
                tmpOption.addAttribute('selected', true);
            }
            // 放入数组
            optionArr.push(tmpOption);
        });
        //输出数组
        return optionArr;
    }

    /**
     * (重载父类的 toHtmlString 方法，因为这里不是一个标签的处理，是几个并排标签的处理)
     * 输出一个带有 Html 标签信息的字符串
     * @returns {string} Html 标签信息的字符串
     */
    toHtmlString() {
        // 先将 option 数组放入 contents
        this.clearContents();
        this.addContentElements(...this.getOptionArray());
        // 再调用父类的输出
        return super.toHtmlString();
    }

}

/**
 * 导出公用部分
 */
export {
    Bs5FormSelect
}