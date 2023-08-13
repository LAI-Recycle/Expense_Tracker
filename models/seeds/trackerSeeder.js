const Tracker = require('../tracker') // 載入 Tracker model
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Tracker.create({name:`name-${i}`})
  }
  console.log('done')
})