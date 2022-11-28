const mongoose = require('mongoose')
const schema = mongoose.Schema
const UserSchema = new schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    creatAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('users', UserSchema)