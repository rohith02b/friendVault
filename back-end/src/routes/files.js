const router = require('express').Router();
const { uploadFile } = require('../controllers/filesController/uploadFile');
const { createFolder } = require('../controllers/filesController/createFolder');
const { downloadBlob } = require('../controllers/filesController/downloadBlob');
const { isUserValid } = require('../middleware/isUserValid');
const { isUserInGroup } = require('../middleware/isUserInGroup');
const { updateFile } = require('../controllers/filesController/updateFile');
const {
  getFolderContent,
} = require('../controllers/filesController/getFolderContent');
const dotenv = require('dotenv');
dotenv.config();

router.get('/:groupId', isUserValid, isUserInGroup, getFolderContent);

router.get(
  '/:groupId/:content_id/download',
  isUserValid,
  isUserInGroup,
  downloadBlob
);
// upload files
router.post('/:groupId', isUserValid, isUserInGroup, uploadFile);

// create a folder
router.post('/create/:groupId', isUserValid, isUserInGroup, createFolder);

router.put('/:groupId', isUserValid, isUserInGroup, updateFile);

module.exports = router;
