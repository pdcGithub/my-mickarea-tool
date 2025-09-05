/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "javaFeatureTools.js" is part of project "my-mickarea-tool" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-09-05
 * @version 1.0.0 
 * @description  这里是 Java 功能生成器的处理页面
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { documentReady, loadingInit, myapi } from "../../modules/myselfs/js/apis.js";
import { pdcCmdRunning, pdcCmdDone } from "../../modules/myselfs/js/myEvents.js";
import { Bs5EffButton, Bs5EffCol, Bs5EffContainer, Bs5EffForm, Bs5EffFormTextInput, Bs5EffFormTextRadio, Bs5EffMessage, Bs5EffRow } from "../../modules/myselfs/js/bootstrap5Effect.js";
import { DataUtil as du } from "../../utils/datatype.js";
import { BTN_COR } from "../../modules/myselfs/js/bootstrap5UI.js";

// ======== 这里定义一些需要用到的全局变量

/**
 * java 虚拟机的路径
 */
let jvm = '';
/**
 * jar 包的路径
 */
let jar = '';

// ============ 这里定义一些需要用到的组件

/**
 * 功能的类名称 它只能是英文字母和数字的组合
 */
let featureName = new Bs5EffFormTextInput('featureName', 
    { 
        labelInfo:'Java 功能的类名 ( 生成后 )', 
        helperInfo:'这里是功能生成器执行后, 生成的功能对应的 Java 类名', 
        invalidInfo:'它应该是大写字母开头，而且只能是英文字母和数字的组合'
    },
    {
        validRule:/^[A-Z][a-zA-Z0-9]+$/
    }
);

/**
 * 输出的字符集，即文件生成并且保存到本地时，所使用的字符集名称
 */
let charset = new Bs5EffFormTextRadio('charset', 
    { 
        labelInfo:'字符集 ( 输出时用 ) ', 
        helperInfo:'输出的字符集，即文件生成并且保存到本地时，所使用的字符集名称', 
        invalidInfo:'字符集必须指定, 不能为空'
    },
    {
        chkOptions:du.genMap('iso-8859-1','ISO-8859-1', 'utf-8','UTF-8', 'gbk','GBK', 'gb2312','GB 2312', 'gb18030','GB 18030', 'big5','BIG-5'), 
        validRule:htmlElemArr=>{
            // 最少选择一个
            return htmlElemArr.filter(elem=>elem.checked).length>0;
        }
    }
);

/**
 * Java 类的输出文件夹
 */
let outputFolder = new Bs5EffFormTextInput('outputFolder', 
    {
        labelInfo:'Java 类的输出文件夹', 
        helperInfo:'这里是 Java 类 处理完毕，将要输出到的文件夹。不要设置为根目录(比如, Windows 的 C: 盘)', 
        invalidInfo:'文件夹信息不能为空'
    },
    {
        validRule:/[\S]+/,
        customEvent:du.genMap('click', async event=>{
            // 配置文件选择器的 options 对象
            let options = {
                title:'请选择文件夹',
                properties:['openDirectory']
            }
            // 打开文件选择器
            let fileArr = await myapi.showFileDialog(options);
            //
            let fileStr = fileArr.length>0?fileArr[0]:'';
            outputFolder.setValue(fileStr);
        })
    }
);

// ====== 

documentReady(()=>{

    // 初始化加载动画
    loadingInit();

    // 开始构建页面
    document.dispatchEvent(pdcCmdRunning);

    // 页面初始构建处理
    buildForm();

    // 加载基础配置信息
    loadBaseConfig();

    // 结束构建页面
    document.dispatchEvent(pdcCmdDone);
});

/**
 * 页面初始构建处理
 */
async function buildForm(){

    // 构建容器
    let container = new Bs5EffContainer('container', {isFluid:true, cssClass:'pt-3'});
    let form = new Bs5EffForm('form');

    // 这里比较简单，构建为 3 行 表单，1行 按钮就行了。
    let row1 = new Bs5EffRow('row1', {cssClass:'mb-3', initChildren:[
        new Bs5EffCol('row1col1', {initChildren:[charset], cssClass:'col-12'})
    ]});
    let row2 = new Bs5EffRow('row2', {cssClass:'mb-3', initChildren:[
        new Bs5EffCol('row2col1', {initChildren:[featureName], cssClass:'col-12'})
    ]});
    let row3 = new Bs5EffRow('row3', {cssClass:'mb-3', initChildren:[
        new Bs5EffCol('row3col1', {initChildren:[outputFolder], cssClass:'col-12'})
    ]});

    // 增加 3 个按钮
    let btnRun = new Bs5EffButton('btnRun', {name:'生成', cssClass:'me-1', click:event=>run()});
    let btnOpenOutputDir = new Bs5EffButton('btnOpenOutputDir', {name:'打开输出文件夹', color:BTN_COR.warning, cssClass:'me-1', click:event=>openOuputFolder()});
    let btnRefresh = new Bs5EffButton('btnRefresh', {name:'刷新页面', color:BTN_COR.success,cssClass:'me-1', click:event=>refreshPage()});
    let row4 = new Bs5EffRow('row4', {cssClass:'mb-3', initChildren:[
        new Bs5EffCol('row4col1', {initChildren:[btnRun, btnOpenOutputDir, btnRefresh], cssClass:'col-12'})
    ]});

    // 整合然后写入页面
    form.addChildren(row1, row2, row3, row4);
    container.addChildren(form);

    container.writeToPage(document.body);

    // 设置默认值
    charset.setValue('utf-8');
    let defaultOutputDir = await myapi.getStaticParameter('MY_SOFTWARE_FEATURE_DIR');
    outputFolder.setValue(defaultOutputDir);
}

/**
 * 加载基础配置信息
 */
async function loadBaseConfig(){

    // 调用后台的程序，加载 基础配置文件信息
    let result = await myapi.readConfig('baseconfig.properties');
    
    // 根据状态判断
    if(result.status === 'ok'){
        jvm = `${result.data.jvm || ''}`;
        jar = `${result.data.jar || ''}`;
    }
}

/**
 * 执行图片缩放处理
 */
async function run(){

    // 这里是给浏览器处理的
    if(!myapi.isInApp){
        console.log(new Date(), '浏览器模拟...给予 jvm 和 jar 一些值');
        jvm = 'test_jvm';
        jar = 'test_jar';
    }

    // 配置填写校验
    if(jvm.length<=0 || jar.length<=0) { new Bs5EffMessage('Java 或者 Jar 环境配置异常，请检查"基础配置"功能菜单').show(); return ; }

    // 校验处理
    if(!(featureName.valid() && charset.valid() && outputFolder.valid())){
        new Bs5EffMessage('表单尚未完整填写，请检查').show(); 
        return ;
    }
    let nameVal = featureName.getValue().trim();
    let charsetVal = charset.getValue().length>0?charset.getValue()[0]:'';
    let folderVal = outputFolder.getValue().trim();

    // 执行参数
    let cmdArgs = ['-m', 'java_feature_gen', '-acn', nameVal, '-fc', charsetVal, '-d', folderVal];
    
    // 正式执行
    document.dispatchEvent(pdcCmdRunning);
    let result = await myapi.execJar(jvm, jar, cmdArgs);
    document.dispatchEvent(pdcCmdDone);

    // 结果处理
    new Bs5EffMessage(`程序运行${result.status==='ok'?'成功':'失败，请检查日志文件'}，后台返回消息：${result.info}`).show();
}

/**
 * 打开输出文件夹
 */
async function openOuputFolder(){

    // 先获取输出文件夹的路径
    let outputPath = outputFolder.getValue().trim();

    // 打开文件夹
    if(outputPath.length>0){
        let result = await myapi.filePathOpen(outputPath);
        if(result.length>0){
            new Bs5EffMessage(result).show();
        }
    }else{
        new Bs5EffMessage('输出文件夹尚未指定, 无法打开').show();
    }
}

/**
 * 刷新当前页面
 */
async function refreshPage(){
    let choose = await myapi.showConfirm('确定刷新当前页面吗? 如果尚未保存，则会丢失信息。');
    if(choose) window.location.reload();
}