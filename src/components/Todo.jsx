import { useState, useRef } from "react";
import classes from "./todo.module.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
export const Todo = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const ref = useRef();
  const handleTodoItems = () => {
    if (isEdited) {
      todoItems[editIndex] = currentItem;
      console.log(todoItems, "todoItem");
      setTodoItems([...todoItems]);
      setIsEdited(false);
      setEditIndex("");
    } else {
      setTodoItems([...todoItems, currentItem]);
    }
    setCurrentItem("");
  };
  const handleDeleteTodoItem = (event,item, index) => {
    event.stopPropagation();
    let data = todoItems.filter((i, j) => !(item === i && index === j));
    setTodoItems([...data]);
    setIsEdited(false);
    setEditIndex("");
    setCurrentItem("");
  };
  const handleEditTodoItem = (item, index) => {
    setCurrentItem(item);
    setIsEdited(true);
    ref.current.focus();
    setEditIndex(index);
  };
  return (
    <div className={classes.todoApp}>
      <div className={classes.input}>
        <input
          type="text"
          placeholder="add your todo"
          onChange={(e) => {
            if(e.target.value.trim()?.length) setCurrentItem(e.target.value)
          }}
          value={currentItem}
          ref={ref}
        />
        <button onClick={handleTodoItems}>{isEdited ? "Edit" : "Add"}</button>
      </div>
      {!!todoItems?.length &&
        todoItems.map((item, index) => {
          return (
            <div
              className={classes.todoItem}
              key={index}
              onClick={() => handleEditTodoItem(item, index)}
            >
              {item}
              <XMarkIcon
                className={classes.iconSize}
                onClick={(e) => handleDeleteTodoItem(e,item, index)}
              />
            </div>
          );
        })}
    </div>
  );
};
