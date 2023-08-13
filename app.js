const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') 
// 引用 body-parser
const bodyParser = require('body-parser')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
const Tracker = require('./models/tracker')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 設定首頁路由
app.get('/', (req, res) => {
  Tracker.find() // 取出 Tracker model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(trackers => res.render('index', { trackers })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

app.get('/trackers/new', (req, res) => {
  return res.render('new')
})

app.post('/trackers', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Tracker.create({ name })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

app.get('/trackers/:id', (req, res) => {
  const id = req.params.id
  return Tracker.findById(id)
    .lean()
    .then((tracker) => res.render('detail', { tracker }))
    .catch(error => console.log(error))
})

app.get('/trackers/:id/edit', (req, res) => {
  const id = req.params.id
  return Tracker.findById(id)
    .lean()
    .then((tracker) => res.render('edit', { tracker }))
    .catch(error => console.log(error))
})

app.put('/trackers/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Tracker.findById(id)
    .then(tracker => {
      tracker.name = name
      return tracker.save()
    })
    .then(()=> res.redirect(`/trackers/${id}`))
    .catch(error => console.log(error))
})

app.delete('/trackers/:id', (req, res) => {
  const id = req.params.id
  return Tracker.findById(id)
    .then(tracker => tracker.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})