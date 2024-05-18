//这个文件是用于存放一些静态常量内容的
const os = require('node:os')
const path = require('node:path')

/**
 * 软件的主目录
 */
const MY_SOFTWARE_HOME_DIR = os.homedir + path.sep + 'my-mickarea-tool'

/**
 * 软件的配置文件存放位置
 */
const MY_SOFTWARE_CONFIG_DIR = MY_SOFTWARE_HOME_DIR + path.sep + 'config'

/**
 * 软件的日志文件存放位置
 */
const MY_SOFTWARE_LOG_DIR = MY_SOFTWARE_HOME_DIR + path.sep + 'log'

/**
 * Java 实体类的存放目录
 */
const MY_SOFTWARE_ENTITY_DIR = MY_SOFTWARE_HOME_DIR + path.sep + 'entities'

/**
 * 导出常量
 */
exports.myParams = {
    MY_SOFTWARE_HOME_DIR,
    MY_SOFTWARE_CONFIG_DIR,
    MY_SOFTWARE_LOG_DIR,
    MY_SOFTWARE_ENTITY_DIR
};