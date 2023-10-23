import { createEffect, createEvent, createStore } from "effector";
import { Todo } from "../types";
import { getTodosFx } from "../api";

export const $todos = createStore<Todo[]>([])
export const $todosFiltered = $todos.map(todos =>{
  const res = {done: [] as Todo[], notDone: [] as Todo[]};
  todos.forEach(todo => todo.isDone ? res.done.push(todo) : res.notDone.push(todo))
  return res
})

export const setTodosEvent = createEvent<Todo[]>()
export const addTodoEvent = createEvent<string>()
export const updateTodoEvent = createEvent<Todo>()
export const deleteTodoEvent = createEvent<number>()


$todos
  .on(setTodosEvent, (_, newTodos) => newTodos)
  .on(addTodoEvent, (todos, text) => [...todos, { val: text, isDone: false, id: new Date().getTime() }])
  .on(updateTodoEvent, (todos, newTodo) => todos.map((todo) => todo.id === newTodo.id ? newTodo : todo))
  .on(deleteTodoEvent, (todos, id) => todos.filter((todo) => todo.id !== id))
  .on(getTodosFx.doneData, (_, todos) => todos);
