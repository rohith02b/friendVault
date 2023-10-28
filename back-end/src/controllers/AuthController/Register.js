const db = require('../../dbConnect/connection')
const bcrypt = require('bcrypt')
const uniqueId = require('uniqid')

const register = async (req, res) => {
  const { rows } = await db.query(
    `SELECT * FROM "Users" where email='${req.body.email}';`
  )
  if (rows[0])
    return res.status(409).send('A user with this email already exists')

  //No such user exists, hence create user
  try {
    const salt = await bcrypt.genSalt(10)

    //password must be greater than 8 characters
    if (req.body.password.length < 8) {
      return res
        .status(401)
        .send('Password length should be atleast 8 characters long')
    }

    //Encrypting the password and creating a unique ID based on time
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const id = uniqueId.time()
    const q = `INSERT INTO "Users"(id,email,username,password) values('${id}', '${req.body.email}', '${req.body.username}', '${hashedPassword}');`

    await db.query(q, (err, data) => {
      if (err) return res.status(502).json(err)
      return res.status(200).json('User has been created.')
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = { register }
