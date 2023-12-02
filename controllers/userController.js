
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from "bcrypt"; //для хэширования паролей пользователей хранящихся в БД
import jwt from "jsonwebtoken"; //для создания jwt токена
import ApiError from "../helpers/ApiError.js";
import { User, Basket } from '../models/models.js'

const generateJwt = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' },
  )
}

export async function registration(req, res, next) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Incorrect email or password'));
    };

    const isUserExists = await User.findOne({ where: { email } });

    if (isUserExists) {
      return next(ApiError.badRequest(`User with email: ${email} already exists`));
    };

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hashPassword, role });
    const basket = await Basket.create({ userId: user.id }); //сразу генерируем корзину для пользователя
    // записываем в jwt token данные пользователя, секретный ключ(Signature), хранится на сервере, и параметры такие как срок жизни токена и др

    const token = generateJwt(user.id, user.email, role);
    return res.json({ token })

  } catch (error) {
    next(ApiError.badRequest(error.message));
  }

};
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(ApiError.badRequest(`User with email:${email} not found`));
    };
    // проверяем пароль на подлинность
    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.badRequest('Wrong password!'));
    };

    const token = generateJwt(user.id, user.email, user.role);
    return res.json(token);

  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};
export async function auth(req, res) {
  const { id, email, role } = req.user;
  const token = generateJwt(id, email, role);
  return res.json({ token });
};

//TODO: put, delete
