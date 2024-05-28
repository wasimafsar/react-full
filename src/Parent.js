import Child from "./Child";
import {
  useCallback,
  useState,
  useMemo,
  createContext,
  useReducer,
  useRef,
} from "react";
import { UserContext } from "./UserContext";
import useFetch from "./useFetch";
export default function Parent() {
  const [data, setData] = useState("Hello World");
  const [fromChild, setFromChild] = useState("Default Message");
  const ref = useRef("");

  function reducer(state, action) {
    if (action.type === "increment") {
      return state + 1;
    }
    if (action.type === "decrement") {
      return state - 1;
    }
  }
  const [counter, dispatch] = useReducer(reducer, 0);

  const [newData] = useFetch("https://jsonplaceholder.typicode.com/todos");
  console.log(newData);
  const expensiveCalculation = () => {
    console.log("Calculating");
    let num = 0;
    // for (let i = 0; i < 1000000000; i++) {
    //   num += i;
    // }
    return num;
  };
  const calculation = useMemo(() => expensiveCalculation(), [data]);

  const fromCallBack = (data) => {
    setData(data);
  };

  // const buttonClicked = useCallback(
  //   () => () => {
  //     setCounter(counter + 1);
  //   },
  //   [counter]
  // );

  // const reduce = () => {
  //   setCounter(counter - 1);
  // };

  const increment = () => {
    dispatch({ type: "increment" });
  };

  const decrement = () => {
    dispatch({ type: "decrement" });
  };

  const captureValue = () => {
    console.log(ref.current.value);
  };

  return (
    <>
      {/* <h1>Parent</h1>
      <h1>{fromChild}</h1> */}
      {/* <button onClick={buttonClicked}>++</button> &nbsp;&nbsp;&nbsp;
      <button onClick={reduce}>--</button>
      <p>{counter}</p>
      <p>{calculation}</p> */}
      <UserContext.Provider value={data}>
        <Child callback={fromCallBack} />
      </UserContext.Provider>

      <button onClick={increment}>++</button>
      <button onClick={decrement}>--</button>

      <p> {counter}</p>

      <input type="text" ref={ref} onChange={captureValue} />

      <ul>{newData && newData.map((rec) => <li key={rec.id}>{rec.id}</li>)}</ul>
    </>
  );
}
