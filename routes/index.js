// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入
const home = require('./modules/home')
const trackers = require('./modules/trackers')
// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', home)
router.use('/trackers', trackers )

// 匯出路由器
module.exports = router