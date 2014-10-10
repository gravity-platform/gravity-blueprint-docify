# Development

## Usage

````bash
git clone https://github.com/gravity-platform/gravity-blueprint-docify.git
cd gravity-blueprint-docify
npm install
npm start
open http://localhost:8089/
````

## Adding Blueprints

Add a ``package.json`` to the repository containing your API blueprint.

````json
{
  "name": "graviton-api-example",
  "version": "0.0.1",
  "description": "example api for graviton",
  "repository": {
    "type": "git",
    "url": "https://github.com/libgraviton/graviton-api-example.git"
  },
  "license": "GPL",
  "homepage": "https://github.com/libgraviton/graviton-api-example"
}
````

Remember to use a version higher than 1.x if the API is currently being used on
production anywhere. You will be using this version string to convey meaning
about any further releases as per [semver specs](http://semver.org).

Add a webhook to the graviton-api-example repository and point it to ``http://graviton-apidoc.beta.scapp.io/github.hook``.

Do the follwing in your working copy of this repository.

````bash
git checkout -b feature/add-graviton-api-example develop
npm install libgraviton/graviton-api-example --save
git add package.json
git commit
git push origin feature/add-graviton-api-example
````

Next you may open a pull request against develop on github to tell us that we
should merge the addition. It will get deployed the next time we merge to
master.

## Deploy

This repo has been prepared for easy deploying on cloudfoundry. Please review
``manifest.yml`` and run ``cf push``.

If you wish to deploy this on other platforms you may run ``node build.js``
and deploy the ``build`` directory to a webserver that can serves static
files.
