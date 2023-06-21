const express = require('express');
const jwt = require("jsonwebtoken");

const User = require('../models/user');
const News = require('../models/news');

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

exports.getNews = async (req, res) => {
  try {
    let errors = [], i = 0;
    const user = await jwtVerify(req.token);
    user ? true : errors[i++] = 'User is not defined';
      
    if(errors[0]) {
      res.json({
        errors: errors,
      });
    } else {
      const siteNews = await News.find({ siteId: req.body.siteId }).exec();

      try {
        res.json({
          siteNews,
        });
      } catch (e) {
        res.sendStatus(500);
      }
    }
  } catch (e) {
    res.sendStatus(404);
  }
}