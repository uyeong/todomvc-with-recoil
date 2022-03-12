import { atom } from 'recoil';
import { TodoFilter } from '../types';

const $todoFilter = atom<TodoFilter>({
  key: 'StateTodoFilter',
  default: TodoFilter.All
});

export default $todoFilter;