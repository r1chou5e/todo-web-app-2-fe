import { useState, useEffect } from 'react';
import Task from '../task/Task';
import TaskEdit from '../task/TaskEdit';
import { TASKS } from '../../../mock';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);

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
    // Check if any other tasks is in edit mode
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

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="mt-4">
        <p className="text-black tracking-light text-[32px] font-bold leading-tight min-w-72 mb-4">
          Today
        </p>
        <div className="flex flex-col gap-3">
          {tasks.map((task, index) =>
            task.editMode ? (
              <TaskEdit
                key={index}
                id={task.id}
                title={task.title}
                description={task.description}
                time={task.time}
                onCancel={closeEdit}
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
        </div>
      </div>
    </div>
  );
}
