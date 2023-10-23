import { Box, Button, TextField } from "@mui/material"
import { useState } from "react";
import { useEvent } from "effector-react";


import { addTodoEvent } from "../../store/todos";

const Header = () => {
  const [text, setText]= useState('')
  const addTodo = useEvent(addTodoEvent)
  
  const onAdd = () => {
    addTodo(text);
    setText('');
  }

  return (
    <Box>
      <TextField
        variant="outlined"
        onChange={(e) => setText(e.target.value)}
        label="type your task"
        value={text}
        sx={{
          width: "70%",
          marginBottom: 30
        }}
      />
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={onAdd}
        disabled={!Boolean(text)}
        sx={{
          height: 55,
          marginBottom: 30
        }}
      >
        Add Task
      </Button>
    </Box>
  )
}

export default Header;
