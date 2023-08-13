const express = require('express')
const router = express.Router()
const Tracker = require('../../models/tracker')

router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  const name = req.body.name
  return Tracker.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Tracker.findById(id)
    .lean()
    .then(tracker => res.render('detail', { tracker }))
    .catch(error => console.log(error))
})
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Tracker.findById(id)
    .lean()
    .then(tracker => res.render('edit', { tracker }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Tracker.findById(id)
    .then(tracker => {
      tracker.name = name
      tracker.isDone = isDone === 'on'
      return tracker.save()
    })
    .then(() => res.redirect(`/trackers/${id}`))
    .catch(error => console.log(error))
})
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Tracker.findById(id)
    .then(tracker => tracker.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router