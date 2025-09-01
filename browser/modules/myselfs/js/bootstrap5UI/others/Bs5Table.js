/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5Table.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-15
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 表格 Table 绘制处理类
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";
import { myRandomNumStr } from "../base/myBasicToolkit.js";
import { Bootstrap5Object } from "../base/Bootstrap5Object.js";
import { ParamValidError } from "../../errors.js";

/**
 * 这是表格绘制处理。可选参数较多，请认真查看参数配置
 */
class Bs5Table extends Bootstrap5Object {

    #isResponsive ;  // 是否需要自适应滚动
    #responsiveSize ; // 自适应滚动的大小

    /**
     * 这是表格绘制处理。
     * @param {string} id 组件 ID ；
     * @param {object} [options] 可选配置参数。
     * @param {Array<string>} [options.headerInfo] 表格的标题信息，一个字符串数组 ；如果某列数据需要隐藏，将字符串加一个后缀 '_hide' 即可。它会把 列名作为 tr 的属性名，数据作为 属性的值。
     * @param {Array<Array<string|Bootstrap5Object>>} [options.bodyInfo] 表格的内容信息，一个二维数组。它的内容可以是字符串 也可以是 Bootstrap5Object ；
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
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id='bs5Table'+myRandomNumStr(), 
        {
            headerInfo=[], bodyInfo=[[]], rowStriped=false, colStriped=false, hover=false, bordered=false, borderColor='', 
            borderLess=false, moreCompact=false, groupDivider=false, alignMiddle=false, responsive=false, responsiveSize=''
        }={}){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5Table', 'constructor', 'options', true);
        
        // 参数校验，并获取值
        let idVal = vu.autoVnAofString(id, 'Bs5Table', 'constructor', 'id', false);
        vu.autoVnAofTargetObjectArray(headerInfo, 'Bs5Table', 'constructor', 'headerInfo', String);
        vu.autoVnAofTargetObject2DArray(bodyInfo, 'Bs5Table', 'constructor', 'bodyInfo', String, Bootstrap5Object);
        let rowStripedVal = vu.autoVnAofBoolean(rowStriped, 'Bs5Table', 'constructor', 'rowStriped');
        let colStripedVal = vu.autoVnAofBoolean(colStriped, 'Bs5Table', 'constructor', 'colStriped');
        let hoverVal = vu.autoVnAofBoolean(hover, 'Bs5Table', 'constructor', 'hover');
        let borderedVal = vu.autoVnAofBoolean(bordered, 'Bs5Table', 'constructor', 'bordered'); // 全边框 ，与 无边框 互斥
        let borderColorVal = vu.autoVnAofString(borderColor, 'Bs5Table', 'constructor', 'borderColor').trim(); // 边框颜色 ，与 无边框 互斥
        let borderLessVal = vu.autoVnAofBoolean(borderLess, 'Bs5Table', 'constructor', 'borderLess'); // 无边框
        let moreCompactVal = vu.autoVnAofBoolean(moreCompact, 'Bs5Table', 'constructor', 'moreCompact');
        let groupDividerVal = vu.autoVnAofBoolean(groupDivider, 'Bs5Table', 'constructor', 'groupDivider'); // 分割线，与 无边框 互斥
        let alignMiddleVal = vu.autoVnAofBoolean(alignMiddle, 'Bs5Table', 'constructor', 'alignMiddle');
        let responsiveVal = vu.autoVnAofBoolean(responsive, 'Bs5Table', 'constructor', 'responsive');
        let responsiveSizeVal = vu.autoVnAofString(responsiveSize, 'Bs5Table', 'constructor', 'responsiveSize').trim();

        // 校验数据正否整齐
        let dataLenError = bodyInfo.filter(arr=>{return arr.length>0 && arr.length !== headerInfo.length}).length > 0;
        vu.throwError(dataLenError, `Bs5Table 构造函数 传入的参数 标题数 与 数据的列数 不一致，请检查`, ParamValidError);

        // 开始拼接 
        super('table', {id:idVal, class:'table'});

        // 要先super处理，才能设置私有属性
        this.#isResponsive = responsiveVal;
        this.#responsiveSize = responsiveSizeVal;

        // 开始拼接 标题
        let thead = new Bootstrap5Object('thead');
        let tr = new Bootstrap5Object('tr');
        for(let i=0;i<headerInfo.length;i++){
            // 标题 第一个列，自动拼一个 # 号
            if(i===0) tr.addContentElements('<th>#</th>');
            // 如果没有 _hide 后缀 才写入表格
            if(!headerInfo[i].endsWith('_hide')) tr.addContentElements(`<th>${headerInfo[i]}</th>`);
        }
        thead.addContentElements(tr);

        // 开始拼接 内容
        let tbody = new Bootstrap5Object('tbody');
        for(let j=0;j<bodyInfo.length;j++){
            let tmpTr = new Bootstrap5Object('tr');
            for(let x=0;x<bodyInfo[j].length;x++){
                // 数据第一个列，自动拼接一个序号
                if(x===0) tmpTr.addContentElements(`<td><strong>${j+1}</strong></td>`);
                // 这里要处理隐藏的内容：
                if(headerInfo[x].endsWith('_hide')){
                    // 隐藏列，写入 tr 作为属性；
                    tmpTr.addAttribute(headerInfo[x].substring(0, headerInfo[x].lastIndexOf('_')), bodyInfo[j][x]);
                }else{
                    // 非隐藏列，写入 td 
                    if(du.isString(bodyInfo[j][x])){
                        tmpTr.addContentElements(`<td>${du.valueOfString(bodyInfo[j][x])}</td>`);
                    }else if(du.isTargetObject(bodyInfo[j][x], Bootstrap5Object)){
                        tmpTr.addContentElements(`<td>${bodyInfo[j][x].toHtmlString()}</td>`);
                    }else{
                        tmpTr.addContentElements(`<td>${bodyInfo[j][x]}</td>`);
                    }
                }
            }
            tbody.addContentElements(tmpTr);
        }

        this.addContentElements(thead);
        this.addContentElements(tbody);

        // 处理可配置项
        if(rowStripedVal) this.addCssClass('table-striped');
        if(colStripedVal) this.addCssClass('table-striped-columns');
        if(hoverVal) this.addCssClass('table-hover');
        if(moreCompactVal) this.addCssClass('table-sm');
        if(borderLessVal){
            this.addCssClass('table-borderless');
        }else{
            if(borderedVal) this.addCssClass('table-bordered');
            if(borderColorVal.length>0) this.addCssClass(`border-${borderColorVal}`);
            if(groupDividerVal) tbody.addCssClass('table-group-divider');
        }
        if(alignMiddleVal) this.addCssClass('align-middle');
    }

    /**
     * (重写输出，因为有个 responsive 层要添加) 输出一个带有 Html 标签信息的字符串
     * @returns {string} Html 标签信息的字符串
     */
    toHtmlString(){
        if(this.#isResponsive){
            let ffix = this.#responsiveSize.length>0?`-${this.#responsiveSize}`:'';
            let div = new Bootstrap5Object('div', {class:`table-responsive${ffix}`});
            div.addContentElements(super.toHtmlString());
            return div.toHtmlString();
        }else{
            return super.toHtmlString();
        }
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5Table
}