"use strict";

/**
 * gravity bluebrint docify
 *
 * builds upon renewablefunding/blueprint-docify and makes it work for loads of repos
 *
 * call it without args and it will scan node_modules for documentable things
 */

var fs = require('fs');
var aglio = require('aglio');
var jade = require('jade');
var _ = require('lodash');

var readApiBlueprint = function (repo, callback) {
  var apiFile = __dirname + '/node_modules/' + repo + '/apiary.apib';
  fs.readFile(apiFile, 'utf8', function (err, data) {
    if (callback && typeof (callback) === "function") {
      callback(repo, data);
    } else {
      console.log("error: 329478234.75");
    }
  });
};

var renderApiBlueprint = function (repo, blueprint) {
  var template = 'default';
  var options = {
    template: template,
    locals: {
      _: require('lodash'),
      async: require('async')
    },
    filterInput: true
  };

  aglio.render(blueprint, options, function (err, html, warnings) {
    fs.mkdirSync(__dirname + '/build/' + repo);
    fs.writeFile(__dirname + '/build/' + repo + '/index.html', html, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("The file for " + repo + " was saved!");
      }
    });
  });
};

var findApiRepos = function(callback) {
  fs.readdir(__dirname + '/node_modules', function (err, files) {
    if (err) {
      console.log(err);
    } else {
      files = files.filter(function(file) {
        return fs.existsSync(__dirname + '/node_modules/' + file + '/apiary.apib');
      });
      var html = jade.compileFile(__dirname + '/templates/index.jade')({
        files: files,
        jsonFiles: JSON.stringify(files)
      });
      fs.writeFile(__dirname + '/build/index.html', html, function(err) {
        if (err) {
          console.log(err);
        }
      });
      _.each(files, function(file) {
        callback(file, renderApiBlueprint);
      });
    }
  });
};

fs.mkdirSync(__dirname + '/build/');
findApiRepos(readApiBlueprint);
