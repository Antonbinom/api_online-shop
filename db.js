import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from "sequelize";
export default new Sequelize(
  //описываем конфигурацию подключения к BD
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres', // диалект СУБД
    host: process.env.DB_HOST,
    port: process.env.HOST,
  }
)