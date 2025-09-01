/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "bootstrap5UI.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-15
 * @version 1.0.0 
 * @description  这是 bootstrap 5 UI 绘制组件包的一个 对外接口 文件。可以理解为 all-in-one.
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { Bootstrap5Object, protected_getContent } from "./bootstrap5UI/base/Bootstrap5Object.js";
import { Bs5Button } from "./bootstrap5UI/buttons/Bs5Button.js";
import { Bs5ButtonGroup } from "./bootstrap5UI/containers/Bs5ButtonGroup.js";
import { Bs5Col } from "./bootstrap5UI/containers/Bs5Col.js";
import { Bs5Container } from "./bootstrap5UI/containers/Bs5Container.js";
import { Bs5DropdownButton } from "./bootstrap5UI/buttons/Bs5DropdownButton.js";
import { Bs5Form } from "./bootstrap5UI/containers/Bs5Form.js";
import { Bs5FormCheckboxGroup } from "./bootstrap5UI/forminputs/Bs5FormCheckboxGroup.js";
import { 
    Bs5FormEditorObject, protected_getFormHelperObject, protected_getFormLabelObject, protected_getFormInvalidInfoObject
} from "./bootstrap5UI/forminputs/Bs5FormEditorObject.js";
import { Bs5FormInput } from "./bootstrap5UI/forminputs/Bs5FormInput.js";
import { Bs5FormInputGroup } from "./bootstrap5UI/forminputs/Bs5FormInputGroup.js";
import { Bs5FormRaidoGroup } from "./bootstrap5UI/forminputs/Bs5FormRaidoGroup.js";
import { Bs5FormSelect } from "./bootstrap5UI/forminputs/Bs5FormSelect.js";
import { Bs5FormSwitchGroup } from "./bootstrap5UI/forminputs/Bs5FormSwitchGroup.js";
import { Bs5FormTextArea } from "./bootstrap5UI/forminputs/Bs5FormTextArea.js";
import { Bs5LoadingLayer } from "./bootstrap5UI/others/Bs5LoadingLayer.js";
import { Bs5ModalDialog } from "./bootstrap5UI/others/Bs5ModalDialog.js";
import { Bs5Row } from "./bootstrap5UI/containers/Bs5Row.js";
import { Bs5SingleCheckboxGroup } from "./bootstrap5UI/singleinputs/Bs5SingleCheckboxGroup.js";
import { Bs5SingleInput } from "./bootstrap5UI/singleinputs/Bs5SingleInput.js";
import { Bs5SingleSelect } from "./bootstrap5UI/singleinputs/Bs5SingleSelect.js";
import { Bs5SingleTextArea } from "./bootstrap5UI/singleinputs/Bs5SingleTextArea.js";
import { Bs5Table } from "./bootstrap5UI/others/Bs5Table.js";
import { Bs5ToastContainer } from "./bootstrap5UI/others/Bs5ToastContainer.js";
import { Bs5ToastMessage } from "./bootstrap5UI/others/Bs5ToastMessage.js";

import { BTN_GROUP_SIZE, BTN_COR, BTN_SIZE, myRandomNumStr } from "./bootstrap5UI/base/myBasicToolkit.js";

/**
 * 导出 类
 */
export {
    Bootstrap5Object,

    Bs5Button, Bs5ButtonGroup, Bs5DropdownButton,

    Bs5Form, Bs5Container, Bs5Row, Bs5Col,

    Bs5FormEditorObject, Bs5FormInputGroup, Bs5FormCheckboxGroup, Bs5FormInput, Bs5FormRaidoGroup, 
    Bs5FormSelect, Bs5FormSwitchGroup, Bs5FormTextArea,

    Bs5SingleCheckboxGroup, Bs5SingleInput, Bs5SingleSelect, Bs5SingleTextArea,

    Bs5ModalDialog, Bs5LoadingLayer, Bs5Table,
    
    Bs5ToastContainer, Bs5ToastMessage,
}

/**
 * 导出常量 和 函数
 */
export {
    BTN_GROUP_SIZE, BTN_COR, BTN_SIZE, myRandomNumStr
}

/**
 * 导出 protected 内容
 */
export {
    protected_getContent, protected_getFormHelperObject, protected_getFormLabelObject, protected_getFormInvalidInfoObject
}