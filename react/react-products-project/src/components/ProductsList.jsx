import { ProductItem } from "./ProductItem";

export const ProductList = (productListProps) => {
  const { name, products } = productListProps;
  return (
    <div>
      <div>
        <b>{name}</b>
        {products.map((product) => {
          return <ProductItem product={product} key={product.name} />;
        })}
      </div>
    </div>
  );
};
