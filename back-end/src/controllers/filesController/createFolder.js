const prisma = require('../../dbConnect/connection');
const uniqid = require('uniqid');

const createFolder = async (req, res) => {
  const id = uniqid.time();
  const { name } = req.body;
  const { path } = req.query;
  const { groupId } = req.params;
  try {
    await prisma.content.create({
      data: {
        content_id: id,
        group_id: groupId,
        url: name,
        path: path || '/',
        content_name: name,
        content_type: 'folder',
        uploaded: true,
      },
    });
    res.json('Created successfully');
  } catch (error) {
    res.json('Error');
  }
};

module.exports = { createFolder };
