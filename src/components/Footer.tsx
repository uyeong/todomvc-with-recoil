import React, { memo, useEffect, useLayoutEffect } from 'react';
import { useEventCallback } from '@restart/hooks';
import cc from 'classcat';
import { TodoFilter } from '../types';

interface Props {
  activeTodoFilter: TodoFilter,
  remaining: number;
  showClearButton?: boolean;
  onChangeTodoFilter?: (todoFilter: TodoFilter) => void;
  onClearCompleted?: () => void;
}

const Footer = ({
  activeTodoFilter,
  remaining,
  showClearButton,
  onChangeTodoFilter,
  onClearCompleted
}: Props) => {
  const handlePopState = useEventCallback(() => {
    const locationHash = document.location.hash;
    const newTodoFilter = (locationHash.replace(/#\//g, '') || TodoFilter.All) as TodoFilter;
    onChangeTodoFilter?.(newTodoFilter);
  });
  useLayoutEffect(() => {
    handlePopState();
  }, [handlePopState]);
  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{remaining}</strong> item left
      </span>
      <ul className="filters">
        <li>
          <a className={cc({ selected: activeTodoFilter === 'all' })} href="#/">
            All
          </a>
        </li>
        <li>
          <a className={cc({ selected: activeTodoFilter === 'active' })} href="#/active">
            Active
          </a>
        </li>
        <li>
          <a className={cc({ selected: activeTodoFilter === 'completed' })} href="#/completed">
            Completed
          </a>
        </li>
      </ul>
      {showClearButton && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default memo(Footer);
