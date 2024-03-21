import "./App.css";
import { useState } from "react";
import { CategoryList } from "./components/CategoryList";
import { CheckBox } from "./components/Checkbox";
import { AddProduct } from "./components/AddProduct";

function App() {
  const [checked, setChecked] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  function updateCheckboxState() {
    setChecked(!checked);
  }
  function formCallback(value) {
    setShowForm(value);
  }
  return (
    <>
      <button
        onClick={() => {
          setShowForm(!showForm);
        }}
      >
        Add Product
      </button>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />
      <CheckBox checked={checked} onCheckBoxClick={updateCheckboxState} />
      {!showForm && (
        <CategoryList checked={checked} searchValue={searchValue} />
      )}
      {showForm && <AddProduct formCallback={formCallback} />}
    </>
  );
}

export default App;
