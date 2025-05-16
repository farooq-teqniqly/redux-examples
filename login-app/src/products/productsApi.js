import axios from "axios";

export const fetchProductCategories = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products/categories");
    return res.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "An error occurred while fetching product categories.",
    );
  }
};
