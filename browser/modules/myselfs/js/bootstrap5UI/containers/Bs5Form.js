/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5Form.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-14
 * @version 1.0.0 
 * @description  Bootstrap 5 样式的表单，它是一个容器不是组件。它内嵌的才是组件。表单以 行、列 的方式组织内容。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { Bootstrap5Object } from "../base/Bootstrap5Object.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";

/**
 * Bootstrap 5 样式的表单，它是一个容器不是组件。它内嵌的才是组件。
 * 表单以 行、列 的方式组织内容。所以， FormRow 是内嵌到 Form 里面的
 */
class Bs5Form extends Bootstrap5Object {

    /**
     * 这是表单标签 <form> 的 构造处理，它一般没有什么特别需要处理的。
     * @param {string} id form 标签的 id 属性。如果不填写，默认是随机生成的。
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id=('form'+myRandomNumStr())){
        // 参数校验（优化）
        let idVal = vu.autoVnAofString(id, 'Bs5Form', 'constructor', 'id', false);
        // 父类构造函数，初始化（由于form有个默认提交处理，所以要先禁用掉）
        super('form', {id:idVal, onsubmit:'return false;'});
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5Form
}