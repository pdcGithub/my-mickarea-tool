/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "bootstrap5Effect.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-25
 * @version 1.0.0 
 * @description  这里是模块的对外接口，因为内部的模块可能修改，可能更换位置，一般不建议直接调用
 */
"use strict"; // 这是严格模式下的 Javascript 代码

/**
 * 导入模块
 */
import { 
    Bs5EffBaseComponent,
    protected_get_myId, protected_get_myCssClass, protected_get_mySubConfig, protected_get_bootstrapobject,
    protected_set_myId, protected_set_myCssClass, protected_set_mySubConfig, protected_set_bootstrapobject
} from "./bootstrap5Effect/base/Bs5EffBaseComponent.js";

import { Bs5EffButton } from "./bootstrap5Effect/buttons/Bs5EffButton.js";
import { Bs5EffDropdownButton } from "./bootstrap5Effect/buttons/Bs5EffDropdownButton.js";
import { Bs5EffContainer, protected_get_children } from "./bootstrap5Effect/containers/Bs5EffContainer.js";
import { Bs5EffForm } from "./bootstrap5Effect/containers/Bs5EffForm.js";
import { Bs5EffRow } from "./bootstrap5Effect/containers/Bs5EffRow.js";
import { Bs5EffCol } from "./bootstrap5Effect/containers/Bs5EffCol.js";
import { Bs5EffButtonGroup } from "./bootstrap5Effect/containers/Bs5EffButtonGroup.js";
import { Bs5EffInput } from "./bootstrap5Effect/inputs/Bs5EffInput.js";
import { Bs5EffInputGroup } from "./bootstrap5Effect/containers/Bs5EffInputGroup.js";
import { Bs5EffFormInputGroup } from "./bootstrap5Effect/containers/Bs5EffFormInputGroup.js";
import { Bs5EffTextInput, TEXT_INPUT_TYPE } from "./bootstrap5Effect/inputs/Bs5EffTextInput.js";
import { Bs5EffTextArea } from "./bootstrap5Effect/inputs/Bs5EffTextArea.js";
import { Bs5EffFileChooser } from "./bootstrap5Effect/inputs/Bs5EffFileChooser.js";
import { Bs5EffTextSelect } from "./bootstrap5Effect/inputs/Bs5EffTextSelect.js";
import { Bs5EffTextCheckbox } from "./bootstrap5Effect/inputs/Bs5EffTextCheckbox.js";
import { Bs5EffTextSwitch } from "./bootstrap5Effect/inputs/Bs5EffTextSwitch.js";
import { Bs5EffTextRadio } from "./bootstrap5Effect/inputs/Bs5EffTextRadio.js";
import { Bs5EffFormInput, protected_get_MyInputComponent, protected_set_MyInputComponent } from "./bootstrap5Effect/forminputs/Bs5EffFormInput.js";
import { Bs5EffFormTextInput } from "./bootstrap5Effect/forminputs/Bs5EffFormTextInput.js";
import { Bs5EffFormTextArea } from "./bootstrap5Effect/forminputs/Bs5EffFormTextArea.js";
import { Bs5EffFormFileChooser } from "./bootstrap5Effect/forminputs/Bs5EffFormFileChooser.js";
import { Bs5EffFormTextSelect } from "./bootstrap5Effect/forminputs/Bs5EffFormTextSelect.js";
import { Bs5EffFormTextCheckbox } from "./bootstrap5Effect/forminputs/Bs5EffFormTextCheckbox.js";
import { Bs5EffFormTextSwitch } from "./bootstrap5Effect/forminputs/Bs5EffFormTextSwitch.js";
import { Bs5EffFormTextRadio } from "./bootstrap5Effect/forminputs/Bs5EffFormTextRadio.js";
import { Bs5EffLoading } from "./bootstrap5Effect/others/Bs5EffLoading.js";
import { Bs5EffMessage } from "./bootstrap5Effect/others/Bs5EffMessage.js";
import { Bs5EffModalDialog } from "./bootstrap5Effect/others/Bs5EffModalDialog.js";
import { Bs5EffTable } from "./bootstrap5Effect/others/Bs5EffTable.js";

/**
 * 导出公用部分: 类
 */
export {
    Bs5EffBaseComponent,

    Bs5EffButton, Bs5EffDropdownButton, 

    Bs5EffContainer, Bs5EffForm, Bs5EffRow, Bs5EffCol, Bs5EffButtonGroup, Bs5EffInputGroup, Bs5EffFormInputGroup,

    Bs5EffInput, Bs5EffTextInput, Bs5EffTextArea, Bs5EffFileChooser, Bs5EffTextSelect, Bs5EffTextCheckbox, Bs5EffTextSwitch, Bs5EffTextRadio, 

    Bs5EffFormInput, Bs5EffFormTextInput, Bs5EffFormTextArea, Bs5EffFormFileChooser, Bs5EffFormTextSelect, 
    Bs5EffFormTextCheckbox, Bs5EffFormTextSwitch, Bs5EffFormTextRadio, 

    Bs5EffLoading, Bs5EffMessage, Bs5EffModalDialog, Bs5EffTable,
}

/**
 * 导出公用部分: 受保护的 一些函数
 */
export{
    protected_get_myId, protected_get_myCssClass, protected_get_mySubConfig, protected_get_bootstrapobject,
    protected_set_myId, protected_set_myCssClass, protected_set_mySubConfig, protected_set_bootstrapobject,

    protected_get_children,

    protected_get_MyInputComponent, protected_set_MyInputComponent
}

/**
 * 导出公用部分: 一些常量
 */
export {
    TEXT_INPUT_TYPE
}