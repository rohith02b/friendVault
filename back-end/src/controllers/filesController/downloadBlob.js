const prisma = require('../../dbConnect/connection');
const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');

const connectionString = process.env.CONNECTION_STRING;
const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const container = process.env.CONTAINER;
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

  const blobClient = containerClient.getBlobClient(
    `${groupId}/${path}/${decodedFileName}`
  );

  try {
    const downloadResponse = await blobClient.download();
    const downloadedData = await streamToBuffer(
      downloadResponse.readableStreamBody
    );

    // Specify the path where you want to save the downloaded blob
    const filePath = `downloads/${result.content_name}`; // Replace with your desired file path

    // Save the downloaded blob to the specified path
    fs.writeFileSync(filePath, downloadedData);
  } catch (error) {
    console.error('Error:', error);
  }

  setTimeout(() => {
    fs.unlinkSync(`downloads/${result.content_name}`);
  }, 10000);
  return res.json(`downloads/${result.content_name}`);
};

async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on('error', reject);
  });
}

module.exports = { downloadBlob };
