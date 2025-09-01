/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5ModalDialog.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-15
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 模态窗 的绘制处理类
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bootstrap5Object } from "../base/Bootstrap5Object.js";
import { myRandomNumStr, BTN_COR } from "../base/myBasicToolkit.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { Bs5Button } from "../buttons/Bs5Button.js";

/**
 * 这是一个模态窗口，默认会有一个关闭按钮，其他都是外部传入的。
 */
class Bs5ModalDialog extends Bootstrap5Object {

    /**
     * 这是一个模态窗口，默认会有一个关闭按钮，其他都是外部传入的。
     * @param {string} id 组件ID
     * @param {object} [options] 可选配置参数。
     * @param {string} [options.title] 标题信息
     * @param {string} [options.content] 内容信息，一般都是动态添加的，默认为空字符串。
     * @param {boolean} [options.setStatic] 是否为固定模式，默认为 false ；
     * @param {boolean} [options.scrollable] 是否可滚动，默认为 false ；
     * @param {boolean} [options.centered] 是否为居中显示，默认为 false ；
     * @param {string} [options.sizeString] 模态窗的显示大小，默认为 空字符串, 可写 sm, lg, xl ；
     * @param {boolean} [options.fullscreen] 模态窗是否全屏显示，默认为 false ；
     * @param {string} [options.fullscreenSize] 当全屏显示时，页面小于多少才全屏显示。可选 空, sm, md, lg, xl, xxl ；
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id='modalDia'+myRandomNumStr(), 
        {title='标题', content='', setStatic=false, scrollable=false, centered=false, sizeString='', fullscreen=false, fullscreenSize=''}={}){

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5ModalDialog', 'constructor', 'options', true);

        // 参数校验
        let idVal = vu.autoVnAofString(id, 'Bs5ModalDialog', 'constructor', 'id', false).trim();
        let titleVal = vu.autoVnAofString(title, 'Bs5ModalDialog', 'constructor', 'title').trim();
        let contentVal = vu.autoVnAofString(content, 'Bs5ModalDialog', 'constructor', 'content').trim();
        let staticVal = vu.autoVnAofBoolean(setStatic, 'Bs5ModalDialog', 'constructor', 'setStatic');
        let scrollableVal = vu.autoVnAofBoolean(scrollable, 'Bs5ModalDialog', 'constructor', 'scrollable');
        let centeredVal = vu.autoVnAofBoolean(centered, 'Bs5ModalDialog', 'constructor', 'centered');
        let sizeStringVal = vu.autoVnAofString(sizeString, 'Bs5ModalDialog', 'constructor', 'sizeString').trim();
        let fullscreenVal = vu.autoVnAofBoolean(fullscreen, 'Bs5ModalDialog', 'constructor', 'fullscreen');
        let fullscreenSizeVal = vu.autoVnAofString(fullscreenSize, 'Bs5ModalDialog', 'constructor', 'fullscreenSize').trim();

        // 开始构造一个模态框，它有多层结构
        let staticStr = staticVal ? 'static' : '';
        let scrollableStr = scrollableVal ? 'modal-dialog-scrollable' : '';
        let centeredStr = centeredVal ? 'modal-dialog-centered' : '';
        let fullscreenStr = fullscreenVal ? 'modal-fullscreen' : '';

        // 当 要全屏展示，才判断大小限制
        if(fullscreenVal && fullscreenSizeVal.length>0) fullscreenStr = `modal-fullscreen-${fullscreenSizeVal}-down`;

        // 这里开始组装 modal 层
        super('div', {id:idVal, class:'modal fade', tabindex:'-1', 'aria-labelledby':idVal+'Label', 'aria-hidden':true});
        if(staticStr.length>0) this.addAttributeByObject({'data-bs-backdrop':staticStr, 'data-bs-keyboard':'false'});

        // 这里开始组装 modal-dialog 层，它属于 modal 层
        let tmpDialog = new Bootstrap5Object('div', {class:'modal-dialog'});
        if(scrollableStr.length>0) tmpDialog.addCssClass(scrollableStr);
        if(centeredStr.length>0) tmpDialog.addCssClass(centeredStr);
        if(sizeStringVal.length>0) tmpDialog.addCssClass(`modal-${sizeStringVal}`);
        if(fullscreenStr.length>0) tmpDialog.addCssClass(fullscreenStr);

        // 这里开始组装 modal-content 层，它属于 modal-dialog 层
        let tmpContent = new Bootstrap5Object('div', {class:'modal-content'});

        // 这里开始组装 modal-header 层 ，它属于 modal-content 层
        let tmpHeader = new Bootstrap5Object('div', {class:'modal-header'});
        let tmpTitle = new Bootstrap5Object('h5', {class:'modal-title'}, [titleVal]);
        let tmpTitleBtn = new Bs5Button();
        tmpTitleBtn.clearContents();
        tmpTitleBtn.removeCssClass('btn-primary');
        tmpTitleBtn.addCssClass('btn-close');
        tmpTitleBtn.addAttributeByObject({'data-bs-dismiss':"modal", 'aria-label':"Close"});
        tmpHeader.addContentElements(tmpTitle);
        tmpHeader.addContentElements(tmpTitleBtn);

        // 这里开始组装 modal-body 层 ，它属于 modal-content 层
        let tmpBody = new Bootstrap5Object('div', {class:'modal-body'}, [contentVal]);

        // 这里开始组装 modal-footer 层 ，它属于 modal-content 层
        let tmpFooter = new Bootstrap5Object('div', {class:'modal-footer'});
        let tmpFoBtn = new Bs5Button(undefined, {content:'关闭', color:BTN_COR.secondary, outline:true});
        tmpFoBtn.addAttributeByObject({'data-bs-dismiss':"modal"});
        tmpFooter.addContentElements(tmpFoBtn);

        // 最终套装
        tmpContent.addContentElements(tmpHeader);
        tmpContent.addContentElements(tmpBody);
        tmpContent.addContentElements(tmpFooter);

        tmpDialog.addContentElements(tmpContent);

        this.addContentElements(tmpDialog);
    }
}

/**
 * 导出公用部分吧
 */
export{
    Bs5ModalDialog
}