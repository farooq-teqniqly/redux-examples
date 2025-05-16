import axios from "axios";

export const authenticateUser = async ({ username, password }) => {
  try {
    const res = await axios.post("https://dummyjson.com/auth/login", { username, password });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || "An error occurred during login.");
  }
};
