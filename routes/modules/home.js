// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Tracker = require('../../models/tracker')
// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id 
  Tracker.find({ userId }) 
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(trackers => res.render('index', { trackers }))
    .catch(error => console.error(error))
})

module.exports = router