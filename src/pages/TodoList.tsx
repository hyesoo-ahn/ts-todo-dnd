import React, { useEffect, useRef, useState } from "react";
import TodoItem from "../component/TodoItem";

interface ITodoItem {
  id: number;
  title: string;
  state: string;
}

const TodoList = () => {
  const [data, setData] = useState<ITodoItem[]>([
    {
      id: 1,
      title: "할일1",
      state: "completed",
    },
    {
      id: 2,
      title: "할일2",
      state: "",
    },
    {
      id: 3,
      title: "할일3",
      state: "onProgress",
    },
    {
      id: 4,
      title: "할일4",
      state: "onProgress",
    },
    {
      id: 5,
      title: "할일5",
      state: "",
    },
    {
      id: 6,
      title: "할일6",
      state: "",
    },
    {
      id: 7,
      title: "할일7",
      state: "onProgress",
    },
    {
      id: 8,
      title: "할일8",
      state: "onProgress",
    },
    {
      id: 9,
      title: "할일9",
      state: "completed",
    },
    {
      id: 10,
      title: "할일10",
      state: "completed",
    },
    {
      id: 11,
      title: "할일11",
      state: "onProgress",
    },
    {
      id: 12,
      title: "할일12",
      state: "completed",
    },
    {
      id: 13,
      title: "할일13",
      state: "",
    },
  ]);
  const clickElId = useRef<any>(null);
  const interSectElId = useRef<any>(null);
  const lastLeaveTarget = useRef<any>(null);

  const onDragStart = (e: React.DragEvent<HTMLElement>, todo: ITodoItem): void => {
    e.dataTransfer.effectAllowed = "move";
    setDragItemId.grabItem(todo.id);
  };

  const onDragEnter = (e: React.DragEvent<HTMLElement>, todo: ITodoItem): void => {
    // setDragItemId.interSectItem(todo.id);
    const moveClassName = moveUpAndDownClassName();
    if (lastLeaveTarget.current) lastLeaveTarget.current!.classList.remove("move_down");
    const $target = e.target as HTMLElement;
    setDragItemId.interSectItem(todo.id);
    if (clickElId.current !== interSectElId.current && moveClassName)
      $target.classList.add(moveClassName);
    lastLeaveTarget.current = $target;
  };

  const getElementIndex = (todoData: ITodoItem[], id: number): number => {
    return todoData.findIndex((todo) => todo.id === id);
  };

  const setDragItemId = {
    grabItem: (id: number): void => {
      clickElId.current = getElementIndex(data, id);
    },
    interSectItem: (id: number): void => {
      interSectElId.current = getElementIndex(data, id);
    },
  };

  const onDragEnd = (e: React.DragEvent<HTMLElement>) => {
    const $target = e.target as HTMLElement;
    $target.classList.remove("move_up");
    $target.classList.remove("move_down");
    if (lastLeaveTarget.current) {
      lastLeaveTarget.current!.classList.remove("move_up");
      lastLeaveTarget.current!.classList.remove("move_down");
    }

    const updateData = [...data];
    const clickedItemData = updateData[clickElId.current];
    updateData.splice(clickElId.current, 1);
    updateData.splice(interSectElId.current, 0, clickedItemData);
    setData(updateData);
  };

  const onDragLeave = (e: React.DragEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    const $target = e.target as HTMLElement;
    $target.classList.remove("move_up");
  };

  const moveUpAndDownClassName = (): string => {
    if (clickElId.current! < interSectElId.current!) {
      return "move_up";
    } else if (clickElId.current! > interSectElId.current!) return "move_down";
    return "";
  };

  const selectLabel = (state: string) => {
    switch (state) {
      case "onProgress":
        return "blue";
        break;
      case "completed":
        return "green";
        break;
      case "":
        return "red";
        break;
    }
  };

  return (
    <div className="todo-container">
      <h2 className="font-white">Todo List Drag and Drop</h2>

      <div className="todo-list-container">
        {data.map((item: ITodoItem, i: number) => (
          <div
            key={i}
            onDragEnd={onDragEnd}
            onDragEnter={(e) => onDragEnter(e, item)}
            onDragStart={(e) => onDragStart(e, item)}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => onDragLeave(e)}
            draggable
            className="todo-item"
          >
            <p>{item.title}</p>

            <div className={`state-container ${selectLabel(item.state)}`}>
              {item.state === "completed" && "완료"}
              {item.state === "onProgress" && "진행중"}
              {item.state === "" && "시작안함"}
            </div>
          </div>
          // <TodoItem onDragStart={onDragStart} onDragEnter={onDragEnter} item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
