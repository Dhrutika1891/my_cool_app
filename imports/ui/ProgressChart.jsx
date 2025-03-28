import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PythonData = new Mongo.Collection('pythonData');

const ProgressChart = () => {
  // Subscribe to the pythonData collection and fetch progress updates
  const progressData = useTracker(() => {
    Meteor.subscribe('pythonData');
    return PythonData.find({ progress: { $exists: true } }, { sort: { createdAt: 1 } }).fetch();
  }, []);

  // Transform the progress data into a format suitable for the chart
  const chartData = progressData.map((entry, index) => ({
    name: `Step ${index + 1}`,
    progress: entry.progress,
  }));

  return (
    <div>
      <h3>Real-Time Progress Chart</h3>
      {chartData.length > 0 ? (
        <LineChart
          width={600}
          height={300}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: 'Steps', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Progress (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="progress" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      ) : (
        <p>No progress data available</p>
      )}
    </div>
  );
};

export default ProgressChart;
