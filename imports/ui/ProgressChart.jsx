import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
      <h3 style={{ textAlign: 'center', color: '#4a90e2' }}>Real-Time Progress Area Chart</h3>
      {chartData.length > 0 ? (
        <div style={{ width: '100%', height: '500px' }}> {/* Full width and increased height */}
          <ResponsiveContainer>
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                dataKey="name"
                label={{ value: 'Steps', position: 'insideBottom', offset: -10, fill: '#4a90e2' }}
                tick={{ fill: '#4a90e2' }}
              />
              <YAxis
                label={{ value: 'Progress (%)', angle: -90, position: 'insideLeft', fill: '#4a90e2' }}
                tick={{ fill: '#4a90e2' }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#4a90e2', color: '#fff', borderRadius: '5px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Area
                type="monotone"
                dataKey="progress"
                stroke="#4a90e2"
                fill="url(#colorGradient)"
                strokeWidth={3}
                animationDuration={500} // Smooth animation for dynamic updates
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4a90e2" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4a90e2" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#999' }}>Add some Data to see progress</p>
      )}
    </div>
  );
};

export default ProgressChart;
