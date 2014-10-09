var connect = require('connect');
var serveStatic = require('serve-static');
var port = typeof process.env.VCAP_APP_PORT !== 'undefined' ? process.env.VCAP_APP_PORT : '8089'; 
connect().use(serveStatic(__dirname + '/build/')).listen(port);
