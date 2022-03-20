import { atom, selector } from 'recoil';
import { TodoFilter, Todo, TodoStats } from '../types';
import $todoFilter from './$todoFilter';

const STORAGE_KEY = 'MyTodoList';

const $todoList = atom<Todo[]>({
  key: 'StateTodoList',
  default: [],
  effects: [({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(STORAGE_KEY)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(STORAGE_KEY)
        : localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
    });
  }]
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
export { $filteredTodoList, $todoStats };
