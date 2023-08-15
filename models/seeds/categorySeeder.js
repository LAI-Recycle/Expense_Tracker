if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')
const categoryList = [
  {
    name: '家居物業',
    icon: '<i class="fa-solid fa-house"></i>'
  },
  {
    name: '交通出行',
    icon: '<i class="fa-solid fa-van-shuttle"></i>'
  },
  {
    name: '休閒娛樂',
    icon: '<i class="fa-solid fa-face-grin-beam"></i>'
  },
  {
    name: '餐飲食品',
    icon: '<i class="fa-solid fa-utensils"></i>'
  },
  {
    name: '其他',
    icon: '<i class="fa-solid fa-pen"></i>'
  },
]

db.once('open', () => {
  Promise.all(Array.from({ length: categoryList.length }, (_, i) => Category.create({
    name: categoryList[i].name,
    icon: categoryList[i].icon
  })))
    .then(() => {
      console.log('Category Seeder is created!')
      process.exit()
    })
})