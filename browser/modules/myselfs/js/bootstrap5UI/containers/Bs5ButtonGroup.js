/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "BsButtonGroup.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-14
 * @version 1.0.0 
 * @description  这是关于 Bootstrap 5 的 UI 绘制用到的 按钮组 类（通常是几个按钮分配为一个组）
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";
import { Bootstrap5Object, protected_getContent } from "../base/Bootstrap5Object.js";
import { Bs5Button } from "../buttons/Bs5Button.js";
import { myRandomNumStr, BTN_GROUP_SIZE } from "../base/myBasicToolkit.js";

/**
 * Bootstrap 5 样式的按钮组，它是一个容器不是组件。它内嵌的才是组件。
 * 一般来说，内嵌的都是 Bs5ButtonGroup, Bs5Button 或者 Bs5DropdownButton
 */
class Bs5ButtonGroup extends Bootstrap5Object {

    /**
     * 创建一个按钮组容器，它可以调整按钮组的大小，以及显示方式。
     * @param {string} id col 容器的 id 属性。如果不填写，默认是随机生成的。
     * @param {object} [options] 关于按钮的可选配置参数。
     * @param {Array<Bs5Button|Bs5ButtonGroup>} [options.buttons] 按钮对象 或者 按钮组对象
     * @param {string} [options.size] 显示的大小参数，用 BTN_GROUP_SIZE 常量
     * @param {boolean} [options.isVertical] 当为 true 时，按钮组将按垂直方式排列按钮。默认为 false
     * @throws — 如果参数 param 校验不通过，会抛出 ParamValidError 异常。
     */
    constructor(id=('btnGroup'+myRandomNumStr()), 
        {buttons=[],  size=BTN_GROUP_SIZE.normal, isVertical=false}={}) {
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5ButtonGroup', 'constructor', 'options', true);
        
        //参数校验（优化）
        let idVal = vu.autoVnAofString(id, 'Bs5ButtonGroup', 'constructor', 'id', false);
        vu.autoVnAofTargetObjectArray(buttons, 'Bs5ButtonGroup', 'constructor', 'buttons', Bs5Button, Bs5ButtonGroup);
        let sizeValue = vu.autoVnAofString(size, 'Bs5ButtonGroup', 'constructor', 'size').trim();
        let isVerticalValue = vu.autoVnAofBoolean(isVertical, 'Bs5ButtonGroup', 'constructor', 'isVertical');

        //父类初始化
        super('div', {id:idVal, class:`btn-group${isVerticalValue?'-vertical':''}`, role:'group'}, buttons);
        //如果size不为空，则加入，它只是一个样式
        if(sizeValue.length>0){
            this.addCssClass(size);
        }
    }

    /**
     * (这里重载了父类的 addContentElements 方法，用于 限制 放入内部的只能是 Button 或者 ButtonGroup) 
     * 给页面元素对象 添加一个 或者 多个 innerHtml 信息。它将放在一个内置数组中，等待输出时转换。
     * @param {...Bs5Button|Bs5ButtonGroup} buttonElems innerHtml 信息 (它是一个不定参数, 可以写多个) 举例: addContentElements('a', 'b', 'c');
     * @throws 如果参数异常会抛出 ParameterError 
     */
    addContentElements(...buttonElems) {
        // 参数校验
        vu.autoVnAofTargetObjectArray(buttonElems, 'Bs5ButtonGroup', 'addContentElements', 'buttonElems', Bs5Button, Bs5ButtonGroup);
        // 添加到 content 数组
        super.addContentElements(...buttonElems);
    }

    /**
     * (这里重载了父类的 enable 方法，因为如果按钮组 启用 或者 禁用，应该是处理它的子元素，而不是 按钮组 这个容器) 
     * 按钮组的启用
     */
    enable(){
        // 遍历 私有属性 #content 数组，将 Bootstrap5Object 都设置为 enable
        this[protected_getContent]().forEach(value=>{
            if(du.isTargetObject(value, Bootstrap5Object)){
                value.enable();
            }
        });
    }

    /**
     * (这里重载了父类的 disable 方法，因为如果按钮组 启用 或者 禁用，应该是处理它的子元素，而不是 按钮组 这个容器) 
     * 按钮组的禁用
     */
    disable(){
        // 遍历 私有属性 #content 数组，将 Bootstrap5Object 都设置为 diabled
        this[protected_getContent]().forEach(value=>{
            if(du.isTargetObject(value, Bootstrap5Object)){
                value.disable();
            }
        });
    }

}

/**
 * 导出公用部分
 */
export{
    Bs5ButtonGroup
}