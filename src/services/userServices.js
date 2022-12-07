const bcrypt = require('bcrypt');
const { generateToken } = require('../jwtToken/authJwtToken');
const { rolesMiddleware } = require("../middlewares/rolesMiddleware");
const db = require("../models");
const User = db.user;

require('dotenv').config()


/* 
  PUBLIC : 
  USERS LIST 
*/
async function getAllUsers(req, res) {
  return User.findAll({
    attributes: ['firstname', 'lastname']
  })
  .then(users => {
    res.json(users);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users."
    });
  });
};

/* 
  PUBLIC : 
  REGISTER 
*/
async function createUser(req, res){
  const hash_pwd = await bcrypt.hash(req.body.password, 12).then(hash => {
    return hash;
  });

  const user = {
    email: req.body.email,
    password: hash_pwd,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  User.create(user)
  .then(user => {
    res.send({
      message: `User ${user.firstname} was created successfully.`
    });
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User."
    });
  });
}

/* 
  PUBLIC : 
  LOGIN 
*/
async function getJwt(req, res){
  const thisUser = await User.findOne({ where: { 
    email: req.body.email
  }})

  try {
    if(thisUser) {
      await bcrypt.compare(req.body.password, thisUser.password)
      .then(result => {
        if(result == true) {
          const token = generateToken(thisUser);
          res.json({ access_token: token })
        } else {
          res.status(404).send({
            message: 'Error. Wrong login or password'
          });
        }
      });
    }
  }
  catch(err) {
    res.status(500).send({
      message: 'Error. Please retry in few minutes'
    });
  }
}


/* 
  PRIVATE (USER/ADMIN) : 
  USER INFORMATION 
*/
async function getOneUser(req, res){
  const id = req.params.id;

  const userToken = req.body.tokenData;
  const userRole = await rolesMiddleware(userToken);

  if((userRole === 'USER' && userToken.id == id) || (userRole === 'ADMIN')) {
    User.findByPk(id, {
      attributes: ['email', 'firstname', 'lastname', 'groupe_id']
    })
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({
          message: `Cannot find User with id n°${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id n°" + id
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to see user informations"
    });
  }
}

/* 
  PRIVATE (USER) : 
  JOIN A GROUP 
*/
async function joinGroupForUser(req, res){  
  const id = req.params.id;

  const userToken = req.body.tokenData;
  const userRole = await rolesMiddleware(userToken);

  if((userRole === 'USER' && userToken.id == id) || (userRole === 'ADMIN')) {
    User.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User group was added successfully."
        });
      } else {
        res.send({
          message: `Cannot update User group with id n°${id}. Maybe User was not found or your input is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User group with id n°" + id
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to make this action"
    });
  }
}


/* 
  PRIVATE (USER/ADMIN) : 
  UPDATE AN USER
*/
async function updateUser(req, res){
  const id = req.params.id;

  const userToken = req.body.tokenData;
  const userRole = await rolesMiddleware(userToken);

  if((userRole === 'USER' && userToken.id == id) || (userRole === 'ADMIN')) {
    User.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id n°${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id n°" + id
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to update user informations"
    });
  }
}


/* 
  PRIVATE (ADMIN) : 
  DELETE AN USER 
*/
async function deleteUser(req, res){
  const id = req.params.id;

  const userRole = await rolesMiddleware(req.body.tokenData);

  if(userRole === 'ADMIN') {
    User.destroy({
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id n°${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id n°" + id
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to delete user informations"
    });
  }
}


module.exports = {
  getAllUsers,
  createUser,
  getJwt,
  getOneUser,
  joinGroupForUser,
  updateUser,
  deleteUser
}