import { useState } from "react";
import { createProduct } from "../services/product";

export const AddProduct = ({ formCallback }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stocked, setStock] = useState(false);
  const [price, setPrice] = useState(0);
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const res = await createProduct(name, category, price, stocked);
        if (res.status == 201) {
          setCategory("");
          setName("");
          setStock(false);
          setPrice(0);
          formCallback(false);
        }
      }}
    >
      <li>
        <ul>
          <label>Name</label>
          <input
            defaultValue="Enter name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
          />
        </ul>
        <ul>
          <label>Category</label>
          <input
            defaultValue="Enter name"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
            value={category}
          />
        </ul>
        <ul>
          <label>Is Stock available?</label>
          <input
            type="checkbox"
            value={stocked}
            onChange={(event) => {
              setStock(!stocked);
            }}
          />
        </ul>
        <ul>
          <label>Price</label>
          <input
            type="number"
            onChange={(event) => {
              setPrice(parseInt(event.target.value));
            }}
            value={price}
          />
        </ul>
        <ul>
          <input type="submit" />
        </ul>
      </li>
    </form>
  );
};
