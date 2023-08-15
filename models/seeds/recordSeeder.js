if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const bcrypt = require('bcryptjs')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')

const db = require('../../config/mongoose')
// const recordList = require('./record.json')
// const userList = require('./user.json')

// 給定種子user
const userList = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: '小新',
    email: 'user2@example.com',
    password: '12345678'
  }
]

// 給定種子record
const recordList = [
  {
    name: '午餐',
    date: '2019.04.23',
    category: '餐飲食品',
    amount: 60
  },
  {
    name: '晚餐',
    date: '2019.04.23',
    category: '餐飲食品',
    amount: 60
  },
  {
    name: '捷運',
    date: '2019.04.23',
    category: '交通出行',
    amount: 120
  },
  {
    name: '租金',
    date: '2015.04.01',
    category: '家居物業',
    amount: 25000
  },
  {
    name: '電影：驚奇隊長',
    date: '2019.04.23',
    category: '休閒娛樂',
    amount: 220
  }
]

db.once('open', () => {
  Promise.all(Array.from({ length: recordList.length }, (_, i) => Category.findOne({ name: recordList[i].category })))
    // 把categoryID 與 Icon 放入recordList中
    .then((data) => {      
      for (let i = 0; i < recordList.length; i++) {
        recordList[i].categoryId = data[i]._id
        recordList[i].categoryIcon = data[i].icon      
      }
      return Promise.all(Array.from({ length: userList.length }, (_, i) => {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(userList[i].password, salt))
          .then(hash => User.create({
            name: userList[i].name,
            email: userList[i].email,
            password: hash
          }))
      }))
    })
    .then(users => {
      console.log('Seed user is created!')
      for (let i = 0; i < 4; i++) {
        recordList[i].userId = users[0]._id
      }
      recordList[4].userId = users[1]._id
      return recordList
    })
    .then(recordList => {
      return Promise.all(Array.from({ length: recordList.length }, (_, i) => Record.create({
        name: recordList[i].name,
        date: recordList[i].date,
        category: recordList[i].category,
        categoryIcon: recordList[i].categoryIcon,
        amount: recordList[i].amount,
        userId: recordList[i].userId,
        categoryId: recordList[i].categoryId
      })))
    })
    .then(() => {
      console.log('Record Seeders are created!')
      process.exit()
    })
})
