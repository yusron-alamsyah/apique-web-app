import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Task {
  id: number;
  title: string;
  status: 'pending' | 'done';
  created_at: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks', {
          headers: {
            'Accept': 'application/json',
          },
        });
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="container mt-5">
      <h1 className="text-center mb-4">Task List</h1>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item mb-3">
            <h2 className="h5">{task.title}</h2>
            <p className={`badge ${task.status === 'done' ? 'bg-success' : 'bg-warning'}`}>
              Status: {task.status}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
