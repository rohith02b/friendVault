const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');
const uniqueId = require('uniqid');
const prisma = require('../../dbConnect/connection');

const connectionString = process.env.CONNECTION_STRING;
const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const container = process.env.CONTAINER;
const containerClient = blobServiceClient.getContainerClient(container);


const uploadFile = async (req, res) => {
  try {
    const files = req.files;
    const group = req.params.groupId;
    files.map(async (file) => {
      const id = uniqueId.time();
      const fileProps = file.originalname.split('.');
      const fileName = `${fileProps[0]}-${id}.${
        fileProps[fileProps.length - 1]
      }`;

      let path = '';
      if (req.query.path) {
        path = `${group}${req.query.path}/${fileName}`;
      } else {
        path = `${group}/${fileName}`;
      }

      console.log;
      const blockBlobClient = containerClient.getBlockBlobClient(path);

      await blockBlobClient.uploadFile(file.path);
      await prisma.content.create({
        data: {
          content_id : id,
          group_id: group,
          url: blockBlobClient.url,
          path: req.query.path || '/',
          content_name: file.originalname,
          content_type: 'file',
        },
      });
      fs.unlinkSync(file.path);
    });
    return res.json('Uploaded successfully');
  } catch (error) {
    return res.json('File error');
  }
};

module.exports = { uploadFile };
