const prisma = require('../../dbConnect/connection');

const updateFile = async (req, res) => {
  try {
    await prisma.content.update({
      where: {
        content_id: req.body.content_id,
      },
      data: req.body,
    });
  } catch (error) {
    console.log(error);
  }
  return res.json('Updated successfully');
};

module.exports = { updateFile };
