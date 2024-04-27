var fs = require("fs");

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        logCommand({logFilename, funtype, info }) {
          let html = `<li><span><h2> ${funtype} event</h2>`;
          if (!!info) html += `<p><strong>Details: </strong> ${info}</p>`;
          html += "</span></li>";
          fs.appendFile(logFilename, html, (err) => {
            if (err) throw err;
            console.log(`Logged #${funtype}`);
          });
          return null;
        },
        logStart({ logFilename ,type, url, seed }) {
          // Modificar para recibir los parámetros
          var currentdate = new Date(Date.now());
          var date =
            currentdate.getDay() +
            "/" +
            currentdate.getMonth() +
            "/" +
            currentdate.getFullYear();
          var time =
            currentdate.getHours() +
            ":" +
            currentdate.getMinutes() +
            ":" +
            currentdate.getSeconds();
          fs.appendFile(
            logFilename,
            `<html><body><h1>Execution of ${type} in <a href = ${url}>${url}</a></h1><h2>Date of execution: ${date} at ${time}</h2><h2>Seed:${seed}</h2><ol type = '1'>`,
            (err) => {
              if (err) throw err;
              console.log(`Log started`);
            }
          );
          return null;
        },
        logEnd({logFilename}) {
          fs.appendFile(logFilename, "</ol></body></html>", (err) => {
            if (err) throw err;
            console.log(`Finished logging`);
          });
          return null;
        },
        logPctNo100({logFilename}) {
          fs.appendFile(
            logFilename,
            `<h1>Error:</h1><p>El porcentaje de eventos configurados no suma 100, sino ${pcg}</p>`,
            (err) => {
              if (err) throw err;
              console.log(`Logged error`);
            }
          );
          return null;
        },
        genericLog({ message }) {
          console.log(message);
          return null;
        },
        genericReport({ logFilename,html }) {
          fs.appendFile(logFilename, html, (err) => {
            if (err) throw err;
            console.log(`Logged error`);
          });
          return null;
        },
      });
    },
    video: true,
    projectId: "TSDL-Monkey-with-cypress",
    baseUrl: "http://localhost:2368/",
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 120000,
    videosFolder: "./results",
    env: {
      monkey: {
        appName: "Ghost - test",
        events: 50,
        delay: 300,
        seed: 6652,
        pctClicks: 19,
        pctScroll: 17,
        pctSelectors: 16,
        pctKeys: 16,
        pctSpKeys: 16,
        pctPgNav: 16,
      },
      smartMonkey: {
        appName: "Ghost - test",
        events: 50,
        delay: 500,
        seed: 3496,
        pctClicks: 12,
        pctScroll: 12,
        pctSelectors: 12,
        pctKeys: 12,
        pctSpKeys: 12,
        pctPgNav: 12,
        pctBwChaos: 12,
        pctActions: 16,
      },
    },
  },
};
