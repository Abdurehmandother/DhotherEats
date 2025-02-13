import axios from "axios";

export const getById = async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/foods/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching food by ID:", error);
    return null;
  }
};

export const getAll = async () => {
  const { data } = await axios.get("http://localhost:5000/api/foods");
  return data;
};
