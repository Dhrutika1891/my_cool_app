import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo';

const PythonData = new Mongo.Collection('pythonData');

const ProgressChart = () => {
  const pythonData = useTracker(() => {
    Meteor.subscribe('pythonData');
    return PythonData.findOne();
  }, []);

  return (
    <div>
      <h3>Python Data:</h3>
      {pythonData ? (
        <pre>{JSON.stringify(pythonData.data, null, 2)}</pre>
      ) : (
        <p>No data yet</p>
      )}
    </div>
  );
};

export default ProgressChart;
