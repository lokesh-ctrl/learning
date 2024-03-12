import { getProducts } from "../services/product";
import { ProductList } from "./ProductsList";
import { useState, useEffect } from "react";

export const CategoryList = ({ checked, searchValue }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getData() {
      const products = await getProducts();
      setProducts(products);
    }
    getData();
    // getProducts().then((data) => {
    //   setProducts(data);
    // });
  }, [getProducts]);

  const categories = new Set();
  products.forEach((product) => {
    categories.add(product.category);
  });

  return (
    <>
      {[...categories].map((c) => {
        return (
          <ProductList
            name={c}
            key={c}
            products={products
              .filter((product) => product.category === c)
              .filter((product) => {
                if (checked) {
                  return product.stocked;
                } else {
                  return true;
                }
              })
              .filter((product) => {
                if (!searchValue) {
                  return true;
                }
                return product.name.includes(searchValue);
              })}
          />
        );
      })}
    </>
  );
};
