const express = require('express')
const app = express()
const db = require('./config/DB')
const authroute = require('./routes/auth')
const postroute = require('./routes/post')
db.connectdb()

app.use(express.json())
app.use('/api/post', postroute)
app.use('/api/auth', authroute) 




const PORT = 5000
app.listen(PORT, () => console.log(`Server stat at ${PORT}`))