'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Plate = require('../models/plate');
const mongoose = require('mongoose');

const router = express.Router();
const jsonParser = bodyParser.json();

/* ========== GET ALL PLATES ========== */
router.get('/', (req, res, next) => {
  const { search, state } = req.query;
  let filter = {};

  if (search && state) {
    const re = new RegExp(search, 'i');
    filter = {
      plateNumber: re, 
      plateState: state
    };
  }

  Plate.find(filter)
    .exec()
    .then(docs => {
      console.log(docs);
      return res.status(200).json(docs);
    })
    .catch(err => {
      console.log('error on get all plates: ', err);
      next(err);
    });
});

/* ===== GET ALL PLATES USING userId from client ===== */
router.get('/all/:id', (req, res, next) => {
  let { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    const err = {
      message: 'Missing `userId` to fetch plates',
      reason: 'MissingContent',
      status: 400,
      location: 'get'
    };
    return next(err);
  }

  Plate.find({ userId: id })
    .exec()
    .then(data => res.status(200).json(data))
    .catch(err => next(err));
});

/* ========== GET ONE PLATE BY PLATE ID ========== */
router.get('/:id', (req, res, next) => {
  let { id }  = req.params;

  if(!mongoose.Types.ObjectId.isValid(id) || id === '' ) {
    const err = {
      message: 'Missing plate `id`',
      reason: 'MissingContent',
      status: 400,
      location: 'get'
    };
    return next(err);
  }

  Plate.findById(id)
    .then(data => res.json(data))
    .catch(err => next(err));
});

/* ========== FETCH KARMA SCORE ========== */
router.get('/:plateState/:plateNumber', (req, res, next) => {
  let plateState = req.params.plateState;
  let plateNumber = req.params.plateNumber;

  let filter = {};
 
  filter = {
    plateState,
    plateNumber
  };

  Plate.find(filter)
    .then(data => res.json(data))
    .catch(err => next(err));
});

/* ========== POST A PLATE ========== */
router.post('/', jsonParser, (req, res, next) => {
  let {plateNumber, userId, plateState } = req.body;

  if(!plateNumber || plateNumber === '' ) {
    const err = {
      message: 'Missing `plateNumber` or `plateState` in request body',
      reason: 'MissingContent',
      status: 400,
      location: 'POST'
    };
    return next(err);
  }

  Plate.create({plateNumber, plateState, userId})
    .then(data => {
      return res.location(`${req.originalUrl}/${data.id}`).status(201).json(data);
    })
    .catch(err => {
      console.log('error on post: ', err);
      next(err);
    });
});

/* ========== CLAIM A PLATE PUT/UPDATE using userId  ========== */
router.put('/:userId', (req, res, next) => {
  const { userId } = req.params;
  const plateNumber = req.body.plateNumber;
  const plateState = req.body.plateState;
 
  if(!plateNumber){
    const err = {
      message: 'Missing `plateNumber` or `userId`',
      reason: 'MissingContent',
      status: 400,
      location: 'post'
    };
    return next(err);
  }

  Plate.findOneAndUpdate({ 'plateNumber': plateNumber, 'plateState': plateState } , { userId: userId })
    .then( plate => {
      return plate;
    })
    .then((data) => {
      res.json(data);
    })
    .catch(err => next(err));
});

/* ========== UNCLAIM A PLATE PUT/UPDATE using userId  ========== */
router.put('/unclaim/:userId', (req, res, next) => {
  const { userId } = req.params;
  const plateNumber = req.body.plateNumber;
  const plateState = req.body.plateState;
 
  if(!plateNumber){
    const err = {
      message: 'Missing `plateNumber` or `userId`',
      reason: 'MissingContent',
      status: 400,
      location: 'PUT'
    };
    return next(err);
  }

  Plate.findOneAndUpdate({ 'plateNumber': plateNumber, 'plateState': plateState } , { $unset: { userId: userId }})
    .then( plate => {
      return plate;
    })
    .then((data) => {
      res.json(data);
    })
    .catch(err => next(err));
});

module.exports = router;