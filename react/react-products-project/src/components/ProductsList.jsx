import { ProductItem } from "./ProductItem";
import "./ProductList.css";

export const ProductList = (productListProps) => {
  const { name, products } = productListProps;
  return (
    <div>
      <div className="row-flex">
        <div className="name">Name</div>
        <div className="price">Price</div>
      </div>
      <div>
        <b>{name}</b>
        {products.map((product) => {
          return <ProductItem product={product} key={product.name} />;
        })}
      </div>
    </div>
  );
};
