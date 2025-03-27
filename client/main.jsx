import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import React from "react";
import ReactDOM from "react-dom";
import { useTracker } from 'meteor/react-meteor-data';

const PythonData = new Mongo.Collection("pythonData");

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

const App = () => {
  return (
    <div>
      <ProgressChart />
    </div>
  );
};

Meteor.startup(() => {
  // Render the App component into the root element
  const root = document.createElement("div");
  document.body.appendChild(root);
  ReactDOM.render(<App />, root);
});
