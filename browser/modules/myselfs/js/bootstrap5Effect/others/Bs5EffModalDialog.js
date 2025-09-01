/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffModalDialog.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-28
 * @version 1.0.0 
 * @description  这是这个库里面的一个 模态对话窗展示 组件。它派生自 基类 Bs5EffBaseComponent
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5EffBaseComponent, protected_set_bootstrapobject, protected_get_myId, protected_get_mySubConfig } from "../base/Bs5EffBaseComponent.js";
import { myRandomNumStr, Bs5ModalDialog } from "../../bootstrap5UI.js";
import { Bs5EffButton } from "../buttons/Bs5EffButton.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";

/**
 * 这是一个模态窗口，默认会有一个关闭按钮，其他都是外部传入的。
 */
class Bs5EffModalDialog extends Bs5EffBaseComponent {

    /**
     * 这是一个模态窗口，默认会有一个关闭按钮，其他都是外部传入的。
     * @param {string} id 组件ID
     * @param {string} title 标题信息
     * @param {string} content 内容信息，一般都是动态添加的，默认为空字符串。
     * @param {object} [options] 其它的可选的配置参数。
     * @param {boolean} [options.setStatic] 是否为固定模式，默认为 false ；
     * @param {boolean} [options.scrollable] 是否可滚动，默认为 false ；
     * @param {boolean} [options.centered] 是否为居中显示，默认为 false ；
     * @param {string} [options.sizeString] 模态窗的显示大小，默认为 空字符串, 可写 sm, lg, xl ；
     * @param {boolean} [options.fullscreen] 模态窗是否全屏显示，默认为 false ；
     * @param {string} [options.fullscreenSize] 当全屏显示时，页面小于多少才全屏显示。可选 空, sm, md, lg, xl, xxl ；
     * @param {Array<Bs5EffButton>} [options.customBtns] 按钮组件列表。他们必须是 Button 组件。
     */
    constructor(id='dialog'+myRandomNumStr(), title='标题', content='', 
        { setStatic=false, scrollable=false, centered=false, sizeString='', fullscreen=false, fullscreenSize='', customBtns=undefined}={}
    ){
        // 参数校验
        let idVal = vu.autoVnAofString(id, 'Bs5EffModalDialog', 'constructor', 'id', false);
        let titleVal = vu.autoVnAofString(title, 'Bs5EffModalDialog', 'constructor', 'title');
        let contentVal = vu.autoVnAofString(content, 'Bs5EffModalDialog', 'constructor', 'content');

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[3], 'Bs5EffModalDialog', 'constructor', 'options', true);
        // 内部参数校验
        let staticVal = vu.autoVnAofBoolean(setStatic, 'Bs5EffModalDialog', 'constructor', 'static');
        let scrollableVal = vu.autoVnAofBoolean(scrollable, 'Bs5EffModalDialog', 'constructor', 'scrollable');
        let centeredVal = vu.autoVnAofBoolean(centered, 'Bs5EffModalDialog', 'constructor', 'centered');
        let sizeStringVal = vu.autoVnAofString(sizeString, 'Bs5EffModalDialog', 'constructor', 'sizeString');
        let fullscreenVal = vu.autoVnAofBoolean(fullscreen, 'Bs5EffModalDialog', 'constructor', 'fullscreen');
        let fullscreenSizeVal = vu.autoVnAofString(fullscreenSize, 'Bs5EffModalDialog', 'constructor', 'fullscreenSize');
        if(customBtns!==undefined) vu.autoVnAofTargetObjectArray(customBtns, 'Bs5EffModalDialog', 'constructor', 'customBtns', Bs5EffButton);
        
        // 父类 Bs5EffBaseComponent 初始化
        super(idVal, '', {
            setStatic:staticVal, scrollable:scrollableVal, centered:centeredVal, sizeString:sizeStringVal,
            fullscreen:fullscreenVal, fullscreenSize:fullscreenSizeVal,
            customBtns:customBtns
        });
        
        // 将内置 UI 对象改为 bootstrap5UI.js 中的 Bs5ModalDialog
        let tmp = new Bs5ModalDialog(idVal, {
            title:titleVal, content:contentVal, setStatic:staticVal, scrollable:scrollableVal, centered:centeredVal, sizeString:sizeStringVal,
            fullscreen:fullscreenVal, fullscreenSize:fullscreenSizeVal
        });
        this[protected_set_bootstrapobject](tmp);
    }

    /**
     * （重载父类方法）组件的显示操作。显示时，有个可选参数，将内容修改
     * @param  {...string|Bs5EffBaseComponent} contentElems 内容元素组件。这是不定参数，可以是 字符串 ，也可以是 Bs5EffBaseComponent 组件
     */
    show(...contentElems){
        // 参数校验
        vu.autoVnAofTargetObjectArray(contentElems, 'Bs5EffModalDialog', 'show', 'contentElems', String, Bs5EffBaseComponent);

        // 首先判断是否已经存在于页面中
        let dialogElem = document.getElementById(this[protected_get_myId]());
        if(!dialogElem){
            // 不存在，则插入
            this.writeToPage(document.body);
            // 如果有 自定义按钮，则插入
            let mySubconfig = this[protected_get_mySubConfig]();
            if(mySubconfig.customBtns !== undefined){
                // 定位 footer 标签
                let footer = document.querySelector('#'+this[protected_get_myId]()+' .modal-footer');
                // 循环写入页面
                mySubconfig.customBtns.forEach(btn=>{
                    btn.writeToPage(footer);
                });
            }
        }
        // 获取 body 标签
        let bodyDiv = document.querySelector('#'+this[protected_get_myId]()+' .modal-body');
        // 如果有参数，则需要清空 body 区域
        if(contentElems.length>0) bodyDiv.innerHTML = '';
        // 在判断是否需要更新内容
        contentElems.forEach(value=>{
            if(du.isString(value)){
                bodyDiv.append(du.valueOfString(value));
            }else if(du.isTargetObject(value, Bs5EffBaseComponent)){
                // 对于组件，自己有个 write 处理
                value.writeToPage(bodyDiv);
            }
        });
        // 再显示
        //console.log(new Date(), '测试显示操作....');
        let d = new bootstrap.Modal(`#${this[protected_get_myId]()}`);
        d.show();
    }

    /**
     * （重载父类方法）组件的隐藏操作。这里没法直接用 bootstrap 自带的 hide 方法。
     */
    hide(){
        // 这里使用模拟点击的操作
        let btnClose = document.querySelector(`#${this[protected_get_myId]()} .modal-header .btn-close`);
        if(btnClose) btnClose.click();
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffModalDialog
}