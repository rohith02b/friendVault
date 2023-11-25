const jwt = require('jsonwebtoken');
const prisma = require('../dbConnect/connection');

const isUserValid = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json('No token provided');
    }

    const token = authHeader.split(' ')[1];
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
