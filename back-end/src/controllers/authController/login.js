const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = require('../../dbConnect/connection');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      const validPassword = await bcrypt.compare(password, userExists.password);
      if (!validPassword) {
        return res.status(400).json('Wrong password');
      }

      // Token generation
      let id = userExists.id;
      const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      // this token should be stored in the client as it is used for authentication and authorization in the later requests
      res
        .cookie('access_token', token,{
          someSite : 'None'
        })
        .status(200)
        .json({ username: userExists.username, email: userExists.email });
    }
  } catch (err) {
    res.status(404).json('User not found');
  }
};

module.exports = { login };
