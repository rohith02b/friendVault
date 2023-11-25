const bcrypt = require('bcryptjs');
const uniqueId = require('uniqid');
const prisma = require('../../dbConnect/connection');

const register = async (req, res) => {
  const user = await prisma.users.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (user)
    return res.status(409).send('A user with this email already exists');

  //No such user exists, hence create user
  try {
    const salt = await bcrypt.genSalt(10);

    //password must be greater than 8 characters
    if (req.body.password.length < 8) {
      return res
        .status(401)
        .send('Password length should be atleast 8 characters long');
    }

    //Encrypting the password and creating a unique ID based on time
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const id = uniqueId.time();
    const createdUser = await prisma.users.create({
      data: {
        id: id,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      },
    });
    res.json('User created successfully');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { register };
