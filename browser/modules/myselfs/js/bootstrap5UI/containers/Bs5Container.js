/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5Container.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-14
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 容器类。容器是 Bootstrap 中最基本的布局元素，在使用我们的默认网格系统时是必需的。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { Bootstrap5Object } from "../base/Bootstrap5Object.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";

/**
 * Bootstrap 5 样式的主要容器。 它的基本构建块，用于在给定设备或视口中包含、填充和对齐您的内容。
 * 容器是 Bootstrap 中最基本的布局元素，在使用我们的默认网格系统时是必需的。
 * 容器用于包含、填充和（有时）将其中的内容居中。虽然容器可以嵌套，但大多数布局不需要嵌套容器。
 */
class Bs5Container extends Bootstrap5Object {

    /**
     * container 作为一个容器，它是不需要过多的处理的。它内部可以嵌入所有内容
     * @param {string} id container 容器的 id 属性。如果不填写，默认是随机生成的。
     * @param {boolean} isFluid 是否横向铺满；如果为 true，则铺满；否则，不铺满
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id=('container'+myRandomNumStr()), isFluid=false){
        // 参数校验（优化）
        let idVal = vu.autoVnAofString(id, 'Bs5Container', 'constructor', 'id', false);
        let isFluidVal = vu.autoVnAofBoolean(isFluid, 'Bs5Container', 'constructor', 'isFluid');
        // 父类构造函数，初始化
        super('div', {id:idVal, class:`container${isFluidVal?'-fluid':''}`});
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5Container
}