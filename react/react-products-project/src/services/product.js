import axios from "axios";
const PRODUCTS_URL = "http://localhost:3000/api/products";

export const getProducts = async () => {
  // const response = await fetch("http://localhost:3000/products");
  //   const jsonData = await response.json();
  //   return jsonData;

  const res = await axios.get(PRODUCTS_URL, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
    },
  });
  return res.data;
};

export const createProduct = async (name, category, price, stocked) => {
  const res = await axios.post(
    PRODUCTS_URL,
    {
      name,
      category,
      price: price,
      stocked,
    },
    {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );
  return res;
};

export const updateProduct = async (product) => {
  const res = await axios.put(
    PRODUCTS_URL + "/" + product.id,
    {
      name: product.name,
      category: product.category,
      price: product.price,
      stocked: product.stocked,
    },
    {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );
  return res;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(PRODUCTS_URL + "/" + id, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
    },
  });
  return res;
};
