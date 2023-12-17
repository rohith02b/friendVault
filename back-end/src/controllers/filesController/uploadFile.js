const { BlobServiceClient, BlockBlobClient } = require('@azure/storage-blob');
const fs = require('fs');
const util = require('util');
const { exec } = require('child_process');
const uniqueId = require('uniqid');
const prisma = require('../../dbConnect/connection');

const connectionString = process.env.CONNECTION_STRING;
const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const container = process.env.CONTAINER;
const sas = process.env.SAS_TOKEN;
const containerClient = blobServiceClient.getContainerClient(container);

const options = { cwd: `${__dirname}` };
const execPromise = util.promisify(exec);

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
      const filePath = file.path;
      const fileSize = fs.statSync(filePath).size;

      let path = req.query.path
        ? `${group}${req.query.path}/${fileName}`
        : `${group}/${fileName}`;

      await prisma.content.create({
        data: {
          content_id: id,
          group_id: group,
          url: '',
          path: req.query.path || '/',
          content_name: file.originalname,
          content_type: 'file',
          content_mimetype: file.mimetype,
          uploaded: false,
        },
      });

      if (fileSize > 100 * 1024 * 1024) {
        const azCopyCommand = `./azcopy copy "../../../${filePath}" "${containerClient.url}/${path}?${sas}" --content-type="${file.mimetype}"`;

        try {
          await execPromise(azCopyCommand, options).then(async () => {
            const blockBlobClient = containerClient.getBlockBlobClient(path);
            await prisma.content.update({
              where: { content_id: id },
              data: { url: blockBlobClient.url, uploaded: true },
            });
          });
        } catch (error) {
          console.error('AzCopy failed:', error);
        }
      } else {
        const blockBlobClient = containerClient.getBlockBlobClient(path);
        await blockBlobClient.uploadFile(filePath, {
          blobHTTPHeaders: {
            blobContentType: file.mimetype,
          },
        });
        await prisma.content.update({
          where: { content_id: id },
          data: { url: blockBlobClient.url, uploaded: true },
        });
      }

      fs.unlinkSync(filePath);
    });

    setTimeout(() => {
      return res.json('Uploaded successfully');
    }, 2000);
  } catch (error) {
    console.error('File upload error:', error);
    return res.json('File error');
  }
};

module.exports = { uploadFile };
