import mysql from 'mysql2/promise';
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'ofs_batch10',
  password: 'root',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
// {name, phone, password, dob}
export async function store(user) {
    let connection = await pool.getConnection(); 
    let query = "insert into profile(name,password,phone,dob) values(?,?,?,?)";
    // connection.execute(query, [valueTo?1, valueTo?2, ...])
    let [result, fields] = await connection.execute(query, [user.name, user.password,user.phone,user.dob]);
    connection.release();
    return result;
}
export async function fetchAll() {
    let connection = await pool.getConnection(); 
    let query = "select * from profile";
    let [result, fields] = await connection.execute(query);
    connection.release();
    return result;
}
