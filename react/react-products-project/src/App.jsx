import "./App.css";
import { useState } from "react";
import { CategoryList } from "./components/CategoryList";
import { CheckBox } from "./components/Checkbox";

function App() {
  const [checked, setChecked] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  function updateCheckboxState() {
    setChecked(!checked);
  }
  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />
      <CheckBox checked={checked} onCheckBoxClick={updateCheckboxState} />
      <div>
        <span>Name</span>
        <span>Price</span>
      </div>
      <CategoryList checked={checked} searchValue={searchValue} />
    </>
  );
}

export default App;
