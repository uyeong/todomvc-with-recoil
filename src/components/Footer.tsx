import React, { memo, useEffect, useLayoutEffect } from 'react';
import { useEventCallback } from '@restart/hooks';
import { useRecoilState, useRecoilValue } from 'recoil';
import cc from 'classcat';
import { TodoFilter } from '../types';
import { $todoFilter, $todoStats } from '../state';
import { useTodoList } from '../hooks';

const Footer = () => {
  const [todoFilter, setTodoFilter] = useRecoilState($todoFilter);
  const todoStats = useRecoilValue($todoStats);
  const { clearCompleted } = useTodoList();
  const handleChangeTodoFilter = useEventCallback(() => {
    const hash = document.location.hash;
    const newTodoFilter = (hash.replace(/#\//g, '') || TodoFilter.All) as TodoFilter;
    setTodoFilter(newTodoFilter);
  });
  useLayoutEffect(() => {
    handleChangeTodoFilter();
  }, [handleChangeTodoFilter]);
  useEffect(() => {
    window.addEventListener('popstate', handleChangeTodoFilter);
    return () => {
      window.removeEventListener('popstate', handleChangeTodoFilter);
    };
  }, [handleChangeTodoFilter]);
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{todoStats.active}</strong> item left
      </span>
      <ul className="filters">
        <li>
          <a className={cc({ selected: todoFilter === TodoFilter.All })} href="#/">
            All
          </a>
        </li>
        <li>
          <a className={cc({ selected: todoFilter === TodoFilter.Active })} href="#/active">
            Active
          </a>
        </li>
        <li>
          <a className={cc({ selected: todoFilter === TodoFilter.Completed })} href="#/completed">
            Completed
          </a>
        </li>
      </ul>
      {todoStats.completed > 0 && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default memo(Footer);