const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/Auth');
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: process.env.PUBLIC_URL,
  })
);

//Auth
app.use('/vault/service/api/auth', authRoutes);

app.get('/vault/service/api/', (req, res) => {
  return res.json({
    message: PORT,
  });
});

app.listen(3000, () => {
  console.log('Working');
});
