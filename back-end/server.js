const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const groupRoutes = require('./src/routes/group');
const fileRoutes = require('./src/routes/files');
const { isUserValid } = require('./src/middleware/isUserValid');
const { isUserInGroup } = require('./src/middleware/isUserInGroup');
const path = require('path');
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

const downloadsDirectory = path.join(__dirname, 'downloads');
app.use('/downloads', isUserValid, express.static(downloadsDirectory));

app.get('/vault/service', (req, res) => {
  return res.json('Server is running');
});

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
});
