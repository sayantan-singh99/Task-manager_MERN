import React from 'react';

const TaskList = ({ tasks, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return <p className="text-gray-500 text-center italic">No tasks yet. Add one above!</p>;
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="bg-white border border-gray-200 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
        >
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-800 leading-tight">{task.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{task.description}</p>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => onEdit(task)}
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
