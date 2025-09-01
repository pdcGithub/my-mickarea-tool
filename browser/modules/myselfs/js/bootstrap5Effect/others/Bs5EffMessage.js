/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffMessage.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-28
 * @version 1.0.0 
 * @description  这是这个库里面的一个 无弹窗非阻塞消息展示 组件。它派生自 基类 Bs5EffBaseComponent
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bs5EffBaseComponent, protected_set_bootstrapobject, protected_get_myId, protected_get_mySubConfig } from "../base/Bs5EffBaseComponent.js";
import { Bs5ToastMessage, Bs5ToastContainer, myRandomNumStr } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";

/**
 * 这是一种非弹窗消息，它名字叫 Toast 。这种消息不会阻塞，但是在画面上，看起来，好看些。在使用前要明确，页面上需要有一个 toast-container 样式的容器
 * 如果没有容器，在显示消息时会自动创建。
 */
class Bs5EffMessage extends Bs5EffBaseComponent {
    
    /**
     * 这是一种消息弹窗，它名字叫 Toast 。这种消息不会阻塞，但是在画面上，看起来，好看些。在使用前要明确，页面上需要有一个 toast-container 样式的容器
     * @param {string} message 消息内容
     * @param {object} [option] 关于消息的可选配置参数。
     * @param {string} [option.id] 这是这个消息的 ID，默认是自动生成的 ；
     * @param {string} [option.title] 这是这个消息的 标题 。默认是 温馨提示 ；
     * @param {boolean} [option.autoRemove] 消息显示后，是否自动删除，默认是 true ；
     * @param {string} [option.containerPosition] 这是容器的位置样式信息。默认是右下角。这个属性只有当第一次初始化容器时，才有用 ；
     */
    constructor(message='无内容',
        { id='toastMsg'+myRandomNumStr(), title='温馨提示', autoRemove=true, containerPosition='bottom-0 end-0 p-3' }={}
    ){
        // 参数校验
        let msgVal = vu.autoVnAofString(message, 'Bs5EffMessage', 'constructor', 'message', false);

        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffMessage', 'constructor', 'option', true);

        // 二级参数校验
        let idVal = vu.autoVnAofString(id, 'Bs5EffMessage', 'constructor', 'id', false);
        let titleVal = vu.autoVnAofString(title, 'Bs5EffMessage', 'constructor', 'title', false);
        let autoRemoveVal = vu.autoVnAofBoolean(autoRemove, 'Bs5EffMessage', 'constructor', 'autoRemove');
        let containerPositionVal = vu.autoVnAofString(containerPosition, 'Bs5EffMessage', 'constructor', 'containerPosition');

        // 父类初始化
        super(idVal, '', {id:idVal, title:title, autoRemove:autoRemoveVal, containerPosition:containerPositionVal});

        // 将内置 UI 对象改为 bootstrap5UI.js 中的 Bs5ToastMessage
        let tmp = new Bs5ToastMessage(idVal, msgVal, titleVal);
        this[protected_set_bootstrapobject](tmp);
    }

    /**
     * （重载父类方法）组件的显示操作
     */
    show(){
        // 先做一个容器检测，如果容器不存在，则自动创建一个
        if(document.querySelectorAll('.toast-container').length<=0){
            let posInfo = du.valueOfString(this[protected_get_mySubConfig]().containerPosition).trim();
            document.body.append(...new Bs5ToastContainer(undefined, posInfo).toHtmlDomObject());
        }
        //
        let myId = this[protected_get_myId]();
        // 取第一个 toast-container 作为容器
        let target=document.querySelectorAll('.toast-container')[0];
        // 插入（如果之前没有删除，那就不用重新写入）
        let isExists = document.querySelectorAll('#'+myId).length>0;
        if(!isExists) this.writeToPage(target);
        // 动态调用（前面只是插入页面，要调用 show 才显示）
        let t1 = bootstrap.Toast.getOrCreateInstance(document.getElementById(myId));
        // 事件处理，当隐藏后，删除（这个是按配置来的，默认是删除）
        let autoRemove = du.valueOfBoolean(this[protected_get_mySubConfig]().autoRemove);
        if(autoRemove){
            // 添加一个隐藏后的事件处理
            document.getElementById(myId).addEventListener('hidden.bs.toast', (event)=>{
                // 从页面上删除
                document.getElementById(myId).remove();
            });
        }
        // 显示
        t1.show();
    }

    /**
     * （重载父类方法）组件的隐藏操作
     */
    hide(){
        // 组件会自动隐藏。不需要增加处理函数。
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffMessage
}