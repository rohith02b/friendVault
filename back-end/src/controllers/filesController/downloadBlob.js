const prisma = require('../../dbConnect/connection');
const {
  BlobServiceClient,
  BlobSASPermissions,
} = require('@azure/storage-blob');

const connectionString = process.env.CONNECTION_STRING;
const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const container = process.env.CONTAINER;
const sas = process.env.SAS_TOKEN;
const containerClient = blobServiceClient.getContainerClient(container);

const downloadBlob = async (req, res) => {
  const { content_id, groupId } = req.params;
  const path = req.query.path || '';
  let result = {};

  result = await prisma.content.findUnique({
    where: {
      content_id: content_id,
    },
  });

  let url = result.url.split('/');
  let fileName = url[url.length - 1];
  let decodedFileName = decodeURIComponent(fileName);

  const tempUrl = await generateSasToken(
    `${groupId}/${path}/${decodedFileName}`
  );

  return res.json({
    url: tempUrl,
  });
};

const generateSasToken = async (blobName) => {
  const expiryTime = new Date();
  expiryTime.setHours(expiryTime.getMinutes() + 10);

  const sasOptions = {
    startsOn: new Date(),
    expiresOn: expiryTime,
    permissions: BlobSASPermissions.parse('r'),
  };

  const blobClient = containerClient.getBlobClient(blobName);
  const sasToken = blobClient.generateSasUrl(sasOptions);
  return sasToken;
};

module.exports = { downloadBlob };
