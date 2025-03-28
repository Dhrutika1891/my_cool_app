import { Meteor } from 'meteor/meteor';
import { PythonShell } from 'python-shell';
import { Mongo } from 'meteor/mongo';

const PythonData = new Mongo.Collection('pythonData');

Meteor.startup(() => {
  const scripts = [
    '/home/dhruti.savaliya/my_cool_app/server/Script/mock_file.py',
  ];

  scripts.forEach((scriptPath) => {
    const pythonShell = new PythonShell(scriptPath, {
      pythonPath: 'python3',
    });

    pythonShell.on('message', async (message) => {
      console.log(`Python script result`, message);

      if (message.startsWith('Progress:')) {
        const progress = parseInt(message.replace('Progress:', '').replace('%', '').trim(), 10);
        Meteor.call('addProgressData', progress);
      } else {
        try {
          const data = JSON.parse(message);
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
        console.log(`Progress data from ${scriptPath} inserted into MongoDB`);
      }
    });
  });
});

Meteor.methods({
  async addProgressData(progress) {
    if (typeof progress !== 'number' || progress < 0 || progress > 100) {
      throw new Meteor.Error('invalid-progress', 'Progress must be a number between 0 and 100.');
    }

    await PythonData.insertAsync({ progress, createdAt: new Date() });
    console.log(`Progress: ${progress}% added to the database.`);
  },
});

Meteor.publish('pythonData', function () {
  return PythonData.find();
});
