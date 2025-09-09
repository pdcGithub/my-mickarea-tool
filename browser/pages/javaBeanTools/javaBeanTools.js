/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "javaBeanTools.js" is part of project "my-mickarea-tool" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-09-08
 * @version 1.0.0 
 * @description  文件描述 ...
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { documentReady, loadingInit, myapi } from "../../modules/myselfs/js/apis.js";
import { pdcCmdRunning, pdcCmdDone } from "../../modules/myselfs/js/myEvents.js";
import { Bs5EffButton, Bs5EffCol, Bs5EffContainer, Bs5EffDropdownButton, Bs5EffForm, Bs5EffFormInputGroup, Bs5EffFormTextArea, Bs5EffFormTextInput, Bs5EffFormTextRadio, Bs5EffMessage, Bs5EffRow, Bs5EffTable, Bs5EffTextInput, Bs5EffTextRadio } from "../../modules/myselfs/js/bootstrap5Effect.js";
import { DataUtil as du } from "../../utils/datatype.js";
import { BTN_COR } from "../../modules/myselfs/js/bootstrap5UI.js";

// ======== 这里定义一些需要用到的全局变量

/**
 * 全局的表单 列组件 样式
 */
let globalCssOfCol = 'col-12 col-md-6 col-xl-4 mb-2';

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
 * 配置名称（这是可选的，如果保存了配置，下一次可以直接加载，不同重新填写）
 */
let myConfigName = new Bs5EffTextInput('myConfigName', {validRule:elem=>{
    //如果没有填写，则不校验; 填写了则校验
    let val = myConfigName.getValue().trim();
    let re = true;
    if(val.length>0){
        re = /^[0-9a-zA-Z]+$/.test(val);
    }
    return re;
}});
let myConfigSave = new Bs5EffButton('myConfigSave', {name:'保存配置', outline:true, click:configSave});
let myConfigLoad = new Bs5EffDropdownButton('myConfigLoad', {name:'加载配置', outline:true, click:configLoad});
let myConfigGroup = new Bs5EffFormInputGroup('myConfigGroup', 
    {
        labelInfo:'配置名称 (可选)', helperInfo:'这里填写配置名称, 可用于保存信息, 下次直接加载即可', invalidInfo:'请填写名称, 英文或者数字的组合'
    },
    {
        initChildren:[myConfigName, myConfigSave, myConfigLoad]
    }
);

/**
 * 结果信息表
 */
let resultTable = new Bs5EffTable('resultTable', 
    ['数据库对象名','实体对象名','处理状态','处理信息','操作','文件存放路径'], [[]], 
    {rowStriped:true, hover:true, groupDivider:true, alignMiddle:true}
);

/**
 * 数据库类型
 */
let databaseType = new Bs5EffFormTextRadio('databaseType', 
    {
        labelInfo:'数据库类型', helperInfo:'这里选择的是数据库的种类, 比如: MySQL 数据库, Oracle 数据库', invalidInfo:'数据库类型是必填的，请认真选择'
    },
    {
        chkOptions:du.genMap('mysql','MySQL 8+','oracle','Oracle 10+','sqlserver','MS SqlServer 2008+'),
        validRule:elemArr=>{
            // 最少选择一个
            return elemArr.filter(elem=>elem.checked).length>0;
        }
    }
)
databaseType.cmdParam = '-db'; // 配置命令参数名称

/**
 * JDBC 驱动类名称
 */
let jdbcDriver = new Bs5EffFormTextInput('jdbcDriver', 
    {
        labelInfo:'JDBC 驱动类名', helperInfo:'这里填写的是 Java 链接数据库时，用到的数据库驱动类名', invalidInfo:'类名不能为空。格式可能为: com.xxx.yyy'
    },
    {
        validRule:/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/
    }
)
jdbcDriver.cmdParam = '-jdn'; // 配置命令参数名称

/**
 * JDBC 链接 URL
 */
let jdbcConnUrl = new Bs5EffFormTextInput('jdbcConnUrl', 
    {
        labelInfo:'JDBC 链接 URL', helperInfo:'这里填写的是 JDBC 驱动 链接数据库时，调用的 URL 信息', invalidInfo:'URL 不能为空。格式可能为: jdbc:xxxx:yyy'
    },
    {
        validRule:/^jdbc:(oracle|mysql|sqlserver):[\.=:@;0-9a-zA-Z\_\\\/]+$/
    }
)
jdbcConnUrl.cmdParam = '-ju'; // 配置命令参数名称

/**
 * 数据库用户名
 */
let dbUserName = new Bs5EffFormTextInput('dbUserName', 
    {
        labelInfo:'数据库用户名 ( 连接数据库用 )', helperInfo:'这里填写的是, 连接数据库时用的账户名', invalidInfo:'数据库用户名不能为空 ( 不包含双引号和单引号 )'
    },
    {
        validRule:/^(?!.*["'])(?=.+)/
    }
)
dbUserName.cmdParam = '-dun'; // 配置命令参数名称

/**
 * 数据库用户密码
 */
let dbUserPasswd = new Bs5EffFormTextInput('dbUserPasswd', 
    {
        labelInfo:'数据库用户密码 ( 连接数据库用 )', helperInfo:'这里填写的是, 连接数据库时用的账户对应的密码', invalidInfo:'数据库用户密码不能为空 ( 不包含双引号和单引号 )'
    },
    {
        validRule:/^(?!.*["'])(?=.+)/
    }
)
dbUserPasswd.cmdParam = '-dup'; // 配置命令参数名称

/**
 * 数据库连接超时设置
 */
let connTimeout = new Bs5EffFormTextInput('connTimeout', 
    {
        labelInfo:'数据库连接超时设置 ( 毫秒 )', helperInfo:'这里填写的是, 连接数据库时响应的超时时间。', invalidInfo:'这里的数值必须在 1000 到 300000 这个范围'
    },
    {
        validRule:htmlElem=>{
            let numVal = parseInt(htmlElem.value.trim());
            return isNaN(numVal) ? false : (numVal>=1000 && numVal<=300000);
        }
    }
)
connTimeout.cmdParam = '-ct'; // 配置命令参数名称

/**
 * 数据库对象所属模式名
 */
let schemaName = new Bs5EffFormTextInput('schemaName', 
    {
        labelInfo:'模式名 ( 数据库对象所属 )', helperInfo:'与连接信息不同,这里是数据库对象所属。MySQL是数据库名, Oracle是用户名, SqlServer是 dbo', invalidInfo:'数据库模式名 ( 数据库对象所属 )不能为空'
    },
    {
        validRule:/[\S]+/
    }
)
schemaName.cmdParam = '-sc'; // 配置命令参数名称

/**
 * 数据库对象所属用户名
 */
let schemaUserName = new Bs5EffFormTextInput('schemaUserName', 
    {
        labelInfo:'用户名 ( 数据库对象所属 )', helperInfo:'与连接信息不同,这里是数据库对象所属。MySQL, Oracle是用户名, SqlServer是 dbo', invalidInfo:'数据库用户名 ( 数据库对象所属 )不能为空'
    },
    {
        validRule:/[\S]+/
    }
)
schemaUserName.cmdParam = '-scu'; // 配置命令参数名称

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
charset.cmdParam = '-fc'; // 配置命令参数名称

/**
 * 生成器的处理模式
 */
let actionType = new Bs5EffFormTextRadio('actionType', 
    {
        labelInfo:'处理模式', helperInfo:'这里是生成器的处理模式，它只能二选一', invalidInfo:'生成器的处理模式是必填的，请认真选择'
    },
    {
        chkOptions:du.genMap('object','数据库对象','sql','SQL 语句'),
        validRule:elemArr=>{
            // 最少选择一个
            return elemArr.filter(elem=>elem.checked).length>0;
        },
        customEvent:du.genMap('change', event=>{
            let actionTypeVal = actionType.getValue().length>0 ? actionType.getValue()[0] : '';
            if(actionTypeVal === 'object'){
                dbObjectNames.enable();
                dbSqlString.disable();
            }else if(actionTypeVal === 'sql'){
                dbObjectNames.disable();
                dbSqlString.enable();
            }
        })
    }
)
actionType.cmdParam = '-at'; // 配置命令参数名称

/**
 * 处理模式：1 - 数据库对象信息
 */
let dbObjectNames = new Bs5EffFormTextArea('dbObjectNames', 
    {
        labelInfo:'数据库对象信息', helperInfo:'这里是要生成 Java 实体的数据库对象信息, 比如: 表名,视图', invalidInfo:'数据库对象信息不能为空'
    },
    {
        rows:4, validRule:/[\S]+/
    }
)
dbObjectNames.cmdParam = '-so'; // 配置命令参数名称

/**
 * 处理模式：2 - 数据库 select 语句
 */
let dbSqlString = new Bs5EffFormTextArea('dbSqlString', 
    {
        labelInfo:'数据库 select 语句', helperInfo:'这里是要生成 Java 实体的数据库 select 语句, 比如: select 1 from dual', invalidInfo:'数据库 select 语句不能为空'
    },
    {
        rows:4, validRule:/[\S]+/
    }
)
dbSqlString.cmdParam = '-st'; // 配置命令参数名称

/**
 * Java 类的输出文件夹
 */
let outputFolder = new Bs5EffFormTextInput('outputFolder', 
    {
        labelInfo:'Java 类的输出文件夹', 
        helperInfo:'文件将要输出到的文件夹。不要设置为根目录(比如, Windows 的 C: 盘)', 
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
outputFolder.cmdParam = '-d'; // 配置命令参数名称

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

    // 加载第一页的配置文件列表
    configListRefresh();

    // 结束构建页面
    document.dispatchEvent(pdcCmdDone);
});

/**
 * 页面初始构建处理
 */
function buildForm(){

    buildForm_1();

    buildForm_2();

    buildForm_3();

    // 加载当前已有的配置文件信息

    // 设置默认值
    databaseType.setValue('mysql');
    connTimeout.setValue('5000');
    charset.setValue('utf-8');
    actionType.setValue('object')
}

/**
 * 整合然后写入页面 config-tab-pane
 */
function buildForm_1(){

    // 
    let container1 = new Bs5EffContainer('container1', {isFluid:true});
    let form1 = new Bs5EffForm('form1');

    // 页面 1 的组件列表
    let comptArr1 = [myConfigGroup, databaseType, jdbcDriver, jdbcConnUrl, dbUserName, dbUserPasswd, connTimeout];
    // 页面 1 的按钮
    let btnConnTest = new Bs5EffButton('btnConnTest', {name:'数据库连接测试', cssClass:'me-1', click:actionConnectDB});
    let btnRefresh = new Bs5EffButton('btnRefresh', {name:'清空配置', color:BTN_COR.success, cssClass:'me-1', click:refreshPage});
    let btnRemoveAll = new Bs5EffButton('btnRemoveAll', {name:'清空缓存', color:BTN_COR.warning, cssClass:'me-1', click:configRemoveAll});
    // 定义布局
    let row1 = new Bs5EffRow('form1Row1');
    let row2 = new Bs5EffRow('form1Row2');
    // 组合
    comptArr1.forEach((cmpt, index)=>{
        row1.addChildren(new Bs5EffCol(`form1Row1col${index}`, {initChildren:[cmpt], cssClass:globalCssOfCol}));
    });
    row2.addChildren(new Bs5EffCol('form1Row2Col1', {initChildren:[btnConnTest, btnRefresh, btnRemoveAll], cssClass:'col-12'}));
    form1.addChildren(row1, row2);
    container1.addChildren(form1);
    container1.writeToPage(document.getElementById('config-tab-pane'));
}

/**
 * 整合然后写入页面 dbobj-tab-pane
 */
function buildForm_2(){

    //
    let container2 = new Bs5EffContainer('container2', {isFluid:true});
    let form2 = new Bs5EffForm('form2');

    // 页面 2 的组件列表
    let comptArr2 = [schemaName, schemaUserName, charset, actionType, dbObjectNames, dbSqlString, outputFolder];
    // 页面 2 的按钮
    let btnSelectDBObjs = new Bs5EffButton('btnSelectDBObjs', {name:'选取库表、视图', cssClass:'me-1', click:actionSelectDBObj});
    let btnRunGen = new Bs5EffButton('btnRunGen', {name:'生成实体', color:BTN_COR.success, cssClass:'me-1', click:actionGenJavaBeans});
    // 定义布局
    let row1 = new Bs5EffRow('form2Row1');
    let row2 = new Bs5EffRow('form2Row2');
    // 组合
    comptArr2.forEach((cmpt, index)=>{
        row1.addChildren(new Bs5EffCol(`form2Row1col${index}`, {initChildren:[cmpt], cssClass:globalCssOfCol}));
    });
    row2.addChildren(new Bs5EffCol('form2Row2Col1', {initChildren:[btnSelectDBObjs, btnRunGen], cssClass:'col-12'}));
    form2.addChildren(row1, row2);
    container2.addChildren(form2);

    container2.writeToPage(document.getElementById('dbobj-tab-pane'));
}

/**
 * 整合然后写入页面 result-tab-pane
 */
function buildForm_3(){

    // 
    resultTable.writeToPage(document.getElementById('result-tab-pane'));
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
 * 刷新当前页面
 */
async function refreshPage(){
    let choose = await myapi.showConfirm('确定刷新当前页面吗? 如果尚未保存，则会丢失信息。');
    if(choose) window.location.reload();
}

/**
 * 数据库链接测试
 */
async function actionConnectDB(){
    // 执行参数
    let cmdArgs = ['-m','DB_CONN_TEST'];

    // 收集要处理的组件，然后保存成一个 对象。要注意的是 对象的内部顺序 不一定 跟写的顺序一致
    let comptObjects = {databaseType, jdbcDriver, jdbcConnUrl, dbUserName, dbUserPasswd, connTimeout};
    
    // 开始判断
    let invalidNum = Object.keys(comptObjects).map(name=>comptObjects[name].valid()).filter(val=>val===false).length;
    if( invalidNum>0) { new Bs5EffMessage('第一页的表单尚未填写完成, 请检查').show(); return ; }

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
    new Bs5EffMessage(`数据库连接${result.status==='ok'?'成功':'失败'}, 返回消息如下：${result.info}`).show();

}

/**
 * 数据库对象选择
 */
function actionSelectDBObj(){
    // 执行参数
    let cmdArgs = ['-m','DB_OBJ_SELECT'];
}

/**
 * Java 实体类的生成处理
 */
function actionGenJavaBeans(){
    // 执行参数
    let cmdArgs = ['-m','JAVA_BEAN_GEN'];
}

/**
 * 保存配置信息
 */
async function configSave(event){
    
    // 首先收集要保存的组件
    let configNameVal = myConfigName.getValue().trim();
    // 收集要处理的组件，然后保存成一个 对象。要注意的是 对象的内部顺序 不一定 跟写的顺序一致
    let comptObjects = {databaseType, jdbcDriver, jdbcConnUrl, dbUserName, dbUserPasswd, connTimeout};
    
    // 开始判断
    if(configNameVal.length<=0 || !myConfigName.valid()) { 
        myConfigName.setValidFailed(); 
        new Bs5EffMessage('配置文件的名称尚未填写正确, 请检查').show(); 
        return ; 
    }
    let invalidNum = Object.keys(comptObjects).map(name=>comptObjects[name].valid()).filter(val=>val===false).length;
    if( invalidNum>0) { new Bs5EffMessage('第一页的表单尚未填写完成, 请检查').show(); return ; }

    // 构造一个 文件名
    let filename = `beanconfig-${configNameVal}.properties`;
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
        await configListRefresh();
    }else{
        new Bs5EffMessage(`配置保存失败，后台异常信息为：${result.info}`).show();
    }

    // 结束 == 加载动画
    document.dispatchEvent(pdcCmdDone);

    
}

/**
 * 加载配置信息
 */
async function configLoad(event){

    // 配置文件名
    let filename = `beanconfig-${event.target.getAttribute('option')}`;
    
    // 开始 == 加载动画
    document.dispatchEvent(pdcCmdRunning);
    let result = await myapi.readConfig(filename); //{status:'ok', info:'', data:{}};
    // 结束 == 加载动画
    document.dispatchEvent(pdcCmdDone);

    if(result.status!=='ok'){
        new Bs5EffMessage(`配置保存失败，后台异常信息为：${result.info}`).show(); return ;
    }

    // 设置对应的值
    if(result.data.filename!==undefined) {
        let newName = result.data.filename;
        newName = newName.substring(newName.indexOf('-')+1, newName.lastIndexOf('.'));
        myConfigName.setValue(newName);
    }
    if(result.data.databaseType!==undefined) databaseType.setValue(result.data.databaseType);
    if(result.data.jdbcDriver!==undefined) jdbcDriver.setValue(result.data.jdbcDriver);
    if(result.data.jdbcConnUrl!==undefined) jdbcConnUrl.setValue(result.data.jdbcConnUrl);
    if(result.data.dbUserName!==undefined) dbUserName.setValue(result.data.dbUserName);
    if(result.data.dbUserPasswd!==undefined) dbUserPasswd.setValue(result.data.dbUserPasswd);
    if(result.data.connTimeout!==undefined) connTimeout.setValue(result.data.connTimeout);

    new Bs5EffMessage(`加载配置 ${filename} 完成`).show();
}

/**
 * 刷新配置信息列表
 */
async function configListRefresh(){
    // 获取配置信息
    let result = await myapi.getAllConfigId('beanconfig');

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
        myConfigLoad.refresh(tmpMap);
        new Bs5EffMessage(`当前已加载到 ${data.length} 个可用配置文件`).show();
    }
}

/**
 * 删除所有的原有配置文件
 */
async function configRemoveAll(){

    // 先确认一次
    let choose = await myapi.showConfirm('确定要清空所有配置信息吗？这样将会删除本功能的所有 properties 配置文件。');
    
    if(choose){
        // 开始 == 加载动画
        document.dispatchEvent(pdcCmdRunning);
        // 开始执行
        let result = await myapi.removeAllConfig('beanconfig'); // {status:'ok', info:''}
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