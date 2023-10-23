import { useEffect } from "react";
import { useEvent, useGate, useStore } from "effector-react";
import { CircularProgress, Container, List } from "@mui/material";

import Header from "./Header";
import TodoItem from "../../components/TodoItem";
import { $todos, updateTodoEvent, deleteTodoEvent, getAllTodos } from "../../store/todos";
import { getTodosFx } from "../../api";

const Main = () => {
  const todos = useStore($todos);
  const updateTodo = useEvent(updateTodoEvent);
  const deleteTodo = useEvent(deleteTodoEvent);
  const getApiTodos = useEvent(getAllTodos);

  const isLoading = useStore(getTodosFx.pending)


  useEffect(() => {
    getApiTodos();
  },
  [getApiTodos]);

  return (
    <Container component="main" sx={{
      textAlign: "center",
      marginTop: '100px'
    }}>
      <Header />
      {isLoading 
        ? <CircularProgress />
        : (
          <List>
            {todos.map((todo) => (
              <TodoItem updateTodo={updateTodo} deleteTodo={deleteTodo} key={todo.id} todo={todo} />
            ))}
          </List>
        ) 
      }
    </Container>
  )
}

export default Main;
