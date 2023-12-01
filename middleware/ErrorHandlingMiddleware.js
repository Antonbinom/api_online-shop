import ApiError from "../helpers/ApiError.js";

// возвращаем функцию которая по сути является middleware
export default function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' })
}