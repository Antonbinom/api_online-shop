import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import sequelize from './db.js';
import router from './routes/index.js';
import { User } from './models/models.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';
import createPath from './helpers/createPath.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
console.log(createPath());
app.use(express.static(createPath()));
console.log(createPath());
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler); //middleware с ошибкой регестрируем в самом конце

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello!' })
})

async function start() {
  try {
    await sequelize.authenticate(); //подключение к БД
    await sequelize.sync(); // сверяем состояние БД с нашей схемой данных

    app.listen(PORT, () => console.log(`This server has been started on http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
start();