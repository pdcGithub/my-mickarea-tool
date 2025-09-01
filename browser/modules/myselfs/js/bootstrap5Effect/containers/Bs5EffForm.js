/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffForm.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-26
 * @version 1.0.0 
 * @description  这个是 整个动态组件库的 表单容器类 。它继承于 Container 。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { protected_set_bootstrapobject, Bs5EffBaseComponent } from "../base/Bs5EffBaseComponent.js";
import { Bs5EffContainer } from "./Bs5EffContainer.js";
import { myRandomNumStr, Bs5Form } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 表单组件，它主要是作为一个其它组件的载体而存在，比如：Row, Col, Button 之类的。（有一点要注意的是，form 标签本身是没有什么样式可调整的）
 */
class Bs5EffForm extends Bs5EffContainer {

    /**
     * 表单组件，它主要是作为一个其它组件的载体而存在，比如：Row, Col, Button 之类的。（有一点要注意的是，form 标签本身是没有什么样式可调整的）
     * @param {string} id 组件ID
     * @param {object} [option] 关于容器的可选配置参数。
     * @param {Array<string|Bs5EffBaseComponent>} [option.initChildren] 初始的子组件数组，内部可以是 字符串 或者 其它组件
     */
    constructor(id=('form'+myRandomNumStr()), { initChildren=undefined }={}){

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffForm', 'constructor', 'option', true);

        // 参数校验
        vu.autoVnAofString(id, 'Bs5EffForm', 'constructor', 'id', false);
        if(initChildren!==undefined) vu.autoVnAofTargetObjectArray(initChildren, 'Bs5EffForm', 'constructor', 'initChildren', String, Bs5EffBaseComponent);

        // 父类初始化
        super(id, arguments[1]);

        // 替换掉父类初始化后的 内部 UI 组件 为 form 。（内部其实有初始化样式处理，但是 form 不需要改了，因为 form 没有什么样式）
        let tmp = new Bs5Form(id);
        this[protected_set_bootstrapobject](tmp);
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffForm
}