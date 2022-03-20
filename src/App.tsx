import React from 'react';
import { useEventCallback } from '@restart/hooks';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TodoFilter } from './types';
import { $filteredTodoList, $todoFilter, $todoStats } from './state';
import { useTodoList } from './hooks';
import { Header, Footer, TodoItem } from './components';

function App() {
  const {
    todoList,
    isCompletedAll,
    addTodo,
    setTitle,
    setCompleted,
    remove,
    setCompletedAll,
    clearCompleted,
  } = useTodoList();
  const [todoFilter, setTodoFilter] = useRecoilState($todoFilter);
  const filteredTodoList = useRecoilValue($filteredTodoList);
  const todoStats = useRecoilValue($todoStats);
  const handleChangeCompletedAll = useEventCallback(() => setCompletedAll(!isCompletedAll));
  const handleChangeTodoFilter = useEventCallback((todoFilter: TodoFilter) => setTodoFilter(todoFilter));
  return (
    <>
      <section className="todoapp">
        <Header onCreate={addTodo} />
        <section className="main" style={{ display: todoList.length > 0 ? 'block' : 'none' }}>
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={isCompletedAll}
            onChange={handleChangeCompletedAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {filteredTodoList.map(({ id, title, completed }) =>
              <TodoItem
                key={id}
                id={id}
                title={title}
                completed={completed}
                onChangeTitle={setTitle}
                onChangeCompleted={setCompleted}
                onRemove={remove}
              />
            )}
          </ul>
        </section>
        <Footer
          activeTodoFilter={todoFilter}
          remaining={todoStats.active}
          showClearButton={todoStats.completed > 0}
          onChangeTodoFilter={handleChangeTodoFilter}
          onClearCompleted={clearCompleted}
        />
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
        <p>Created by <a href="http://todomvc.com">UYEONG</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </>
  );
}

export default App;
