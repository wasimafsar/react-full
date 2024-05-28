import { memo, useContext, useEffect, useState } from "react";
import "./Child.css";
import { UserContext } from "./UserContext";

function Child({ data, callback }) {
  let childFn = () => {
    callback("Hello from Child");
  };

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  const value = useContext(UserContext);
  console.log(value);

  return (
    <>
      {/* <h1>Child {data}</h1>
       */}
      <button onClick={childFn}>Child Button</button>

      {/* <ul>{todos && todos.map((rec) => <li key={rec.id}>{rec.id}</li>)}</ul> */}

      {/* <div className="flex">
        {todos && todos.map((rec) => <div key={rec.id}>{rec.title}</div>)}
      </div> */}

      <div>{value}</div>
    </>
  );
}

export default memo(Child);
