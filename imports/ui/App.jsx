import React, { useState, useEffect } from 'react';
import { Info } from './Info.jsx';
import { ProgressChart } from './ProgressChart.jsx';
import { Tasks } from '../api/tasks.js';

export const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksList = Tasks.find().fetch();
    setTasks(tasksList);
  }, []);

  return (
    <div>
      <h1>Welcome to Hackathon!</h1>
      <ProgressChart/>
      <Info/>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};
