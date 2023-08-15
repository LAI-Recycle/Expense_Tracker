const express = require('express')
const moment = require('moment')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// 選取篩選分類
router.get('/categoryFilter/:category', (req, res) => {
  const selectedCategory = req.params.category
  const userId = req.user._id
  let totalAmount = 0
  Record.find({ category: selectedCategory, userId })
    .lean()
    .then((records) => {
      records.forEach(record => {
        totalAmount += record.amount
      })
      return records
    })
    .then(records => {
      Category.find()
        .lean()
        .then(category => res.render('index', {
          selectedCategory, category, records, totalAmount , categoryIcon
        }))
        .catch(console.error)
    })
})

// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  Record.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then((records) => {
      records.forEach(record => {
        totalAmount += record.amount
      })
      return records
    })
    .then((records) => {
      Category.find()
        .lean()
        .then((category) => {
          res.render('index', { records, totalAmount, category  })
        })
    })
    .catch(error => console.error(error))
})

module.exports = router