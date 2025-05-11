const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
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
    include: { category: true, user: true }
  })

  res.json(services)

})

// user registration
app.post('/auth/register', async (req, res) => {
  console.log('/auth/register body')
  console.log(req.body)
  const _res = {}
  let email = req.body.email
  let password = req.body.password
  // check existing
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    _res.error = "User with this email already exists"
  } else {
    // removing confirmPassword field
    // cause not used in new user creation 
    delete req.body['confirmPassword']
    // hash password
    password = bcrypt.hashSync(password, 10)

    console.log('/auth/register body modified for creation')
    console.log({
      ...req.body,
      password,
      roleId: 1
    })
    console.log(JSON.stringify({
      ...req.body,
      password,
      roleId: 1
    }))

    const newUser = await prisma.user.create({
      data: {
        ...req.body,
        password,
        // different ways of connecting foreign keys
        roleId: 1
        // role: { connect: { id: 1 } },
      }
    })
    _res.user = newUser
  }
  res.json(_res)
})


app.listen(3000, () => {
  console.log('listening on 3000')
})
