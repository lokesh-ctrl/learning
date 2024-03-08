import "./ProductItem.css";
import classNames from "classnames";
export const ProductItem = (props) => {
  const { name, price, stocked } = props.product;
  return (
    <div
      className={classNames({ 'available': stocked, "not-available": !stocked })}
    >
      <span>{name}</span>
      <span>{price}</span>
    </div>
  );
};
