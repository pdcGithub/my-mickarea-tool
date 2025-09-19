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
import { Bs5EffContainer, Bs5EffForm, Bs5EffButton, Bs5EffCol, Bs5EffFormTextArea, Bs5EffFormTextRadio, Bs5EffRow, Bs5EffMessage, Bs5EffFormTextInput } from "../../modules/myselfs/js/bootstrap5Effect.js";
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
        labelInfo:'密钥长度 (数字)', helperInfo:'这是加密算法用于生成密钥对，所需要的密钥长度，一般大于 1024 小于 4096', invalidInfo:'密钥长度需要大于 1024 小于 4096'
    },
    {
        validRule:elem=>{
            let val = keyLength2.getValue().trim();
            if(/^[1-9]\d*$/.test(val)) {
                let tmp = parseInt(val);
                return (Number.isNaN(tmp) || tmp<1024 || tmp>4096) ? false: true;
            }else{
                return false;
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
        rows:3,
    }
);
publicKey2.cmdParam = '-pubkey'; // 配置命令参数名称

let privateKey2 = new Bs5EffFormTextArea('privateKey2', 
    {
        labelInfo:'私钥信息字符串', helperInfo:'私钥信息用于信息解密操作，必须提供', invalidInfo:'私钥信息字符串不能为空，请认真填写'
    },
    {
        rows:3,
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

    let btnDoEnOrDe2 = new Bs5EffButton('btnDoEnOrDe2', {name:'加密/解密', cssClass:'me-1', click:doEnorDe});
    let btnRefresh2 = new Bs5EffButton('btnRefresh2', {name:'刷新页面', color:BTN_COR.warning, cssClass:'me-1', click:refreshPage});
    let row4 = new Bs5EffRow(undefined, {
        initChildren:[ new Bs5EffCol(undefined, {
            initChildren:[btnDoEnOrDe2, btnRefresh2]
        }) ]
    });

    form2.addChildren(row1, row2, row3, row4);

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
function doEnorDe(){

}