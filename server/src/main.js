const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.json("hello world")
})

app.listen(3000, () => {
    console.log('listening on 3000')
})
