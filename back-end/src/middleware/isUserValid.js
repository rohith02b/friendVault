const jwt = require('jsonwebtoken');
const prisma = require('../dbConnect/connection');

const isUserValid = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

    const validUser = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!validUser) {
      return res.json('Invalid token / user');
    }

    req.id = id;
    next();
  } catch (error) {
    res.json('Invalid token');
  }
};

module.exports = { isUserValid };
