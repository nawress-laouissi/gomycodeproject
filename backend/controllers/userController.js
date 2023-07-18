const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  const { userName, email, password, isAdmin } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json('user already exists');
    }
    const user = new User({ userName, email, password, isAdmin });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    const payload = { id: user._id };
    const token = jwt.sign(payload, `${process.env.secretkey}`);
    res.status(201).json({
      msg: 'user created with success',
      user: {
        userName: user.userName,
        email: user.email,
        _id: user._id,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'bad credentials' }] });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({ errors: [{ msg: 'bad credentials' }] });
    }

    // generate token
    const payload = { id: user._id };
    const token = jwt.sign(payload, `${process.env.secretkey}`, {
      expiresIn: '30d',
    });
    res.status(200).json({
      msg: 'user connected with success',
      user: {
        userName: user.userName,
        email: user.email,
        _id: user._id,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ msg: 'all users', users });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).send('user deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
  s;
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userUpdated = await User.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).send({ msg: 'user has been updated', userUpdated });
  } catch (error) {
    req.status(500).send(error.message);
  }
};
