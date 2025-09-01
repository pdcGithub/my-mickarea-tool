/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffLoading.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-28
 * @version 1.0.0 
 * @description  这是这个库里面的一个 加载动画 组件。它派生自 基类 Bs5EffBaseComponent
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5EffBaseComponent, protected_set_bootstrapobject, protected_get_myId } from "../base/Bs5EffBaseComponent.js";
import { Bs5LoadingLayer, myRandomNumStr } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";

/**
 * 这是页面处理时，显示加载中的遮罩层。它可以预先插入页面，也可以不插入。因为在 show 方法执行时，会自动处理。
 * 虽然他继承 Bs5EffBaseComponent ，但是它只有 show 和 hide 的处理，其它操作方法，它不实现。
 */
class Bs5EffLoading extends Bs5EffBaseComponent {

    /**
     * 这是页面处理时，显示加载中的遮罩层。它可以预先插入页面，也可以不插入。因为在 show 方法执行时，会自动处理。
     * 虽然他继承 BaseComponent ，但是它只有 show 和 hide 的处理，其它操作方法，它不实现。
     * @param {string} id 遮罩层的 ID
     * @param {string} type 遮罩层的加载图形。默认是 border ，也可以修改为 grow
     */
    constructor(id=('loading'+myRandomNumStr()), type='border'){
        
        // 参数校验
        let idVal = vu.autoVnAofString(id, 'Bs5EffLoading', 'constructor', 'id', false);
        let typeVal = vu.autoVnAofString(type, 'Bs5EffLoading', 'constructor', 'type', false);
        
        // 父类 Bs5EffBaseComponent 初始化
        super(idVal);
        
        // 将内置 UI 对象改为 bootstrap5UI.js 中的 Bs5LoadingLayer
        let tmp = new Bs5LoadingLayer(idVal, typeVal);
        this[protected_set_bootstrapobject](tmp);
    }

    /**
     * （重载父类方法）组件的显示操作
     */
    show(){
        // 首先，判断页面上是否已经存在；如果不存在需要先插入 body 中。
        let myId = this[protected_get_myId]();
        let isExists = document.querySelectorAll('#'+myId).length>0;
        // 如果不存在，先插入
        if(!isExists) this.writeToPage(document.body);
        // 处理显示
        document.getElementById(myId).classList.add('d-flex');
    }

    /**
     * （重载父类方法）组件的隐藏操作
     */
    hide(){
        // 首先，判断页面上是否已经存在；如果不存在则无需执行
        let myId = this[protected_get_myId]();
        let isExists = document.querySelectorAll('#'+myId).length>0;
        // 处理隐藏
        if(isExists) document.getElementById(myId).classList.remove('d-flex');
    }

}

/**
 * 导出公用部分
 */
export {
    Bs5EffLoading
}