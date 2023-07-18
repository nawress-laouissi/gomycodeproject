const express = require('express');
const { isAuth } = require('../middleWare/isAuth');
const {
  registrationRules,
  validator,
  loginRules,
} = require('../middleWare/validator');
const {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  signin,
} = require('../controllers/userController');

const router = express.Router();
router.post('/signup', registrationRules, validator, createUser);
router.post('/signin', loginRules, validator, signin);
router.get('/getUsers', getUsers);
router.delete('/deleteUser/:id', deleteUser);
router.put('/userUpdate/:id', updateUser);
module.exports = router;
