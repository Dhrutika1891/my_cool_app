import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PythonData = new Mongo.Collection('pythonData');

const ProgressChart = () => {
  const pythonData = useTracker(() => {
    Meteor.subscribe('pythonData');
    return PythonData.findOne();
  }, []);

  // Transform the data into a format suitable for the chart
  const chartData =
    pythonData?.x?.map((xValue, index) => ({
      x: xValue,
      y: pythonData.y[index],
    })) || [];

  return (
    <div>
      <h3>Python Data Chart:</h3>
      {chartData.length > 0 ? (
        <LineChart
          width={600}
          height={300}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" label={{ value: 'X-Axis', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Y-Axis', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      ) : (
        <p>No data yet</p>
      )}
    </div>
  );
};

export default ProgressChart;
