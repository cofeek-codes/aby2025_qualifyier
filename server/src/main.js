const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('../generated/prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

// index 
app.get('/', (req, res) => {
    res.json("hello world")
})

// get all services
app.get('/services/all', async (req, res) => {
  const services = await prisma.service.findMany({
    include: {category: true, user: true}
  })
  
  res.json(services)

})

// user registration
app.post('/auth/register', async (req, res) => {
  console.log('/auth/register body')
  console.log(req.body)
  res.json(req.body)
})


app.listen(3000, () => {
    console.log('listening on 3000')
})
