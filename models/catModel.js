"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const sql = `SELECT wop_cat.*, wop_user.name as ownername FROM wop_cat 
                 LEFT JOIN wop_user ON wop_cat.owner = wop_user.user_id`;
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql query failed');
  }
};

const getCatById = async (id) => {
  try {
    const sql = `SELECT wop_cat.*, wop_user.name as ownername FROM wop_cat 
                 LEFT JOIN wop_user ON wop_cat.owner = wop_user.user_id 
                 where cat_id = ${id}`;
    const [rows] = await promisePool.query(sql,[id]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql query failed');
  }
};

const insertCat = async () => {
  try {
    const sql = ``;
    const [rows] = await promisePool.query(sql,[]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql insert cat failed');
  }
};


module.exports = {
  getAllCats,
  getCatById,
  insertCat,
};
