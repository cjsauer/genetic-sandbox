# Genetic Sandbox

[![Build Status](https://travis-ci.org/cjsauer/genetic-sandbox.svg?branch=master)](https://travis-ci.org/cjsauer/genetic-sandbox) [![Coverage Status](https://coveralls.io/repos/github/cjsauer/genetic-sandbox/badge.svg?branch=master)](https://coveralls.io/github/cjsauer/genetic-sandbox?branch=master)

A simulation of life itself.

##Contributing

Genetic Sandbox is a [node](http://nodejs.org/) application, so you'll need
to install that first.

### Getting up and running

Once you have node installed, you'll need to clone this repository to
your local machine using [Git](https://git-scm.com/):

```bash
git clone https://github.com/cjsauer/genetic-sandbox.git
```

As an alternative, you could also download and extract
[the zip file](https://github.com/cjsauer/genetic-sandbox/archive/master.zip).

Now you're ready to install the dependencies, and run the development server:

```bash
# These are necessary for using the Paper.js vector graphics library
sudo apt-get install libcairo2-dev libpango1.0-dev libssl-dev libjpeg62-dev libgif-dev
npm install
npm run dev
```

This will build the project, watch all files for any changes, and spin up a
server locally. The server/browser will be automatically refreshed when you
change a file.

Genetic Sandbox should now be running at
[http://localhost:8080](http://localhost:8080).

If you're only interested in building the project without running the
development server, just run `npm run build`.

### Tests

You *must* write tests for any code that you contribute! We are using the
[mocha](http://mochajs.org/) test runner, [istanbul](https://github.com/gotwarlost/istanbul)
for test coverage reports, and [travis-ci](https://travis-ci.org/cjsauer/genetic-sandbox)
for continous integration support.

To run the tests, you can use the following command:

```bash
npm test
```

This command will lint all the source files using [eslint](http://eslint.org/),
and then spit out a mocha test report.

You can also run `npm run coverage` to get an istanbul test coverage report.

### Docs

The documentation for this project is generated automatically from
[jsdoc](http://usejsdoc.org/index.html) comments in the source code and inserted
into a [jekyll](https://jekyllrb.com/) site to be served on Github Pages. To begin
generating documentation, you will first need to have [ruby](https://www.ruby-lang.org/en/)
installed ([rvm](https://rvm.io/) is a handy tool for managing ruby installations).

Once you have ruby, change into the `site/` directory and run `bundle install`.
This will install the ruby gems (dependencies) needed to build the jekyll site.
At this point you're ready to run `jekyll serve` to run a local server of the
documentation. To regenerate the docs from the source code run `npm run docs`
from the project root directory.Finally, to deploy the docs to production, run
`npm run docs-deploy`. This will merge the `site/` directory from the `master`
branch into the `gh-pages` branch and push it to Github, among some other
little cleanup operations.
