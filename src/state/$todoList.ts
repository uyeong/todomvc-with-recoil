import { atom, selector } from 'recoil';
import { Todo, TodoFilter, TodoStats } from '../types';
import { APP_NAME } from '../constants';
import $todoFilter from './$todoFilter';
import $todoItem from './$todoItem';

const $todoIds = atom<Todo['id'][]>({
  key: 'StateTodoIds',
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const storageKey = `${APP_NAME}/ids`;
      const loadedState = localStorage.getItem(storageKey);
      if (loadedState !== null) {
        setSelf(JSON.parse(loadedState));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(storageKey)
          : localStorage.setItem(storageKey, JSON.stringify(newValue))
      })
    }
  ]
});

const $todoList = selector<Todo[]>({
  key: 'StateTodoList',
  get: ({ get }) =>
    get($todoIds).map(id => get($todoItem(id)))
});

const $filteredTodoList = selector<Todo[]>({
  key: 'StateFilteredTodoList',
  get: ({ get }) => {
    const todoFilter = get($todoFilter);
    const todoList = get($todoList);
    switch (todoFilter) {
      case TodoFilter.All:
        return todoList;
      case TodoFilter.Active:
        return todoList.filter(t => !t.completed);
      case TodoFilter.Completed:
        return todoList.filter(t => t.completed);
    }
  },
});

const $todoStats = selector<TodoStats>({
  key: 'StateTodoStats',
  get: ({ get }) => {
    const todoList = get($todoList);
    return {
      all: todoList.length,
      active: todoList.filter(t => !t.completed).length,
      completed: todoList.filter(t => t.completed).length,
    }
  }
});

export default $todoList;
export { $todoIds, $filteredTodoList, $todoStats };