import axios from "axios";

export const getUser = () => {
  try {
    const storedUser = localStorage.getItem("user");

    // Check if storedUser is a valid string before parsing
    if (!storedUser) return null;

    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

export const login = async (email, password) => {
  try {
    const { data } = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });

    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(
      "Login failed:",
      error.response?.data?.error || error.message
    );
    throw new Error(
      error.response?.data?.error || "Login failed. Please try again."
    );
  }
};

export const register = async (name, email, password, address) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/users/register",
      {
        name,
        email,
        password,
        address,
      }
    );

    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(
      "Registeration failed:",
      error.response?.data?.error || error.message
    );
    throw new Error(
      error.response?.data?.error || "Registeration failed. Please try again."
    );
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};
