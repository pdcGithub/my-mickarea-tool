// 定义关于 Electron 暴露的 api 对象（因为是 iframe 所以，只有父页面有 api 对象）
let ElectronAPI;
try{ ElectronAPI = window.parent.ElectronAPI}catch(e){ElectronAPI=undefined};
// 判断是否在 app 中运行
let isApp = ElectronAPI ? true : false;

//设计一个表单对象
const formObjMap1 = {
    //表单内容
    databaseType:{id:'databaseType', title:'数据库类型', colWidth:'col-md-4', needValid:true, validReg:undefined, invalidInfo:'请选择数据库类型', type:'radio', typeInfo:[
        {label:'MySql 8+', value:'MySql', checked:false},
        {label:'Oracle 10+', value:'Oracle', checked:false},
        {label:'MS SqlServer 2008+', value:'SqlServer', checked:false}
    ]},
    jvm:{id:'jvm', title:'Java 环境路径', colWidth:'col-md-4', needValid:true, validReg:/.+/, invalidInfo:'请选择 Java 环境路径', type:'file', typeInfo:[]},
    jar:{id:'jar', title:'Java 后端的Jar包路径', colWidth:'col-md-4', needValid:true, validReg:/.+/, invalidInfo:'请选择 可执行 Jar包路径', type:'file', typeInfo:[]},
    poolName:{id:'poolName', autofocus:true, title:'连接池名称', colWidth:'col-md-4', needValid:true, validReg:/.+/, invalidInfo:'请填写 连接池名称', type:'text', typeInfo:[]},
    jdbcDriver:{id:'jdbcDriver', title:'JDBC 驱动的 Java 类名', colWidth:'col-md-4', needValid:true, validReg:/.+/, invalidInfo:'请填写 JDBC 驱动类名称', type:'text', typeInfo:[]},
    jdbcUrl:{id:'jdbcUrl', title:'JDBC 链接字符串', colWidth:'col-md-4', needValid:true, validReg:/.+/, invalidInfo:'请填写 JDBC 链接信息', type:'text', typeInfo:[]},
    dbUser:{id:'dbUser', title:'数据库用户名', colWidth:'col-md-4', needValid:true, validReg:/.+/, invalidInfo:'请填写 数据库用户名', type:'text', typeInfo:[]},
    dbPasswd:{id:'dbPasswd', title:'数据库用户密码', colWidth:'col-md-4', needValid:true, validReg:/.+/, invalidInfo:'请选择 数据库用户密码', type:'password', typeInfo:[]},
    isAutoCommit:{id:'isAutoCommit', title:'数据库操作是否自动提交', colWidth:'col-md-4', needValid:true, validReg:undefined, invalidInfo:'请选择提交方式', type:'radio', typeInfo:[
        {label:'是', value:'true', checked:false},
        {label:'否', value:'false', checked:false}
    ]},
    connTimeout:{id:'connTimeout', title:'数据库链接超时阈值（毫秒）', colWidth:'col-md-4', needValid:true, validReg:/[1-9](\d+)?/, invalidInfo:'请填写 阈值', type:'text', typeInfo:[]},
    minThreadNum:{id:'minThreadNum', title:'连接池最小线程数', colWidth:'col-md-4', needValid:true, validReg:/[1-9](\d+)?/, invalidInfo:'请填写线程数，不超过10', type:'text', typeInfo:[]},
    maxThreadNum:{id:'maxThreadNum', title:'连接池最大线程数', colWidth:'col-md-4', needValid:true, validReg:/[1-9](\d+)?/, invalidInfo:'请填写线程数，不超过50', type:'text', typeInfo:[]},
    //操作按钮
    saveConfig:{id:'saveConfig', title:'保存配置', cssClass:'btn btn-primary mr-1', type:'button'},
    testDB:{id:'testDB', title:'数据库测试', cssClass:'btn btn-success mr-1', type:'button'},
    testJava:{id:'testJava', title:'Java测试', cssClass:'btn btn-secondary mr-1', type:'button'},
    clearConfig:{id:'clearConfig', title:'清空配置', cssClass:'btn btn-warning mr-1', type:'button'},
    clearCache:{id:'clearCache', title:'清空缓存', cssClass:'btn btn-info mr-1', type:'button'},
    pickConfig:{id:'pickConfig', title:'调取已有配置', cssClass:'btn btn-primary mr-1', type:'buttonGroup', typeInfo:[
        {label:'无', value:''},
        {label:'测试1', value:'test1'}
    ]}
};

//设计一个对象，用于信息填充处理
const mybaseconfig = [
    //内容配置
    [formObjMap1['databaseType'], formObjMap1['jvm'], formObjMap1['jar']],
    [formObjMap1['poolName'], formObjMap1['jdbcDriver'], formObjMap1['jdbcUrl']],
    [formObjMap1['dbUser'], formObjMap1['dbPasswd'], formObjMap1['isAutoCommit']],
    [formObjMap1['connTimeout'], formObjMap1['minThreadNum'], formObjMap1['maxThreadNum']],
    //按钮配置
    [formObjMap1['saveConfig'], formObjMap1['testDB'], formObjMap1['testJava'], formObjMap1['clearConfig'], formObjMap1['clearCache'], formObjMap1['pickConfig']]
];

//校验单个输入或者选择框的函数
function validFormObject(tabId, formObjId){
    //校验结果
    let result = true;
    //form对象
    let myForm = $('#'+tabId).find('form').eq(0);
    //内容的检索字符串
    let contentString = '';
    //内容对象
    let formObj = formObjMap1[formObjId];
    //设置了要校验才校验
    if(formObj.needValid){
        if(['radio', 'checkbox'].includes(formObj.type)){
            contentString = 'input[name="'+formObj.id+'"]';
            let targetGroup = myForm.find(contentString);
            //如果没有任何选中，则提示错误信息（否则提示正确信息）
            if(!targetGroup.is(':checked')){
                result = false;
                //如果没有这个样式，则添加
                if(!targetGroup.hasClass('is-invalid')){
                    targetGroup.addClass('is-invalid');
                    targetGroup.parent().parent().addClass('is-invalid');
                }
            }else{
                result = true;
                targetGroup.removeClass('is-invalid');
                targetGroup.parent().parent().removeClass('is-invalid');
            }
        }else{
            //如果是 file, text, password
            contentString = '#'+formObj.id;
            let targetInput = myForm.find(contentString);
            //如果有校验正则，并且校验失败，则显示错误提示（否则显示正确提示）
            if(formObj.validReg && !formObj.validReg.test(targetInput.val())){
                result = false;
                //如果没有这个样式，则添加
                if(!targetInput.hasClass('is-invalid')) targetInput.addClass('is-invalid');
            }else{
                result = true;
                targetInput.removeClass('is-invalid');
            }
        }
    }
    return result;
}

//校验整个表单的函数
function validForm(tabId){
    let result = true;
    switch(tabId){
        case 'nav-baseconfig':
            for(row of mybaseconfig){
                for(formObj of row){
                    if(!validFormObject(tabId, formObj.id)) result=false;
                }
            }
            break;
        default:
            break;
    }
    return result;
}

//表单生成处理
function genForm(tabId, configObj){
    //form对象
    let myForm = $('#'+tabId).find('form').eq(0);
    //第一步，清空内容
    myForm.html('');
    //开始构造
    for(row of configObj){
        let tmpRow = $('<div class="form-row">');
        for(col of row){
            let tmpCol = ['button', 'buttonGroup'].includes(col.type) ? undefined : $('<div>');
            switch(col.type){
                case 'button':
                    tmpRow.append('<button id="'+col.id+'" type="button" class="'+col.cssClass+'">'+col.title+'</button>');
                    break;
                case 'buttonGroup':
                    let group = $('<div class="btn-group">');
                    let btn = $('<button type="button" class="'+col.cssClass+' dropdown-toggle" data-toggle="dropdown">'+col.title+'</button>');
                    let dropdownMenu = $('<div class="dropdown-menu">');
                    if(col.typeInfo && col.typeInfo.length>0){
                        for(labels of col.typeInfo){
                            let tmpA = $('<a class="dropdown-item" href="#" value='+labels.value+'>'+labels.label+'</a>');
                            dropdownMenu.append(tmpA);
                        }
                    }
                    group.append(btn)
                    group.append(dropdownMenu);
                    tmpRow.append(group);
                    break;
                case 'checkbox':
                    // checkbox 同 radio
                case 'radio':
                    tmpCol.addClass('form-group '+col.colWidth);
                    tmpCol.append('<label>'+col.title+'</label>');
                    let colDiv = $('<div class="pt-2 my-check-radio-group">');
                    let tmpCount = 1;
                    for(subInfo of col.typeInfo){
                        let tmpLine = $('<div class="custom-control custom-'+col.type+' custom-control-inline">');
                        let tmpInput = $('<input class="custom-control-input" type="'+col.type+'" name="'+col.id+'" id="'+col.id+'_'+tmpCount+'" value="'+subInfo.value+'" '+(subInfo.checked?'checked':'')+'/>');
                        let tmpLabel = $('<label class="custom-control-label" for="'+col.id+'_'+tmpCount+'">'+subInfo.label+'</label>');
                        tmpLine.append(tmpInput);
                        tmpLine.append(tmpLabel);
                        tmpCount++;
                        colDiv.append(tmpLine);
                    }
                    colDiv.append('<div class="invalid-feedback">'+col.invalidInfo+'</div>');
                    tmpCol.append(colDiv);
                    break;
                case 'password':
                    // password 同 text 处理
                case 'file':
                    // file 同 text 处理
                default:
                    //默认作为 text 处理
                    tmpCol.addClass('form-group '+col.colWidth);
                    tmpCol.append('<label>'+col.title+'</label>');
                    let autofocus = col.autofocus ? 'autofocus' : '';
                    tmpCol.append('<input '+autofocus+' type="'+(col.type=='password'?col.type:'text')+'" class="form-control" id="'+col.id+'" autocomplete="off" placeholder="'+(!col.placeholder?'':col.placeholder)+'"/>');
                    //添加异常信息显示区
                    tmpCol.append('<div class="invalid-feedback">'+col.invalidInfo+'</div>');
                    break;
            }
            //将列信息，放入行信息
            if(tmpCol) tmpRow.append(tmpCol);
        }
        //将 form-row 放入form标签
        myForm.append(tmpRow);
    }
}

//事件绑定处理
function actionBinding(){
    //按钮绑定
    $('#saveConfig').on('click', saveConfigAction);
    $('#testDB').on('click', testDBAction);
    $('#testJava').on('click', testJavaAction);
    $('#clearConfig').on('click', clearConfigAction);
    $('#clearCache').on('click', clearCacheAction);
    
    //通用的表单内容的事件处理（输入框）
    for(row of mybaseconfig){
        for(formObj of row){
            
        }
    }

    //特殊的表单内容事件处理


}

// 当文档加载完毕，执行这个函数
$(document).ready(()=>{
    
    //开始处理表单生成
    genForm('nav-baseconfig', mybaseconfig);

    //开始事件注册处理
    actionBinding();
});

//按钮事件
async function saveConfigAction(){
    //先检查合法性
    let isOk = validForm('nav-baseconfig');
    if(isOk){
        //保存到缓存中
    }else{
        await ElectronAPI.showAlert('表单尚未填写完整，请检查。');
    }
}

//数据库测试事件
function testDBAction(){

}

//Java调用测试事件
function testJavaAction(){

}

//清空配置事件
function clearConfigAction(){
    window.location.reload();
}

//清空缓存信息事件
function clearCacheAction(){

}

//调取已有配置事件
function getCacheConfigAction(cacheId){

}