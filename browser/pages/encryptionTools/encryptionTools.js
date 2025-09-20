/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "encryptionTools.js" is part of project "my-mickarea-tool" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-09-11
 * @version 1.0.0 
 * @description  这是字符加密与数字签名功能
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { documentReady, loadingInit, myapi } from "../../modules/myselfs/js/apis.js";
import { Bs5EffContainer, Bs5EffForm, Bs5EffButton, Bs5EffCol, Bs5EffFormTextArea, Bs5EffFormTextRadio, Bs5EffRow, Bs5EffMessage, Bs5EffFormTextInput, Bs5EffButtonGroup, Bs5EffDropdownButton } from "../../modules/myselfs/js/bootstrap5Effect.js";
import { BTN_COR } from "../../modules/myselfs/js/bootstrap5UI.js";
import { pdcCmdRunning, pdcCmdDone } from "../../modules/myselfs/js/myEvents.js";
import { DataUtil as du } from "../../utils/datatype.js";

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

let algorithm1 = new Bs5EffFormTextRadio('algorithm1', 
    {
        labelInfo:'算法名称', helperInfo:'这里选择的是数字签名用的算法。数字签名与加密不同，它是单向的', invalidInfo:'有且只能有一个算法名'
    },
    {
        chkOptions:du.genMap('MD5','MD5 32位', 'SHA_1','SHA-1', 'SHA_224','SHA-224', 'SHA_256','SHA-256', 'SHA_384','SHA-384', 'SHA_512','SHA-512'),
        validRule:elemArr=>{
            // 最少选择一个
            return elemArr.filter(elem=>elem.checked).length>0;
        }
    }
);
algorithm1.cmdParam = '-algo'; // 配置命令参数名称

let inputContentType1 = new Bs5EffFormTextRadio('inputContentType1',
    {
        labelInfo:'处理内容的类型', helperInfo:'这里选择处理内容的类型，可能是文本，也可能是文件路径', invalidInfo:'有且只能有一个类型信息'
    },
    {
        chkOptions:du.genMap('file','文件路径', 'text','文本内容'),
        customEvent:du.genMap('change', event=>{
            inputContent1.setValue('');
            outputContent1.setValue('');
        }),
        validRule:elemArr=>{
            // 最少选择一个
            return elemArr.filter(elem=>elem.checked).length>0;
        }
    }
);
inputContentType1.cmdParam = '-ict'; // 配置命令参数名称

let inputContent1 = new Bs5EffFormTextArea('inputContent1', 
    {
        labelInfo:'待处理内容', helperInfo:'当内容类型是字符串，则可以填写字符串；当内容类型是文件，则填写文件路径', invalidInfo:'待处理内容不能为空，请认真填写'
    },
    {
        rows:3, validRule:/\S+/,
        customEvent:du.genMap('click', async event=>{
            // 点击时，如果类型是文件列表，则打开文件选择窗口
            if(inputContentType1.getValue()[0]==='file'){
                // 点击时，打开 Electron 文件选择器
                let result = await myapi.showFileDialog();
                // 设置
                inputContent1.setValue(result.length>0?result[0]:'');
            }
        })
    }
);
inputContent1.cmdParam = '-ic'; // 配置命令参数名称

let outputContent1 = new Bs5EffFormTextArea('outputContent1', 
    {
        labelInfo:'数字签名信息', helperInfo:'这里是，通过算法生成的数字签名信息', invalidInfo:'数字签名信息，请认真填写'
    },
    {
        rows:3
    }
);

let compareConetent1 = new Bs5EffFormTextArea('compareConetent1', 
    {
        labelInfo:'对照内容 (可选)', helperInfo:'这里的内容，用于与生成的数字签名信息比对', invalidInfo:'对照内容不能为空，请认真填写'
    },
    {
        rows:3
    }
);

// ============
let algorithm2 = new Bs5EffFormTextRadio('algorithm2', 
    {
        labelInfo:'算法名称', helperInfo:'这里选择的是加密/解密用到的算法名称', invalidInfo:'有且只能有一个算法名'
    },
    {
        chkOptions:du.genMap('RSA','RSA'),
        validRule:elemArr=>{
            // 最少选择一个
            return elemArr.filter(elem=>elem.checked).length>0;
        }
    }
);
algorithm2.cmdParam = '-algo'; // 配置命令参数名称

let keyLength2 = new Bs5EffFormTextInput('keyLength2', 
    {
        labelInfo:'密钥长度 (数字)', helperInfo:'加密算法生成密钥对时，所需要的密钥长度，一般大于 1024 小于 4096', invalidInfo:'密钥长度需要大于 1024 小于 4096'
    },
    {
        validRule:elem=>{
            // 只有公钥没有提供时，才校验 密钥长度信息
            let action = actionType2.getValue()[0];
            let pubkey = publicKey2.getValue().trim();
            // 如果是加密模式 ，且 公钥没有提供，则校验 密钥长度
            if(action==='encrypt' && pubkey.length<=0){
                let val = keyLength2.getValue().trim();
                if(/^[1-9]\d*$/.test(val)) {
                    let tmp = parseInt(val);
                    return (Number.isNaN(tmp) || tmp<1024 || tmp>4096) ? false: true;
                }else{
                    return false;
                }
            }else{
                return true;
            }
        }
    }
);
keyLength2.cmdParam = '-kl';

let actionType2 = new Bs5EffFormTextRadio('actionType2',
    {
        labelInfo:'操作类型', helperInfo:'这里选择的是处理类型。通常是 加密 或者 解密', invalidInfo:'有且只能有一个操作类型'
    },
    {
        chkOptions:du.genMap('encrypt','加密', 'decrypt','解密'),
        customEvent:du.genMap('change', event=>{
            
        }),
        validRule:elemArr=>{
            // 最少选择一个
            return elemArr.filter(elem=>elem.checked).length>0;
        }
    }
);
actionType2.cmdParam = '-ende'; // 配置命令参数名称

let publicKey2 = new Bs5EffFormTextArea('publicKey2', 
    {
        labelInfo:'公钥信息字符串', helperInfo:'公钥信息用于信息加密操作，如果不提供，会自动根据密钥长度重新生成', invalidInfo:'公钥信息字符串不能为空，请认真填写'
    },
    {
        rows:3, validRule:elem=>{
            // 公钥信息，只有 加密操作 才校验
            let action = actionType2.getValue()[0];
            let keyLength = keyLength2.getValue().trim();
            // 如果是加密模式，且没有提供 密钥长度，则校验 公钥 是否填写
            if(action === 'encrypt' && keyLength.length<=0){
                return publicKey2.getValue().trim().length>0;
            }else{
                return true;
            }
        }
    }
);
publicKey2.cmdParam = '-pubkey'; // 配置命令参数名称

let privateKey2 = new Bs5EffFormTextArea('privateKey2', 
    {
        labelInfo:'私钥信息字符串', helperInfo:'私钥信息用于信息解密操作，必须提供', invalidInfo:'私钥信息字符串不能为空，请认真填写'
    },
    {
        rows:3, validRule:elem=>{
            // 私钥信息，只有 解密操作 才校验
            let action = actionType2.getValue()[0];
            // 如果是解密模式，则需要校验 私钥信息是否提供
            if(action === 'decrypt'){
                return privateKey2.getValue().trim().length>0;
            }else{
                return true;
            }
        }
    }
);
privateKey2.cmdParam = '-prikey'; // 配置命令参数名称

let inputContentType2 = new Bs5EffFormTextRadio('inputContentType2',
    {
        labelInfo:'内容的类型', helperInfo:'这里选择处理内容的类型，可能是文本，也可能是文件路径', invalidInfo:'有且只能有一个类型信息'
    },
    {
        chkOptions:du.genMap('text','文本内容'),
        validRule:elemArr=>{
            // 最少选择一个
            return elemArr.filter(elem=>elem.checked).length>0;
        }
    }
);
inputContentType2.cmdParam = '-ict'; // 配置命令参数名称

let inputContent2 = new Bs5EffFormTextArea('inputContent2', 
    {
        labelInfo:'待处理内容', helperInfo:'当内容类型是字符串，则可以填写字符串；当内容类型是文件，则填写文件路径', invalidInfo:'待处理内容不能为空，请认真填写'
    },
    {
        rows:3, validRule:/\S+/
    }
);
inputContent2.cmdParam = '-ic'; // 配置命令参数名称

let outputContent2 = new Bs5EffFormTextArea('outputContent2', 
    {
        labelInfo:'加密/解密 处理结果', helperInfo:'这里是，通过算法处理后的结果字符串'
    },
    {
        rows:3
    }
);

let configName2 = new Bs5EffFormTextInput('configName2', 
    {
        labelInfo:'配置名称（可选）', helperInfo:'这里的名称用于信息保存，并非必须填写。只能写字母或者数字', invalidInfo:'当需要保存配置时，配置名称是必须填写的'
    },
    {
        validRule:/^[0-9a-zA-Z]+$/
    }
);

let btnLoadKeyPairs = new Bs5EffDropdownButton('btnLoadKeyPairs', {name:'加载密钥对', color:BTN_COR.info, cssClass:'me-1', click:keyPairConfigLoad});

// ============ 开始构建
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

    buildForm_1();

    buildForm_2();

    // 设置默认值
    algorithm1.setValue('SHA_1');
    inputContentType1.setValue('text');

    algorithm2.setValue('RSA');
    actionType2.setValue('encrypt');
    inputContentType2.setValue('text');

    // 刷新配置
    keyPairConfigListRefresh();
}

/**
 * 第一页的生成
 */
function buildForm_1(){

    // 先定义顶层容器
    let container1 = new Bs5EffContainer('container1', {isFluid:true});
    let form1 = new Bs5EffForm('form1');

    // 输入框
    let row1 = new Bs5EffRow(undefined, {
        initChildren:[
            new Bs5EffCol(undefined, {cssClass:'col-6 mb-2',initChildren:[algorithm1]}),
            new Bs5EffCol(undefined, {cssClass:'col-6 mb-2', initChildren:[inputContentType1]}) 
        ]
    });
    let row2 = new Bs5EffRow(undefined, {
        initChildren:[
            new Bs5EffCol(undefined, {cssClass:'col-6 mb-2', initChildren:[inputContent1]}),
            new Bs5EffCol(undefined, {cssClass:'col-6 mb-2', initChildren:[outputContent1]})
        ]
    });
    let row3 = new Bs5EffRow(undefined, {initChildren:[new Bs5EffCol(undefined, {cssClass:'col-12 mb-2', initChildren:[compareConetent1]}) ]});

    // 按钮
    let btnDoDigitalSignature = new Bs5EffButton('btnDoDigitalSignature', {name:'提取数字摘要', cssClass:'me-1', click:doDigitalSignature});
    let btnCompare = new Bs5EffButton('btnCompare', {name:'文本对比', color:BTN_COR.success, cssClass:'me-1', click:doContentCompare});
    let btnRefresh = new Bs5EffButton('btnRefresh', {name:'刷新页面', color:BTN_COR.warning, cssClass:'me-1', click:refreshPage});
    let row4 = new Bs5EffRow(undefined, {
        initChildren:[ new Bs5EffCol(undefined, {
            initChildren:[btnDoDigitalSignature, btnCompare, btnRefresh]
        }) ]
    });

    form1.addChildren(row1, row2, row3, row4);

    // 组装
    container1.addChildren(form1);
    container1.writeToPage(document.getElementById('digitalSignature-tab-pane'));
}

/**
 * 第二页的生成
 */
function buildForm_2(){
    
    // 先定义顶层容器
    let container2 = new Bs5EffContainer('container2', {isFluid:true});
    let form2 = new Bs5EffForm('form2');

    let row1 = new Bs5EffRow(undefined, {
        initChildren:[
            new Bs5EffCol(undefined, {cssClass:'col-3 mb-2',initChildren:[algorithm2]}),
            new Bs5EffCol(undefined, {cssClass:'col-3 mb-2', initChildren:[keyLength2]}),
            new Bs5EffCol(undefined, {cssClass:'col-3 mb-2',initChildren:[actionType2]}),
            new Bs5EffCol(undefined, {cssClass:'col-3 mb-2',initChildren:[inputContentType2]}),
        ]
    });

    let row2 = new Bs5EffRow(undefined, {
        initChildren:[
            new Bs5EffCol(undefined, {cssClass:'col-6 mb-2',initChildren:[publicKey2]}),
            new Bs5EffCol(undefined, {cssClass:'col-6 mb-2', initChildren:[privateKey2]}),
        ]
    });

    let row3 = new Bs5EffRow(undefined, {
        initChildren:[
            new Bs5EffCol(undefined, {cssClass:'col-6 mb-2',initChildren:[inputContent2]}),
            new Bs5EffCol(undefined, {cssClass:'col-6 mb-2', initChildren:[outputContent2]}),
        ]
    });

    let row4 = new Bs5EffRow(undefined, {
        initChildren:[
            new Bs5EffCol(undefined, {cssClass:'col-6 mb-2',initChildren:[configName2]}),
        ]
    });

    let btnDoEnOrDe2 = new Bs5EffButton('btnDoEnOrDe2', {name:'加密/解密', cssClass:'me-1', click:doEnorDe});
    let btnRefresh2 = new Bs5EffButton('btnRefresh2', {name:'刷新页面', color:BTN_COR.warning, cssClass:'me-1', click:refreshPage});
    let btnSaveKeyPairs = new Bs5EffButton('btnSaveKeyPairs', {name:'保存密钥对', color:BTN_COR.success, cssClass:'me-1', click:keyPairConfigSave});
    
    let btnRemoveAll = new Bs5EffButton('btnRemoveAll', {name:'删除所有密钥对', color:BTN_COR.dark, cssClass:'me-1', click:keyPairConfigRemoveAll});
    let row5 = new Bs5EffRow(undefined, {
        initChildren:[ new Bs5EffCol(undefined, {
            initChildren:[btnDoEnOrDe2, btnRefresh2, btnSaveKeyPairs, btnLoadKeyPairs, btnRemoveAll]
        }) ]
    });

    form2.addChildren(row1, row2, row3, row4, row5);

    // 组装
    container2.addChildren(form2);
    container2.writeToPage(document.getElementById('encryptOrDecrypt-tab-pane'));
}

/**
 * 刷新当前页面
 */
async function refreshPage(){
    let choose = await myapi.showConfirm('确定刷新当前页面吗? 如果尚未保存，则会丢失信息。');
    if(choose) window.location.reload();
}

/**
 * 开始执行数字签名处理
 */
async function doDigitalSignature(){

    // 这里是给浏览器处理的
    if(!myapi.isInApp){
        console.log(new Date(), '浏览器模拟...给予 jvm 和 jar 一些值');
        jvm = 'test_jvm';
        jar = 'test_jar';
    }

    // 配置填写校验
    if(jvm.length<=0 || jar.length<=0) { new Bs5EffMessage('Java 或者 Jar 环境配置异常，请检查"基础配置"功能菜单').show(); return ; }

    // 执行参数
    let cmdArgs = ['-m','DIGITAL_SIGNATURE'];

    // 收集要处理的组件，然后保存成一个 对象。要注意的是 对象的内部顺序 不一定 跟写的顺序一致
    let comptObjects = {algorithm1, inputContentType1, inputContent1};

    // 开始判断
    let invalidNum = Object.keys(comptObjects).map(name=>comptObjects[name].valid()).filter(val=>val===false).length;
    if( invalidNum>0) { new Bs5EffMessage('数字签名处理的参数，尚未填写完成, 请检查').show(); return ; }

    // 开始插入参数
    Object.keys(comptObjects).forEach(key=>{
        let cmpt = comptObjects[key];
        let val = du.isTargetObject(cmpt, Bs5EffFormTextRadio) ? cmpt.getValue()[0] : cmpt.getValue().trim();
        cmdArgs.push(comptObjects[key].cmdParam, val);
    })

    // 开始 == 加载动画
    document.dispatchEvent(pdcCmdRunning);
    let result = await myapi.execJar(jvm, jar, cmdArgs); // {status:'ok', info:'', data:undefined};
    // 结束 == 加载动画
    document.dispatchEvent(pdcCmdDone);

    // 返回消息
    if(result.status === 'ok'){
        outputContent1.setValue(result.info.trim());
        new Bs5EffMessage(`数字摘要信息提取成功，已将信息填写到数字签名信息输入框`).show();
    }else{
        new Bs5EffMessage(`数字摘要信息提取失败，信息如下：${result.info}`).show();
    }
}

/**
 * 进行信息对比
 */
function doContentCompare(){

    // 先获取内容
    let output = outputContent1.getValue().trim();
    let compare = compareConetent1.getValue().trim();

    // 查看内容是否已经OK
    if(output.length<=0 || compare.length<=0){
        new Bs5EffMessage('数字签名信息 与 对照内容 不完整，请检查是否已经全部填写完整。').show();
        return ;
    }

    // 开始对比
    if(output.toLowerCase() === compare.toLowerCase()){
        new Bs5EffMessage('数字签名信息 与 对照内容 完全一致！', {title:'信息对比结果'}).show();
    }else{
        new Bs5EffMessage('数字签名信息 与 对照内容 有一些差异，它们是不同的！', {title:'信息对比结果'}).show();
    }
}

/**
 * 执行 加密 或者 解密
 */
async function doEnorDe(){

    // 这里是给浏览器处理的
    if(!myapi.isInApp){
        console.log(new Date(), '浏览器模拟...给予 jvm 和 jar 一些值');
        jvm = 'test_jvm';
        jar = 'test_jar';
    }

    // 配置填写校验
    if(jvm.length<=0 || jar.length<=0) { new Bs5EffMessage('Java 或者 Jar 环境配置异常，请检查"基础配置"功能菜单').show(); return ; }

    // 执行参数
    let cmdArgs = ['-m','ASYMMETRIC_ENCRYPTION'];
    // 需要提取的组件数组
    let comptArr = [ algorithm2, actionType2, inputContentType2, inputContent2 ];
    // 这还需要根据 操作类型 添加具体的 组件
    if(actionType2.getValue()[0]==='encrypt'){
        // 加密（密钥长度，公钥）
        comptArr.push(publicKey2, keyLength2);
    }else{
        // 解密（私钥）
        comptArr.push(privateKey2);
    }

    // 在执行前，先校验一下
    let validResult = comptArr.map(compt=>compt.valid()).filter(value=>value===false).length;
    if(validResult>0){
        new Bs5EffMessage(`内容校验不通过，还有 ${validResult} 个内容尚未填写正确`).show(); 
        return ;
    }

    // 如果，加密时，不提供公钥信息，则需要在执行前，确认一次
    if(actionType2.getValue()[0]==='encrypt' && publicKey2.getValue().trim().length<=0){
        let choose = await myapi.showConfirm('当前没有提供 公钥 信息，这样执行时，会重新生成一个密钥对（公钥、私钥），确定执行？');
        if(choose===false){
            return ;
        }
    }

    // 正式执行
    comptArr.forEach(compt=>{
        let paramName = compt.cmdParam;
        let value = du.isTargetObject(compt, Bs5EffFormTextRadio) ? compt.getValue()[0] : compt.getValue().trim();
        // 加入参数列表
        if(value.length>0) cmdArgs.push(paramName, value);
    });

    // 调用开始 == 加载动画
    document.dispatchEvent(pdcCmdRunning);
    let result = await myapi.execJar(jvm, jar, cmdArgs); // {status:'ok', info:'', data:undefined};
    // 调用结束 == 加载动画
    document.dispatchEvent(pdcCmdDone);

    // 执行结果的处理
    if(result.status === 'ok' && du.NotNullValue(result.data)){
        let pubKey = result.data.publicKey;
        let priKey = result.data.privateKey;
        let resultString = result.data.resultString;
        // 
        outputContent2.setValue(resultString);
        if(publicKey2.getValue().trim().length<=0 && pubKey.length>0) publicKey2.setValue(pubKey);
        if(privateKey2.getValue().trim().length<=0 && priKey.length>0) privateKey2.setValue(priKey); 
    }

    // 消息提示
    new Bs5EffMessage(result.info, {title:`执行${result.status==='ok'?'成功':'失败'}`}).show(); 
}

/**
 * 保存配置信息
 */
async function keyPairConfigSave(event){
    
    // 首先收集要保存的组件
    let configNameVal = configName2.getValue().trim();
    // 收集要处理的组件，然后保存成一个 对象。要注意的是 对象的内部顺序 不一定 跟写的顺序一致
    let comptObjects = {publicKey2, privateKey2};
    
    // 开始判断
    if(configNameVal.length<=0 || !configName2.valid()) {
        new Bs5EffMessage('配置文件的名称尚未填写正确, 请检查').show(); 
        return ; 
    }
    let invalidNum = Object.keys(comptObjects).map(name=>comptObjects[name].getValue().trim()).filter(val=>val.length<=0).length;
    if( invalidNum>0) { new Bs5EffMessage('保存配置失败，需要同时具有公钥、私钥信息，请检查！').show(); return ; }

    // 构造一个 文件名
    let filename = `keypairconfig-${configNameVal}.properties`;
    // 构造一个配置信息对象，传到后台，写入文件
    let config = {filename};
    // 遍历 comptObjects ，把键值对写入 config 然后 保存
    Object.keys(comptObjects).forEach(name=>{
        let cmpt = comptObjects[name];
        let key = name;
        // 对于 单选框，返回的是 一个 数组，取第一个就行了。一般文字组件，返回字符串
        let value = du.isTargetObject(cmpt, Bs5EffFormTextRadio) ? cmpt.getValue()[0] : cmpt.getValue().trim();
        // 填充
        config[key] = value;
    });

    // 开始 == 加载动画
    document.dispatchEvent(pdcCmdRunning);
    
    let result = await myapi.saveConfig(config); //  保存
    if(result.status==='ok'){
        // 
        new Bs5EffMessage(`配置保存成功，保存路径为：${result.configFileName}`).show();

        // 如果保存成功，还需要刷新 配置下拉列表
        await keyPairConfigListRefresh();
    }else{
        new Bs5EffMessage(`配置保存失败，后台异常信息为：${result.info}`).show();
    }

    // 结束 == 加载动画
    document.dispatchEvent(pdcCmdDone);

    
}

/**
 * 加载配置信息
 */
async function keyPairConfigLoad(event){

    // 配置文件名
    let filename = `keypairconfig-${event.target.getAttribute('option')}`;
    
    // 开始 == 加载动画
    document.dispatchEvent(pdcCmdRunning);
    let result = await myapi.readConfig(filename); //{status:'ok', info:'', data:{}};
    // 结束 == 加载动画
    document.dispatchEvent(pdcCmdDone);

    if(result.status!=='ok'){
        new Bs5EffMessage(`配置加载失败，后台异常信息为：${result.info}`).show(); return ;
    }

    // 设置对应的值
    if(result.data.filename!==undefined) {
        let newName = result.data.filename;
        newName = newName.substring(newName.indexOf('-')+1, newName.lastIndexOf('.'));
        configName2.setValue(newName);
    }
    if(result.data.publicKey2!==undefined) publicKey2.setValue(result.data.publicKey2);
    if(result.data.privateKey2!==undefined) privateKey2.setValue(result.data.privateKey2);

    new Bs5EffMessage(`加载配置 ${filename} 完成`).show();
}

/**
 * 刷新配置信息列表
 */
async function keyPairConfigListRefresh(){
    // 获取配置信息
    let result = await myapi.getAllConfigId('keypairconfig');

    //
    if(result.status !== 'ok') { new Bs5EffMessage(`加载配置文件列表失败，后台异常信息为：${result.info}`).show(); return ; }
    if(result.status === 'ok' && (result.data===undefined || result.data.length<=0)){ 
        new Bs5EffMessage(`当前功能没有加载到任何已保存的配置文件信息`).show(); return ;
    }else{
        // 开始刷新
        let data = result.data.map(filename=>filename.substr(filename.indexOf('-')+1));
        // 转 map
        let tmpMap = new Map();
        data.forEach(value=>{
            tmpMap.set(value, value);
        });
        btnLoadKeyPairs.refresh(tmpMap, true);
        new Bs5EffMessage(`当前已加载到 ${data.length} 个可用配置文件`).show();
    }
}

/**
 * 删除所有的原有配置文件
 */
async function keyPairConfigRemoveAll(){

    // 先确认一次
    let choose = await myapi.showConfirm('确定要清空所有配置信息吗？这样将会删除本功能的所有 properties 配置文件。');
    
    if(choose){
        // 开始 == 加载动画
        document.dispatchEvent(pdcCmdRunning);
        // 开始执行
        let result = await myapi.removeAllConfig('keypairconfig'); // {status:'ok', info:''}
        // 结束 == 加载动画
        document.dispatchEvent(pdcCmdDone);

        if(result.status!=='ok'){
            new Bs5EffMessage(`删除配置文件失败, 信息如下：${result.info}`).show(); return ;
        }else{
            // 刷新页面
            window.location.reload();
        }
    }
}