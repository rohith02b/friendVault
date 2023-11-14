const router = require('express').Router();
const multer = require('multer');
const { uploadFile } = require('../controllers/filesController/uploadFile');
const { createFolder } = require('../controllers/filesController/createFolder');
const { isUserValid } = require('../middleware/isUserValid');
const { isUserInGroup } = require('../middleware/isUserInGroup');

const upload = multer({ dest: 'uploads/' });

// upload files
router.post(
  '/:groupId',
  upload.array('files'),
  isUserValid,
  isUserInGroup,
  uploadFile
);

// create a folder
router.post('/create/:groupId', isUserValid, isUserInGroup, createFolder);

module.exports = router;
