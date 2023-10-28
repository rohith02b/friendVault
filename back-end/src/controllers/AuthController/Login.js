const jwt = require('jsonwebtoken')
const db = require('../../dbConnect/connection')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const q = `SELECT * from "Users" where email='${email}';`

    // Checking if user with entered email exists
    let { rows } = await db.query(q)

    // Decrypting password and comparing
    const validPassword = await bcrypt.compare(password, rows[0].password)
    if (!validPassword) {
      return res.status(400).json('Wrong password')
    }

    // Token generation
    let id = rows[0].id
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })

    // this token should be stored in the client as it is used for authentication and authorization in the later requests
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ username: rows[0].username, email: rows[0].email })
  } catch (err) {
    res.status(404).json('User not found')
  }
}

module.exports = { login }
