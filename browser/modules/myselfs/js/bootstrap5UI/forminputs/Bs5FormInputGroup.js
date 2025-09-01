/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5FormInputGroup.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-15
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 表单输入组 组件绘制类。
 */
"use strict";  // 这是严格模式下的 Javascript 代码

import { myRandomNumStr } from "../base/myBasicToolkit.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { protected_getContent, Bootstrap5Object } from "../base/Bootstrap5Object.js";
import { Bs5FormEditorObject } from "./Bs5FormEditorObject.js";



/**
 * 这是一个输入组，它不是一个单个的组件，它可能在一个组里面，有多个组件。比如：文字，输入框，按钮 等等。
 * 因此，对于它的处理，都是 操作 一个 div 标签。它上面有一个 input-group 样式。
 */
class Bs5FormInputGroup extends Bs5FormEditorObject {

    /**
     * 这里是 Bs5FormInputGroup 的构造函数。它不是一个标签，它有一些附带的标签，比如 标题，说明文本，异常文本等等。
     * 另外，要注意的是，这是一个输入组，它不是一个单个的组件，它可能在一个组里面，有多个组件。比如：文字，输入框，按钮 等等。
     * @param {string} id 这是 inputgroup 标签的 id 信息。它必须唯一。
     * @param {object} [options] 关于按钮的可选配置参数。
     * @param {string} [options.formObjs] 这是 内部的组件。可以为字符串，也可以为 Bootstrap5Object 组件
     * @param {string} [options.labelInfo] 这是 附带的 label 标签信息。即标题。
     * @param {string} [options.helperInfo] 这是 附带的 div 帮助标签的信息。
     * @param {string} [options.invalidInfo] 这是 附带的 div 校验异常标签的信息。
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id='fInputGroup'+myRandomNumStr(), {formObjs=[], labelInfo='标题', helperInfo='', invalidInfo=''}={} ){

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5FormInputGroup', 'constructor', 'options', true);

        // 参数校验（有些参数，父类有校验，这里就不校验了）
        vu.autoVnAofTargetObjectArray(formObjs, 'Bs5FormInputGroup', 'constructor', 'formObjs', String, Bootstrap5Object);

        // 调用父类的构造函数，初始化
        super('div', {id:id, labelInfo:labelInfo, helperInfo:helperInfo, invalidInfo:invalidInfo});
        
        // 处理 input-group 样式
        this.addCssClass('input-group');
        
        // 将元素插入父类的 content 容器中
        this.addContentElements(...formObjs);
    }

    /**
     * (重载父类的 getContentString 方法，因为这里 字符串 要 转换成 span 标签，而不是单独的字符串)
     * 获取 标签 内嵌元素的字符串。比如标签 <div>aaa</div> 中，内嵌的就是 'aaa' 这个字符串。内嵌元素，一般是 Bootstrap5Object 或者 字符串
     * @returns 内嵌元素的字符串
     */
    getContentString() {
        // 循环
        return this[protected_getContent]().map(value=>{
            if(du.isTargetObject(value, Bootstrap5Object)){
                // 如果是 Bootstrap5Object 对象，直接 toHtmlString
                return value.toHtmlString();
            }else if(du.isString(value)){
                // 如果是 字符串，改为 span 标签，再 toHtmlString
                return new Bootstrap5Object('span', {class:'input-group-text'}, [du.valueOfString(value)]).toHtmlString();
            }else{
                // 其它直接输出
                return value;
            }
        }).join('\n');
    }

    /**
     * (这里重载了父类的 enable 方法，因为如果按钮组 启用 或者 禁用，应该是处理它的子元素，而不是 按钮组 这个容器) 
     * 按钮组的启用
     */
    enable(){
        // 遍历 私有属性 #content 数组，将 Bootstrap5Object 都设置为 enable
        this[protected_getContent]().forEach(value=>{
            if(du.isTargetObject(value, Bootstrap5Object)){
                value.enable();
            }
        });
    }

    /**
     * (这里重载了父类的 disable 方法，因为如果按钮组 启用 或者 禁用，应该是处理它的子元素，而不是 按钮组 这个容器) 
     * 按钮组的禁用
     */
    disable(){
        // 遍历 私有属性 #content 数组，将 Bootstrap5Object 都设置为 diabled
        this[protected_getContent]().forEach(value=>{
            if(du.isTargetObject(value, Bootstrap5Object)){
                value.disable();
            }
        });
    }

}

/**
 * 导出公用部分
 */
export{
    Bs5FormInputGroup
}