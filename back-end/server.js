const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRoutes = require('./src/routes/Auth')
dotenv.config()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  return res.json({
    message: PORT,
  })
})

app.use(
  cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: 'http://localhost:5173',
  })
)

//Auth
app.use('/api/auth', authRoutes)
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})
app.listen(PORT, () => {
  console.log('Working')
})
