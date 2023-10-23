import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';
import '@testing-library/jest-dom/extend-expect'

const todo = { id: 1, val: 'Buy groceries', isDone: false };
const mockFn = jest.fn();

test('renders todo text correctly', () => {

  render(<TodoItem updateTodo={mockFn} deleteTodo={mockFn} todo={todo} />);
  expect(screen.getByText(/Buy groceries/i)).toBeInTheDocument();
});

test('displays todo text as edit input value', () => {
  render(<TodoItem updateTodo={mockFn} deleteTodo={mockFn} todo={todo} />);
  
  const editBtn = screen.getByText('Edit');
  fireEvent.click(editBtn);
  const editInput = screen.getByRole('textbox') as HTMLInputElement;
  expect(editInput).toBeInTheDocument();
  expect(editInput.value).toBe(todo.val);
});

test('edit btn updates todo', () => {
  render(<TodoItem updateTodo={mockFn} deleteTodo={mockFn} todo={todo} />);
  
  const editBtn = screen.getByText('Edit');
  fireEvent.click(editBtn);
  const editInput = screen.getByRole('textbox') as HTMLInputElement;
  expect(editInput).toBeInTheDocument();
  
  fireEvent.change(editInput, { target: { value: 'Buy' } });
  const acceptBtn = screen.getByRole('button', {
    name: /accept/i
  });
  fireEvent.click(acceptBtn);
  expect(mockFn).toHaveBeenCalledWith({...todo, val: 'Buy'});
  expect(editInput).not.toBeInTheDocument();
});

test('delete todo', () => {
  render(<TodoItem updateTodo={mockFn} deleteTodo={mockFn} todo={todo} />);
  
  const deleteBtn = screen.getByText('Delete');
  fireEvent.click(deleteBtn);

  expect(mockFn).toHaveBeenCalledWith(todo.id);
});

test('check checkbox', () => {
  render(<TodoItem updateTodo={mockFn} deleteTodo={mockFn} todo={todo} />);
  
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  const text = screen.getByText(todo.val);

  expect(text).toBeInTheDocument()
});
