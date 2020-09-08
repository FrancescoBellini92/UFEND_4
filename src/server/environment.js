const dotEnv = require('dotenv');
dotEnv.config();
module.exports = {
  port: process.env.PORT,
  apiBaseUrl: process.env.API_BASEURL,
  apiKey: process.env.API_KEY,
  mode: process.env.MODE
};
