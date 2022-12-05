const express = require('express');
const router = express.Router();
const groups = require('../services/groupeServices');


/* 
  PUBLIC : GROUPES LIST 
*/
router.get('/groups', async function(req, res, next) {
  try {
    res.json(await groups.getAllGroups(req.query));
    res.status(200);
  } catch (err) {
    console.error(`Error while getting groups list`, err.message);
    next(err);
  }
});

/* 
  PUBLIC : GROUPES LIST 
*/
router.get('/groups/users', async function(req, res, next) {
  try {
    res.json(await groups.getAllUsersInGroups(req.query));
    res.status(200);
  } catch (err) {
    console.error(`Error while getting groups list`, err.message);
    next(err);
  }
});

/* 
  PRIVATE (ADMIN) : CREATE A GROUP 
*/
router.post('/groups', async function(req, res, next) {
  try {
    res.json(await groups.createGroup(req.body));
    res.status(201);
  } catch (err) {
    console.error(`Error while creating new group`, err.message);
    next(err);
  }
});

/* 
  PRIVATE (ADMIN) : UPDATE A GROUP
*/
router.put('/groups/:id', async function(req, res, next) {
  try {
    res.json(await groups.updateGroup(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating a groups`, err.message);
    next(err);
  }
});

/* 
  PRIVATE (ADMIN) : DELETE A GROUP
*/
router.delete('/groups/:id', async function(req, res, next) {
  try {
    res.json(await groups.deleteGroup(req.params.id));
  } catch (err) {
    console.error(`Error while deleting a groups`, err.message);
    next(err);
  }
});

module.exports = router;