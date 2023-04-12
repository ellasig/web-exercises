'use strict';
const pool = require("../database/db");
const promisePool = pool.promise();


const getAllUsers = async () => {
  try {
    const sql = `SELECT user_id, name, email, password FROM wop_user `;
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql query failed');
  }
};

const getUserById = async (id) => {
  try {
    const sql = `SELECT user_id, name, email from wop_user where user_id=?`;
    const [rows] = await promisePool.query(sql,[id]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql query failed');
  }
};

const insertUser = async (user) => {
  try {
    const sql = 'INSERT INTO wop_user VALUES (null, ?, ?, ?, ?)';
    const values = [user.name, user.email, user.password, user.role];
    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql query failed');
  }
};




const modifyUser = async (user) => {
  try {
    const sql = `UPDATE wop_user SET name=?, email=?, password=? 
                 where user_id=?`;
    const [rows] = await promisePool.query(sql,[
      user.name,
      user.email,
      user.passwd,
      user.id
    ]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql update user failed');
  }
};


const deleteUser = async (id) => {
  try {
    const sql = `DELETE FROM wop_user where user_id=?`;
    const [rows] = await promisePool.query(sql,[id]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql delete user failed');
  }
};

//User authentication
const getUserLogin = async (email) => {
  try {
    console.log('get user login for', email);
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE email = ?;',
        [email]);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};



module.exports = {
  getAllUsers,
  getUserById,
  insertUser,
  modifyUser,
  deleteUser,
  getUserLogin
};
