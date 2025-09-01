/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5ToastContainer.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-15
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 Toast 消息容器 的绘制处理类
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bootstrap5Object } from "../base/Bootstrap5Object.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 这是 Toast 消息的一个容器。它用于装载 Toast 消息
 */
class Bs5ToastContainer extends Bootstrap5Object {

    /**
     * toast-container 作为一个容器，它是不需要过多的处理的。它内部可以嵌入 Toast 消息标签
     * @param {string} id toast-container 容器的 id 属性。如果不填写，默认是随机生成的。
     * @param {string} position 容器的位置样式信息。默认是 右下角。bottom-0 end-0
     * @throws 如果参数异常会抛出 ParameterError 
     */
    constructor(id='toastSets'+myRandomNumStr(), position='bottom-0 end-0 p-3'){
        // 参数校验（优化）
        let idVal = vu.autoVnAofString(id, 'Bs5ToastContainer', 'constructor', 'id', false);
        let positionVal = vu.autoVnAofString(position, 'Bs5ToastContainer', 'constructor', 'position');
        // 父类构造函数，初始化
        super('div', {id:idVal, class:`toast-container position-fixed ${positionVal}`});
    }
}

/**
 * 导出公用部分
 */
export{
    Bs5ToastContainer
}