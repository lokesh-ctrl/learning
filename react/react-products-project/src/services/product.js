import axios from "axios";

export const getProducts = async () => {
  // const response = await fetch("http://localhost:3000/products");
  //   const jsonData = await response.json();
  //   return jsonData;

  const res = await axios.get("http://localhost:3000/products");
  return res.data;
};
