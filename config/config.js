module.exports = {
  environment: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
  },
  security: {
    secretKey: "abcdefg", // 用无规律的随机字符串
    expiresIn: 60*60*24*30,     // 过期时间
  }
}