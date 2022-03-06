import React, { useState, useEffect } from 'react';
import './Todo.css';
import { AiFillEdit, AiFillDelete, AiOutlineCheckCircle } from "react-icons/ai";

function Task({ task, index, completeTask, removeTask, editTask }) {

  const [newName, setNewName] = useState('');
  const [isEditing, setEditing] = useState(false);
  console.log(isEditing + " " + task.title);
  const view = (<div
    className={task.completed ? "task completed" : "task not-completed"}
    style={{ textDecoration: task.completed ? "line-through" : "" }}
  >
    {task.title}


    <button style={{ background: "red" }} onClick={() => removeTask(index)}><AiFillDelete /></button>
    <button style={{ background: "green", display: task.completed ? "none" : "block" }} onClick={() => completeTask(index)}><AiOutlineCheckCircle /></button>
    <button style={{ display: task.completed ? "none" : "block" }} onClick={() => setEditing(true)}><AiFillEdit /></button>


  </div>
  );

  function handleChange(e) {
    setNewName(e.target.value);

  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newName.length > 0)
      editTask(task.id, newName);
    setNewName("");
    setEditing(false);
  }
  const edit = (
    <form onSubmit={handleSubmit}>
      <input
        id={task.id}
        className="todo-text"
        type="text"
        value={newName}
        onChange={handleChange}
        autoFocus
      />
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {task.title}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {task.title}</span>
        </button>
      </div>

    </form>
  );
  return (
    isEditing ? edit : view
  );
}

function CreateTask({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a new task"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {

  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [tasks, setTasks] = useState([
  ]);

  useEffect(() => { setTasksRemaining(tasks.filter(task => !task.completed).length) }, [tasks]);


  const addTask = title => {
    const newTasks = [...tasks, { id: Math.floor(Math.random() * 1000), title, completed: false }];
    setTasks(newTasks);
  };

  const completeTask = index => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };

  const removeTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const editTask = (id, newName) => {

    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return { ...task, title: newName }
      }
      return task;
    });
    setTasks(editedTaskList);
  };



  return (
    <div className="todo-container">
      <div className="header">Pending task(s) ({tasksRemaining})</div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task
            task={task}
            index={index}
            completeTask={completeTask}
            removeTask={removeTask}
            key={index}
            editTask={editTask}
          />
        ))}
      </div>
      <div className="create-task" >
        <CreateTask addTask={addTask} />
      </div>
    </div>
  );
}



export default App;