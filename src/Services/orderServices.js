import axios from "axios";

export const createOrder = async (order) => {
  try {
    const { data } = axios.post(
      "http://localhost:5000/api/orders/create",
      order
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getNewOrderForCurrentUser = async () => {
  const { data } = await axios.get(
    "http://localhost:5000/api/orders/newOrderForCurrentUser"
  );
  return data;
};
