const express = require('express');
const validator = require('validator');

const Site = require('../models/site');

exports.addSite = async (req, res) => {
  try {
    let errors = [], i = 0;

    req.body.name.length >= 3 ? true : errors[i++] = 'Invalid site name';
    validator.isURL(req.body.url) ? true : errors[i++] = 'Invalid url';
    
    if(errors[0]) {
      res.json({
        errors: errors,
      });
    } else {
      const site = new Site({
        name: req.body.name,
        url: req.body.url,
      });

      await site.save();
      try {
        res.json({
          message: site.name + ' is added',
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
    const sites = await Site.find({});
    res.json({
      sites,
    })
  } catch (e) {
    res.sendStatus(404);
  }
}

exports.deleteSite = async (req, res) => {
  try {
    await Site.deleteOne({ 'url': req.body.url });
    res.json({
      message: 'Site deleted successfully',
    })
  } catch (e) {
    res.sendStatus(404);
  }
}