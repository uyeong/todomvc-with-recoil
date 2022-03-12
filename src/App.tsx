import React from 'react';
import { useEventCallback } from '@restart/hooks';
import { useRecoilValue } from 'recoil';
import { $filteredTodoList } from './state';
import { useTodoList } from './hooks';
import { Header, Footer, TodoItem } from './components';


function App() {
  const { isEmpty, isCompletedAll, setCompletedAll } = useTodoList();
  const filteredTodoList = useRecoilValue($filteredTodoList);
  const handleChangeCompletedAll = useEventCallback(() => {
    setCompletedAll(!isCompletedAll);
  });
  return (
    <>
      <section className="todoapp">
        <Header />
        <section className="main" style={{ display: !isEmpty ? 'block' : 'none' }}>
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
              />
            )}
          </ul>
        </section>
        <Footer />
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
