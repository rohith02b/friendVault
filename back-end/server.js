const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const groupRoutes = require('./src/routes/group');
const fileRoutes = require('./src/routes/files');
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

//Groups
app.use('/vault/service/api/groups', groupRoutes);

// files
app.use('/vault/service/api/files', fileRoutes);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
app.listen(PORT, () => {
  console.log('Working');
  try {
    console.log(process.env.DEMO);
  } catch (error) {
    console.log('Env did not work');
  }
});
