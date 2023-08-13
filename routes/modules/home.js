// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Tracker = require('../../models/tracker')
// 定義首頁路由
router.get('/', (req, res) => {
  Tracker.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(trackers => res.render('index', { trackers }))
    .catch(error => console.error(error))
})

// // 設定首頁路由
// app.get('/', (req, res) => {
//   Tracker.find() // 取出 Tracker model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .then(trackers => res.render('index', { trackers })) // 將資料傳給 index 樣板
//     .catch(error => console.error(error)) // 錯誤處理
// })

// 匯出路由模組
module.exports = router