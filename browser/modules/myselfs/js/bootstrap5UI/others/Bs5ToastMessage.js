/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5ToastMessage.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-15
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 Toast 消息 绘制类
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bootstrap5Object } from "../base/Bootstrap5Object.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 这是一种消息弹窗，它名字叫 Toast 。这种消息不会阻塞，在画面上看起来好看些。在使用前要明确，页面上需要有一个 toast-container 样式的容器
 */
class Bs5ToastMessage extends Bootstrap5Object {

    /**
     * 这是一种消息弹窗，它名字叫 Toast 。这种消息不会阻塞。在使用前要明确，页面上需要有一个 toast-container 样式的容器，否则显示会出问题。
     * toast-container 的容器样式位置，决定了 Toast 消息的显示位置。
     * @param {string} id 组件ID
     * @param {string} message 消息内容
     * @param {string} title 消息标题
     */
    constructor(id='toast'+myRandomNumStr(), message='', title='温馨提示'){
        //参数校验
        let idVal = vu.autoVnAofString(id, 'Bs5ToastMessage', 'constructor', 'id', false).trim();
        let msgVal = vu.autoVnAofString(message, 'Bs5ToastMessage', 'constructor', 'message').trim();
        let titleVal = vu.autoVnAofString(title, 'Bs5ToastMessage', 'constructor', 'title').trim();
        //父类初始化
        super('div', {id:idVal, class:"toast", role:"alert", 'aria-live':"assertive", 'aria-atomic':"true"});
        //私有成员初始化
        let header = new Bootstrap5Object('div',{class:'toast-header'});
        let body = new Bootstrap5Object('div', {class:'toast-body'});
        // 头部组装
        header.addContentElements(`<i class="bi bi-info-circle me-2"></i>`);
        header.addContentElements(`<strong class="me-auto">${titleVal}</strong>`);
        header.addContentElements(`<small>${new Date().toLocaleString()}</small>`);
        header.addContentElements(`<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>`);
        // 内容组装
        body.addContentElements(msgVal);
        // 整体组装
        this.addContentElements(header, body);
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5ToastMessage
}