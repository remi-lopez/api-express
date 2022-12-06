const express = require('express');
const router = express.Router();
const userService = require('../services/userServices');


/* PUBLIC : USERS LIST */
router.get('/users', async function(req, res) {
  userService.getAllUsers(req, res);
});

/* PRIVATE (USER/ADMIN) : USER INFORMATION */
router.get('/users/:id', async function(req, res) {
  userService.getOneUser(req, res);
});

/* PUBLIC : REGISTER */
router.post('/register', async function(req, res) {
  userService.createUser(req, res);
});

/* PRIVATE (USER) : JOIN A GROUP */
router.put('/users/:id/groupe', function(req, res) {
  userService.joinGroupForUser(req, res);
});

/* PRIVATE (USER/ADMIN) : UPDATE AN USER */
router.put('/users/:id', async function(req, res) {
  userService.updateUser(req, res);
});

/* PRIVATE (ADMIN) : DELETE AN USER */
router.delete('/users/:id', async function(req, res) {
  userService.deleteUser(req, res);
});


module.exports = router;