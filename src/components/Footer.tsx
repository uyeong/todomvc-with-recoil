import React, { memo } from 'react';
import cc from 'classcat';
import { TodoFilter } from '../types';

interface Props {
  activeTodoFilter: TodoFilter,
  remaining: number;
  showClearButton?: boolean;
  onClearCompleted?: () => void;
}

const Footer = ({ activeTodoFilter, remaining, showClearButton, onClearCompleted }: Props) => {
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