const db = require('../services/db');
const helper = require('../services/helper');
const config = require('../config');

async function getAllUsers(){
  const rows = await db.query(
    `SELECT firstname, lastname FROM user`
  );
  const data = helper.emptyOrRows(rows);

  return { data }
}

async function getOneUser(id){
  const rows = await db.query(
    `SELECT id, firstname, lastname, email FROM user WHERE user.id=${id}`
  );
  const data = helper.emptyOrRows(rows);

  return { data }
}

async function createUser(value){
  const result = await db.query(
    `INSERT INTO user (email, roles, password, firstname, lastname) VALUES ("${value.email}", "[]", "${value.password}", "${value.firstname}", "${value.lastname}")`
  );

  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = `User ${value.firstname} created successfully`;
  }

  return {message};
}

async function updateUser(id, value){
  const result = await db.query(
    `UPDATE user SET email="${value.email}", password="${value.password}", firstname="${value.firstname}", lastname="${value.lastname}" 
    WHERE id=${id}` 
  );

  let message = 'Error in updating user';

  if (result.affectedRows) {
    message = `User ${value.firstname} updated successfully`;
  }

  return { message };
}

async function deleteUser(id){
  const result = await db.query(
    `DELETE FROM user WHERE id=${id}` 
  );

  let message = 'Error in deleting user';

  if (result.affectedRows) {
    message = `User deleted successfully`;
  }

  return { message };
}

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
}