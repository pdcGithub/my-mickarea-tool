/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5Row.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-14
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 行 容器类。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { Bootstrap5Object } from "../base/Bootstrap5Object.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";

/**
 * 这个是 Bootstrap 5 的网格系统中的 行 类。它代表网格中的一行。
 */
class Bs5Row extends Bootstrap5Object {

    /**
     * row 作为一个 二级容器，一般是跟 container 搭配使用的。它一般只有 class 样式需要调整。
     * @param {string} id container 容器的 id 属性。如果不填写，默认是随机生成的。
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id=('row'+myRandomNumStr())){
        // 参数校验（优化）
        let idVal = vu.autoVnAofString(id, 'Bs5Row', 'constructor', 'id', false);
        // 父类构造函数，初始化
        super('div', {id:idVal, class:'row'});
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5Row
}