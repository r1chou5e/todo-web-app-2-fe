import { useState, useEffect } from 'react';
import Task from '../task/Task';
import TaskEdit from '../task/TaskEdit';
import { TASKS } from '../../../mock';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState(null);

  useEffect(() => {
    setTasks(TASKS);
  }, []);

  const showEdit = (id) => {
    checkOtherShowEdit();
    const task = tasks.find((task) => task.id === id);
    task.editMode = true;
    setTasks([...tasks]);
  };

  const checkOtherShowEdit = () => {
    const editingTasks = tasks.filter((task) => task.editMode);
    if (editingTasks.length > 0) {
      editingTasks.forEach((task) => {
        task.editMode = false;
      });
      setTasks([...tasks]);
    }
  };

  const closeEdit = (id) => {
    const task = tasks.find((task) => task.id === id);
    task.editMode = false;
    setTasks([...tasks]);
  };

  const addTask = () => {
    setIsAdding(true);
    setNewTask({
      id: tasks.length + 1,
      title: '',
      description: '',
      time: '00:00',
      type: 'General',
      editMode: true,
    });
  };

  const saveTask = (taskData) => {
    const taskToAdd = { ...newTask, ...taskData, editMode: false };
    setTasks((prevTasks) => [...prevTasks, taskToAdd]);
    setIsAdding(false);
    setNewTask(null);
  };

  const cancelAddTask = () => {
    setIsAdding(false);
    setNewTask(null);
  };

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="mt-4">
        <p className="text-black tracking-light text-[32px] font-bold leading-tight min-w-72 mb-4">
          Today
        </p>
        <div className="flex flex-col gap-5">
          {tasks.map((task, index) =>
            task.editMode ? (
              <TaskEdit
                key={index}
                id={task.id}
                title={task.title}
                description={task.description}
                time={task.time}
                type={task.type}
                onCancel={closeEdit}
                onSave={saveTask}
              />
            ) : (
              <Task
                key={index}
                id={task.id}
                title={task.title}
                description={task.description}
                time={task.time}
                type={task.type}
                onEdit={showEdit}
              />
            )
          )}
          {isAdding && (
            <TaskEdit
              id={newTask.id}
              title={newTask.title}
              description={newTask.description}
              time={newTask.time}
              type={newTask.type}
              priority={tasks.length + 1}
              onSave={saveTask}
              onCancel={cancelAddTask}
            />
          )}
        </div>
        {!isAdding && (
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 transition-all duration-300 hover:bg-blue-600 transform hover:scale-105"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
