import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';


export default function TaskDashboard() {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [activeOnly, setActiveOnly] = useState(() => {
    return localStorage.getItem('activeOnly') === 'true';
  });
  const [suggestions, setSuggestions] = useState([]);
  const tasksUrl = 'http://localhost:4000/tasks';

  const fetchTasks = async () => {
    const res = await axios.get(tasksUrl, { withCredentials: true });
    setTasks(res.data);
  };
  console.log('Tasks fetched:', tasks); // Debugging line
  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem('activeOnly', activeOnly.toString());
  }, [activeOnly]);

  const toggleComplete = async (task) => {
    await axios.patch(`${tasksUrl}/${task.id}`, {
      ...task,
      completed: !task.completed,
    }, { withCredentials: true });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${tasksUrl}/${id}`, { withCredentials: true });
    fetchTasks();
  };

  const createTask = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    await axios.post(tasksUrl, {
      name: formData.get('name'),
      description: formData.get('description'),
      due_date: formData.get('due_date'),
    }, { withCredentials: true });
    form.reset();
    fetchTasks();
  };

  const fetchSuggestions = async () => {
    const res = await axios.post('http://localhost:4000/ai/suggest', {}, { withCredentials: true });
    setSuggestions(res.data);
  };

  const promoteSuggestion = async (suggestion) => {
    await axios.post(tasksUrl, suggestion, { withCredentials: true });
    fetchTasks();
  };

  const getDueDateClass = (dueDate) => {
    if (!dueDate) return '';
    const today = new Date();
    const date = new Date(dueDate);
    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (date < today) return 'text-red-500';
    if (date.getTime() === today.getTime()) return 'text-yellow-500';
    return 'text-green-600';
  };

  return (
    <div className="p-4 max-w-4xl mx-auto sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button onClick={logout} className="text-sm bg-red-500 text-white px-4 py-2 rounded self-start sm:self-auto">Logout</button>
      </div>

      <form onSubmit={createTask} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
        <input name="name" placeholder="Task name" required className="border p-2 col-span-1 sm:col-span-3" />
        <input name="description" placeholder="Description" className="border p-2 col-span-1 sm:col-span-2" />
        <input name="due_date" type="date" className="border p-2 col-span-1" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 sm:col-span-3">Add Task</button>
      </form>

      <label className="block mb-2">
        <input
          type="checkbox"
          checked={activeOnly}
          onChange={e => setActiveOnly(e.target.checked)}
        /> Show active only
      </label>

      <ul className="space-y-2">
        {tasks.filter(t => !activeOnly || !t.completed).map(task => (
          <li key={task.id} className="border p-3 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex-1">
              <strong className={task.completed ? 'line-through' : ''}>{task.name}</strong>
              {task.description && <p className="text-sm">{task.description}</p>}
              {task.due_date && (
                <small className={`block ${getDueDateClass(task.due_date)}`}>
                  Due: {task.due_date}
                </small>
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => toggleComplete(task)} className="bg-green-500 text-white px-3 py-1 rounded">
                {task.completed ? 'Undo' : 'Done'}
              </button>
              <button onClick={() => deleteTask(task.id)} className="bg-gray-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">AI Task Suggestions</h2>
        <button onClick={fetchSuggestions} className="bg-purple-600 text-white px-4 py-2 mb-4 rounded">Get Suggestions</button>
        <ul className="space-y-2">
          {suggestions.map((sug, i) => (
            <li key={i} className="border p-3 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <strong>{sug.name}</strong>
                {sug.description && <p className="text-sm">{sug.description}</p>}
              </div>
              <button onClick={() => promoteSuggestion(sug)} className="bg-blue-600 text-white px-4 py-1 rounded">Add</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
