const { body, validationResult } = require('express-validator');
const registrationRules = [
  body('userName', 'userName is required').notEmpty(),
  body('email', 'email is required').isEmail().notEmpty(),
  body(
    'password',
    'password is required and should contain at least 6 characters'
  ).isLength({ min: 6 }),
];
const loginRules = [
  body('email', 'email is required').isEmail(),
  body('password', ' password is required').notEmpty(),
];
const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
module.exports = { registrationRules, validator, loginRules };
