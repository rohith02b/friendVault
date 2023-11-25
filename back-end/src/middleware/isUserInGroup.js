const prisma = require('../dbConnect/connection');

const isUserInGroup = async (req, res, next) => {
  try {
    //get group name and search if the req.id is present in members
    const getGroup = await prisma.groups.findUnique({
      where: {
        id: req.params.groupId,
      },
    });

    const members = getGroup.members;

    if (members.includes(req.id)) {
      next();
    } else {
      return res.status(404).json('You do not belong to the group');
    }
  } catch (error) {
    return res.status(404).json('No such group');
  }
};

module.exports = { isUserInGroup };
