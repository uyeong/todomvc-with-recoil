import React from 'react';
import { useEventCallback } from '@restart/hooks';
import { Header, Footer } from './components';
import { TodoFilter } from './types';

function App() {
  const handleChangeCompletedAll = useEventCallback(() => {});
  return (
    <>
      <section className="todoapp">
        <Header />
        <section className="main" style={{ display: 'none' }}>
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={false}
            onChange={handleChangeCompletedAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list" />
        </section>
        <Footer activeTodoFilter={TodoFilter.All} remaining={0} />
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
