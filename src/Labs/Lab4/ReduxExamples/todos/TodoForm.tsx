import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import React from "react";

export default function TodoForm() {
  const dispatch = useDispatch();
  const { todo } = useSelector((state: any) => state.todosReducer);

  return (
    <li className="list-group-item">
      <button
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"
        className="btn btn-success float-end"
      >
        Add
      </button>
      <button
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
        className="btn btn-warning float-end me-2"
      >
        Update
      </button>
      <input
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
    </li>
  );
}
