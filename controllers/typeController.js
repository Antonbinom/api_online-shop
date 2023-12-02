import { Type } from "../models/models.js";
import ApiError from "../helpers/ApiError.js";

export async function create(req, res) {
  try {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

export async function getAll(req, res) {
  try {
    const types = await Type.findAll();
    return res.json(types);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

//TODO: put, delete
