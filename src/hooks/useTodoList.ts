import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { Todo } from '../types';
import { $todoIds, $todoItem, $todoList } from '../state';

interface State {
  todoList: Todo[];
  isEmpty: boolean,
  isCompletedAll: boolean,
}

interface Actions {
  addTodo: (title: string) => void;
  setCompletedAll: (completed: boolean) => void;
  clearCompleted: () => void;
}

type Result = State & Actions;

function useTodoList(): Result {
  const [todoIds, setTodoIds] = useRecoilState($todoIds);
  const todoList = useRecoilValue($todoList);
  const addTodo = useRecoilCallback(({ set }) => (title: string) => {
    if (title === '') {
      throw new Error('할 일은 빈 문자열로 생성할 수 없습니다.');
    }
    const id = String(Date.now());
    const newTodoIds = [...todoIds, id];
    set($todoItem(id), { id, title, completed: false });
    setTodoIds(newTodoIds);
  });
  const setCompletedAll = useRecoilCallback(({ set }) => (completed: boolean) => {
    todoList.forEach((todoItem) => {
      set($todoItem(todoItem.id), { ...todoItem, completed });
    });
  });
  const clearCompleted = useRecoilCallback(({ set, reset }) => () => {
    const newTodoIds = todoIds.filter(id => {
      const todoItem = todoList.find(t => t.id === id);
      if (todoItem?.completed) {
        reset($todoItem(id));
      }
      return !todoItem?.completed;
    });
    set($todoIds, newTodoIds);
  });
  return {
    todoList,
    isEmpty: todoIds.length === 0,
    isCompletedAll: todoList.filter(t => !t.completed).length === 0,
    addTodo,
    setCompletedAll,
    clearCompleted,
  };
}

export default useTodoList;
