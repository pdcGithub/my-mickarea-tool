/**
 * In my license, all codes can be shared free of charge. 
 * However, If my code is taken for commercial use, please maintain it yourself. 
 * I am not obligated to take responsibility for your business application.
 * Here is my email "pangdongcan@live.com"
 * 
 * Copyright © 2025 Micheal Pang. All rights reserved.
 * 
 * @file This file "errors.js" is part of project "js-learning" , which is belong to Michael Pang (It's Me).
 * @author  Micheal Pang (Dongcan Pang)
 * @createDate  2025-08-29
 * @version 1.0.0 
 * @description  这里是自定义异常类的 一个 公用接口模块。保证对外接口一致。
 */
"use strict"; // 这是严格模式下的 Javascript 代码

import { ClassCreationError } from "./errors/ClassCreationError.js";
import { ParameterError } from "./errors/ParameterError.js";
import { ParamValidError } from "./errors/ParamValidError.js";

// 导出共享的内容
export { 
    ClassCreationError, ParameterError, ParamValidError 
}