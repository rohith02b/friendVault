const prisma = require('../../dbConnect/connection');

const getFolderContent = async (req, res) => {
  const { groupId } = req.params;
  const { path } = req.query;

  try {
    const content = await prisma.content.findMany({
      where: {
        group_id: groupId,
        path: path || '/',
      },
      select: {
        content_id: true,
        content_name: true,
        content_type: true,
        group_id: true,
        content_mimetype: true,
        uploaded: true,
        path: true,
      },
    });

    res.json(content);
  } catch (error) {
    res.json('Error');
  }
};

module.exports = { getFolderContent };
