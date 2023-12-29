const {
  BlobServiceClient,
  BlobSASPermissions,
} = require('@azure/storage-blob');
const prisma = require('../../dbConnect/connection');

const connectionString = process.env.CONNECTION_STRING;
const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const container = process.env.CONTAINER;
const containerClient = blobServiceClient.getContainerClient(container);

const uploadFile = async (req, res) => {
  const files = req.body;

  try {
    await Promise.all(
      files.map(async (file) => {
        await prisma.content.create({
          data: file,
        });
      })
    );

    const sas = await generateSasToken();
    return res.json({ url: sas });
  } catch (error) {
    console.error('Error saving files:', error);
    return res.status(500).json({ error: 'Failed to save files' });
  }
};

const generateSasToken = async (blobName) => {
  const expiryTime = new Date();
  expiryTime.setHours(expiryTime.getMinutes() + 10);

  const sasOptions = {
    startsOn: new Date(),
    expiresOn: expiryTime,
    permissions: BlobSASPermissions.parse('w'),
  };

  const sasToken = containerClient.generateSasUrl(sasOptions);
  return sasToken;
};

module.exports = { uploadFile };
