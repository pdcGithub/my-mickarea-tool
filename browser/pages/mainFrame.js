/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "main.js" is part of project "my-mickarea-tool" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-09-01
 * @version 1.0.0 
 * @description  这里是软件的主窗口模块
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { documentReady, actionBindingBySelector, myapi } from "../modules/myselfs/js/apis.js";
import { Bs5EffMessage } from "../modules/myselfs/js/bootstrap5Effect.js";

/**
 * 默认的选中菜单 ID
 */
const DEFAULT_MENU_ID = 'aboutUS';

/**
 * 这里是页面加载完毕后才会执行的
 */
documentReady(()=>{

    // 主窗口导航栏的按钮操作处理
    windowBtnsBinding();

    // 关于隐藏式菜单，点击后的样式处理，与菜单跳转
    windowMenusBinding();

    // 默认的菜单选中。点一下菜单（菜单默认是没有选中的）
    document.querySelector(`#${DEFAULT_MENU_ID}`).click();
});

/**
 * 主窗口导航栏的按钮操作处理：最小化，最大化，关闭
 */
function windowBtnsBinding(){

    // 开始绑定 点击 事件
    actionBindingBySelector('#topNavForm button', 'click', async (event) => {
        let idVal = event.currentTarget.id;
        let promiseValue = {status:true, info:''};
        switch(idVal){
            case 'toRefresh':
                window.location.reload();
                break;
            case 'toBlog':
                // 打开 我自己的博客 网站
                promiseValue = await myapi.setWindowBehavior('blog');
                if(!promiseValue.status) new Bs5EffMessage(`打开 博客网站 失败，${promiseValue.info}`).show();
                break;
            case 'toAppLog':
                // 打开 app 日志文件夹
                promiseValue = await myapi.setWindowBehavior('appLog');
                if(!promiseValue.status) new Bs5EffMessage(`打开 APP 日志文件夹失败，${promiseValue.info}`).show();
                break;
            case 'toJarLog':
                // 打开 jar 日志文件夹
                promiseValue = await myapi.setWindowBehavior('jarLog');
                if(!promiseValue.status) new Bs5EffMessage(`打开 Jar 日志文件夹失败，${promiseValue.info}`).show();
                break;
            case 'toMin':
                promiseValue = await myapi.setWindowBehavior('min'); // 最小化
                if(!promiseValue.status) new Bs5EffMessage(`执行窗口最小化失败，${promiseValue.info}`).show();
                break;
            case 'toMax':
                promiseValue = await myapi.setWindowBehavior('max'); // 最大化
                if(!promiseValue.status) new Bs5EffMessage(`执行窗口最大化失败，${promiseValue.info}`).show();
                break;
            case 'toClose':
                // 先提示是否要关闭
                let choose = await myapi.showConfirm('确定要关闭窗口吗？关闭后程序将退出执行。');
                // 如果确定，则执行关闭处理
                if(choose) promiseValue = await myapi.setWindowBehavior('close');// 关闭
                if(!promiseValue.status) new Bs5EffMessage(`执行窗口关闭失败，${promiseValue.info}`).show();
                break;
            default:
                break;
        }
    });
}

/**
 * 关于隐藏式菜单，点击后的样式处理，与菜单跳转
 */
function windowMenusBinding(){

    // 伸缩菜单的点击效果
    actionBindingBySelector('#offcanvasNavbar li', 'click', (event)=>{
        
        // 先清理选中样式
        let lis = document.querySelectorAll('#offcanvasNavbar li');
        lis.forEach((elem)=>{
            elem.classList.remove('active');
        });
        
        // 然后给当前点击的增加选中样式
        event.currentTarget.classList.add('active');
        
        // 跳转到对应的功能页面
        let clickId = event.currentTarget.id;
        let url = `./${clickId}/${clickId}.html`;
        document.getElementById(`fillInArea`).setAttribute('src', url);
    });
}