/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "aboutUS.js" is part of project "my-mickarea-tool" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-09-01
 * @version 1.0.0 
 * @description  这里是关于本软件的一些描述处理
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { documentReady, actionBinding, myapi } from "../../modules/myselfs/js/apis.js";
import { Bs5EffLoading } from "../../modules/myselfs/js/bootstrap5Effect.js";
import { pdcCmdRunning, pdcCmdDone } from "../../modules/myselfs/js/myEvents.js";

/**
 * 定义一个加载动画，通过事件来操控
 */
const loading = new Bs5EffLoading('myLoading');

documentReady(()=>{

    // 注册加载事件 与 动画处理绑定
    actionBinding(document, 'pdc.cmd.running', event=>loading.show());
    actionBinding(document, 'pdc.cmd.done', event=>loading.hide());

    // 加载动画处理 开始
    document.dispatchEvent(pdcCmdRunning);
    // 加载动画处理 5 秒后 结束
    setTimeout(event=>{ document.dispatchEvent(pdcCmdDone) }, 5000);

});