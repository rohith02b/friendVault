const { BlobServiceClient } = require('@azure/storage-blob');
const prisma = require('../../dbConnect/connection');

const connectionString = process.env.CONNECTION_STRING;
const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const container = process.env.CONTAINER;
const containerClient = blobServiceClient.getContainerClient(container);

const deleteFile = async (req, res) => {
  const ids = req.body;
  const { groupId } = req.params;
  const path = req.query.path || '';
  let blobNameArr = [];

  try {
    // Find and collect blob names to delete
    await Promise.all(
      ids.map(async (each) => {
        try {
          let result = await prisma.content.findUnique({
            where: {
              content_id: each,
            },
            select: {
              url: true,
            },
          });
          blobNameArr.push(result.url);
        } catch (error) {
          console.error(`Error fetching content for ID ${each}:`, error);
        }
      })
    );

    // Delete blobs from Azure
    await Promise.all(
      blobNameArr.map(async (each) => {
        try {
          let url = each.split('/');
          let blobName = url[url.length - 1];
          const blobClient = containerClient.getBlobClient(
            `${groupId}/${path}/${blobName}`
          );
          await blobClient.deleteIfExists();
        } catch (error) {
          console.error('Error deleting blob:', error);
        }
      })
    );

    // Delete from the database
    await Promise.all(
      ids.map(async (each) => {
        await prisma.content.delete({
          where: {
            content_id: each,
          },
        });
      })
    );

    return res.status(200).json('Deleted Successfully');
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = { deleteFile };
