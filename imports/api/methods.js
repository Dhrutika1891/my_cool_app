import { Meteor } from "meteor/meteor";
import { PythonShell } from "python-shell";

Meteor.methods({
  runPythonScript(scriptName) {
    console.log(`Running script: /server/Script/${scriptName}`);
    return new Promise((resolve, reject) => {
      PythonShell.run(
        `/server/Script/${scriptName}`,
        { pythonPath: "python3" },
        (err, results) => {
          if (err) {
            console.error("PythonShell Error:", err);
            reject(err);
          } else {
            console.log("PythonShell Results:", results);
            try {
              const data = JSON.parse(results[0]); // Parse JSON output
              resolve(data);
            } catch (parseError) {
              console.error("JSON Parse Error:", parseError);
              reject(parseError);
            }
          }
        }
      );
    });
  },
});