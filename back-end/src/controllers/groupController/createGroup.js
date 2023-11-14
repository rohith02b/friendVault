const prisma = require('../../dbConnect/connection');
const uniqueId = require('uniqid');

const CreateGroup = async (req, res) => {
  const id = uniqueId.time();

  try {
    const codeExists = await prisma.groups.findUnique({
      where: {
        code: req.body.code,
      },
    });

    if (codeExists) {
      return res.status(409).json('Code already exists');
    }

    const createdGroup = await prisma.groups.create({
      data: {
        id,
        owner: req.id,
        code: req.body.code,
        name: req.body.name,
        members: [req.id],
      },
    });

    res.status(200).json(createdGroup);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { CreateGroup };
