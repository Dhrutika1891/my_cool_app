import { Meteor } from 'meteor/meteor';
import { PythonShell } from 'python-shell';
import { Mongo } from 'meteor/mongo';

const PythonData = new Mongo.Collection('pythonData');

Meteor.startup(() => {
  const pythonShell = new PythonShell('/home/dhruti.savaliya/my_cool_app/server/Script/mock_plots.py', {
    pythonPath: 'python3',
  });

  // Handle progress updates from stderr
  pythonShell.on('stderr', (stderr) => {
    console.log("Progress update:", stderr); // Log progress updates
  });

  // Handle final JSON output from stdout
  pythonShell.on('message', async (message) => {
    console.log("Python script result:", message);

    // Parse and store the result in the MongoDB collection
    try {
      const data = JSON.parse(message);
      console.log("Parsed data:", data); // Log parsed data
      await PythonData.insertAsync({ data, createdAt: new Date() }); // Use insertAsync
      console.log("Data inserted into MongoDB");
    } catch (parseError) {
      console.error("Error parsing Python script result:", parseError);
    }
  });

  // Handle script completion
  pythonShell.end((err) => {
    if (err) {
      console.error("Error running Python script:", err);
    } else {
      console.log("Python script finished successfully.");
    }
  });

  // Publish the Python data
  Meteor.publish('pythonData', function () {
    return PythonData.find();
  });
});
