import axios from "axios";
import { sample_foods } from "../Data";

export const getById = async (id) => {
  return sample_foods.filter((food) => food.id === id);
};

export const getAll = async () => {
  const { data } = await axios.get('/api/foods');
  return data;
};
