import { getProducts } from "../services/product";
import { ProductList } from "./ProductsList";
import { useState, useEffect, createContext } from "react";

export const ProductActionsContext = createContext(null);
export const CategoryList = ({ checked, searchValue }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getData() {
      const products = await getProducts();
      setProducts(products);
    }
    getData();
  }, [getProducts]);

  const categories = new Set();
  products.forEach((product) => {
    categories.add(product.category);
  });

  const shouldShowProduct = (product) => {
    if (checked && product.stocked == false) {
      return false;
    }
    if (searchValue) {
      return product.name.includes(searchValue);
    }
    return true;
  };

  const handlUpdateProduct = (updatedProduct) => {
    const newProducts = [];
    products.forEach((product) => {
      if (product.id == updatedProduct.id) {
        newProducts.push(updatedProduct);
      } else {
        newProducts.push(product);
      }
    });
    setProducts(newProducts);
  };

  const handleDeleteProduct = (deletedProductId) => {
    setProducts(products.filter((product) => product.id !== deletedProductId));
  };

  return (
    <>
      {[...categories].map((c) => {
        return (
          <ProductActionsContext.Provider
            value={{ handlUpdateProduct, handleDeleteProduct }}
          >
            <ProductList
              name={c}
              key={c}
              products={
                products
                  .filter((product) => product.category === c)
                  .filter((product) => shouldShowProduct(product))
                // .filter((product) => {
                //   if (checked) {
                //     return product.stocked;
                //   } else {
                //     return true;
                //   }
                // })
                // .filter((product) => {
                //   if (!searchValue) {
                //     return true;
                //   }
                //   return product.name.includes(searchValue);
                // })
              }
            />
          </ProductActionsContext.Provider>
        );
      })}
    </>
  );
};
