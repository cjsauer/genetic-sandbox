# Genetic Sandbox

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
npm install
npm run-script dev
```

This will build the project, watch all files for any changes, and spin up a
server locally. The server/browser will be automatically refreshed when you
change a file.

Genetic Sandbox should now be running at
[http://localhost:8080](http://localhost:8080).

If you're only interested in building the project without running the
development server, just run `npm run-script build`.
