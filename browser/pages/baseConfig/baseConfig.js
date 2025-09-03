/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "baseConfig.js" is part of project "my-mickarea-tool" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-09-03
 * @version 1.0.0 
 * @description  这里是 基础配置 模块的功能处理
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { documentReady, loadingInit, myapi } from "../../modules/myselfs/js/apis.js";
import { pdcCmdRunning, pdcCmdDone } from "../../modules/myselfs/js/myEvents.js";
import { Bs5EffButton, Bs5EffCol, Bs5EffContainer, Bs5EffForm, Bs5EffFormInput, Bs5EffMessage, Bs5EffRow } from "../../modules/myselfs/js/bootstrap5Effect.js";
import { DataUtil as du } from "../../utils/datatype.js";
import { BTN_COR } from "../../modules/myselfs/js/bootstrap5UI.js";

let jvmPath = new Bs5EffFormInput('jvmPath', 
    {
        labelInfo:'Java 语言环境路径', 
        helperInfo:'这里需要设置一个 Java 语言环境的路径。如果是 Windows 系统，它通常是 java.exe 文件的路径',
        invalidInfo:'这个路径不能为空，请务必填写'
    },
    {
        type:'text', 
        validRule:/[\S]+/,
        customEvent:du.genMap('click', async event=>{
            // 点击时，打开 Electron 文件选择器
            let result = await myapi.showFileDialog();
            // 设置
            jvmPath.setValue(result);
        })
    }
);
let jarPath = new Bs5EffFormInput('jarPath', 
    {
        labelInfo:'配套的 Jar 程序包路径', 
        helperInfo:'这里通常指的是 my-javabean-generator 项目，打包后的 jar 包路径',
        invalidInfo:'这个路径不能为空，请务必填写'
    },
    {
        type:'text', 
        validRule:/[\S]+/,
        customEvent:du.genMap('click', async event=>{
            // 文件过滤器 jar 
            let fileFilters = [
                { name:'jar 文件', extensions:['jar']}
            ];
            // 点击时，打开 Electron 文件选择器
            let result = await myapi.showFileDialog(fileFilters);
            jarPath.setValue(result);
        })
    }
);

/**
 * 这里是页面加载完之后，才会执行的
 */
documentReady(()=>{

    // 初始化加载动画
    loadingInit();

    // 开始构建页面
    document.dispatchEvent(pdcCmdRunning);

    // 页面构建
    buildForm();

    // 加载本地已保存的信息（如果原先没保存，则不会写入，但会有个提示）
    loadConfig();

    // 结束构建页面
    document.dispatchEvent(pdcCmdDone);
});

/**
 * 页面打开时，构建表单的处理
 */
function buildForm(){
    // 定义一些容器
    let formContainer = new Bs5EffContainer('baseConfigContainer', {isFluid:true, cssClass:'pt-3'});
    let form1 = new Bs5EffForm('baseConfigForm');
    // 整体上来说，内容较少，让内容垂直布局即可
    let row1 = new Bs5EffRow('row1', {cssClass:'mb-2', initChildren:[
        new Bs5EffCol('row1col1', {cssClass:'', initChildren:[ jvmPath ]})
    ]});
    let row2 = new Bs5EffRow('row2', {cssClass:'mb-2', initChildren:[
        new Bs5EffCol('row2col1', {cssClass:'', initChildren:[ jarPath ]})
    ]});
    let btnLoad = new Bs5EffButton('btnLoad', {name:'加载配置', cssClass:'me-1', click:event=>loadConfig()});
    let btnSave = new Bs5EffButton('btnSave', {name:'保存配置', color:BTN_COR.info ,cssClass:'me-1', click:event=>saveConfig()});
    let btnRefresh = new Bs5EffButton('btnRefresh', {name:'刷新页面', color:BTN_COR.success, cssClass:'me-1', click:event=>refreshPage()});
    let row3 = new Bs5EffRow('row3', {cssClass:'mb-2', initChildren:[
        new Bs5EffCol('row3col1', {cssClass:'', initChildren:[ btnLoad, btnSave, btnRefresh]})
    ]});
    // 开始组装
    form1.addChildren(row1, row2, row3);
    formContainer.addChildren(form1);
    // 写入页面
    formContainer.writeToPage(document.body);
}

/**
 * 加载本地已保存的信息（如果原先没保存，则不会写入，但会有个提示）
 */
async function loadConfig(){
    
    // 调用后台的程序，加载 基础配置文件信息
    let result = await myapi.readConfig('baseconfig.properties');
    
    // 根据状态判断
    if(result.status === 'ok'){
        jvmPath.setValue(`${result.data.jvm}`);
        jarPath.setValue(`${result.data.jar}`);
    }

    // 返回消息
    new Bs5EffMessage(result.info, {title:`${result.status==='ok'?'温馨提示':'后台处理错误'}`}).show();
}

/**
 * 保存当前配置
 */
async function saveConfig(){
    
    // 先校验
    if(!(jvmPath.valid() && jarPath.valid())){
        new Bs5EffMessage('当前表单校验不通过，还有内容没有正确填写，请检查！').show();
        return ;
    }

    // 收集当前的 jvm  和 jar 路径信息
    let jvmPathVal = jvmPath.getValue().trim();
    let jarPathVal = jarPath.getValue().trim();
    let obj = { filename:'baseconfig.properties', jvm:jvmPathVal, jar:jarPathVal };

    // 调用后台处理
    document.dispatchEvent(pdcCmdRunning)
    let result = await myapi.saveConfig(obj);
    document.dispatchEvent(pdcCmdDone);
    // 返回消息
    new Bs5EffMessage(result.info, {title:`${result.status==='ok'?'温馨提示':'后台处理错误'}`}).show();
}

/**
 * 刷新当前页面
 */
async function refreshPage(){
    let choose = await myapi.showConfirm('确定刷新当前页面吗? 如果尚未保存，则会丢失信息。');
    if(choose) window.location.reload();
}