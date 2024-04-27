
// module.exports = (on, config) => {
    //   on('file:preprocessor', async (file) => {
        //     if (file.filePath.includes('cypress/support/index.js')) {
            //       const configFile = path.resolve('config.json')
            //       const configOverrides = await fs.readJson(configFile)
            //       config.env = Object.assign({}, config.env, configOverrides)
            //     }
            //     return file
            //   })
            // }
            
            
const fs = require('fs-extra')
const path = require('path')
const LOG_FILENAME = "./results/monkey-execution.html"
var fs = require('fs');


module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  console.log('Loading Cypress plugins...');
  
  on('task', {
    logCommand({ funtype, info}){
      let html = `<li><span><h2> ${funtype} event</h2>`
      if(!!info) html+=`<p><strong>Details: </strong> ${info}</p>`
      html += "</span></li>"
      fs.appendFile(LOG_FILENAME, html, (err) => {
          if (err) throw err
          console.log(`Logged #${funtype}`)
      })
      return null
    },
    logStart({ type, url, seed }) { // Modificar para recibir los parámetros
      var currentdate = new Date(Date.now());
      var date = currentdate.getDay() + "/" + currentdate.getMonth() + "/" + currentdate.getFullYear();
      var time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      fs.appendFile(LOG_FILENAME, `<html><body><h1>Execution of ${type} in <a href = ${url}>${url}</a></h1><h2>Date of execution: ${date} at ${time}</h2><h2>Seed:${seed}</h2><ol type = '1'>`, (err) => {
        if (err) throw err
        console.log(`Log started`)
      })
      return null
    },
    logEnd(){
      fs.appendFile(LOG_FILENAME, "</ol></body></html>", (err) => {
        if (err) throw err
        console.log(`Finished logging`)
      })
      return null
    },
    logPctNo100(){
      fs.appendFile(LOG_FILENAME, `<h1>Error:</h1><p>El porcentaje de eventos configurados no suma 100, sino ${pcg}</p>`, (err) => {
        if (err) throw err
        console.log(`Logged error`)
      })
      return null
    },
    genericLog({message}){
      console.log(message)
      return null
    },
    genericReport({html}){
      fs.appendFile(LOG_FILENAME, html, (err) => {
        if (err) throw err
        console.log(`Logged error`)
      })
      return null
    }
  });

  require('cypress-log-to-output').install(on, (type, event) => {
    if(type === 'browser'){
      fs.appendFile(LOG_FILENAME, `<p><strong>Browser event (source: ${event.source}): </strong>${event.text}</p>`, (err) => {
        if (err) throw err
        console.log(`Finished logging`)
      })
    }
    else if (type === 'console'){
      fs.appendFile(LOG_FILENAME, `<p><strong>Console ${event.type} event. Trace: </strong>${(!!event.stackTrace)?event.stackTrace.description:"none"}</p>`, (err) => {
        if (err) throw err
        console.log(`Finished logging`)
      })
    }
    return true;
  });
}


