module.exports = {
  env: {
    url: process.env.HOST,
    port: process.env.PORT,
    dbUrl: process.env.DB_URL
  },
  secret: process.env.SECRET
}