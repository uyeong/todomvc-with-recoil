import React, { memo, useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useEventCallback } from '@restart/hooks';
import cc from 'classcat';

interface Props {
  id: string;
  title: string;
  completed: boolean;
  onChangeTitle?: (id: string, title: string) => void;
  onChangeCompleted?: (id: string, completed: boolean) => void;
  onRemove?: (id: string,) => void;
}

const TodoItem = ({ id, title, completed, onChangeTitle, onChangeCompleted, onRemove }: Props) => {
  const editInputRef = useRef<HTMLInputElement>(null);
  const [editable, setEditable] = useState(false);
  const handleDoubleClick = useEventCallback(() => {
    setEditable(true);
  });
  const handleChangeTitle = useEventCallback(() => {
    const value = editInputRef.current!.value.trim();
    onChangeTitle?.(id, value);
  });
  const handleKeyDown = useEventCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Escape') {
      setEditable(false);
    }
    if (event.code === 'Enter') {
      handleSubmit();
    }
  });
  const handleChangeCompleted = useEventCallback(() => {
    onChangeCompleted?.(id, !completed);
  });
  const handleSubmit = useEventCallback(() => {
    const value = editInputRef.current!.value.trim();
    if (value) {
      onChangeTitle?.(id, value);
    } else {
      onRemove?.(id);
    }
    setEditable(false);
  });
  const handleRemove = useEventCallback(() => {
    onRemove?.(id);
  });
  useEffect(() => {
    editInputRef.current![editable ? 'focus' : 'blur']();
  }, [editable]);
  return (
    <li className={cc({ completed, editing: editable })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={handleChangeCompleted}
        />
        <label onDoubleClick={handleDoubleClick}>
          {title}
        </label>
        <button className="destroy" onClick={handleRemove}/>
      </div>
      <input
        ref={editInputRef}
        className="edit"
        value={title}
        onBlur={handleSubmit}
        onChange={handleChangeTitle}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
};

export default memo(TodoItem);