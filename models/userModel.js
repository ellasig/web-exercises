'use strict';
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    // TODO: SQL kysely
    const sql = `SELECT wop_user.*, FROM wop_user `;
    ;
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql query failed');
  }
};

const getUserById = async (id) => {
  try {
    // TODO: SQL KYSELY
    const sql = `SELECT wop_user`;
    const [rows] = await promisePool.query(sql,[id]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql query failed');
  }
};

const insertUser = async (user) => {
  try {
    const sql = `INSERT INTO wop_user VALUES (?, ?, ?, ?, ?, ?)`;
    const [rows] = await promisePool.query(sql,[
      null,
      user.name,
      user.email,
      user.password,
      //TODO: TULEEKO ROLE TÄHÄN?
      user.role
    ]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql insert user failed');
  }
};


const modifyUser = async (user) => {
  try {
    // TODO: add sql UPDATE
    const sql = `UPDATE wop_user SET name=?, email=?, password=?, role=?  
                 where user_id=?`;
    const [rows] = await promisePool.query(sql,[
      user.name,
      user.email,
      user.password,
      //TODO: TULEEKO ROLE TÄHÄN?
      user.role,
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

module.exports = {
  getAllUsers,
  getUserById,
  insertUser,
  modifyUser,
  deleteUser
};
