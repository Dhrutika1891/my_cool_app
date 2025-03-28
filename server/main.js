import { Meteor } from 'meteor/meteor';
import { PythonShell } from 'python-shell';
import { Mongo } from 'meteor/mongo';

const PythonData = new Mongo.Collection('pythonData');

Meteor.startup(() => {
  const scripts = [
    '/home/dhruti.savaliya/my_cool_app/server/Script/mock_file.py',
  ];

  scripts.forEach((scriptPath) => {
    console.log(`Running Python script: ${scriptPath}`);

    const pythonShell = new PythonShell(scriptPath, {
      pythonPath: 'python3',
    });

    pythonShell.on('message', async (message) => {
      console.log(`Python script result from ${scriptPath}:`, message);

      if (message.startsWith('Progress:')) {
        const progress = parseInt(message.replace('Progress:', '').replace('%', '').trim(), 10);
        console.log(`Parsed progress from ${scriptPath}:`, progress);

        await PythonData.insertAsync({ progress, scriptPath, createdAt: new Date() });
        console.log(`Progress data from ${scriptPath} inserted into MongoDB`);
      } else {
        try {
          const data = JSON.parse(message);
          console.log(`Parsed data from ${scriptPath}:`, data);

          await PythonData.insertAsync({ data, scriptPath, createdAt: new Date() });
          console.log(`Data from ${scriptPath} inserted into MongoDB`);
        } catch (parseError) {
          console.warn(`Non-JSON output from ${scriptPath}:`, message);
        }
      }
    });

    pythonShell.end((err) => {
      if (err) {
        console.error(`Error running Python script ${scriptPath}:`, err);
      } else {
        console.log(`Python script ${scriptPath} finished successfully.`);
      }
    });
  });
  

  Meteor.publish('pythonData', function () {
    return PythonData.find();
  });
});
