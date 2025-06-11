const mongoose = require('mongoose')

const planetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  isHabitable: Boolean,
  image: String
})

const Planet = mongoose.model('Planet', planetSchema)
module.exports = Planet
