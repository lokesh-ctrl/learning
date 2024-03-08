import { ProductList } from "./ProductsList";

export const CategoryList = ({ checked, searchValue }) => {
  const products = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
    { category: "Soaps", price: "$1", stocked: true, name: "Ponds" },
    { category: "Shampoos", price: "$1", stocked: true, name: "Tresmee" },
  ];
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
