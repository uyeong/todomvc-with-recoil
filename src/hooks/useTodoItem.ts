import { useRecoilCallback, useRecoilState } from 'recoil';
import { useEventCallback } from '@restart/hooks';
import { Todo } from '../types';
import { $todoIds, $todoItem } from '../state';

interface State {
  todoItem: Todo
}

interface Actions {
  setTitle: (title: string) => void;
  setCompleted: (completed: boolean) => void;
  remove: () => void;
}

type Result = State & Actions;

function useTodoItem(id: string): Result {
  const [todoItem, setTodoItem] = useRecoilState($todoItem(id));
  const setTitle = useEventCallback((title: string) => {
    setTodoItem({ ...todoItem, title });
  });
  const setCompleted = useEventCallback((completed: boolean) => {
    setTodoItem({ ...todoItem, completed });
  });
  const remove = useRecoilCallback(({ snapshot, set, reset }) => () => {
    const todoIds = snapshot.getLoadable($todoIds).getValue();
    const newTodoIds = todoIds.filter(v => v !== id);
    reset($todoItem(todoItem.id));
    set($todoIds, newTodoIds);
  });
  return {
    todoItem,
    setTitle,
    setCompleted,
    remove
  };
}

export default useTodoItem;
