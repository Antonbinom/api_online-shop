import { Device, DeviceInfo } from "../models/models.js";
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
      img: fileName
    });

    if (info) {
      // Так как данные из form-data приходят в виде строки, перегоняем info в объект
      info = JSON.parse(info);
      // Далее в цикле создаем сущности DeviceInfo
      info.forEach(({ title, description }) => {
        DeviceInfo.create({
          title,
          description,
          deviceId: device.id,
        })
      });
    }

    return res.json(device);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

export async function getAll(req, res, next) {
  try {
    const { brandId, typeId, limit = 9, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    let whereCondition = {};

    if (brandId) {
      whereCondition.brandId = brandId;
    };

    if (typeId) {
      whereCondition.typeId = typeId;
    };

    const devices = await Device.findAndCountAll({ where: whereCondition, limit, offset });

    return res.json(devices);

  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

export async function getOne(req, res) {
  try {
    const { id } = req.params;
    const device = await Device.findOne(
      {
        where: { id },
        include: [{ model: DeviceInfo, as: 'info' }] //получаем данные(info) из другой сущности(DeviceInfo)
      },
    );
    return res.json(device);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

//TODO: put, delete
