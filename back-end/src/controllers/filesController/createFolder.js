const { BlobServiceClient } = require('@azure/storage-blob');

const connectionString = process.env.CONNECTION_STRING;
const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const container = process.env.CONTAINER;
const containerClient = blobServiceClient.getContainerClient(container);

const createFolder = async (req, res) => {
  const groupId = req.params.groupId;
};

module.exports = { createFolder };
