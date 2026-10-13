# vkit

Small tools for VIT students, built by students.

vkit is the practice repo for the VOSS Labs workshop at Vidyalankar Institute of Technology, Mumbai. It is a plain HTML, CSS and JavaScript site with a few small tools, and each workshop participant works on one of its GitHub issues.

Live site: https://voss-labs.github.io/vkit/

## Run it

Open [Docker Desktop](https://www.docker.com/products/docker-desktop/) first and wait until it says it is running. Then, in the `vkit` folder:

```bash
docker compose up
```

Open http://localhost:8080 in your browser.

Your project folder is shared with the container, so when you edit a file you only need to refresh the browser. If the page still looks old, do a hard refresh: `Ctrl+Shift+R` (`Cmd+Shift+R` on Mac).

To stop it, press `Ctrl+C` in that terminal (on Mac too), then run:

```bash
docker compose down
```

No Docker? If you have Node.js, this works too (type `y` if it asks to install `http-server`):

```bash
npx http-server . -c-1
```

It prints the address to open, usually http://localhost:8080. The `-c-1` turns off caching, so a normal refresh shows your edits.

Double-clicking `index.html` will **not** work: the tool pages use JavaScript modules, and browsers only load those from a server, not from a `file://` address.

## Run the tests

You need Node.js 20 or newer. There is nothing to install first (no `npm install`): the tests use Node's built-in test runner.

```bash
npm test
```

## What's in here

- `index.html`: the home page, with a card for every tool.
- `css/`: the one stylesheet that every page uses.
- `js/`: shared JavaScript that every page loads.
- `tools/<tool-name>/`: one folder per tool. It has the tool's `index.html` page, usually an `app.js` that makes the page work, and sometimes a small logic file (like `bunk.js`) kept separate so it can be tested.
- `tests/`: the automated tests that `npm test` runs.
- `Dockerfile`: builds a small nginx web server image with the site inside.
- `docker-compose.yml`: runs that image on port 8080 and shares your project folder with it.
- `.github/workflows/`: the GitHub Actions workflows described below.

## CI/CD

Every pull request is checked automatically by GitHub Actions: it runs the tests, and it builds the Docker image and checks that it really serves the site (`.github/workflows/ci.yml`).

Every merge to `main` puts the new version on the live site, using GitHub Pages (`.github/workflows/deploy.yml`).

## Contributing

First-timers are welcome. If you have never opened a pull request, this is a good place to start.

Read [CONTRIBUTING.md](CONTRIBUTING.md): it walks you through your first pull request, step by step.
