import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import ProgressChart from "../imports/ui/ProgressChart"; // Import the ProgressChart component

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
