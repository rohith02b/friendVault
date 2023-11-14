const prisma = require('../../dbConnect/connection');

const ModifyGroup = async (req, res) => {
  const { code } = req.body;

  try {
    const codeExists = await prisma.groups.findUnique({
      where: {
        code: code,
      },
    });

    const users = codeExists.members;
    let userExists = false;
    users.forEach((user) => {
      if (req.id === user) {
        userExists = true;
      }
    });

    if (userExists) {
      return res.status(409).json('You are already part of the group');
    }

    if (codeExists) {
      await prisma.groups.update({
        where: {
          code: code,
        },
        data: {
          members: {
            push: req.id,
          },
        },
      });
    }

    res.json('You have been added to the group');
  } catch (error) {
    res.status(404).json('Invalid code');
  }
};

module.exports = { ModifyGroup };
