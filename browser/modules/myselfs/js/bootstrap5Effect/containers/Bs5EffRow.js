/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffRow.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-26
 * @version 1.0.0 
 * @description  这个是 整个动态组件库的 表单中的 行(row)容器类 。它继承于 Container 。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5EffContainer } from "./Bs5EffContainer.js";
import { Bs5EffBaseComponent, protected_set_bootstrapobject, protected_get_bootstrapobject } from "../base/Bs5EffBaseComponent.js";
import { myRandomNumStr, Bs5Row } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 行 组件，它主要是作为 Form 或者 Container 的子组件，即 children 。当然，它也可以有子组件，比如 ：Col 之类的，都可以
 */
class Bs5EffRow extends Bs5EffContainer {

    /**
     * 行 组件，它主要是作为 Form 或者 Container 的子组件，即 children 。当然，它也可以有子组件，比如 ：Col 之类的，都可以
     * @param {string} id 组件ID
     * @param {object} [option] 关于容器的可选配置参数。
     * @param {Array<string|Bs5EffBaseComponent>} [option.initChildren] 初始的子组件数组，内部可以是 字符串 或者 其它组件
     * @param {string} [option.cssClass] 容器的其它 样式。
     */
    constructor(id=('row'+myRandomNumStr()), { initChildren=undefined, cssClass='' }={}){

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffRow', 'constructor', 'option', true);

        // 参数校验
        vu.autoVnAofString(id, 'Bs5EffRow', 'constructor', 'id', false);
        vu.autoVnAofString(cssClass, 'Bs5EffRow', 'constructor', 'cssClass');
        if(initChildren!==undefined) vu.autoVnAofTargetObjectArray(initChildren, 'Bs5EffRow', 'constructor', 'initChildren', String, Bs5EffBaseComponent);

        // 父类初始化
        super(id, arguments[1]);

        // 替换掉父类初始化后的 内部 UI 组件 为 row 
        let tmp = new Bs5Row(id);
        this[protected_set_bootstrapobject](tmp);

        // 如果有自定义样式，在这里添加（因为上面替换了对象，所以初始化的 css 处理已经不起作用）
        if(cssClass.trim().length>0) this[protected_get_bootstrapobject]().addCssClass(cssClass);
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffRow
}