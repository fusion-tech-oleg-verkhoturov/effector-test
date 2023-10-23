import { FC, useEffect, useState } from "react";
import {
  Button,
  Typography,
  Checkbox,
  ListItem,
  TextField,
  IconButton,
  Stack,
} from "@mui/material";

import { Todo } from "../types";
import { Check, Close } from "@mui/icons-material";

type Props = {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
}

const Todoitem: FC<Props> = ({todo, updateTodo, deleteTodo}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [updateText, setUpdateText] = useState(todo.val);

  const onUpdate = () => {
    updateTodo({ ...todo, val: updateText });
    setEditMode(false);
  }

  useEffect(() =>{
    if (isEditMode) {
      setUpdateText(todo.val);
    }
  }, [isEditMode, todo])

  return (
    <ListItem
      sx={{
        width: "80%",
        margin: "auto",
        display: "flex",
        justifyContent: "space-around",
        border: "1px solid light-gray"
      }}
    >
      <Checkbox
        onClick={() => updateTodo({ ...todo, isDone: !todo.isDone })}
        checked={todo.isDone}
      />
      {isEditMode ? (
        <TextField
          value={updateText}
          onChange={(e) => setUpdateText(e.target.value)}
          variant='standard'
          InputProps={{
            endAdornment:
              <Stack gap={1} flexDirection='row'>
                <IconButton aria-label='accept' onClick={onUpdate} >
                  <Check />
                </IconButton>
                <IconButton aria-label='decline' onClick={() => setEditMode(false)} >
                  <Close />
                </IconButton>
              </Stack>
          }}
        />
      ) : (
        <Typography
          style={{ color: todo.isDone ? "green" : "" }}
          key={todo.id}
        >
          {todo.val}
        </Typography>
      )}
      {!isEditMode && (
        <Button
          onClick={() => setEditMode(true)}
          variant="contained"
          sx={{
            ml: 10
          }}
        >
          Edit
        </Button>
      )}
      <Button
        onClick={() => deleteTodo(todo.id)}
        color="secondary"
        variant="contained"
      >
        Delete
      </Button>
    </ListItem>
  )
}

export default Todoitem;
