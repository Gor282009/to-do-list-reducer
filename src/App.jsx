import './App.css';

import React, { useReducer, useState } from 'react';
const initialState = {
  todos: [],
};
function reducer(state, action) {
  if (action.type === "ADD_TODO") {
    return {
      ...state,
      todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }],
    };
  } else if (action.type === "TOGGLE_TODO") {
    return {
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      ),
    };
  } else if (action.type === "REMOVE_TODO") {
    return {
      ...state,
      todos: state.todos.filter((todo) => todo.id !== action.payload),
    };
  } else if (action.type === "COMPLETED") {
    return {
      ...state,
      todos: state.todos.map((todo) => ({ ...todo, completed: true })),
    };
  } else if (action === "COMPLETED") {
    return {
      ...state,
      todos: state.todos.map((todo) => ({ ...todo, completed: true })),
    };
  } else if (action.type === "DELETE_COMPLETED") {
    return {
      ...state,
      todos: state.todos.filter((todo) => !todo.completed),
    };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      dispatch({ type: 'ADD_TODO', payload: inputValue.trim() });
      setInputValue('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const handleRemoveTodo = (id) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  const handleDeleteCompleted = () => {
    dispatch({ type: 'DELETE_COMPLETED' });
  };

  const handleComleted = () => {
    dispatch({ type: 'COMPLETED', payload: null });
  };

  return (
    <div className="App">
      <div className="cont">
        <h1 className='title'>To-Do List</h1>
        <div className="box">
          <input className='my-inp'
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add a new task"
          />
          <button onClick={handleAddTodo} className='add-btn'>Add</button>
        </div>
        <ul className='menu'>
          {state.todos.map((todo) => (
            <li key={todo.id} className="my-li">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <span className='my-li'>{todo.text} </span>
              <button onClick={() => handleRemoveTodo(todo.id)} className='remove-btn'>Delete</button>
            </li>
          ))}
        </ul>
        <div className="btn-cont">
          <button onClick={handleComleted} className='completed'>Completed</button>
          <button onClick={handleDeleteCompleted} className='deleteCompleted'>Delete Completed</button>
        </div>
      </div>
    </div>
  );
}

export default App;
