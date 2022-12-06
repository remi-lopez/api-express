const bcrypt = require('bcrypt');
const db = require("../models");
const User = db.user;


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
      message:
        err.message || "Some error occurred while retrieving users."
    });
  });
};


/* 
  PRIVATE (USER/ADMIN) : 
  USER INFORMATION 
*/
async function getOneUser(req, res){
  const id = req.params.id;

  User.findByPk(id, {
    attributes: ['email', 'firstname', 'lastname', 'groupe_id']
  })
  .then(data => {
    if (data) {
      res.send(data);
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
}


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
  .then(data => {
    res.send({
      message: `User ${data.firstname} was created successfully.`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  });
}


/* 
  PRIVATE (USER) : 
  JOIN A GROUP 
*/
async function joinGroupForUser(req, res){  
  const id = req.params.id;

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
        message: `Cannot update User with id n°${id}. Maybe User was not found or your input is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating User with id n°" + id
    });
  });
}


/* 
  PRIVATE (USER/ADMIN) : 
  UPDATE AN USER
*/
async function updateUser(req, res){
  const id = req.params.id;

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
}


/* 
  PRIVATE (ADMIN) : 
  DELETE AN USER 
*/
async function deleteUser(req, res){
  const id = req.params.id;

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
}


module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  joinGroupForUser,
  updateUser,
  deleteUser
}