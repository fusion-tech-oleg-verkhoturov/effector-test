import { createEffect } from "effector";

import { wait } from "../store/lib";
import { Todo } from "../types";

export const getTodosFx = createEffect<void, Todo[]>(async () => {
  await wait();
  
  return [
    {id: 1, val: 'Buy groceries', isDone: false},
  ];
});
