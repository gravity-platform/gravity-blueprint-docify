var connect = require('connect');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser')
var _ = require("lodash");
var child_process = require('child_process');

var port = typeof process.env.VCAP_APP_PORT !== 'undefined' ? process.env.VCAP_APP_PORT : '8089'; 
connect()
  .use(serveStatic(__dirname + '/build/'))
  .use(bodyParser.json())
  .use(function(req, res) {
    if (req.url == '/github.hook') {

      console.log("Updating " + req.body.repository.name);
      var update = child_process.spawn("npm", ["update", req.body.repository.name], { cwd: __dirname });

      update.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
      });
      update.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
      });
      update.on('close', function(code) {
        console.log('update process exited with code ' + code);
        var build = child_process.fork(__dirname + "/build.js");
        build.on('close', function(code) {
          console.log('build process exited with code ' + code);
        });
      });
      res.end('OK\n');
    }
  })
  .listen(port);

console.log("Webserver started on port " + port);
