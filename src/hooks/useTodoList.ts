import { useRecoilState } from 'recoil';
import { useEventCallback } from '@restart/hooks';
import { Todo } from '../types';
import { $todoList } from '../state';

interface State {
  todoList: Todo[];
  isCompletedAll: boolean,
}

interface Actions {
  addTodo: (title: string) => void;
  setTitle: (id: string, title: string) => void;
  setCompleted: (id: string, completed: boolean) => void;
  remove: (id: string) => void;
  setCompletedAll: (completed: boolean) => void;
  clearCompleted: () => void;
}

type Result = State & Actions;

function useTodoList(): Result {
  const [todoList, setTodoList] = useRecoilState($todoList);
  const addTodo = useEventCallback((title: string) => {
    if (title === '') {
      throw new Error('빈 문자열로 생성할 수 없습니다.');
    }
    const newTodoList = [...todoList, { title, id: String(Date.now()), completed: false }];
    setTodoList(newTodoList);
  });
  const setTitle = useEventCallback((id: string, title: string) => {
    const index = todoList.findIndex(t => t.id === id);
    const newTodoList = [...todoList];
    newTodoList[index] = { ...todoList[index], title };
    setTodoList(newTodoList);
  });
  const setCompleted = useEventCallback((id: string, completed: boolean) => {
    const index = todoList.findIndex(t => t.id === id);
    const newTodoList = [...todoList];
    newTodoList[index] = { ...todoList[index], completed };
    setTodoList(newTodoList);
  });
  const remove = useEventCallback((id: string) => {
    const newTodoList = todoList.filter(t => t.id !== id);
    setTodoList(newTodoList);
  });
  const setCompletedAll = useEventCallback((completed: boolean) => {
    const newTodoList = todoList.map(t => ({ ...t, completed }));
    setTodoList(newTodoList);
  });
  const clearCompleted = useEventCallback(() => {
    const newTodoList = todoList.filter(t => !t.completed);
    setTodoList(newTodoList);
  });
  return {
    todoList,
    isCompletedAll: todoList.filter(t => !t.completed).length === 0,
    addTodo,
    setTitle,
    setCompleted,
    remove,
    setCompletedAll,
    clearCompleted,
  };
}

export default useTodoList;
