import { useState } from "react";
import './style/ToDo.css';

export default function ToDo() {
    const [toDoList, setToDoList] = useState([]);
    const [toDoInput, setToDoInput] = useState("");
    const [editToDoItem, setEditToDoItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // New state for tracking editing state

    function handleSubmit(e) {
        e.preventDefault();

        if (isEditing) {
            const newList = toDoList.map((listItem) => {
                if (listItem.id === editToDoItem) {
                    listItem.name = toDoInput;
                }
                return listItem;
            });

            setToDoList(newList);
            setEditToDoItem(null); // Clear the edit item
        } else {
            setToDoList([
                ...toDoList,
                { id: new Date().getTime(), name: toDoInput, isCompleted: false },
            ]);
        }

        setToDoInput("");
        setIsEditing(false); // Reset editing state
    }

    const handleEditToDo = (id) => {
        const editItem = toDoList.find((listItem) => listItem.id === id);
        setEditToDoItem(editItem.id);
        setToDoInput(editItem.name);
        setIsEditing(true); // Set editing state to true
    };

    const deleteToDo = (id) => {
        const newList = toDoList.filter((listItem) => listItem.id !== id);
        setToDoList(newList);
    };

    const toDoDone = (id) => {
        const newList = toDoList.map((item) => {
            if (item.id === id) {
                item.isCompleted = true;
            }
            return item;
        });
        setToDoList(newList);
    };

    return (
        <div className="container">
            <div className="to-do-container">
                <h2>To Do List</h2>
                <form className="to-do-form" onSubmit={handleSubmit}>
                    <input
                        className="to-do-input"
                        placeholder="Enter the to do item"
                        type="text"
                        value={toDoInput}
                        onChange={(e) => setToDoInput(e.target.value)}
                    />
                    <button className="button" type="submit">
                        {isEditing ? "Edit" : "Add"}
                    </button>
                </form>
                <ul className="to-do-list">
                    {toDoList.map((toDoItem) => {
                        return (
                            <li className="to-do-item" key={toDoItem.id}>
                                <span className={toDoItem.isCompleted ? "mark-done" : ""}>
                                    {toDoItem.name}
                                </span>
                                <button
                                    className="button"
                                    onClick={() => handleEditToDo(toDoItem.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="button"
                                    onClick={() => deleteToDo(toDoItem.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="button"
                                    onClick={() => toDoDone(toDoItem.id)}
                                >
                                    Done
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
