import { Meteor } from 'meteor/meteor';
import { PythonShell } from 'python-shell';
import { Mongo } from 'meteor/mongo';

const PythonData = new Mongo.Collection('pythonData');

Meteor.startup(() => {
  const scripts = [
    '/home/dhruti.savaliya/my_cool_app/server/Script/mock_plots.py',
    '/home/dhruti.savaliya/my_cool_app/server/Script/mock_file.py',
  ];

  scripts.forEach((scriptPath) => {
    console.log(`Running Python script: ${scriptPath}`);

    const pythonShell = new PythonShell(scriptPath, {
      pythonPath: 'python3',
    });

    // Handle progress updates from stderr
    pythonShell.on('stderr', (stderr) => {
      console.log(`Progress update from ${scriptPath}:`, stderr);
    });

    // Handle final output from stdout
    pythonShell.on('message', async (message) => {
      console.log(`Python script result from ${scriptPath}:`, message);

      // Check if the message is valid JSON
      try {
        const data = JSON.parse(message);
        console.log(`Parsed data from ${scriptPath}:`, data);

        // Insert parsed data into MongoDB
        await PythonData.insertAsync({ data, scriptPath, createdAt: new Date() });
        console.log(`Data from ${scriptPath} inserted into MongoDB`);
      } catch (parseError) {
        // Handle non-JSON messages (e.g., progress updates or plain text)
        console.warn(`Non-JSON output from ${scriptPath}:`, message);
      }
    });

    // Handle script completion
    pythonShell.end((err) => {
      if (err) {
        console.error(`Error running Python script ${scriptPath}:`, err);
      } else {
        console.log(`Python script ${scriptPath} finished successfully.`);
      }
    });
  });

  // Publish the Python data
  Meteor.publish('pythonData', function () {
    return PythonData.find();
  });
});
