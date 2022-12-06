const db = require("../models");
const Group = db.group;


/* 
  PUBLIC : 
  GROUPES LIST 
*/
async function getAllGroups(req, res){
  return Group.findAll({
    attributes: ['name']
  })
  .then(groups => {
    res.json(groups);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving groups."
    });
  });
}


/* 
  PUBLIC : 
  GROUPES LIST WITH USERS
*/
async function getAllUsersInGroups(req, res){
  await Group.findAll({
    attributes: ['name'],
    include: [
      { 
        model: db.user, 
        attributes: ['firstname', 'lastname']
      }
    ]
  })
  .then(groups => {
    res.json(groups);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving groups."
    });
  });
}


/* 
  PRIVATE (ADMIN) : 
  CREATE A GROUP 
*/
async function createGroup(req, res){
  const groupe = {
    name: req.body.name,
  };

  Group.create(groupe)
  .then(data => {
    res.send({
      message: `Groupe ${data.name} was created successfully.`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Group."
    });
  });
}


/* 
  PRIVATE (ADMIN) : 
  UPDATE A GROUP
*/
async function updateGroup(req, res){
  const id = req.params.id;

  Group.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Group was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Group with id n°${id}. Maybe User was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Group with id n°" + id
    });
  });
}


/* 
  PRIVATE (ADMIN) : 
  DELETE A GROUP
*/
async function deleteGroup(req, res){
  const id = req.params.id;

  const user = {
    groupe_id: null,
  };

  await db.user.update(user, {
    where: { groupe_id: id }
  });

  Group.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Group was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Group with id n°${id}. Maybe User was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Group with id n°" + id
    });
  });
}


module.exports = {
  getAllGroups,
  getAllUsersInGroups,
  createGroup,
  updateGroup,
  deleteGroup
}