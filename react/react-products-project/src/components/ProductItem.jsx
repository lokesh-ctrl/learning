import { deleteProduct } from "../services/product";
import { EditProduct } from "./EditProduct";
import "./ProductItem.css";
import classNames from "classnames";
import { useState } from "react";

export const ProductItem = (props) => {
  const { name, price, stocked } = props.product;
  const [openEdit, setOpenEdit] = useState(false);

  const handleDelete = async () => {
    const res = await deleteProduct(props.product.id);
    console.log("deleted succesfully");
  };

  return (
    <div
      className={classNames(
        { available: stocked, "not-available": !stocked },
        "row-flex"
      )}
    >
      <div className="name">{name}</div>
      <div className="price">{price}</div>
      {openEdit && <EditProduct product={props.product} isOpen={openEdit} />}
      <button
        onClick={() => {
          setOpenEdit(true);
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          handleDelete();
        }}
      >
        Delete
      </button>
    </div>
  );
};
