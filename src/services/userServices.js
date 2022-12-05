const db = require('../services/db');
const helper = require('../services/helper');
const bcrypt = require('bcrypt');

/* 
  PUBLIC : USERS LIST 
*/
async function getAllUsers(){
  const rows = await db.query(
    `SELECT firstname, lastname FROM user`
  );
  const users = helper.emptyOrRows(rows);

  return { users }
}

/* 
  PRIVATE (USER/ADMIN) : USER INFORMATION 
*/
async function getOneUser(id){
  const rows = await db.query(
    `SELECT id, firstname, lastname, email FROM user WHERE user.id=${id}`
  );
  const user = helper.emptyOrRows(rows);

  return { user }
}

/* 
  PUBLIC : REGISTER 
*/
async function createUser(value){
  const hash_pwd = await bcrypt.hash(value.password, 12).then(hash => {
    return hash;
  });
  
  const result = await db.query(
    `INSERT INTO user (email, roles, password, firstname, lastname) VALUES ("${value.email}", "[]", "${hash_pwd}", "${value.firstname}", "${value.lastname}")`
  );

  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = `User ${value.firstname} created successfully`;
  }

  return {message};
}

/* 
  PRIVATE (USER) : JOIN A GROUP 
*/
async function joinGroupForUser(id, value){  
  let message = 'The user or the group doesn\'t exist..';

  const userExist = await db.query(
    `SELECT id, firstname, lastname FROM user WHERE id=${id}`
  );
  const groupExist = await db.query(
    `SELECT id, name FROM groupe WHERE id=${value.groupe_id}`
  );

  if(userExist && groupExist) {
    const result = await db.query(
      `UPDATE user SET groupe_id="${value.groupe_id}" WHERE id=${id}`
    );
  
    if (result.affectedRows) {
      message = `User successfully joined a group`;
    }
  } 

  return {message};
}

/* 
  PRIVATE (USER/ADMIN) : UPDATE AN USER
*/
async function updateUser(id, value){
  let message = 'This user doesn\'t exists..';

  const userExist = await db.query(
    `SELECT id, firstname, lastname FROM user WHERE id=${id}`
  );

  if(userExist && value.password) {
    const hash_pwd = await bcrypt.hash(value.password, 12).then(hash => {
      return hash;
    });

    const result = await db.query(
      `UPDATE user SET email="${value.email}", password="${hash_pwd}", firstname="${value.firstname}", lastname="${value.lastname}" 
      WHERE id=${id}` 
    );

    if(result.affectedRows) {
      message = `User ${value.firstname} updated successfully`;
    }
  } else {
    const result = await db.query(
      `UPDATE user SET email="${value.email}", firstname="${value.firstname}", lastname="${value.lastname}" 
      WHERE id=${id}` 
    );

    if(result.affectedRows) {
      message = `User ${value.firstname} updated successfully`;
    }
  }

  return { message };
}

/* 
  PRIVATE (ADMIN) : DELETE AN USER 
*/
async function deleteUser(id){
  let message = 'Error in deleting user, he or she may not exists';

  const userExist = await db.query(
    `SELECT id, firstname, lastname FROM user WHERE id=${id}`
  );

  if(userExist) {
    const result = await db.query(
      `DELETE FROM user WHERE id=${id}` 
    );
  
    if (result.affectedRows) {
      message = `User deleted successfully`;
    }
  }

  return { message };
}


module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  joinGroupForUser,
  updateUser,
  deleteUser
}