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

import { documentReady, loadingInit, myapi } from "../../modules/myselfs/js/apis.js";
import { pdcCmdRunning, pdcCmdDone } from "../../modules/myselfs/js/myEvents.js";

documentReady(()=>{

    // 加载动画初始化
    loadingInit();

    // 开始加载
    document.dispatchEvent(pdcCmdRunning);

    // 处理描述信息
    description();

    // 结束加载
    document.dispatchEvent(pdcCmdDone);
});

/**
 * 获取一些描述信息，并写入页面中
 */
async function description(){

    // 当前时间
    let date = new Date();
    
    // 获取一些基础信息
    let copyright = `欢迎使用 mickarea.net 出品。版权所有 Copyright © 2024 - ${date.getFullYear()} mickarea.net All rights reserved.`;
    let chromeinfo = myapi.getChromeVersion();
    let electroninfo = myapi.getElectronVersion();
    let nodejsinfo = myapi.getNodeJsVersion();
    let appversionInfo = await myapi.getAppVersion();
    let osVersionInfo = await myapi.getOsVersionInfo();
    let javaVersionInfo = await myapi.getJavaVersionInfo();

    // 设置信息到页面上
    document.querySelector('#copyrightInfo').innerHTML = copyright;
    document.querySelector('#chromeinfo').innerHTML = chromeinfo;
    document.querySelector('#electroninfo').innerHTML = electroninfo;
    document.querySelector('#nodejsinfo').innerHTML = nodejsinfo;
    document.querySelector('#myAppVersion').innerHTML = appversionInfo;
    document.querySelector('#osVersion').innerHTML = `${osVersionInfo.version} (${osVersionInfo.release} ${osVersionInfo.machine})`;
    document.querySelector('#javaVersion').innerHTML = `${javaVersionInfo.info1} &lt;${javaVersionInfo.info2}&gt;`;
}