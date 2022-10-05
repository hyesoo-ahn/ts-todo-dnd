import React, { useState } from "react";

const TodoItem = ({ item, onDragEnter, onDragStart }: any) => {
  return (
    <div
      onDragEnter={(e) => onDragEnter(e, item)}
      onDragStart={(e) => onDragStart(e, item)}
      draggable
      className="todo-item"
    >
      <p>{item.title}</p>
    </div>
  );
};

export default TodoItem;
