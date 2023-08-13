// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入
const home = require('./modules/home')
const trackers = require('./modules/trackers')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth') 

router.use('/trackers', authenticator, trackers )
router.use('/users', users) 
router.use('/', authenticator, home)

// 匯出路由器
module.exports = router