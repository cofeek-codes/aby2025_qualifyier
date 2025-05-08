const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('../generated/prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(cors())

app.get('/', (req, res) => {
    res.json("hello world")
})

app.get('/services/all', (req, res) => {
  const services = prisma.service.findMany({
    include: {category: true, user: true}
  })
  
  res.json(services)

})


app.listen(3000, () => {
    console.log('listening on 3000')
})
