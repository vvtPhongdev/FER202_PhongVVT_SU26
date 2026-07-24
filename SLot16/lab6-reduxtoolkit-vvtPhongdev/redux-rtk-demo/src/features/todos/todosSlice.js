import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  items: [
    { id: nanoid(), text: 'Học nguyên lý Redux', done: true },
    { id: nanoid(), text: 'Thực hành Redux Toolkit', done: false },
  ],
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action) => { state.items.push(action.payload) },
      prepare: (text) => ({ payload: { id: nanoid(), text, done: false } }),
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((t) => t.id === action.payload)
      if (todo) todo.done = !todo.done
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload)
    },
  },
})

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions
export const selectTodos = (state) => state.todos.items
export default todosSlice.reducer
