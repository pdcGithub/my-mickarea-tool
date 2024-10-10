"use strict";

/**
 * 这里是关于我的消息提示工具。因为在 Electron 应用中，如果使用浏览器的消息提示会导致失去焦点，无法操作所以要调用 Electron 的消息提示。
 * 但是，在浏览器 UI 调试时，又没法调用 Electron 的消息提示；所以，把消息提示封装一下，让页面处理更简单一些
 * @param {boolean} isApp 这是用于标记 是在 Electron 应用中，还是在 浏览器 中。
 * @param {object} ElectronAPI 这个是 我自己在应用中 设置的 暴露给 前端页面的 Electron 接口对象
 */
function MyMessage(isApp, ElectronAPI){

    /**
     * 这是用于标记 是在 Electron 应用中，还是在 浏览器 中。
     */
    this.runInElectron = isApp;

    /**
     * 这个是 我自己在应用中 设置的 暴露给 前端页面的 Electron 接口对象
     */
    this.elecApi = ElectronAPI;

    /**
     * 这是消息弹窗，只显示，不做其他处理。但是会阻塞 直到点击弹窗的按钮（需要 配合 async 和 await 关键字）。
     * @param {string} message 消息内容
     */
    this.myAlert = async function(message){
        if(this.runInElectron){
            await this.elecApi.showAlert(message);
        }else{
            alert(message);
        }
    }

    /**
     * 这是确认弹窗，需要选择 ，然后根据选择进行处理。但是会阻塞 直到点击弹窗的按钮（需要 配合 async 和 await 关键字）。
     * @param {string} message 消息内容
     * @returns {boolean} 返回一个 boolean 类型的对象。如果 确认 则 true，取消 则 false。
     */
    this.myConfirm = async function(message){
        let result = false;
        if(this.runInElectron){
            let choose = await this.elecApi.showConfirm(message);
            if(choose.response==0){
                result = true;
            }
        }else{
            result = confirm(message);
        }
        return result;
    }

}