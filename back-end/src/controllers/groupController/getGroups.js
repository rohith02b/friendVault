const prisma = require('../../dbConnect/connection');

const GetGroups = async (req, res) => {
  try {
    let groups = await prisma.groups.findMany();

    let userGroups = [];

    groups.forEach((element) => {
      const members = element.members;
      if (members.includes(req.id)) userGroups.push(element);
    });

    res.json(userGroups);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { GetGroups };
