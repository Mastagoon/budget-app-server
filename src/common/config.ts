export default {
    port: process.env.PORT || 3001,
    db: {
        host: process.env.MYSQL_HOST || "localhost",
        username: process.env.MYSQL_USER || "mysqluser",
        password: process.env.MYSQL_PASSWORD || "mysqlpw",
        db_name: process.env.MSYQ_DBNAME || "mysqldb"
    },
    env: process.env.NODE_ENV || "development"
}