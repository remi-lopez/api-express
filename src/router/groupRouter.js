const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();
const groups = require('../services/groupServices');


/* PUBLIC : GROUPES LIST */
router.get('/groups', async (req, res) => {
  groups.getAllGroups(req, res)
});

/* PUBLIC : GROUPES LIST */
router.get('/groups/users', async (req, res) => {
  groups.getAllUsersInGroups(req, res)
});


/* PRIVATE (ADMIN) : CREATE A GROUP */
router.post('/groups', authMiddleware, async (req, res) => {
  groups.createGroup(req, res)
});

/* PRIVATE (ADMIN) : UPDATE A GROUP */
router.put('/groups/:id', authMiddleware, async (req, res) => {
  groups.updateGroup(req, res)
});

/* PRIVATE (ADMIN) : UPDATE USERS IN A GROUP */
router.put('/groups/:id/users', authMiddleware, async (req, res) => {
  groups.updateUsersInGroups(req, res)
});

/* PRIVATE (ADMIN) : DELETE A GROUP */
router.delete('/groups/:id', authMiddleware, async (req, res) => {
  groups.deleteGroup(req, res)
});

module.exports = router;