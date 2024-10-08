// 定义关于 Electron 暴露的 api 对象（因为是 iframe 所以，只有父页面有 api 对象）
let ElectronAPI;
try{ ElectronAPI = window.parent.ElectronAPI}catch(e){ElectronAPI=undefined};
// 判断是否在 app 中运行
let isApp = ElectronAPI ? true : false;

//在线编辑器的全局对象
let MyEditor = undefined;

//我自己的消息提示弹窗
const Msg = new MyMessage(isApp, ElectronAPI);

// 当文档加载完毕，执行这个函数
$(document).ready(()=>{
    
    //开始处理 第一页 表单生成
    genForm('nav-baseconfig', mybaseconfig);

    //开始处理 第二页 表单生成
    genForm('nav-dbobject', myobjectconfig);

    //表单生成后，开始处理在线编辑器的内容
    genOnlineEditor();

    //开始插入配置信息
    genDropdownMenu('nav-baseconfig');

    //开始事件注册处理
    actionBinding();
});

//设计一个表单对象
const formObjMap1 = {
    //表单内容 1
    databaseType:{id:'databaseType', title:'数据库类型', colWidth:'col-md-4', needValid:true, validReg:undefined, invalidInfo:'请选择数据库类型', type:'radio', typeInfo:[
        {label:'MySql 8+', value:'MySql', checked:false},
        {label:'Oracle 10+', value:'Oracle', checked:false},
        {label:'MS SqlServer 2008+', value:'SqlServer', checked:false}
    ]},
    jvm:{id:'jvm', title:'Java 环境路径（点击）', placeholder:'java 或者 java.exe 所在路径', colWidth:'col-md-4', needValid:true, validReg:/^.*[\\\/]java(\.exe)?$/, invalidInfo:'请选择 Java 环境路径', type:'text', typeInfo:[]},
    jar:{id:'jar', title:'Java 后端的Jar包路径（点击）', placeholder:'可执行的 jar 文件' ,colWidth:'col-md-4', needValid:true, validReg:/^.+$/, invalidInfo:'请选择 可执行 Jar包路径', type:'text', typeInfo:[]},
    poolName:{id:'poolName', autofocus:true, title:'配置名称', placeholder:'英文或者数字的组合',colWidth:'col-md-4', needValid:true, validReg:/^[0-9a-zA-Z]+$/, invalidInfo:'请填写名称, 英文或者数字的组合', type:'text', typeInfo:[]},
    jdbcDriver:{id:'jdbcDriver', title:'JDBC 驱动的 Java 类名', placeholder:'com.test.driver',colWidth:'col-md-4', needValid:true, validReg:/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/, invalidInfo:'请填写 JDBC 驱动类名称', type:'text', typeInfo:[]},
    jdbcUrl:{id:'jdbcUrl', title:'JDBC 链接字符串', placeholder:'jdbc:...',colWidth:'col-md-4', needValid:true, validReg:/^jdbc:(oracle|mysql|sqlserver):[\.=:@;0-9a-zA-Z\_\\\/]+$/, invalidInfo:'JDBC 链接异常', type:'text', typeInfo:[]},
    dbUser:{id:'dbUser', title:'数据库用户名', colWidth:'col-md-4', needValid:true, validReg:/^(?!.*["'])(?=.+)/, invalidInfo:'请填写 数据库用户名(不包含双引号和单引号)', type:'text', typeInfo:[]},
    dbPasswd:{id:'dbPasswd', title:'数据库用户密码', colWidth:'col-md-4', needValid:true, validReg:/^(?!.*["'])(?=.+)/, invalidInfo:'请选择 数据库用户密码(不包含双引号和单引号)', type:'password', typeInfo:[]},
    isAutoCommit:{id:'isAutoCommit', title:'数据库操作是否自动提交', colWidth:'col-md-4', needValid:true, validReg:undefined, invalidInfo:'请选择提交方式', type:'radio', typeInfo:[
        {label:'是', value:'true', checked:false},
        {label:'否', value:'false', checked:false}
    ]},
    connTimeout:{id:'connTimeout', title:'数据库链接超时阈值（毫秒）', colWidth:'col-md-4', needValid:true, validReg:/^[1-9](\d+)?$/, invalidInfo:'请填写 阈值', type:'text', typeInfo:[]},
    minThreadNum:{id:'minThreadNum', title:'连接池最小线程数', colWidth:'col-md-4', needValid:true, validReg:/^[1-9](\d+)?$/, invalidInfo:'请填写线程数，不超过10', type:'text', typeInfo:[]},
    maxThreadNum:{id:'maxThreadNum', title:'连接池最大线程数', colWidth:'col-md-4', needValid:true, validReg:/^[1-9](\d+)?$/, invalidInfo:'请填写线程数，不超过50', type:'text', typeInfo:[]},
    
    //表单内容 2
    charset:{id:'charset', title:"文件字符集", colWidth:"col-md-6", needValid:true, validReg:undefined, invalidInfo:'请选择字符集', type:'radio', typeInfo:[
        {label:'UTF-8', value:'UTF-8', checked:false},
        {label:'GBK', value:'GBK', checked:false},
        {label:'GB2312', value:'GB2312', checked:false},
        {label:'GB18030', value:'GB18030', checked:false},
        {label:'BIG5', value:'BIG5', checked:false},
        {label:'ISO-8859-1', value:'ISO-8859-1', checked:false}
    ]},
    actionType:{id:'actionType', title:"对象 / Sql语句", colWidth:"col-md-6", needValid:true, validReg:undefined, invalidInfo:'请选择操作类型', type:'radio', typeInfo:[
        {label:'数据库表、视图', value:'object', checked:false},
        {label:'Sql 语句', value:'sql', checked:false}
    ]},
    schema:{id:'schema', title:"数据库实例名", colWidth:"col-md-6", needValid:true, validReg:/^[0-9A-Za-z\_]+$/, invalidInfo:'数字或者字母的组合', type:'text', typeInfo:[]},
    schemaUser:{id:'schemaUser', title:"数据库对象所属用户", colWidth:"col-md-6", needValid:true, validReg:/^[0-9A-Za-z\_]+$/, invalidInfo:'数字或者字母的组合', type:'text', typeInfo:[]},
    sqlObjects:{id:'sqlObjects', title:"数据库对象", colWidth:"col-md-12", needValid:true, validReg:/^[\$\_a-zA-Z0-9]+(\,[\$\_a-zA-Z0-9]+)*$/, invalidInfo:'请选择数据库对象', type:'text', typeInfo:[]},
    sqlText:{id:'sqlText', title:"要映射的Sql语句", value:"/* 请输入数据库查询语句，比如：select * from my_table */", colWidth:"col-md-12", needValid:false, validReg:undefined, invalidInfo:'请填写sql语句', type:'textarea'},
    
    //操作按钮 1
    saveConfig:{id:'saveConfig', title:'保存配置', cssClass:'btn btn-primary', type:'button'},
    testDB:{id:'testDB', title:'数据库测试', cssClass:'btn btn-success', type:'button'},
    testJava:{id:'testJava', title:'Java测试', cssClass:'btn btn-secondary', type:'button'},
    clearConfig:{id:'clearConfig', title:'清空配置', cssClass:'btn btn-warning', type:'button'},
    clearCache:{id:'clearCache', title:'清空缓存', cssClass:'btn btn-info', type:'button'},
    pickConfig:{id:'pickConfig', title:'调取已有配置', cssClass:'btn btn-primary', type:'buttonGroup', typeInfo:[]},

    openLogDir:{id:'openLogDir', title:'打开调用日志', cssClass:'btn btn-warning', type:'button'},
    openJarLog:{id:'openJarLog', title:'打开Jar日志', cssClass:'btn btn-success', type:'button'},

    //操作按钮 2
    showDBObjects:{id:'showDBObjects', title:'选取库表、视图', cssClass:'btn btn-primary', type:'button', disabled:true},
    genDBObjects:{id:'genDBObjects', title:'生成实体', cssClass:'btn btn-success', type:'button', disabled:true},
    saveSqlScript:{id:'saveSqlScript', title:'保存SQL脚本', cssClass:'btn btn-info ', type:'button', disabled:true},
    loadSqlScript:{id:'loadSqlScript', title:'加载SQL脚本', cssClass:'btn btn-warning', type:'button', disabled:true}
};

//设计一个对象，用于信息填充处理
const mybaseconfig = [
    //内容配置
    [formObjMap1['databaseType'], formObjMap1['jvm'], formObjMap1['jar']],
    [formObjMap1['poolName'], formObjMap1['jdbcDriver'], formObjMap1['jdbcUrl']],
    [formObjMap1['dbUser'], formObjMap1['dbPasswd'], formObjMap1['isAutoCommit']],
    [formObjMap1['connTimeout'], formObjMap1['minThreadNum'], formObjMap1['maxThreadNum']],
    //按钮配置
    [formObjMap1['saveConfig'], formObjMap1['testDB'], formObjMap1['testJava'], 
     formObjMap1['clearConfig'], formObjMap1['clearCache'], formObjMap1['pickConfig'], 
     formObjMap1['openLogDir'], formObjMap1['openJarLog']
    ]
];

//设计一个对象，用于第二页填充处理
const myobjectconfig = [
    //内容
    [formObjMap1['charset'], formObjMap1['actionType']],
    [formObjMap1['schema'], formObjMap1['schemaUser']],
    [formObjMap1['sqlObjects']],
    [formObjMap1['sqlText']],
    //按钮
    [formObjMap1['showDBObjects'], formObjMap1['genDBObjects'], formObjMap1['saveSqlScript'], 
     formObjMap1['loadSqlScript']]
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
            //如果是 file, text, password, textarea
            contentString = '#'+formObj.id;
            let targetInput = myForm.find(contentString);
            //如果有校验正则，并且校验失败，则显示错误提示（否则显示正确提示）
            //如果是 disabled 的输入框，则不校验
            if(formObj.validReg && !targetInput.attr('disabled') && !formObj.validReg.test(targetInput.val())){
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

//收集表单中指定的表单对象的值
function collectFormValue(tabId, formObjId){
    //form对象
    let myForm = $('#'+tabId).find('form').eq(0);
    //内容的检索字符串
    let contentString = '';
    //内容对象
    let formObj = formObjMap1[formObjId];
    //由于勾选框 和 填写框处理 无法共用，所以要分开处理
    switch(formObj.type){
        case 'checkbox':
            contentString = 'input[name="'+formObj.id+'"]:checked';
            let targetCheckbox = myForm.find(contentString);
            if(targetCheckbox.length>=1){
                let tmpArray = [];
                for(oriObj of targetCheckbox){
                    tmpArray.push($(oriObj).val());
                }
                formObj.value = tmpArray.join(',');
            }else{
                formObj.value = '';
            }
            break;
        case 'radio':
            contentString = 'input[name="'+formObj.id+'"]:checked';
            let targetRadio = myForm.find(contentString);
            if(targetRadio.length==1){
                formObj.value = targetRadio.val()+'';
            }else{
                formObj.value = '';
            }
            break;
        default:
            contentString = '#'+formObj.id;
            let targetInput = myForm.find(contentString);
            let value = targetInput.val()?targetInput.val()+'':'';
            formObj.value = value;
            break;
    }
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
        case 'nav-dbobject':
            for(row of myobjectconfig){
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
                    tmpRow.append('<button id="'+col.id+'" type="button" class="'+col.cssClass+'" '+(col.disabled?'disabled="disabled"':'')+'>'+col.title+'</button>');
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
                case 'textarea':
                    tmpCol.addClass('form-group '+col.colWidth);
                    tmpCol.append('<label>'+col.title+'</label>');
                    let autofocusTextarea = col.autofocus ? 'autofocus' : '';
                    tmpCol.append('<textarea '+autofocusTextarea+' rows="'+(col.rows?col.rows:5)+'" class="form-control" id="'+col.id+'" autocomplete="off" placeholder="'+(!col.placeholder?'':col.placeholder)+'">'+(!col.value?'':col.value)+'</textarea>');
                    //添加异常信息显示区
                    tmpCol.append('<div class="invalid-feedback">'+col.invalidInfo+'</div>');
                    break;
                default:
                    // file 同 text 处理
                    // password 同 text 处理
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

//这里用于在页面初始化后，加载全部配置文件信息
async function genDropdownMenu(tabId){
    if(isApp){
        //请求后台
        let result = await ElectronAPI.getAllConfigId();
        //根据反应的结果处理
        if(result.status!='ok' && result.info){
            await Msg.myAlert(result.info);
        }else{
            //开始处理插入
            let idArray = result.data;
            if(idArray && idArray.length>0){
                let dropdownMenu = $('#'+tabId+' form .btn-group .dropdown-menu');
                dropdownMenu.html('');
                for(id of idArray){
                    dropdownMenu.append('<a class="dropdown-item" href="#" value="" id="'+id+'" onclick="readConfigAction(\''+id+'\')">'+id+'</a>');
                }
            }
        }
    }else{
        console.log('genDropdownMenu 这是浏览器测试环境，不调用 ElectronAPI');
    }
}

//这里处理在线编辑器的生成
function genOnlineEditor(){

    // CodeMirror 在线编辑器 初始化
    var myTextarea = document.getElementById(formObjMap1['sqlText'].id);
    var editor = CodeMirror.fromTextArea(myTextarea, {
        value: myTextarea.value,
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        mode: 'sql',
        lineNumberFormatter:function(lineno){
            return lineno + ' >>';
        }
    });

    //对全局变量 赋值
    MyEditor = new MyWebEditor(editor);

    //刷新一次文本框（估计页面有其它影响，不刷新的话，第一次出不来。）
    //页面如果是直接显示编辑器，这个问题是不会出现的。
    MyEditor.editor.refresh();
}

//事件绑定处理
function actionBinding(){

    //按钮绑定
    $('#saveConfig').on('click', saveConfigAction);
    $('#testDB').on('click', testDBAction);
    $('#testJava').on('click', testJavaAction);
    $('#clearConfig').on('click', clearConfigAction);
    $('#clearCache').on('click', clearCacheAction);

    //增加打开日志文件夹的处理
    $('#openLogDir').on('click', openLogDirAction);
    $('#openJarLog').on('click', openJarLogAction);

    //绑定第2页按钮事件
    $("#showDBObjects").on('click', showDBObjectsAction);
    $("#genDBObjects").on('click', genDBObjectsAction);
    $("#saveSqlScript").on('click', saveSqlScriptAction);
    $("#loadSqlScript").on('click', loadSqlScriptAction);

    //模态窗按钮事件绑定
    $("#modalSave").on('click', getCheckedObjFromModalBody);
    
    //第一页 ======================== 表单的事件绑定，通用的表单内容的事件处理（输入框 和 勾选框）
    for(row of mybaseconfig){
        for(formObj of row){
            if(['radio', 'checkbox'].includes(formObj.type)){
                //勾选框
                $('input[name="'+formObj.id+'"]').on('click', (jqueryEvent)=>{
                    validFormObject('nav-baseconfig', $(jqueryEvent.currentTarget).attr('name'));
                    //在校验的同时，也将值绑定到 formObjMap1 的对象中
                    collectFormValue('nav-baseconfig', $(jqueryEvent.currentTarget).attr('name'));
                });
            }else if(!['button','buttonGroup'].includes(formObj.type)){
                //文本输入框（jvm和jar点击事件触发文件选择，所以要分开处理）
                if(['jvm','jar'].includes(formObj.id)){
                    $('#'+formObj.id).on('change', (jqueryEvent)=>{
                        validFormObject('nav-baseconfig', $(jqueryEvent.currentTarget).attr('id'));
                        //在校验的同时，也将值绑定到 formObjMap1 的对象中
                        collectFormValue('nav-baseconfig',$(jqueryEvent.currentTarget).attr('id'));
                    });
                }else{
                    $('#'+formObj.id).on('click keyup change', (jqueryEvent)=>{
                        validFormObject('nav-baseconfig', $(jqueryEvent.currentTarget).attr('id'));
                        //在校验的同时，也将值绑定到 formObjMap1 的对象中
                        collectFormValue('nav-baseconfig',$(jqueryEvent.currentTarget).attr('id'));
                    });
                }
            }
        }
    }

    //特殊的表单内容事件处理（比如，文件选择）
    $('#jvm').on('click', async (jqueryEvent)=>{
        if(isApp){
            let result = await ElectronAPI.showFileDialog();
            if(result.canceled){
                $(jqueryEvent.currentTarget).val('').change();
            }else{
                $(jqueryEvent.currentTarget).val(result.filePaths[0]).change();
            }
        }
    });
    $('#jar').on('click', async (jqueryEvent)=>{
        if(isApp){
            let fileFilters = [
                { name:'jar 文件', extensions:['jar']}
            ];
            let result = await ElectronAPI.showFileDialog(fileFilters);
            if(result.canceled){
                $(jqueryEvent.currentTarget).val('').change();
            }else{
                $(jqueryEvent.currentTarget).val(result.filePaths[0]).change();
            }
        }
    });

    //第二页 ======================== 事件绑定处理
    for(row of myobjectconfig){
        for(formObj of row){
            if(['radio', 'checkbox'].includes(formObj.type)){
                //勾选框
                $('input[name="'+formObj.id+'"]').on('click', (jqueryEvent)=>{
                    validFormObject('nav-dbobject', $(jqueryEvent.currentTarget).attr('name'));
                    //在校验的同时，也将值绑定到 formObjMap1 的对象中
                    collectFormValue('nav-dbobject', $(jqueryEvent.currentTarget).attr('name'));
                    //如果是 ‘对象 / Sql语句’选择框，则需要处理输入框disabled的问题
                    if($(jqueryEvent.currentTarget).attr('name')=='actionType'){
                        //解锁生成按钮
                        $("#genDBObjects").removeAttr('disabled');
                        //以下按照选择来处理
                        if(formObjMap1.actionType.value=='object'){
                            //如果选择的是按对象生成，解锁 数据库对象 输入框；库表、视图选择按钮
                            $("#sqlObjects").removeAttr('disabled');
                            $("#sqlObjects").val('').change();
                            $("#showDBObjects").removeAttr('disabled');
                            //锁定 SQL 语句输入框；保存、加载 SQL 语句按钮
                            MyEditor.lockEditorAndSetString('/* 编辑框已锁定 */');
                            $("#saveSqlScript").attr('disabled',true);
                            $("#loadSqlScript").attr('disabled',true);
                        }else if(formObjMap1.actionType.value=='sql'){
                            //如果按SQL语句生成，解锁 SQL 语句输入框；保存、加载 SQL 语句按钮
                            MyEditor.unlockEditor();
                            $("#saveSqlScript").removeAttr('disabled');
                            $("#loadSqlScript").removeAttr('disabled');
                            //锁定 数据库对象 输入框；库表、视图选择按钮
                            $("#sqlObjects").attr('disabled',true);
                            $("#sqlObjects").val('').change();
                            $("#showDBObjects").attr('disabled',true);
                        }
                    }
                });
            }else if(!['button','buttonGroup'].includes(formObj.type)){
                $('#'+formObj.id).on('click keyup change', (jqueryEvent)=>{
                    validFormObject('nav-dbobject', $(jqueryEvent.currentTarget).attr('id'));
                    //在校验的同时，也将值绑定到 formObjMap1 的对象中
                    collectFormValue('nav-dbobject',$(jqueryEvent.currentTarget).attr('id'));
                });
            }
        }
    }

}

//按钮事件
async function saveConfigAction(){
    //先检查合法性
    let isOk = validForm('nav-baseconfig');
    if(isOk){
        //组建一个对象，传送给后台处理
        let myConfigMap = {
            databaseType:formObjMap1['databaseType'].value, jvm:formObjMap1['jvm'].value,               jar:formObjMap1['jar'].value,
            poolName:formObjMap1['poolName'].value,         jdbcDriver:formObjMap1['jdbcDriver'].value, jdbcUrl:formObjMap1['jdbcUrl'].value,
            dbUser:formObjMap1['dbUser'].value,             dbPasswd:formObjMap1['dbPasswd'].value,     isAutoCommit:formObjMap1['isAutoCommit'].value,
            connTimeout:formObjMap1['connTimeout'].value,   minThreadNum:formObjMap1['minThreadNum'].value, maxThreadNum:formObjMap1['maxThreadNum'].value
        }
        //传送到后台
        let result = await ElectronAPI.saveConfig(myConfigMap);
        if(result.status!='ok' && result.info){
            //如果后台返回异常信息，则显示
            await Msg.myAlert(result.info);
        }else{
            //将返回的配置文件名，插入按钮组
            let dropdownMenu = $('#nav-baseconfig form .btn-group .dropdown-menu');
            let aTags = dropdownMenu.find('a');
            let hadSameName = false;
            if(aTags.length>0){
                for(a of aTags){
                    if($(a).attr('id')==result.configFileName) {
                        hadSameName=true;
                        break;
                    }
                }
            }
            if(!hadSameName){
                dropdownMenu.append('<a class="dropdown-item" href="#" value="" id="'+result.configFileName+'" onclick="readConfigAction(\''+result.configFileName+'\')">'+result.configFileName+'</a>');
            }
            await Msg.myAlert('配置信息已保存成功，配置名['+result.configFileName+']已添加至"调取已有配置"按钮');
        }
    }else{
        await Msg.myAlert('表单尚未填写完整，请检查。');
    }
}

//根据配置id，获取配置信息
async function readConfigAction(configId){
    //获取配置信息
    let result = await ElectronAPI.readConfig(configId);
    if(result.status!='ok' && result.info){
        //显示异常信息
        await Msg.myAlert(result.info);
    }else{
        //如果正常的话，就把返回的配置信息，填充到文本框和勾选框
        for(obj in result.data){
            //console.log(obj+","+result.data[obj]);
            let type = formObjMap1[obj].type;
            switch(type){
                case 'radio':
                    //radio 框需要将内容选中，设置checked属性
                    let contentString1 = 'input[name="'+formObjMap1[obj].id+'"]';
                    //将配置的选择显示到页面上
                    $(contentString1).each((index,element)=>{
                        if($(element).val()==result.data[obj]) $(element).click();
                    });
                    break;
                case 'checkbox':
                    //对于checkbox，多个值，有逗号分割符
                    let myValue = result.data[obj].split(',');
                    //checkbox 框需要将内容选中，设置checked属性
                    let contentString2 = 'input[name="'+formObjMap1[obj].id+'"]';
                    //清空原有选择
                    $(contentString2).each((index,element)=>{
                        if($(element).is(':checked')) $(element).click();
                    });
                    //将配置的选择显示到页面上
                    $(contentString2).each((index,element)=>{
                        if(myValue.includes($(element).val())) $(element).click();
                    });
                    break;
                default:
                    //一般都是文本框
                    let contentString = '#'+formObjMap1[obj].id
                    $(contentString).val(result.data[obj]).change();
                    break;
            }
        }
    }
}

//数据库测试事件
async function testDBAction(){
    //先校验判断第一页表单，是否填充完整
    if(validForm('nav-baseconfig')){
        let jarArguments = [];
        let jarArgumentsKeys = ['databaseType', 'poolName', 'jdbcDriver', 'jdbcUrl', 'dbUser', 
                                'dbPasswd', 'isAutoCommit', 'connTimeout', 'minThreadNum', 'maxThreadNum'];
        //参数填充
        for(key of jarArgumentsKeys){
            jarArguments.push(formObjMap1[key].value.replace(/[\s\r\n]+/g,' ').trim());
        }
        //获取 jvm 路径 和 jar 路径
        let jvmPath = formObjMap1.jvm.value;
        let jarPath = formObjMap1.jar.value;
        //调用jar执行处理
        let result = await ElectronAPI.execJar(jvmPath, jarPath, jarArguments);
        //根据返回的结果显示信息（不论是否成功，都会返回消息，因此直接展示后台的消息即可）
        if(result.status=='ok'){
            await Msg.myAlert('执行成功，'+result.info);
        }else{
            await Msg.myAlert('执行失败，'+result.info);
        }
    }else{
        await Msg.myAlert('表单尚未填写完毕，请检查...');
    }
}

//Java调用测试事件
async function testJavaAction(){
    //先校验填写框是否填写完毕
    let jvmOk = validFormObject('nav-baseconfig','jvm');
    let jarOk = validFormObject('nav-baseconfig','jar');
    if( jvmOk && jarOk){
        //获取 jvm 路径 和 jar 路径
        let jvmPath = formObjMap1.jvm.value;
        let jarPath = formObjMap1.jar.value;
        //调用 java 命令，测试 jar 包能否正确调用并返回
        //调用jar执行处理
        let result = await ElectronAPI.execJar(jvmPath, jarPath);
        //根据返回的结果显示信息（不论是否成功，都会返回消息，因此直接展示后台的消息即可）
        if(result.status=='ok'){
            await Msg.myAlert('执行成功，'+result.info);
        }else{
            await Msg.myAlert('执行失败，'+result.info);
        }
    }else{
        await Msg.myAlert('请先填写 Java 环境路径 和 Jar 包路径');
    }
}

//清空配置事件
async function clearConfigAction(){
    let choose = await Msg.myConfirm('确定清空当前配置信息吗 ?');
    if(choose) window.location.reload();
}

//清空缓存信息事件
async function clearCacheAction(){
    let choose = await Msg.myConfirm('确定要清空缓存信息吗？清空后，所有已保存的配置文件都将删除!');
    if(choose){
        //调取后台处理
        let result = await ElectronAPI.removeAllConfig();
        //根据返回的结果显示信息
        if(result.status!='ok' && result.info){
            await Msg.myAlert(result.info);
        }else{
            //删除位于'调取已有配置'按钮下的配置信息
            let dropdownMenu = $('#nav-baseconfig form .btn-group .dropdown-menu');
            dropdownMenu.html('');
            //弹出提示信息
            await Msg.myAlert('缓存中的配置文件已全部删除!');
        }
    }
}

//打开调用程序时的日志文件夹
async function openLogDirAction(){
    //开始处理（软件的日志文件存放位置）
    let entityDir = await ElectronAPI.getStaticParameter('MY_SOFTWARE_LOG_DIR');
    await ElectronAPI.filePathOpen(entityDir);
}

//打开 Jar 的调用日志 文件夹
async function openJarLogAction(){
    await ElectronAPI.openJarExecLogDir();
}

//=======================================================================
//选取库表、视图操作
async function showDBObjectsAction(){
    try{
        if(!validForm('nav-baseconfig')) throw new Error('第一页，数据库基础配置尚未填写完毕!');
        //开始校验 部分校验，因为选取库表时，不需要全部填写完整
        let actionTypeOk = validFormObject('nav-dbobject', formObjMap1.actionType.id);
        let schemaOk = validFormObject('nav-dbobject', formObjMap1.schema.id);
        let schemaUserOk = validFormObject('nav-dbobject', formObjMap1.schemaUser.id);
        if(actionTypeOk && schemaOk && schemaUserOk){
            //开始调用
            let jarArguments = [];
            let jarArgumentsKeys = ['databaseType', 'poolName', 'jdbcDriver', 'jdbcUrl', 'dbUser', 
                                    'dbPasswd', 'isAutoCommit', 'connTimeout', 'minThreadNum', 'maxThreadNum',
                                    'schema', 'schemaUser'];
            //参数填充
            for(key of jarArgumentsKeys){
                jarArguments.push(formObjMap1[key].value.replace(/[\s\r\n]+/g,' ').trim());
            }
            //获取 jvm 路径 和 jar 路径
            let jvmPath = formObjMap1.jvm.value;
            let jarPath = formObjMap1.jar.value;
            //先打开模态窗
            fillInModalBody('请稍后，数据加载中 ......');
            $('#myDBObjects').modal('show');
            //然后，调用jar执行处理
            let result = new Object();
            if(isApp){
                result = await ElectronAPI.execJar(jvmPath, jarPath, jarArguments);
            }else{
                result.status='error';
                result.info='这是浏览器测试界面，仅能进行 UI 调整。';
            }
            if(result.status=='ok' && result.data){
                //获取到表和视图信息，则开始构建一个 选择界面
                fillInModalBody(result.data);
            }else{
                fillInModalBody('执行失败，异常信息如下：'+result.info);
            }
        }else{
            throw new Error('所需配置尚未填写完毕，请检查!');
        }
    }catch(error){
        await Msg.myAlert(error.message);
    }
}

//生成实体处理
async function genDBObjectsAction(){
    try{
        if(!validForm('nav-baseconfig')) throw new Error('第一页，数据库基础配置尚未填写完毕!');
        if(!validForm('nav-dbobject')) throw new Error('第二页，信息尚未填写完毕，请检查!');
        //开始处理（获取实体存放路径）
        let entityDir ;
        if(isApp){
            entityDir = await ElectronAPI.getStaticParameter('MY_SOFTWARE_ENTITY_DIR');
        }else{
            entityDir = '';
        }
        
        //开始收集参数
        let jarArguments = [];
        let jarArgumentsKeys = ['databaseType', 'poolName', 'jdbcDriver', 'jdbcUrl', 'dbUser', 
                                'dbPasswd', 'isAutoCommit', 'connTimeout', 'minThreadNum', 'maxThreadNum',
                                'schema', 'schemaUser', 'charset', 'actionType'];
        //参数填充
        for(key of jarArgumentsKeys){
            jarArguments.push(formObjMap1[key].value.replace(/[\s\r\n]+/g,' ').trim());
        }
        //根据actiionType 选择要填充的内容
        if(formObjMap1['actionType'].value=='object'){
            jarArguments.push(formObjMap1['sqlObjects'].value.replace(/[\s\r\n]+/g,' ').trim());
        }else if(formObjMap1['actionType'].value=='sql'){
            
            //因为 sql 语句编写 使用了 web编辑框，不是普通的 textarea，所以要额外的处理
            let sqlStr = MyEditor.getText() ? MyEditor.getText().trim() : '';
            if(sqlStr){
                //传参，调用后台处理
                jarArguments.push(sqlStr);
            }else{
                //提示，尚未书写可用语句
                await Msg.myAlert('获取不到可用的 sql 语句字符串信息。');
                //终止执行
                return false;
            }
            
        }
        //最后加上 实体存放路径
        jarArguments.push(entityDir);
        //获取 jvm 路径 和 jar 路径
        let jvmPath = formObjMap1.jvm.value;
        let jarPath = formObjMap1.jar.value;
        //切换到第3页，显示内容
        beforeGetDBResult('请稍后......');
        $("#nav-result-tab").click();
        //调用jar包执行
        let result = new Object();
        if(isApp){
            result = await ElectronAPI.execJar(jvmPath, jarPath, jarArguments);
        }else{
            result.status='error';
            result.info='这是浏览器测试界面，仅能进行 UI 调整。';
        }
        if(result.status=='ok' && result.data){
            //按照表格，构建执行信息
            afterGetDBResult(result.data);
        }else{
            await Msg.myAlert('执行失败，异常信息如下：'+result.info);
        }
    }catch(error){
        await Msg.myAlert(error.message);
    }
}

//保存 SQL 脚本信息
async function saveSqlScriptAction(){
    //先获取编辑器中的原始字符串
    let sqlScript = (MyEditor.getOriText() || ' ').trim();
    //
    if(!sqlScript){
        await Msg.myAlert('当前编辑器，没有任何内容可保存，请检查。');
        return false;
    }
    //保存信息
    MyEditor.saveScriptStr();
}

//加载 SQL 脚本信息
function loadSqlScriptAction(){
    MyEditor.loadScriptstr();
}

//进行模态窗内容构建
function fillInModalBody(data){
    //console.log(data);
    //内容标签对象
    let modalBody = $('#myDBObjects .modal-body').eq(0);
    //清空内容
    modalBody.html('');
    //根据类型处理
    if(typeof data === 'string'){
        modalBody.append('<p>'+data+'</p>');
    }else if(typeof data === 'object'){
        //开始填充
        if(data.length>0){
            //动态构建数据库表和视图的对象信息
            let form = $('<form>');
            let colNum = 3;  //将内容分组为多少列
            let rowNum = parseInt(data.length/colNum) + (data.length%colNum==0?0:1); //根据分组的列数，计算有多少行
            let tmpDiv = '';
            for(let i=0;i<rowNum;i++){
                //每行新建一个行对象
                tmpDiv = $('<div class="form-row">');
                for(let j=0;j<colNum;j++){
                    //每列创建一个列对象，放入 行对象；
                    if(i*colNum+j<data.length){
                       let col = $('<div class="form-group col-md-'+(parseInt(12/colNum))+'">');
                       let checkbox = $('<div class="custom-control custom-checkbox">');
                       checkbox.append('<input type="checkbox" class="custom-control-input" id="chk'+(i*colNum+j)+'" value="'+data[i*colNum+j]+'">');
                       checkbox.append('<label class="custom-control-label" for="chk'+(i*colNum+j)+'">'+data[i*colNum+j]+'</label>');
                       col.append(checkbox);
                       tmpDiv.append(col);
                    }else{
                        //超过数据长度后，退出循环
                        break;
                    }
                }
                //加入form
                form.append(tmpDiv);
            }
            //将form放入body中
            modalBody.append(form);
        }else{
            modalBody.append('<p>返回的数据库对象信息长度为 0 ，请检查参数是否异常...</p>');
        }
    }else{
        modalBody.append('<p>数据异常，无法解析...</p>');
    }
}

//从模态窗中获取选中的表或者视图信息
function getCheckedObjFromModalBody(){
    //模态窗的body对象
    let modalBody = $("#myDBObjects .modal-body");
    //选择框
    let checkboxObjs = modalBody.find('input[type="checkbox"]');
    if(checkboxObjs.length>0){
        //如果有选择框，则遍历，获取已勾选的值
        let objArray = [];
        checkboxObjs.each((index,element)=>{
            if($(element).is(':checked')){
                objArray.push($(element).val().toUpperCase());
            }
        });
        //根据已选数据，赋值选择框
        $("#sqlObjects").val(objArray.join(',')).change();
    }
    //关闭模态窗口
    $('#myDBObjects').modal('hide');
}

//返回结果前的第3页处理
function beforeGetDBResult(message){
    let tbody = $('#nav-result table tbody').eq(0);
    //清空原有信息
    tbody.html('');
    //构建一行提示信息
    let tr = $('<tr>');
    tr.append($('<td>1</td>'));
    tr.append($('<td>'+message+'</td>'));
    tr.append($('<td></td>'));
    tr.append($('<td></td>'));
    tr.append($('<td></td>'));
    tr.append($('<td></td>'));
    tr.append($('<td></td>'));
    tbody.append(tr);
}

//显示并构建第3页信息
function afterGetDBResult(data){
    let tbody = $('#nav-result table tbody').eq(0);
    //清空原有信息
    tbody.html('');
    //
    let statusBtn1 = '<button class="btn btn-success btn-sm mt-1">ok</button>';
    let statusBtn2 = '<button class="btn btn-danger btn-sm mt-1">error</button>';
    //
    let btn1 = '<button class="btn btn-primary btn-sm ml-1 mt-1" onclick="openEntityDir()">打开文件夹</button>';
    let btn2 = '<button class="btn btn-info btn-sm ml-1 mt-1" onclick="openEntityFile(this)">打开文件</button>';
    //根据返回的列表信息，构建一个结果
    for(let i=0;i<data.length;i++){
        let tmpTr = $('<tr>');
        tmpTr.append($('<td>'+(i+1)+'</td>'));
        tmpTr.append($('<td>'+data[i]['dbObjName']+'</td>'));
        tmpTr.append($('<td>'+data[i]['entityName']+'</td>'));
        tmpTr.append($('<td>'+(data[i]['status']?statusBtn1:statusBtn2)+'</td>'));
        if(data[i]['status']){
            tmpTr.append($('<td></td>'));
            tmpTr.append($('<td>'+btn1+btn2+'</td>'));
        }else{
            tmpTr.append($('<td>'+data[i]['statusInfo']+'</td>'));
            tmpTr.append($('<td></td>'));
        }
        tmpTr.append($('<td>'+data[i]['filePath']+'</td>'));
        tbody.append(tmpTr);
    }
}

//打开实体类存放的文件夹
async function openEntityDir(){
    //开始处理（获取实体存放路径）
    let entityDir = await ElectronAPI.getStaticParameter('MY_SOFTWARE_ENTITY_DIR');
    await ElectronAPI.filePathOpen(entityDir);
}

//打开实体类文件
async function openEntityFile(obj){
    let entityPath = $(obj).parent().parent().find('td:last-child').text();
    await ElectronAPI.filePathOpen(entityPath);
}