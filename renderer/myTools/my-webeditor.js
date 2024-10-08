"use strict";
/**
 * 这里是关于我的在线编辑器的一些处理（编辑器的插件为：codemirror-5.65.17）
 */
function MyWebEditor(editorObj){

    //将 codemirror 实例处理为内部一个对象
    this.editor = editorObj;

    /**
     * 获取原始的字符串内容
     */
    this.getOriText = function(){
        return this.editor.getValue();
    }

    /**
     * 获取过滤注释后的脚本字符串
     */
    this.getText = function(){
        //首先，获取内容，内容可能是多行的。）
        const oriText = this.editor.getValue();
        //替换 星号 注释
        let tmpText = oriText.replace(/\/\*(.|\n)+?\*\//ig, '');
        //替换 单行 注释
        tmpText = tmpText.replace(/[\-]{2}[ ]?.*([\n]+|$)/mg, '');
        //替换换行符
        tmpText = tmpText.replace(/[\r\n]+/mg, ' ');
        //输出
        return tmpText;
    }

    /**
     * 清空编辑器的内容。因为value 和 option配置中 偶发 不同步。所以要设置2次
     */
    this.clearText = function(){
        this.editor.setValue('');
        this.editor.setOption('value', '');
    }

    /**
     * 主题css切换。
     */
    this.changeTheme = function(themeName){
       this.editor.setOption("theme", ''+themeName);
    }
    
    /**
     * 锁定编辑器
     */
    this.lockEditor = function(){
        this.editor.setOption("readOnly", 'nocursor');
    }

    /**
     * 锁定编辑器，并且清空内容
     */
    this.lockEditorAndClear = function(){
        this.clearText();
        this.editor.setOption("readOnly", 'nocursor');
    }

    /**
     * 锁定编辑器，并且设置内容 commentString
     */
    this.lockEditorAndSetString = function(commentString){
        this.clearText();
        this.editor.setOption("value", ""+commentString);
        this.editor.setOption("readOnly", 'nocursor');
    }

    /**
     * 解锁编辑器
     */
    this.unlockEditor = function(){
        this.editor.setOption("value", "/* 请输入数据库查询语句，比如：select * from my_table */");
        this.editor.setOption("readOnly", false);
    }
    
    /**
     * 获取字符串的字节长度
     */
    this.getByteLengthOfStr = function(str){
        let re = 0;
        //只处理字符串
        if(typeof str === 'string'){
            re = new Blob([str]).size;
        }else{
            re = -1;
        }
        return re;
    }

    /**
     * 保存编辑器中的脚本
     */
    this.saveScriptStr = function(){
        let choose = confirm('如果保存脚本，则会覆盖原有保存的内容，确认保存？');
        if(choose){
            let oriStr = this.getOriText();
            let size = this.getByteLengthOfStr(oriStr);
            if(size<0) {
                alert('计算字符串长度出错，获取的内容异常');
                return false;
            }
            if(size===0){
                alert('获取的内容为空，不执行内容保存操作');
                return false;
            }
            if(size>5000000){
                alert('获取的内容长度超过5MB，无法保存');
                return false;
            }
            //开始执行保存
            window.localStorage.setItem('MySqlScript', oriStr);
            alert('保存成功!');
        }
    }

    /**
     * 加载已经保存的脚本
     */
    this.loadScriptstr = function(){
        let choose = confirm('如果加载已经存储的内容，可能会覆盖当前内容，确认加载？');
        if(choose){
            //提取
            let str = window.localStorage.getItem('MySqlScript');
            if(typeof str ==="string"){
                this.editor.setValue(str);
            }else{
                alert('加载不到可用的字符串数据');
            }
        }
    }

}