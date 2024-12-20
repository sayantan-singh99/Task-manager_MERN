import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (title, description) => {
    try {
      const res = await axios.post('http://localhost:5000/tasks', { title, description });
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, title, description, isCompleted) => {
    try {
      const res = await axios.put(`http://localhost:5000/tasks/${id}`, {
        title,
        description,
        isCompleted,
      });
      setTasks((prev) => prev.map((task) => (task._id === id ? res.data : task)));
      setEditingTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="px-6 py-8 sm:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
              Task Manager
            </span>
          </h1>
          {!editingTask && <TaskForm onSubmit={handleCreate} />}
          <TaskList
            tasks={tasks}
            onDelete={handleDelete}
            onEdit={(task) => setEditingTask(task)}
          />
          {editingTask && (
            <div className="mt-10 border-t pt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Edit Task</h3>
              <TaskForm
                task={editingTask}
                onSubmit={(title, description) =>
                  handleUpdate(editingTask._id, title, description, editingTask.isCompleted)
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
