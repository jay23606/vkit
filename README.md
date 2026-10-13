# vkit

Small tools for VIT students, built by students.

vkit is the practice repo for the VOSS Labs workshop at Vidyalankar Institute of Technology, Mumbai. It is a plain HTML, CSS and JavaScript site with a few small tools, and each workshop participant works on one of its GitHub issues.

Live site: (link added after the first deploy)

## Run it

With Docker:

```bash
docker compose up
```

Then open http://localhost:8080 in your browser. Stop it with `Ctrl+C`.

The project folder is mounted into the container, so when you edit a file you only need to refresh the browser.

Any static file server works too, for example:

```bash
npx serve .
```

Opening `index.html` by double-clicking it will **not** work, because the tool pages use JavaScript modules, and browsers only load those from a server.

## Run the tests

You need Node.js 20 or newer.

```bash
npm test
```

## CI/CD

GitHub Actions runs on every pull request: it runs the tests and checks that the Docker image builds and serves the site (see `.github/workflows/ci.yml`).

Every merge to `main` redeploys the live site on GitHub Pages (see `.github/workflows/deploy.yml`).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before you start.
