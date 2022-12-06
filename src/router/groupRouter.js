const express = require('express');
const router = express.Router();
const groups = require('../services/groupeServices');


/* PUBLIC : GROUPES LIST */
router.get('/groups', async function(req, res) {
  groups.getAllGroups(req, res)
});

/* PUBLIC : GROUPES LIST */
router.get('/groups/users', async function(req, res) {
  groups.getAllUsersInGroups(req, res)
});

/* PRIVATE (ADMIN) : CREATE A GROUP */
router.post('/groups', async function(req, res) {
  groups.createGroup(req, res)
});

/* PRIVATE (ADMIN) : UPDATE A GROUP */
router.put('/groups/:id', async function(req, res) {
  groups.updateGroup(req, res)
});

/* PRIVATE (ADMIN) : DELETE A GROUP */
router.delete('/groups/:id', async function(req, res) {
  groups.deleteGroup(req, res)
});

module.exports = router;