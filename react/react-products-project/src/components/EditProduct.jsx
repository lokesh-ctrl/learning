import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { updateProduct } from "../services/product";

export function EditProduct({ product, isOpen }) {
  const [open, setOpen] = React.useState(isOpen);
  const [productState, setProduct] = React.useState(product);

  const handleOpen = () => setOpen(!open);

  const updateProperty = (propertyKey, value) => {
    const newProduct = {};
    newProduct[propertyKey] = value;
    console.log(newProduct);
    setProduct({
      ...productState,
      ...newProduct,
    });
  };

  const handleSave = () => {
    updateProduct(productState);
    handleOpen();
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen} size="md">
        <DialogHeader>Edit Item</DialogHeader>
        <DialogBody>
          <div className="w-72">
            <Input
              label="Name"
              value={productState.name}
              onChange={(event) => {
                updateProperty("name", event.target.value);
              }}
            />
          </div>
          <div className="w-72">
            <Input
              label="Category"
              value={productState.category}
              onChange={(event) => {
                updateProperty("category", event.target.value);
              }}
            />
          </div>
          <div className="w-72">
            <Checkbox
              label="Stocked"
              value={productState.stocked}
              onChange={() => {
                updateProperty("stocked", !productState.stocked);
              }}
            />
          </div>
          <div className="w-72">
            <Input
              label="Price"
              type="number"
              value={productState.price}
              onChange={(event) => {
                updateProperty("price", parseInt(event.target.value));
              }}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleSave}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
