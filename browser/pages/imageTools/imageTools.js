/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "imageTools.js" is part of project "my-mickarea-tool" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-09-04
 * @version 1.0.0 
 * @description  这里是图片缩放处理功能
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { documentReady, loadingInit, myapi } from "../../modules/myselfs/js/apis.js";
import { pdcCmdRunning, pdcCmdDone } from "../../modules/myselfs/js/myEvents.js";
import { Bs5EffButton, Bs5EffCol, Bs5EffContainer, Bs5EffForm, Bs5EffFormTextArea, Bs5EffFormTextInput, Bs5EffFormTextRadio, Bs5EffMessage, Bs5EffRow } from "../../modules/myselfs/js/bootstrap5Effect.js";
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
 * 运行模式
 */
let runningMode = new Bs5EffFormTextRadio('runningMode', 
    { 
        labelInfo:'图片提取模式', helperInfo:'这里选择的是图片的提取方式, 一般有2种: 文件列表 或者 文件夹', invalidInfo:'提取模式必须选择'
    },
    { 
        chkOptions:du.genMap('-ifs','文件列表', '-ifd', '文件夹路径'), 
        validRule:htmlElemArr=>{
            // 最少选择一个
            return htmlElemArr.filter(elem=>elem.checked).length>0;
        },
        customEvent:du.genMap('change', event=>{
            let checkedVal = runningMode.getValue().length>0?runningMode.getValue()[0]:'';
            if(checkedVal==='-ifs'){
                // 文件列表，则禁用 源文件夹
                imageFiles.enable();
                imageDir.setValue('');
                imageDir.disable();
            }else{
                // 否则 文件夹路径，禁用 源文件列表
                imageDir.enable();
                imageFiles.setValue('');
                imageFiles.disable();
            }
        })
    }
);
/**
 * 源文件列表
 */
let imageFiles = new Bs5EffFormTextArea('imageFiles', 
    {
        labelInfo:'源图片文件列表', helperInfo:'这里选择的将要处理的图片文件，可以选择多个', invalidInfo:'图片信息不能为空，请务必选择'
    },
    {
        rows:5, 
        validRule:/[\S]+/,
        customEvent:du.genMap('click', async event=>{
            // 配置文件选择器的 options 对象
            let options = {
                title:'请选择图片文件，可以多选',
                filters:[
                    { name: '图片文件', extensions: ['png', 'jpg', 'jpeg'] }
                ],
                properties:['openFile', 'multiSelections']
            }
            // 打开文件选择器
            let fileArr = await myapi.showFileDialog(options);
            //
            let fileStr = fileArr.length>0?fileArr.join(', '):'';
            imageFiles.setValue(fileStr);
        })
    }
);
/**
 * 源文件夹
 */
let imageDir = new Bs5EffFormTextInput('imageDir', 
    {
        labelInfo:'源图片文件夹', helperInfo:'这里选择的将要处理的图片所在的文件夹。只能处理里面的 png, jpg, jpeg 格式的图片', invalidInfo:'文件夹信息不能为空'
    },
    {
        validRule:/[\S]+/,
        customEvent:du.genMap('click', async event=>{
            // 配置文件选择器的 options 对象
            let options = {
                title:'请选择图片的源文件夹',
                properties:['openDirectory']
            }
            // 打开文件选择器
            let fileArr = await myapi.showFileDialog(options);
            //
            let fileStr = fileArr.length>0?fileArr[0]:'';
            imageDir.setValue(fileStr);
        })
    }
);
/**
 * 展示的最大宽度
 */
let maxWidth = new Bs5EffFormTextInput('maxWidth', 
    { labelInfo:'窗口最大宽度(单位 px)', helperInfo:'图片缩放是根据展示大小自动处理的，提供最大像素宽度即可', invalidInfo:'这里只能填写整数，且不能0开头'},
    { validRule:/^[1-9](\d+)?$/}
);
/**
 * 展示的最大高度
 */
let maxHeight = new Bs5EffFormTextInput('maxHeight', 
    { labelInfo:'窗口最大高度(单位 px)', helperInfo:'图片缩放是根据展示大小自动处理的，提供最大像素高度即可', invalidInfo:'这里只能填写整数，且不能0开头'},
    { validRule:/^[1-9](\d+)?$/}
);
/**
 * 输出文件夹
 */
let outputFolder = new Bs5EffFormTextInput('outputFolder', 
    {
        labelInfo:'图片输出文件夹', helperInfo:'这里是图片处理完毕，将要输出到的文件夹。不要设置为根目录(比如, Windows 的 C: 盘)', invalidInfo:'文件夹信息不能为空'
    },
    {
        validRule:/[\S]+/,
        customEvent:du.genMap('click', async event=>{
            // 配置文件选择器的 options 对象
            let options = {
                title:'请选择图片的源文件夹',
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

/**
 * 这里是 ready 函数
 */
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
 * 页面初始构建处理
 */
function buildForm(){

    // 构建容器
    let container = new Bs5EffContainer('container', {isFluid:true, cssClass:'pt-3'});
    let form = new Bs5EffForm('form');

    // 构建页面
    let row1 = new Bs5EffRow('row1', {cssClass:'mb-2', initChildren:[
        new Bs5EffCol('row1col1', {initChildren:[runningMode], cssClass:'col-4'}),
        new Bs5EffCol('row1col2', {initChildren:[maxWidth], cssClass:'col-4'}),
        new Bs5EffCol('row1col3', {initChildren:[maxHeight], cssClass:'col-4'})
    ]});
    let row2 = new Bs5EffRow('row2', {cssClass:'mb-2', initChildren:[
        new Bs5EffCol('row2col1', {initChildren:[outputFolder], cssClass:'col-12'})
    ]});
    let row3 = new Bs5EffRow('row3', {cssClass:'mb-2', initChildren:[
        new Bs5EffCol('row3col1', {initChildren:[imageDir], cssClass:'col-12'})
    ]});
    let row4 = new Bs5EffRow('row4', {cssClass:'mb-2', initChildren:[
        new Bs5EffCol('row4col1', {initChildren:[imageFiles], cssClass:'col-12'})
    ]});
    let btnRun = new Bs5EffButton('btnRun', {name:'开始转换', cssClass:'me-1', click:event=>run()});
    let btnOpenOutputDir = new Bs5EffButton('btnOpenOutputDir', {name:'打开输出文件夹', color:BTN_COR.warning, cssClass:'me-1', click:event=>openOuputFolder()});
    let btnRefresh = new Bs5EffButton('btnRefresh', {name:'刷新页面', color:BTN_COR.success,cssClass:'me-1', click:event=>refreshPage()});
    let row5 = new Bs5EffRow('row5', {cssClass:'mb-2', initChildren:[
        new Bs5EffCol('row5col1', {initChildren:[btnRun, btnOpenOutputDir, btnRefresh], cssClass:'col-12'})
    ]});

    form.addChildren(row1, row2, row3, row4, row5);
    container.addChildren(form);

    container.writeToPage(document.body);

    // 默认选择 文件夹模式
    runningMode.setValue('-ifd');
    // 默认展示大小 
    maxWidth.setValue('1600');
    maxHeight.setValue('900');
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

    // 表单校验
    if(!runningMode.valid()) { new Bs5EffMessage('图片提取模式 尚未选择，请先选择').show(); return ; }

    // 根据提取模式，分别校验 ('-ifs','文件列表', '-ifd', '文件夹路径')
    let comptArr = [runningMode, outputFolder, maxWidth, maxHeight];
    // radio 的 getValue 函数返回的是一个数组
    let modeVal = runningMode.getValue().length>0?runningMode.getValue()[0]:''; 
    if(modeVal==='-ifs'){
        comptArr.push(imageFiles);
    }else if(modeVal==='-ifd'){
        comptArr.push(imageDir);
    }else{
        new Bs5EffMessage(`图片提取模式异常 value=${modeVal}，请检查`).show(); return ;
    }
    // 校验
    let falseNum = comptArr.map(cmp=>cmp.valid()).filter(result=>result===false).length;
    if(falseNum>=1) { new Bs5EffMessage('表单校验不通过，请认真填写').show(); return ; }

    // 通过校验后，再检查 输出路径 和 输入路径是否 重复
    if(modeVal==='-ifd' && imageDir.getValue()===outputFolder.getValue()) {
        new Bs5EffMessage(`输出文件夹 和 源图片文件夹 不能为同一个`).show(); 
        return ;
    }else if(modeVal==='-ifs'){
        // 对于 文件列表 模式，需要检查 文件所在文件夹 与 输出文件夹是否 是同一个
        let output = outputFolder.getValue().trim().split(/[\\\/]/).join('/'); // 将目录按照 / 重新拼接
        let filesArr = imageFiles.getValue().trim().split(', ');
        let wrongFileArr = filesArr.filter(filename=>{
            // 拆解文件的目录
            let arr = filename.split(/[\\\/]/);
            let newpath = arr.slice(0, arr.length-1).join('/'); // 将文件的目录 按照 / 重新拼接
            return output === newpath; // 如果 输出路径 和 文件所在目录一样，则是异常的
        });
        if(wrongFileArr.length>0){
            new Bs5EffMessage(`输出文件夹 和 源图片所在文件夹 不能为同一个，这样会覆盖源图片`).show(); 
            return ;
        }
    }

    // 开始执行，拼接执行参数
    let cmdArgs = ['-m','image_scaling', '-d', outputFolder.getValue().trim(), '-waz', maxWidth.getValue().trim(), '-haz', maxHeight.getValue().trim()];
    cmdArgs.push(modeVal);
    if(modeVal==='-ifs'){
        cmdArgs.push(imageFiles.getValue().trim());
    }else if(modeVal==='-ifd'){
        cmdArgs.push(imageDir.getValue().trim());
    }

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