import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./App.css";
import { memo } from "react";
import { Redux } from "./Redux";
import { ReduxToolKit } from "./ReduxToolkit";

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

  const [users, setUsers] = useState([
    { name: "test" },
    { name: "test2" },
    { name: "another test" },
  ]);
  const removeUser = useCallback(
    (selectedUser) => {
      setUsers(users.filter((user) => user.name != selectedUser));
    },
    [users]
  );
  const [conversations, setConversations] = useState([
    { active: "pinned" },
    { active: "pinned" },
    { active: "pinned1" },
  ]);
  return (
    <>
      {/* <Redux /> */}
      <ReduxToolKit/>
    </>
  );
}

const UsersComponent = memo(({ users, removeUser, conversations }) => {
  const pinnedCOnvs = conversations.filter((conv) => conv.active == "pinned");
  const restConvs = conversations.filter((conv) => conv.active != "pinned");
  const pinnedMemoConvs = useMemo(
    () =>
      conversations.filter((conv) => {
        console.log("recalculating");
        return conv.active == "pinned";
      }),
    [conversations]
  );
  console.log("users component");
  return (
    <div>
      <div>
        {users.map((user) => {
          return (
            <div>
              {user.name}
              <button
                onClick={() => {
                  removeUser(user.name);
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
});

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

// memo - remember component as long as dependencies dont change
// use callback - remembers function
// use memo - remembers value
