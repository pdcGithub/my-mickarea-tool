/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffTable.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-29
 * @version 1.0.0 
 * @description  这是这个库里面的一个 表格展示 组件。它派生自 基类 Bs5EffBaseComponent
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5EffBaseComponent, protected_set_bootstrapobject, protected_get_myId } from "../base/Bs5EffBaseComponent.js";
import { myRandomNumStr, Bs5Table } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";

/**
 * 这是这个库里面的一个 表格展示 组件。它派生自 基类 Bs5EffBaseComponent
 */
class Bs5EffTable extends Bs5EffBaseComponent {

    /**
     * Array-String 标题数据对象，因为 刷新时还需要比对，所以要保留在组件内部
     */
    #header ;
    /**
     * Array-Bs5EffBaseComponent 在写入页面时，先把组件ID写入 表格，然后再逐个替换。所以要保留 组件列表。
     */
    #components ; 

    /**
     * 这是这个库里面的一个 表格展示 组件。它派生自 基类 Bs5EffBs5EffBaseComponent
     * @param {string} id 组件 ID ；
     * @param {Array<string>} headerInfo 表格的标题信息，一个字符串数组 ；如果某列数据需要隐藏，将字符串加一个后缀 '_hide' 即可。它会把 列名作为 tr 的属性名，数据作为 属性的值。
     * @param {Array<Array<string|Bs5EffBaseComponent>>} bodyInfo 表格的内容信息，一个二维数组。它的内容可以是字符串 也可以是 Bs5EffBaseComponent ；
     * @param {object} [options] 可选配置参数。
     * @param {boolean} [options.rowStriped] 行数据是否以条纹样式显示。默认为 false ；
     * @param {boolean} [options.colStriped] 列数据是否以条纹样式显示。默认为 false ；
     * @param {boolean} [options.hover] 表格在悬停时，是否高亮显示。默认为 false ；
     * @param {boolean} [options.bordered] 表格是否显示边框。默认为 false；
     * @param {string} [options.borderColor] 表格如果显示边框，则颜色可调整（参考 BTN_COR）。默认 为空字符串 ；
     * @param {boolean} [options.borderLess] 是否完全没有边框（一般情况，行与行之间有分隔线。如果为true 则分割线都没有）。默认为 false ；
     * @param {boolean} [options.moreCompact] 是否更加让表格显示时更加紧凑。默认为 false ；
     * @param {boolean} [options.groupDivider] 是否在 header 和 body 之间显示一条分割线 。默认为 false ；
     * @param {boolean} [options.alignMiddle] 是否让表格内容垂直居中。 默认为 false ；
     * @param {boolean} [options.responsive] 是否让表格水平自适应滚动。默认为 false ；
     * @param {string} [options.responsiveSize] 这是自适应滚动的响应大小(参考 sm,md,lg,xl,xxl)。大于这个值，将不会自适应滚动。默认为 空 字符串 ；
     */
    constructor(id='myTable'+myRandomNumStr(), headerInfo=[], bodyInfo=[[]], 
        {
            rowStriped=false, colStriped=false, hover=false, bordered=false, borderColor='', 
            borderLess=false, moreCompact=false, groupDivider=false, alignMiddle=false, responsive=false, responsiveSize=''
        }={}
    ){
        // 参数校验 （这里 body 是 string|Bs5EffBaseComponent ，要先校验，然后后面转换才不会出错）
        let idVal = vu.autoVnAofString(id, 'Bs5EffTable', 'constructor', 'id', false);
        vu.autoVnAofTargetObjectArray(headerInfo, 'Bs5EffTable', 'constructor', 'headerInfo', String);
        vu.autoVnAofTargetObject2DArray(bodyInfo, 'Bs5EffTable', 'constructor', 'bodyInfo', String, Bs5EffBaseComponent);
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[3], 'Bs5EffTable', 'constructor', 'options', true);
        let rowStripedVal = vu.autoVnAofBoolean(rowStriped, 'Bs5EffTable', 'constructor', 'rowStriped');
        let colStripedVal = vu.autoVnAofBoolean(colStriped, 'Bs5EffTable', 'constructor', 'colStriped');
        let hoverVal = vu.autoVnAofBoolean(hover, 'Bs5EffTable', 'constructor', 'hover');
        let borderedVal = vu.autoVnAofBoolean(bordered, 'Bs5EffTable', 'constructor', 'bordered');
        let borderColorVal = vu.autoVnAofString(borderColor, 'Bs5EffTable', 'constructor', 'borderColor');
        let borderLessVal = vu.autoVnAofBoolean(borderLess, 'Bs5EffTable', 'constructor', 'borderLess');
        let moreCompactVal = vu.autoVnAofBoolean(moreCompact, 'Bs5EffTable', 'constructor', 'moreCompact');
        let groupDividerVal = vu.autoVnAofBoolean(groupDivider, 'Bs5EffTable', 'constructor', 'groupDivider');
        let alignMiddleVal = vu.autoVnAofBoolean(alignMiddle, 'Bs5EffTable', 'constructor', 'alignMiddle');
        let responsiveVal = vu.autoVnAofBoolean(responsive, 'Bs5EffTable', 'constructor', 'responsive');
        let responsiveSizeVal = vu.autoVnAofString(responsiveSize, 'Bs5EffTable', 'constructor', 'responsiveSize');
        
        // 父类初始化 (这里不能直接用 arguments[3]，因为如果外部不传入某些参数，arguments[3] 是没有这些参数的)
        super(idVal, '', {
            rowStriped:rowStripedVal, colStriped:colStripedVal, hover:hoverVal, bordered:borderedVal, borderColor:borderColorVal,
            borderLess:borderLessVal, moreCompact:moreCompactVal, groupDivider:groupDividerVal, alignMiddle:alignMiddleVal,
            responsive:responsiveVal, responsiveSize:responsiveSizeVal
        });
        
        // body 转换 ( 把组件ID写入页面，组件放入数组，方便后面替换 )
        this.#components = [];
        let tmpBody = bodyInfo.map(row=>{
            return row.map(col=>{
                // 这里如果是 字符串，直接 就赋值了。
                let val = `${col}`;
                // 如果是 组件，则需要处理
                if(du.isTargetObject(col, Bs5EffBaseComponent)){
                    val = `<component id="${col[protected_get_myId]()}">`;
                    this.#components.push(col);
                }
                return val;
            });
        });
        
        // 将内置 UI 对象改为 bootstrap5UI.js 中的 Bs5Table (参数校验在里面处理了)
        let tmp = new Bs5Table(idVal, {
            headerInfo:headerInfo, bodyInfo:tmpBody, 
            rowStriped:rowStripedVal, colStriped:colStripedVal, hover:hoverVal, bordered:borderedVal, borderColor:borderColorVal, 
            borderLess:borderLessVal, moreCompact:moreCompactVal, groupDivider:groupDividerVal, alignMiddle:alignMiddleVal, 
            responsive:responsiveVal, responsiveSize:responsiveSizeVal
        });
        this[protected_set_bootstrapobject](tmp);

        // 表头信息处理（放这里是因为，BsTable 有校验。先校验通过再赋值，比较好）
        this.#header = headerInfo;
    }

    /**
     * 表格写入页面后的刷新处理，只刷新数据部分，不刷新标题。
     * @param {Array<Array<string|Bs5EffBaseComponent>>} newDatas 表格的内容信息，一个二维数组。它的内容可以是字符串 也可以是 Bs5EffBaseComponent ；
     */
    refreshTable(newDatas=[[]]){
        // 参数校验
        vu.autoVnAofTargetObject2DArray(newDatas, 'Bs5EffTable', 'refreshTable', 'newDatas', String, Bs5EffBaseComponent);
        
        // 先判断table是否已经插入，如果没有那就不执行
        if(document.querySelectorAll('#'+this[protected_get_myId]()).length<=0) return false;
        
        // 清空组件列表
        this.#components = [];
        // body 转换 ( 把组件ID写入页面，组件放入数组，方便后面替换 )
        let tmpBody = newDatas.map(row=>{
            return row.map(col=>{
                // 这里如果是 字符串，直接 就赋值了。
                let val = `${col}`;
                // 如果是 组件，则需要处理
                if(du.isTargetObject(col, Bs5EffBaseComponent)){
                    val = `<component id="${col[protected_get_myId]()}">`;
                    this.#components.push(col);
                }
                return val;
            });
        });

        // 校验数据正否整齐
        let dataLenError = newDatas.filter(arr=>{return arr.length>0 && arr.length !== this.#header.length}).length > 0;
        vu.throwParameterValidError(dataLenError, `refreshTable 函数 传入的参数 标题数${this.#header.length} 与 数据的列数 不一致，请检查`);

        // 刷新
        let tmpTBody = document.querySelector('#'+this[protected_get_myId]()+' tbody');
        tmpTBody.innerHTML = '';

        // 如果有内容，才进行构造分析
        if(tmpBody.length>0){
            // 这里使用的是 临时表格 UI 对象的方式，保证跟 UI 构建方式一致
            let tmpTab = new Bs5Table(undefined, {headerInfo:this.#header, bodyInfo:tmpBody});
            let tableDom = tmpTab.toHtmlDomObject()[0];
            let trs = tableDom.children[1].children;
            tmpTBody.append(...trs);
        }

        // 替换字符串为组件
        this.#writeComponent();
    }

    /**
     * (这是一个私有的函数，外部应该是不可见的) 这里将之前插入的组件标记信息，把真正的组件写入页面
     */
    #writeComponent(){
        // 首先，判断是否有 组件需要替换，没有的话，就不执行了
        this.#components.forEach(cmpt=>{
            let myId = cmpt[protected_get_myId]();
            let target = document.querySelectorAll(`component[id="${myId}"]`);
            if(target.length>0){
                // 如果标签存在，则替换
                let parent = target[0].parentElement;
                target[0].remove();
                cmpt.writeToPage(parent);
            }
        });
    }

    /**
     * (重载父类方法，因为这里需要 额外处理 内嵌组件) 将这个组件写入到页面的对应 html 元素中。
     * @param {*} target 页面的对应 html 元素。如果不填，默认是 document.body 对象
     */
    writeToPage(target=document.body){
        // 先写入页面(这里的父类是 Bs5EffBaseComponent)
        super.writeToPage(target);
        // 写入组件
        this.#writeComponent();
    }

}

/**
 * 导出公用部分
 */
export {
    Bs5EffTable
}