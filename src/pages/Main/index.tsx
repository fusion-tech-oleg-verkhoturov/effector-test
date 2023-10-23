import { useEvent, useStore } from "effector-react";
import { Container, List } from "@mui/material";

import Header from "./Header";
import TodoItem from "../../components/TodoItem";
import { $todos, updateTodoEvent, deleteTodoEvent } from "../../store/todos";

const Main = () => {
  const todos = useStore($todos);
  const updateTodo = useEvent(updateTodoEvent);
  const deleteTodo = useEvent(deleteTodoEvent);

  return (
    <Container component="main" sx={{
      textAlign: "center",
      marginTop: '100px'
    }}>
      <Header />
      <List>
        {todos.map((todo) => (
          <TodoItem updateTodo={updateTodo} deleteTodo={deleteTodo} key={todo.id} todo={todo} />
        ))}
      </List>
    </Container>
  )
}

export default Main;
