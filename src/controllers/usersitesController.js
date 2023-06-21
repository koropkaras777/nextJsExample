const express = require('express');
const jwt = require("jsonwebtoken");

const User = require('../models/user');
const Site = require('../models/site');
const UserSites = require('../models/usersites');

require('dotenv').config();

const key = process.env.key;

const jwtVerify = async (token) => {
  const decoded = jwt.verify(token, key);
  const user = await User.findOne({_id: decoded._id, 'token': token});

  if(user) {
    return user;
  } else {
    return false;
  }
}

exports.addSite = async (req, res) => {
  try {
    let errors = [], i = 0;
    const user = await jwtVerify(req.token);
    const site = await Site.findOne({name: req.body.name});

    user ? true : errors[i++] = 'User is not defined';
    site ? true : errors[i++] = 'Site is not defined';
    
    if(errors[0]) {
      res.json({
        errors: errors,
      });
    } else {
      const userSites = new UserSites({
        userId: user._id,
        siteId: site._id,
      });

      userSites.save();

      try {
        res.json({
          message: site.name + ' is added to ' + user.username,
        });
      } catch (e) {
        res.sendStatus(500);
      }
    }
  } catch (e) {
    res.sendStatus(404);
  }
}

exports.getSites = async (req, res) => {
  try {
    let errors = [], i = 0;
    const user = await jwtVerify(req.token);

    user ? true : errors[i++] = 'User is not defined';
      
    if(errors[0]) {
      res.json({
        errors: errors,
      });
    } else {
      const userSites = await UserSites.find({ userId: user._id }).exec();

      try {
        res.json({
          userSites,
        });
      } catch (e) {
        res.sendStatus(500);
      }
    }
  } catch (e) {
    res.sendStatus(404);
  }
}

exports.deleteSite = async (req, res) => {
  try {
    const user = await jwtVerify(req.token);

    if(user) {
      await UserSites.deleteOne({ 'siteId': req.body.siteId });
      res.json({
        message: 'Site deleted successfully',
      })
    } else {
      res.json({
        error: 'User is not defined',
      });
    }
  } catch (e) {
    res.sendStatus(404);
  }
}