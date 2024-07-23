import mysql from "mysql2";

const db = mysql.createConnection({
  host: "roundhouse.proxy.rlwy.net",
  user: "root",
  password: "boZxzBrwxoEsPpFAbxJrfVVRsRGwHVOw",
  database: "railway",
  port: 28538,
});

db.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + db.threadId);
});

export default db;
