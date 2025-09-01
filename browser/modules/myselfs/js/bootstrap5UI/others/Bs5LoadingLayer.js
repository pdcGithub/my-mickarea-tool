/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5LoadingLayer.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-15
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 加载动画 的绘制处理类
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bootstrap5Object } from "../base/Bootstrap5Object.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 这是页面处理时，显示加载中的遮罩层
 */
class Bs5LoadingLayer extends Bootstrap5Object {

    /**
     * 这是页面处理时，显示加载中的遮罩层
     * @param {string} id 遮罩层的 ID
     * @param {string} type 遮罩层的加载图形。默认是 border ，也可以修改为 grow
     */
    constructor(id='loadingLayer'+myRandomNumStr(), type='border'){

        // 参数校验
        let idVal = vu.autoVnAofString(id, 'Bs5LoadingLayer', 'constructor', 'id', false).trim();
        let typeVal = vu.autoVnAofString(type, 'Bs5LoadingLayer', 'constructor', 'type', false).trim();

        // 先拼接可用的内部信息
        let children = [];

        if(typeVal.toLocaleLowerCase() === 'grow'){
            // 对于grow模式来说，就是 3 个会闪的东西
            children.push(`<div class="spinner-grow text-danger me-1" role="status"><span class="visually-hidden">Loading...</span></div>`);
            children.push(`<div class="spinner-grow text-warning me-1" role="status"><span class="visually-hidden">Loading...</span></div>`);
            children.push(`<div class="spinner-grow text-info me-1" role="status"><span class="visually-hidden">Loading...</span></div>`);
        }else{
            // 普通类型来说，就是一个转圈的东西
            children.push(`<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`);
        }
        //父类构造函数，初始化
        super('div', {id:idVal, type:'loading', class:'modal align-items-center justify-content-center'}, children);
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5LoadingLayer
}