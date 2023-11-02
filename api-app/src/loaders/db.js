const mariadb = require("mariadb"),
     properties = require("../config/properties"),
     { logger } = require("../config/winston");
     
// DB connection
const pool = mariadb.createPool(properties.connection_info);
pool.getConnection()
         .then(()=>{
            logger.info("DB connected.")
         }).catch((err)=> {
            logger.error("DB ERROR :", "[error code] " + err.code+", ", "[error text] "+ err.text);
         });

async function transactionQuery(sql, data) {
   if(properties.env !== "prod") {
      console.log("------------------------------------")
      console.log(sql);
      console.log("parameter:", data);
      console.log("------------------------------------")
   } 
   let conn, rows; 
   conn = await pool.getConnection();
    try {
       // Start Transaction
       await conn.beginTransaction();
       try {
         // Add Data in a batch
         rows = await conn.query(sql, data);
         // Commit Changes
         await conn.commit();
       } catch(err){
          logger.error(err);
          await conn.rollback();
          throw err; 
       }
    } catch(err) {
       logger.error(err);
       if (conn) conn.release(); 
       throw err; 
    } finally {}
    if (conn) conn.release(); 
    return rows; 
};

async function query(sql, data) {
   if(properties.env !== "prod") {
      console.log("------------------------------------")
      console.log(sql);
      console.log("parameter:", data);
      console.log("------------------------------------")
   } 
   let conn, rows; 
   try { 
     conn = await pool.getConnection();
     rows = await conn.query(sql, data);
   } catch(err) {
     logger.error(err);
     if (conn) conn.release();  
     throw err; 
   } finally {}
   if (conn) conn.release();
   return rows; 
};

async function getPoolConnection() {
   return await pool.getConnection();
};

// module.exports = { transactionQuery, query, getPoolConnection };

