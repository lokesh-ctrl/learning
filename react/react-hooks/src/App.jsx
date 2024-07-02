import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import { memo } from "react";

const List = memo(() => {
  const [list, setList] = useContext(ListContext);
  return (
    <div>
      {list.map((element) => {
        return (
          <div>
            {element}
            <button
              onClick={() => {
                setList(list.filter((e) => e != element));
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
});
const ListContext = createContext(null);

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([1, 2, 3, 4]);

  function handleChange(event) {
    setName(event.target.value);
  }

  function addItem() {
    console.log("coming here");
    setList([...list, 1]);
  }
  // const [count, setCount] = useState(0);
  // const [anotherCOunt, setAnotherCount] = useState(0);
  // const [time, setTime] = useState(0);

  // const handleChange = () => {
  //   setCount(count + 1);
  // };

  // const handleAnotherChange = () => {
  //   setAnotherCount(anotherCOunt + 1);
  // };

  // useEffect(() => {
  //   console.log("in effect");
  //   const interval = setInterval(() => setTime(time + 1), 1000);

  //   return () => clearInterval(interval);
  // }, [time]);

  // useEffect(() => {
  //   console.log("in APP");
  // });

  console.log("in app");
  return (
    <>
      <ListContext.Provider value={[list, setList]}>
        <List />
        <button onClick={addItem}>Add item</button>
      </ListContext.Provider>
    </>
  );
}

export default App;

// Use Effect
//  always
//  mount
//  update
//  cleanup

// Use memo

// use context

// use callback

// use reducer
