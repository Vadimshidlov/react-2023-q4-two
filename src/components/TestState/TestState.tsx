/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
// import TestEffect from '@/components/TestState/TestEffect.tsx';

export interface ITodos {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type StateType = {
  age: number;
};

export type ActionType = {
  type: string;
};

/* function reducer(state: StateType, action: ActionType) {
  if (action.type === 'increment') {
    return {
      age: state.age + 1,
    };
  }

  throw Error('Unknown action.');
} */

function TestState() {
  const [count, setCount] = useState(0);
  // const [isAge, setIsAge] = useState(true);
  // const [state, dispatch] = useReducer(reducer, { age: 25 });
  // const [todos, setTodos] = useState<ITodos[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  /* // this example doesnt works;
    useEffect(() => {
      setInterval(() => {
        // baceuse setState(10 - 1);  works with value equal to 10!
        // If we want to refactor this behavior, you need to use setState(c => c - 1);
        setCount(count - 1);
        console.log('Interval tick');
      }, 1000);
    }, []); */

  /* useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setIsLoading(false);
      });
  }, []); */

  // correct timer!
  useEffect(() => {
    setInterval(() => {
      setCount((prevState) => prevState + 1);
    }, 1000);
  }, []);

  /* const ageClickHandler = () => {
    dispatch({ type: 'increment' });
  }; */

  /*  useEffect(() => {
      console.log('DidMount');
    }, []);

    useEffect(() => {
      console.log('Render');
    }, [count]);

    const clickHandler = () => {
      console.log('Handler');

      /!* setCount(count + 1);
      setCount(count + 1);
      setCount(count + 1); *!/

      setCount((prevState) => prevState + 1);
      setCount((prevState) => prevState + 1);
      setCount((prevState) => prevState + 1);
      setCount((prevState) => prevState + 1);
    }; */

  return (
    <>
      <h1 style={{ marginBottom: '35px', marginLeft: '200px', fontSize: '35px' }}>
        This is Test of useState hook
      </h1>
      <div style={{ marginBottom: '35px', marginLeft: '200px', fontSize: '35px' }}>
        Count:
        {count}
      </div>
      {/* {isAge ? (
        <TestEffect />
      ) : (
        <div style={{ marginBottom: '35px', marginLeft: '200px', fontSize: '35px' }}>
          Age:
           {state.age}
        </div>
      )} */}
      {/* {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((todo) => {
            return <li key={todo.id}>{todo.title}</li>;
          })}
        </ul>
      )} */}
      {/* <button
        type="button"
        onClick={ageClickHandler}
        style={{ marginBottom: '35px', marginLeft: '200px', fontSize: '35px' }}
      >
        Go Age!
      </button> */}
      <button
        type="button"
        // onClick={clickHandler}
        /* onClick={() => {
          setIsAge((prev) => !prev);
        }} */
        style={{ marginBottom: '35px', marginLeft: '200px', fontSize: '35px' }}
      >
        Go!
      </button>
    </>
  );
}

export default TestState;
