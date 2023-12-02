// TODO: Отрефакторить,что бы не дублировался код
import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

export default function (role) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1]; //вытаскиваем токен из заголовков
      if (!token) {
        return res.status(401).json({ message: 'Not authorized' }); // В случае если токена нет, определяем статус и возвращаем сообщение
      };
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'Access is denied' });
      }
      req.user = decoded;
      next()
    } catch (error) {
      res.status(200).json({ message: 'Not authorized' })
    }
  }
}