import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('https://project-management-backend-9.onrender.com', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch projects');
      }
    };
    fetchProjects();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://project-management-backend-9.onrender.com/api/auth/register',
        { name, description, deadline, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName('');
      setDescription('');
      setDeadline('');
      setStatus('Not Started');
      window.location.reload();
    } catch (err) {
      console.error('Failed to save project:', err);
      setError('Project creation failed');
    }
  };

  const chartData = [
    { name: 'Not Started', value: projects.filter(p => p.status === 'Not Started').length },
    { name: 'In Progress', value: projects.filter(p => p.status === 'In Progress').length },
    { name: 'Completed', value: projects.filter(p => p.status === 'Completed').length },
  ];

  const COLORS = ['#FFBB28', '#00C49F', '#0088FE'];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Project Dashboard</h1>

      <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
          required
          className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 focus:outline-none"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
          className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 focus:outline-none"
        ></textarea>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 focus:outline-none"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 focus:outline-none"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Create Project
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Project List</h2>
          <ul className="space-y-2">
            {projects.map((project) => (
              <li key={project._id} className="border-b pb-2">
                <div className="font-medium">{project.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-300">Status: {project.status}</div>
                <div className="text-sm text-gray-500 dark:text-gray-300">Deadline: {project.deadline?.substring(0, 10)}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Project Progress Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
