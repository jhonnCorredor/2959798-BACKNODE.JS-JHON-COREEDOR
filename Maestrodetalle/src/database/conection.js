import mysql from "mysql";

const mysqlConfig = {
  user: "root",
  password: "",
  database: "maestro_detalle",
  host: "localhost",
  port: 3306,
};

export default function execute(query = "") {
  return new Promise((resolve, reject) => {
    const conection = mysql.createConnection(mysqlConfig);
    conection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
        console.log(`error: ${error}`);
      }
      resolve(results);
    });
  });
}
