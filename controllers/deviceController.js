import { Device } from "../models/models.js";
import ApiError from "../helpers/ApiError.js";
import { v4 as uuidv4 } from 'uuid';
import createPath from "../helpers/createPath.js";
export async function create(req, res, next) {
  try {
    const { name, price, brandId, typeId, info } = req.body;
    const { img } = req.files;
    //генерируем уникальное имя файла
    const fileName = uuidv4() + '.jpg';
    // получаемый файл перемещаем в папку static
    img.mv(createPath(fileName));

    const device = await Device.create({
      name,
      price,
      brandId,
      typeId,
      info,
      img: fileName
    });

    return res.json(device);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

export async function getAll(req, res) {
  try {
    const devices = await Device.findAll();
    return res.json(devices);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

export async function getOne(req, res) {
  try {
    const { id } = req.body;
    const device = await Device.findOne(id);
    return res.json(device);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};
