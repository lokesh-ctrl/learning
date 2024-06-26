import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleChange = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    console.log("I'm running every time");
  });

  return (
    <>
      <div>{count}</div>
      <button onClick={handleChange}>Click Me</button>
    </>
  );
}

export default App;


// always
// mount
// update
// cleanup