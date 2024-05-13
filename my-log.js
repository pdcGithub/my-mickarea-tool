const log4j = require('log4js')
const path = require('node:path')
const { myParams } = require('./static-parameters')

//配置日志
log4j.configure({
    appenders:{
        out: {type:'stdout'},
        app: {
                type:'dateFile',
                pattern:'yyyy-MM-dd',
                filename: myParams.MY_SOFTWARE_LOG_DIR + path.sep + 'application.log',
                compress:true,
                alwaysIncludePattern:true
        }
    },
    categories:{
        default:{appenders:['out', 'app'], level:'debug'}
    }
})

//导出对象 一个日志记录对象
const mylogger = log4j.getLogger()
exports.mylogger = mylogger