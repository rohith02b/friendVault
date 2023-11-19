const router = require('express').Router();
const { CreateGroup } = require('../controllers/groupController/createGroup');
const { GetGroups } = require('../controllers/groupController/getGroups');
const { ModifyGroup } = require('../controllers/groupController/modifyGroup');
const { isUserValid } = require('../middleware/isUserValid');
const dotenv = require('dotenv')
dotenv.config();

// List of groups the requested user is in
router.get('/', isUserValid, GetGroups);

// requested user join a group
router.post('/', isUserValid, CreateGroup);

// remove user from list of users present in group, cannot remove the user if size is 1;
router.put('/', isUserValid, ModifyGroup);

// delete the group , only owner/creator can delete the group -> the files belonging to the group must be deleted.
// router.delete('/', deleteGroup);

module.exports = router;
