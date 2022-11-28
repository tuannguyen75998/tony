const mongoose = require('mongoose')
const schema = mongoose.Schema
const PostSchema = new schema({
    tilte: {
        type: String,
        required: true
    },
    decription: {
        type: String
    },
    url: {
        type: String,
    },
    status: {
        type: String,
        enum: ['to learn','learning','learned']
    },
    userpost: {
        type: schema.Types.ObjectId,
        ref: 'users'

    }
})
module.exports = mongoose.model('posts', PostSchema)