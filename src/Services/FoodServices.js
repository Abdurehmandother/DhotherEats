import { sample_foods } from "../Data";

export const getById = async (id) => {
  return sample_foods.filter((food) => food.id === id);
};
