import { atomFamily } from "recoil";
import { Todo } from "../types";
import { APP_NAME } from '../constants';

const $todoItem = atomFamily<Todo, Todo['id']>({
  key: 'StateTodoItem',
  default: (id) => ({
    id,
    title: '',
    completed: false
  }),
  effects: (id) => [
    ({ setSelf, onSet }) => {
      const storageKey = `${APP_NAME}/items`;
      const loadedState = localStorage.getItem(storageKey);
      const todoList = JSON.parse(loadedState || '[]') as Todo[];
      const todoItem = todoList.find(t => t.id === id);
      if (todoItem) {
        setSelf(todoItem);
      }
      onSet((newValue, _, isReset) => {
        const loadedState = localStorage.getItem(storageKey);
        const todoList = JSON.parse(loadedState || '[]') as Todo[];
        if (isReset) {
          const newTodoList = todoList.filter(t => t.id !== id);
          newTodoList.length === 0
            ? localStorage.removeItem(storageKey)
            : localStorage.setItem(storageKey, JSON.stringify(newTodoList));
        } else {
          localStorage.setItem(storageKey, JSON.stringify([...todoList, newValue]));
        }
      })
    }
  ]
});

export default $todoItem;