const express = require('express');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require("jsonwebtoken");

const User = require('../models/user');

require('dotenv').config();

const key = process.env.key;

const generateAuthToken = async (user) => {
  const token = jwt.sign({_id: user._id.toString()}, key);
  user.token = token;
  await user.save();
  
  return token;
}

const jwtVerify = async (token) => {
  const decoded = jwt.verify(token, key);
  const user = await User.findOne({_id: decoded._id, 'token': token});

  if(user) {
    return user;
  } else {
    return false;
  }
}

const deleteToken = async (user) => {
  user.token = ' ';

  return user;
}

exports.signUp = async (req, res) => {
  try {
    let errors = [], i = 0, object = await User.findOne({ 'email': req.body.email });

    validator.isEmail(req.body.email) ? true : errors[i++] = 'Invalid email';
    !object ? true : errors[i++] = 'A user with this email already exists';
    req.body.username.length >= 4 ? true : errors[i++] = 'Username must be 4 characters or more';
    req.body.password.length >= 6 ? true : errors[i++] = 'Password must be 6 characters or more';
    
    if(errors[0]) {
      res.json({
        errors: errors,
      });
    } else {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 8),
      });

      const token = await generateAuthToken(user);

      try {
        res.json({
          token
        });
      } catch (e) {
        res.sendStatus(500);
      }
    }
  } catch (e) {
    res.sendStatus(404);
  }
}

exports.login = async (req, res) => {
  try {
    let errors = [], i = 0, object = await User.findOne({ 'email': req.body.email });

    try {
      const isMatch = await bcrypt.compare(req.body.password, object.password);
      isMatch ? true : errors[i++] = 'Invalid password';
    } catch (e) {
      errors[i++] = 'Invalid email';
    }
    
    if(errors[0]) {
      res.json({
        errors: errors,
      });
    } else {
      const token = await generateAuthToken(object);

      try {
        res.json({
          object
        });
      } catch (e) {
        res.sendStatus(500);
      }
    }
  } catch (e) {
    res.sendStatus(404);
  }
}

exports.getUser = async (req, res) => {
  const authData = await jwtVerify(req.token);
  if(authData) {
    res.json({
      authData,
    });
  } else {
    res.json({
      message: 'Please authenticate',
    });
  }
}

exports.logout = async (req, res) => {
  try {
    const user = await jwtVerify(req.token);
    await deleteToken(user);
    await user.save();

    res.json({
      message: 'true',
    });
  } catch (e) {
    res.sendStatus(500);
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ 'email': req.body.email });
    res.json({
      message: 'User deleted successfully',
    })
  } catch (e) {
    res.sendStatus(404);
  }
}