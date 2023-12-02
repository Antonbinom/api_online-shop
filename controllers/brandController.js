import { Brand } from "../models/models.js";
import ApiError from "../helpers/ApiError.js";

export async function create(req, res) {
  try {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};
export async function getAll(req, res) {
  try {
    const brands = await Brand.findAll();
    await res.json(brands);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

//TODO: put, delete
