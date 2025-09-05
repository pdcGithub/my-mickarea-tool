/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "electronapi.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-05-28
 * @lastEditors  Micheal Pang (Dongcan Pang)
 * @lastEditTime  2025-05-29 14:17:18
 * @filePath  D:\mygit-repo\js-learning\browser\modules\myselfs\electronapi.js
 * @description  这是一个 Electron 的 API 的处理模块。方便 浏览器 和 Electron 环境切换
 * @todo 
 * @version 1.0.0 
 */
"use strict"; // 这是严格模式下的 Javascript 代码

/**
 * 这里获取 进程间通信需要用到的 API 对象。由于有些页面在 iframe 里面，所以需要用 parent 来获取
 */
const MY_ELEC_API = window.ElectronAPI || window.parent.ElectronAPI;

/**
 * 这里判断，到底是在 浏览器环境，还是 Electron 环境。
 */
const IS_IN_APP = MY_ELEC_API ? true : false;

/**
 * 这是一个模拟消息的消息头
 */
const TITLE = "[浏览器环境]";

/**
 * 这是一个 Electron 的 API 模拟类，它使用时会派生一个代理对象，防止对象被修改
 */
class ElectronAPI {

    constructor() {
        this.isInApp = IS_IN_APP;
    }

    /**
     * 获取 nodejs 的版本号
     * @returns {string} nodejs 的版本号字符串
     */
    getNodeJsVersion() {
        if(this.isInApp){
            return MY_ELEC_API.getNodeJsVersion();
        }else{
            //浏览器模拟的结果
            return `${TITLE} 模拟的 NodeJs 版本号为 0.0.0`;
        }
    }

    /**
     * 获取 chrome 的版本号
     * @returns {string} chrome 的版本号字符串
     */
    getChromeVersion() {
        if(this.isInApp){
            return MY_ELEC_API.getChromeVersion();
        }else{
            //浏览器模拟的结果
            return `${TITLE} 模拟的 Chrome 版本号为 1.1.1`;
        }
    }

    /**
     * 获取 Electron 的版本号
     * @returns {string} Electron 的版本号字符串
     */
    getElectronVersion() {
        if(this.isInApp){
            return MY_ELEC_API.getElectronVersion();
        }else{
            //浏览器模拟的结果
            return `${TITLE} 模拟的 Electron 版本号为 2.2.2`;
        }
    }

    /**
     * 关于本软件的版本号
     * @returns {Promise<string>} 返回一个 Promise 对象，他的值是 关于 本软件的版本号 的字符串
     */
    async getAppVersion() {
        if(this.isInApp){
            // 对于 ElectronAPI 这个 getAppVersion 方法是异步的。返回一个 Promise 对象
            return await MY_ELEC_API.getAppVersion();
        }else{
            //浏览器模拟的结果
            return Promise.resolve(`${TITLE} 模拟的 应用版本为 3.3.3`);
        }
    }

    /**
     * 关于当前操作系统的一些信息
     * @returns {Promise<object>} 返回一个 Promise 对象，他的值是 关于当前操作系统的一些信息 的一个 对象字面量
     */
    async getOsVersionInfo() {
        if(this.isInApp){
            // 对于 ElectronAPI 这个 getOsVersionInfo 方法是异步的。返回一个 Promise 对象
            return await MY_ELEC_API.getOsVersionInfo();
        }else{
            return Promise.resolve({
                version : '[浏览器模拟] version',
                platform : '[浏览器模拟] platform',
                type : '[浏览器模拟] type',
                release : '[浏览器模拟] release',
                machine : '[浏览器模拟] machine'
            });
        }
    }

    /**
     * 关于当前 Java语言环境 的一些信息
     * @returns {Promise<object>} 返回一个 Promise 对象，他的值是 关于当前 Java语言环境 的一些信息 的一个 对象字面量
     */
    async getJavaVersionInfo() {
        if(this.isInApp){
            // 对于 ElectronAPI 这个 getJavaVersionInfo 方法是异步的。返回一个 Promise 对象
            return await MY_ELEC_API.getJavaVersionInfo();
        }else{
            return Promise.resolve({info1:'[浏览器模拟] info 1', info2:'[浏览器模拟] info 2', info3:'[浏览器模拟] info 3'});
        }
    }

    /**
     * 关于本软件的一些静态参数信息
     * @param {string} name 参数名，应该为字符串
     * @returns {Promise<string>} 返回一个 Promise 对象，他的值是 一些静态参数的内容，一般是字符串
     */
    async getStaticParameter(name) {
        if(this.isInApp){
            return await MY_ELEC_API.getStaticParameter(name);
        }else{
            //浏览器模拟的结果
            return Promise.resolve(`${TITLE} 模拟的 静态参数 1.`);
        }
    }

    /**
     * 这里是 处理窗口最小化、最大化、以及关闭的方法
     * @param {string} behavior 是操作类型的字符串。可能的值有 'min', 'max', 'close'
     * @returns {Promise<object>} 返回一个 Promise 对象，他的值是 一个对象，比如：{status:true, info:''} 。如果异常 status 会为 false ，info 附带异常信息
     */
    async setWindowBehavior(behavior) {
        if(this.isInApp){
            return await MY_ELEC_API.setWindowBehavior(behavior);
        }else{
            //浏览器模拟的结果
            return Promise.resolve({status:true, info:''});
        }
    }

    /**
     * 这里是一个模拟 浏览器 alert 函数的处理。如果是 浏览器它会调用 alert 方法。如果是 Electron 它会调用 IPC 上的 showAlert 方法。
     * @param {*} message 要显示的消息
     * @returns {Promise<object|void>} 返回一个 Promise 对象，他的值是 一个对象 ，也可能是 void 
     */
    async showAlert(message) {
        if(this.isInApp){
            return await MY_ELEC_API.showAlert(message);
        }else{
            //浏览器模拟的结果
            return Promise.resolve(window.alert(message));
        }
    }

    /**
     * 这里是一个模拟 浏览器 confirm 函数的处理。如果是 浏览器它会调用 confirm 方法。如果是 Electron 它会调用 IPC 上的 showConfirm 方法。
     * @param {*} message 要显示的消息
     * @returns {Promise<boolean>} 返回一个 Promise 对象，他的值是 一个布尔值。确定 为 true，取消 和 关闭 为 false 
     */
    async showConfirm(message) {
        if(this.isInApp){
            // Electron 返回的不是 true 和 false ，而是一个 Promise 对象，它的内容有 按钮的数字序列信息
            let messageBoxResult = await MY_ELEC_API.showConfirm(message);
            // 根据返回的数字，转换为一个 布尔类型的值
            let isOk = true;
            if(messageBoxResult.response==1 || messageBoxResult.response==-1) isOk=false;
            return Promise.resolve(isOk);
        }else{
            //浏览器模拟的结果
            return Promise.resolve(window.confirm(message));
        }
    }
    
    /**
     * 文件选择框的处理方法。它会打开一个对话框，在内部选择文件，或者文件夹。
     * @param {object} options 参考 Electron 的 dialog 模块的 showOpenDialogSync 函数 的 options 参数
     * @returns {Promise<Array<string>>} 文件或者文件夹路径数组。如果取消了，则数组的长度为 0 
     */
    async showFileDialog(options) {
        if(this.isInApp){
            // 调用时，返回的是 一个 字符串数组。如果没有选择，则数组为空数组
            let result = await MY_ELEC_API.showFileDialog(options===undefined?{}:options);
            //返回文件路径
            return Promise.resolve(result);
        }else{
            //浏览器模拟的结果
            return Promise.resolve([`${TITLE} C:\\Users\\Michael\\Pictures\\20250528`]);
        }
    }

    /**
     * 文件路径打开的处理方法。它会打开你所传入的文件路径。返回的值一般都是空字符串 "" 。如果异常才会返回 具体的异常信息
     * @param {string} path 你要打开的文件路径
     * @returns {Promise<string>} 返回一个 Promise 对象，他的值是 一个字符串。
     */
    async filePathOpen(path) {
        if(this.isInApp){
            // Electron 返回的是一个 Promise ，并且如果没有异常，它的值是 空字符串 ""；有异常则返回异常信息
            return await MY_ELEC_API.filePathOpen(path);
        }else{
            //浏览器模拟的结果
            console.log(`${TITLE} 打开一个文件路径 '${path}'`);
            return Promise.resolve("");
        }
    }
    
    /**
     * jar 执行日志文件夹的打开的处理方法。它会打开 jar 执行日志文件夹。返回的值一般都是空字符串 "" 。如果异常才会返回 具体的异常信息。
     * 要注意的是这个是 jar 文件的执行日志。即由 jar 文件自己的配置生成。不是命令的调用日志。
     * @returns {Promise<string>} 返回一个 Promise 对象，他的值是 一个字符串。
     */
    async openJarExecLogDir() {
        if (this.isInApp) {
            // Electron 返回的是一个 Promise ，并且如果没有异常，它的值是 空字符串 ""；有异常则返回异常信息
            return await MY_ELEC_API.openJarExecLogDir();
        } else {
            //浏览器模拟的结果
            console.log(`${TITLE} 打开 jar 执行日志文件夹的路径`);
            return Promise.resolve("");
        }
    }

    /**
     * java 程序的调用方法。
     * @param {string} javaCommand Java 的 jvm 启动命令路径。一般为 java.exe 文件路径
     * @param {string} jarPath 要执行的 jar 包的文件路径
     * @param {Array<string>} jarArguments 这个 jar 包的执行参数信息
     * @returns {Promise<object>} 一个 Promise 对象，它的值是 {status:'ok', info:'', data:undefined}; 这种形式
     */
    async execJar(javaCommand, jarPath, jarArguments) {
        if (this.isInApp) {
            // 返回一个 Promise ，值为 {status:'ok', info:'', data:undefined}; 这种形式。 status 可能为 ok ，也可能为 error.
            // 一般以 status 和 info 参数为判断依据。如果有数据传送，则处理 data 。data 为 Json 对象
            return await MY_ELEC_API.execJar(javaCommand, jarPath, jarArguments);
        } else {
            //浏览器模拟的结果
            return Promise.resolve({status:'ok', info:`${TITLE}`, data:undefined});
        }
    }
    
    /**
     * 这是配置信息的保存方法
     * @param {object} dbConfig 一个待保存的普通对象，比如：{id:1, name:"tom", age:12}
     * @returns {Promise<object>} 一个 Promise 对象，它的值是 {status:'ok', info:'', configFileName:''}; 这种形式
     */
    async saveConfig(dbConfig) {
        if (this.isInApp) {
            // 返回一个 Promise ，值为 {status:'ok', info:'', configFileName:''}; 这种形式。 status 可能为 ok ，也可能为 error.
            // 一般以 status 和 info 参数为判断依据。configFileName 为文件保存后的名字
            return await MY_ELEC_API.saveConfig(dbConfig);
        } else {
            //浏览器模拟的结果
            return Promise.resolve({status:'ok', info:`${TITLE}`, configFileName:'test.properties'})
        }
    }
    
    /**
     * 这是配置信息的读取方法
     * @param {string} configName 配置文件名。文件名需要带 .properties 后缀。
     * @returns {Promise<object>} 一个 Promise 对象，它的值是 {status:'ok', info:'', data:{}}; 这种形式
     */
    async readConfig(configName) {
        if (this.isInApp) {
            // 返回一个 Promise ，值为 {status:'ok', info:'', data:{}}; 这种形式。 status 可能为 ok ，也可能为 error.
            // 一般以 status 和 info 参数为判断依据。data 为文件读出来的键值对，所生成的一个 js 对象。
            return await MY_ELEC_API.readConfig(configName);
        } else {
            //浏览器模拟的结果
            return Promise.resolve({status:'ok', info:`${TITLE}`, data:{id:1, name:"tom"}})
        }
    }
    
    /**
     * 获取当前机器所有的配置文件名
     * @returns {Promise<object>} 一个 Promise 对象，它的值是 {status:'ok', info:'', data:[]}; 这种形式
     */
    async getAllConfigId() {
        if (this.isInApp) {
            // 返回一个 Promise ，值为 {status:'ok', info:'', data:[]}; 这种形式。 status 可能为 ok ，也可能为 error.
            // 一般以 status 和 info 参数为判断依据。data 为配置文件名 数组 。
            return await MY_ELEC_API.getAllConfigId();
        } else {
            //浏览器模拟的结果
            return Promise.resolve({status:'ok', info:`${TITLE}`, data:['file1.properties','file2.properties']});
        }
    }

    /**
     * 删除当前机器的所有配置文件。
     * @returns {Promise<object>} 一个 Promise 对象，它的值是 {status:'ok', info:''}; 这种形式
     */
    async removeAllConfig() {
        if (this.isInApp) {
            // 返回一个 Promise ，值为 {status:'ok', info:''}; 这种形式。 status 可能为 ok ，也可能为 error.
            // 一般以 status 和 info 参数为判断依据。
            return await MY_ELEC_API.removeAllConfig();
        } else {
            //浏览器模拟的结果
            return Promise.resolve({status:'ok', info:`${TITLE}`});
        }
    }

}

//先创建对象
const eapi = new ElectronAPI();
//在代理对象上，禁止 添加 操作。
const myapi = new Proxy(eapi, {
    // 添加 set 陷阱，不让其它地方动态添加内容
    set(target, key, value, receiver){
        return false;
    },
    // 添加 get 陷阱，不存在的属性直接报错
    get(target, key, receiver){
        if(!(key in receiver)){
            throw new TypeError(`the property ${key} is not exists.`);
        }
        return Reflect.get(target, key, receiver);
    },
    // 添加 deleteProperty 陷阱，不让删除属性
    deleteProperty(target, key){
        return false;
    },
    // 添加原型代理陷阱（不允许修改原型）
    getPrototypeOf(target){
        return null;
    },
    setPrototypeOf(target, prototype){
        return false;
    },
    // 添加 Object.defineProperty 限制，不让它 添加属性或者方法
    defineProperty(target, key, descriptor){
        return false;
    },
    // 添加 Object.getOwnPropertyDescriptor 限制，不让他获取 Descriptor
    getOwnPropertyDescriptor(target, key){
        return ;
    }
});

//最后，导出代理对象
export {myapi}