/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "Bs5EffInput.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-26
 * @version 1.0.0 
 * @description  这个是 整个动态组件库的 输入组件 基础类。它可以派生出其它输入组件类，比如 TextInput, TextSelect 等等。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

/**
 * 导入模块
 */
import { Bs5EffBaseComponent, 
    protected_set_bootstrapobject, protected_get_myId, protected_get_bootstrapobject, protected_get_mySubConfig } from "../base/Bs5EffBaseComponent.js";
import { myRandomNumStr, Bs5SingleInput } from "../../bootstrap5UI.js";
import { ValidUtil as vu } from "../../../../../utils/valid.js";
import { DataUtil as du } from "../../../../../utils/datatype.js";
import { ParamValidError } from "../../errors.js";
import { actionBinding } from "../../apis.js";

/**
 * 这是一个基类，一般不会直接 new 创建对象，主要用于继承 输入组件，这里是一个抽象类，它是作为 其它输入组件的父类来处理的。这个类会包含一些 输入组件公用 的处理方法
 */
class Bs5EffInput extends Bs5EffBaseComponent {

    /**
     * 这是一个基类，一般不会直接 new 创建对象，主要用于继承 输入组件，这里是一个抽象类，它是作为 其它输入组件的父类来处理的。这个类会包含一些 输入组件公用 的处理方法
     * @param {string} id 组件ID
     * @param {object} [option] 关于组件的可选配置参数。
     * @param {string} [option.cssClass] 输入组件的其它 样式；默认是 空字符串
     * @param {string} [option.type] 输入组件的类型信息；默认是 text 
     * @param {string} [option.defaultValue] 输入组件的默认值；默认是 空字符串
     * @param {string} [option.placeholder] 输入默认的提示信息；默认是 空字符串
     * @param {RegExp|Function} [option.validRule] 默认的输入校验处理。可以是正则表达式，也可以是函数。如果是函数，有一个自带参数 html dom 元素
     * @param {Map<string,Function>} [option.customEvent] 自定义事件处理，key 是 事件名字符串，以逗号分隔，value 是 事件处理函数。函数有一个自带参数 event 
     */
    constructor(id=('input'+myRandomNumStr()), {cssClass='', type='text', defaultValue='', placeholder='', validRule=undefined, customEvent=undefined}={}){
        
        // 参数验证（优化）这里校验可配置参数，是否有传递，或者类型是否错误（当 options 为 undefined 则会自动以默认值填充）
        vu.autoVnAofObjectLiteral(arguments[1], 'Bs5EffInput', 'constructor', 'option', true);

        // 参数校验
        vu.autoVnAofString(id, 'Bs5EffInput', 'constructor', 'id', false);
        // option 内部属性校验
        vu.autoVnAofString(cssClass, 'Bs5EffInput', 'constructor', 'cssClass');
        vu.autoVnAofString(type, 'Bs5EffInput', 'constructor', 'type');
        vu.autoVnAofString(defaultValue, 'Bs5EffInput', 'constructor', 'defaultValue');
        vu.autoVnAofString(placeholder, 'Bs5EffInput', 'constructor', 'placeholder');
        if(validRule!==undefined) vu.autoVnAofTargetObject(validRule, 'Bs5EffInput', 'constructor', 'validRule', RegExp, Function);
        if(customEvent!==undefined){
            // 首先是个 Map
            vu.autoVnAofTargetObject(customEvent, 'Bs5EffInput', 'constructor', 'customEvent', Map);
            //
            let tmpKeys = Array.from(customEvent.keys());
            let tmpValues = Array.from(customEvent.values());
            // 然后校验 key 是不是 字符串
            vu.autoVnAofTargetObjectArray(tmpKeys, 'Bs5EffInput', 'constructor', 'tmpKeys', String);
            // 然后校验 value 是不是 函数
            vu.autoVnAofTargetObjectArray(tmpValues, 'Bs5EffInput', 'constructor', 'tmpValues', Function);
        }
        
        // 父类初始化(已经有 valueof 处理，所以不同额外处理)
        super(id, cssClass, arguments[1]);

        // 将内置 UI 对象改为 bootstrap5UI.js 中的 Bs5SingleInput (已经有 valueof 处理，所以不同额外处理)
        let tmp = new Bs5SingleInput(id, {type:type, placeholder:placeholder});
        this[protected_set_bootstrapobject](tmp);

        // 如果有自定义样式，在这里添加
        if(cssClass.trim().length>0) this[protected_get_bootstrapobject]().addCssClass(cssClass);

        // 如果有默认值，则在这里添加
        if(defaultValue.trim().length>0) this[protected_get_bootstrapobject]().addAttribute('value', du.valueOfString(defaultValue));
    }

    // 关于 value 的 get 和 set ================== 

    /**
     * 获取组建的值
     * @returns 一般是字符串，如果有特殊情况，会重载，并说明。
     */
    getValue(){
        return document.getElementById(this[protected_get_myId]()).value;
    }

    /**
     * 给组件设置一个特定的值。
     * @param {*} val 可以是任意类型，但是赋值时，都会转换成 字符串 ，再设置
     */
    setValue(val){
        // 获取当前 html dom 元素
        let thisElem = document.getElementById(this[protected_get_myId]());
        // 赋值内容
        thisElem.value = `${val}`;
        // 传递一个 change 事件 （因为很多时候，setValue 方法处理完毕，这个 change 事件不起效，所以决定手动传递一个）
        thisElem.dispatchEvent(new Event('change', {bubbles: true, cancelable: true}));
    }

    // 关于启用 和 禁用 ===========================

    /**
     * (重载父类方法) 组件的禁用操作。因为 输入框有校验样式，启用 和 禁用时，应该清空原有的校验样式
     */
    disable(){
        document.getElementById(this[protected_get_myId]()).setAttribute('disabled','true');
        this.clearValidStyles();
    }

    /**
     * (重载父类方法) 组建的启用操作。因为 输入框有校验样式，启用 和 禁用时，应该清空原有的校验样式
     */
    enable(){
        document.getElementById(this[protected_get_myId]()).removeAttribute('disabled');
        this.clearValidStyles();
    }

    // ===========================================

    /**
     * 将组件设置为校验 通过
     */
    setValidPassed(){
        let target = document.getElementById(this[protected_get_myId]());
        target.classList.remove('is-invalid');
        target.classList.add('is-valid');
        // 如果 组件在 input group 中，随便给 input group 增加样式处理
        if(target.parentElement.classList.contains('input-group')){
            target.parentElement.classList.remove('is-invalid');
            target.parentElement.classList.add('is-valid');
        }
    }

    /**
     * 将组件设置为校验 不通过
     */
    setValidFailed(){
        let target = document.getElementById(this[protected_get_myId]());
        target.classList.remove('is-valid');
        target.classList.add('is-invalid');
        // 如果 组件在 input group 中，随便给 input group 增加样式处理
        if(target.parentElement.classList.contains('input-group')){
            target.parentElement.classList.remove('is-valid');
            target.parentElement.classList.add('is-invalid');
        }
    }

    /**
     * 清空组件设置的校验样式
     */
    clearValidStyles(){
        let target = document.getElementById(this[protected_get_myId]());
        target.classList.remove('is-valid');
        target.classList.remove('is-invalid');
        // 如果 组件在 input group 中，随便给 input group 增加样式处理
        if(target.parentElement.classList.contains('input-group')){
            target.parentElement.classList.remove('is-valid');
            target.parentElement.classList.remove('is-invalid');
        }
    }

    // 关于 value 的 数据校验 ================== 

    /**
     * 组件的校验处理函数
     * @returns 校验通过，返回 true ； 校验不通过，返回 false 。
     */
    valid(){
        // 先获取配置 (这里不能用 this ，因为 这是回调函数， this 指的是 当前 html dom 对象)
        let rule = this[protected_get_mySubConfig]().validRule;

        // 先查看校验规则，如果没有设置，则不需要校验（如果这里返回了，后面不会执行）
        if(rule === undefined) return true;

        // 正则 和 回调函数 才需要详细处理
        let re = false;
        if(du.isRegexp(rule)){
            // 如果是 正则
            let tmp = du.isString(this.getValue())?du.valueOfString(this.getValue()):'';
            re = du.isRegexpOk(tmp, rule);
        }else if(du.isFunction(rule)){
            // 如果是 回调函数(默认传递本 Html Element 对象 作为入参)
            //console.log(new Date(), '执行开始..');
            re = rule(document.getElementById(this[protected_get_myId]()));
            //console.log(new Date(), '执行结束..');
        }
        // 设置 校验处理 样式
        re?this.setValidPassed():this.setValidFailed();
        // 返回校验结果
        return re;
    }

    // 关于默认的事件绑定处理 =================== change、focus、keyup

    /**
     * 默认的组件事件绑定处理
     */
    defaultBinding(){
        // 获取当前 html dom 元素
        let thisElem = document.getElementById(this[protected_get_myId]());
        // 事件绑定
        actionBinding(thisElem, 'change, focus, keyup', (event)=>{
            // 这里不能直接丢 valid 方法给 listener ，因为当事件响应时，valid函数内部的 this 的指向 会变成 html dom 。
            this.valid();
        });
    }

    // 关于自定义的事件绑定处理 =================

    /**
     * 自定义的组件事件绑定处理
     */
    customBinding(){
        // 先获取配置
        let cEventAction = this[protected_get_mySubConfig]().customEvent;
        // 获取当前 html dom 元素
        let thisElem = document.getElementById(this[protected_get_myId]());
        // 先查看自定义事件处理有没有设置，如果没有设置，则不需要绑定
        if(cEventAction !== undefined){
            // 首先过滤 事件名信息，把空字符串 都过滤掉。然后再绑定
            let keysArr = Array.from(cEventAction.keys()).filter(key=>du.isString(key) && !du.isEmptyString(key));
            keysArr.forEach(key=>{
                actionBinding(thisElem, key, cEventAction.get(key));
            });
        }
    }

    /**
     * (重载父类方法) 将这个组件写入到页面的对应 html 元素中。(重载的原因是，这个输入组件是有事件处理的，所以在插入页面时，要加上事件绑定)
     * @param {*} target 页面的对应 html 元素。如果不填，默认是 document.body 对象
     */
    writeToPage(target=document.body){
        // 参数校验
        vu.throwError(
            !du.isHtmlElement(target) && target!==document.body, 
            `调用 Input 的 writeToPage 方法出错，参数 target=${target} 不是 html元素 对象`, ParamValidError);
        
        // 调用父类的方法，先插入页面
        super.writeToPage(target);

        // 事件绑定（自带的 以及 自定义的）
        this.defaultBinding();
        this.customBinding(); 
    }
}

/**
 * 导出公用部分
 */
export {
    Bs5EffInput
}