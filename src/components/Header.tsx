import React, { memo, KeyboardEvent } from 'react';
import { useEventCallback } from '@restart/hooks';
import { useTodoList } from '../hooks';

const Header = () => {
  const { addTodo } = useTodoList();
  const handleKeyDown = useEventCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code !== 'Enter') {
      return;
    }
    event.preventDefault();
    const value = event.currentTarget.value;
    if (value.trim() !== '') {
      addTodo(value);
      event.currentTarget.value = '';
    }
  });
  return (
    <header className='header'>
      <h1>todos</h1>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        autoFocus={true}
        onKeyDown={handleKeyDown}
      />
    </header>
  );
};

export default memo(Header);