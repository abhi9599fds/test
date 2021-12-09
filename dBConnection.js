import { Sequelize } from "sequelize";

const dbConn =  {
    HOST : "localhost",
    USER : "root",
    PASSWORD :  "1234",
    PORT : "3306",
    DATABASE : "test_mysql",
    dialect: "mysql",
    pool :{
        max: 5,
        min: 1,
        acquire: 30000,
        idle: 10000
    }
};

const sequelize = new Sequelize(
   dbConn.DATABASE,
   dbConn.USER,
   dbConn.PASSWORD,
   {
      host:dbConn.HOST,
      port :dbConn.PORT,
      dialect :dbConn.dialect,
      // dialectOptions: {
      //    ssl : {
      //       require :true,
      //       rejectUnauthorized: false
      //    }
      // },
      // ssl :true,
      pool :{
         max : dbConn.pool.max,
         min : dbConn.pool.min,
         idle : dbConn.pool.idle,
         acquire : dbConn.pool.acquire
      }
   }
);

export { sequelize };