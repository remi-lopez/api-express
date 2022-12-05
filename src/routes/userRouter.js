const express = require('express');
const router = express.Router();
const users = require('../services/userServices');
const bcrypt = require('bcrypt');


/* 
  PUBLIC : USERS LIST 
*/
router.get('/users', async function(req, res, next) {
  try {
    res.json(await users.getAllUsers(req.query));
    res.status(200);
  } catch (err) {
    console.error(`Error while getting users list`, err.message);
    next(err);
  }
});

/* 
  PRIVATE (USER/ADMIN) : USER INFORMATION 
*/
router.get('/users/:id', async function(req, res, next) {
  try {
    res.json(await users.getOneUser(req.params.id));
    res.status(200);
  } catch (err) {
    console.error(`Error while getting this user`, err.message);
    next(err);
  }
});

/* 
  PUBLIC : REGISTER 
*/
router.post('/register', async function(req, res, next) {
  try {
    res.json(await users.createUser(req.body));
    res.status(201);
  } catch (err) {
    console.error(`Error while creating new user`, err.message);
    next(err);
  }
});

/* 
  PRIVATE (USER) : JOIN A GROUP 
*/
router.put('/users/:id/groupe', async function(req, res, next) {
  try {
    res.json(await users.joinGroupForUser(req.params.id, req.body));
    res.status(201);
  } catch (err) {
    console.error(`Error while creating new user`, err.message);
    next(err);
  }
});

/* 
  PRIVATE (USER/ADMIN) : UPDATE AN USER
*/
router.put('/users/:id', async function(req, res, next) {
  try {
    res.json(await users.updateUser(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating an user`, err.message);
    next(err);
  }
});

/* 
  PRIVATE (ADMIN) : DELETE AN USER 
*/
router.delete('/users/:id', async function(req, res, next) {
  try {
    res.json(await users.deleteUser(req.params.id));
  } catch (err) {
    console.error(`Error while deleting an user`, err.message);
    next(err);
  }
});


module.exports = router;