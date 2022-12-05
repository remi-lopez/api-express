const db = require('../services/db');
const helper = require('../services/helper');


/* 
  PUBLIC : GROUPES LIST 
*/
async function getAllGroups(){
  const rows = await db.query(
    `SELECT name FROM groupe`
  );
  const groups = helper.emptyOrRows(rows);

  return { groups }
}

/* 
  PUBLIC : GROUPES LIST WITH USERS
*/
async function getAllUsersInGroups(){
  const rows = await db.query(
    `SELECT groupe.name, user.firstname, user.lastname
    FROM groupe
    INNER JOIN user ON groupe.id=user.groupe_id`
  );
  const groups = helper.emptyOrRows(rows);

  return { groups }
}

/* 
  PRIVATE (ADMIN) : CREATE A GROUP 
*/
async function createGroup(value){
  const result = await db.query(
    `INSERT INTO groupe (name) VALUES ("${value.name}")`
  );

  let message = 'Error in creating group';

  if (result.affectedRows) {
    message = `Group ${value.name} created successfully`;
  }

  return {message};
}

/* 
  PRIVATE (ADMIN) : UPDATE A GROUP
*/
async function updateGroup(id, value){
  let message = 'This group may not exists..';

  const groupExist = await db.query(
    `SELECT id, name FROM groupe WHERE id=${id}`
  );

  if(groupExist) {
    const result = await db.query(
      `UPDATE groupe SET name="${value.name}" WHERE id=${id}`
    );
  
    if (result.affectedRows) {
      message = `Group ${value.name} updated successfully`;
    }
  }

  return { message };
}

/* 
  PRIVATE (ADMIN) : DELETE A GROUP
*/
async function deleteGroup(id){
  let message = 'This group may not exists..';

  const groupExist = await db.query(
    `SELECT id, name FROM groupe WHERE id=${id}`
  );

  if(groupExist) {
    const userResult = await db.query(
      `UPDATE user SET groupe_id="NULL" WHERE groupe_id=${id}` 
    );
  
    const result = await db.query(
      `DELETE FROM groupe WHERE id=${id}` 
    );
  
    if (result.affectedRows) {
      message = `Group deleted successfully`;
    }
  }

  return { message };
}


module.exports = {
  getAllGroups,
  getAllUsersInGroups,
  createGroup,
  updateGroup,
  deleteGroup
}