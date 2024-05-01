// 定义关于 Electron 暴露的 api 对象（因为是 iframe 所以，只有父页面有 api 对象）
let ElectronAPI;
try{ ElectronAPI = window.parent.ElectronAPI}catch(e){ElectronAPI=undefined};
// 判断是否在 app 中运行
let isApp = ElectronAPI ? true : false;

//设计一个对象，用于信息填充处理
let mybaseconfig = [
    [
        {id:'databaseType', title:'数据库类型', colWidth:'col-md-4', needValid:true, validReg:undefined, invalidInfo:'请选择数据库类型', type:'radio', typeInfo:[
            {label:'MySql 8+', value:'MySql', checked:true},
            {label:'Oracle 10+', value:'Oracle', checked:false},
            {label:'MS SqlServer 2008+', value:'SqlServer', checked:false}
        ]},
        {id:'jvm', title:'Java 环境路径', colWidth:'col-md-4', needValid:true, validReg:/.+/, invalidInfo:'请选择 Java 环境路径', type:'file', typeInfo:[]},
        {id:'jar', title:'Java 后端的Jar包路径', colWidth:'col-md-4', needValid:true, validReg:/.+/, invalidInfo:'请选择 Java 后端的Jar包路径', type:'file', typeInfo:[]}
    ],
    [
        {id:'poolName', title:'连接池名称', colWidth:'col-md-4', needValid:true, validReg:/.+/, invalidInfo:'请填写 连接池名称', type:'text', typeInfo:[]},
        {id:'jdbcDriver', title:'JDBC 驱动的 Java 类名', colWidth:'col-md-4', needValid:true, validReg:/.+/, invalidInfo:'请填写 JDBC 驱动类名称', type:'text', typeInfo:[]},
        {id:'jdbcUrl', title:'JDBC 链接字符串', colWidth:'col-md-4', needValid:true, validReg:/.+/, invalidInfo:'请填写 JDBC 链接信息', type:'text', typeInfo:[]}
    ],
    [
        {id:'dbUser', title:'数据库用户名', colWidth:'col-md-4', needValid:true, validReg:/.+/, invalidInfo:'请填写 数据库用户名', type:'text', typeInfo:[]},
        {id:'dbPasswd', title:'数据库用户密码', colWidth:'col-md-4', needValid:true, validReg:/.+/, invalidInfo:'请选择 数据库用户密码', type:'password', typeInfo:[]},
        {id:'isAutoCommit', title:'数据库操作是否自动提交', colWidth:'col-md-4', needValid:false, validReg:undefined, invalidInfo:'', type:'radio', typeInfo:[
            {label:'是', value:'true', checked:false},
            {label:'否', value:'false', checked:true}
        ]}
    ],
    [
        {id:'connTimeout', title:'数据库链接超时阈值（毫秒）', colWidth:'col-md-4', needValid:true, validReg:/[1-9](\d+)?/, invalidInfo:'请填写 阈值', type:'text', typeInfo:[]},
        {id:'minIdleNum', title:'连接池最小线程数', colWidth:'col-md-4', needValid:true, validReg:/[1-9](\d+)?/, invalidInfo:'请选择 Java 环境路径', type:'text', typeInfo:[]},
        {id:'maxIdleNum', title:'连接池最大线程数', colWidth:'col-md-4', needValid:true, validReg:/[1-9](\d+)?/, invalidInfo:'请选择 Java 环境路径', type:'text', typeInfo:[]}
    ],
    [
        {id:'saveConfig', title:'保存配置', cssClass:'btn btn-primary mr-1', type:'button', typeInfo:[], onclick:undefined},
        {id:'testDB', title:'数据库测试', cssClass:'btn btn-success mr-1', type:'button', typeInfo:[], onclick:undefined},
        {id:'testJava', title:'Java测试', cssClass:'btn btn-secondary mr-1', type:'button', typeInfo:[], onclick:undefined},
        {id:'clearConfig', title:'清空配置', cssClass:'btn btn-warning mr-1', type:'button', typeInfo:[], onclick:undefined},
        {id:'clearCache', title:'清空缓存', cssClass:'btn btn-info mr-1', type:'button', typeInfo:[], onclick:undefined},
        {id:'pickConfig', title:'调取已有配置', cssClass:'btn btn-primary mr-1', type:'buttonGroup', typeInfo:[
            {label:'无', value:''},
            {label:'测试1', value:'test1'}
        ]}
    ]
];

//校验单个输入或者选择框的函数
function validFormObject(formId, formObjId){

}
//校验整个表单的函数
function validForm(formId){

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
                    tmpRow.append('<button type="button" class="'+col.cssClass+'">'+col.title+'</button>');
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
                    tmpCol.append('<input type="'+(col.type=='password'?col.type:'text')+'" class="form-control" id="'+col.id+'" autocomplete="off" placeholder="'+(!col.placeholder?'':col.placeholder)+'"/>');
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

// 当文档加载完毕，执行这个函数
$(document).ready(()=>{
    //开始处理表单生成
    genForm('nav-baseconfig', mybaseconfig);
});