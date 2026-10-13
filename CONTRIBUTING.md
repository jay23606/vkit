# Contributing to vkit

Never opened a pull request before? This guide is for you. You will fix **one** GitHub issue: follow the steps in order, and ask for help whenever you are stuck.

## Contents

1. [Before the workshop: one-time setup](#before-the-workshop-one-time-setup)
2. [Open a Git Bash terminal in VS Code](#open-a-git-bash-terminal-in-vs-code)
3. [Tell Git who you are (once)](#tell-git-who-you-are-once)
4. [Fix your issue, step by step](#fix-your-issue-step-by-step)
5. [Open the pull request](#open-the-pull-request)
6. [After you open it](#after-you-open-it)
7. [If GitHub says your branch has conflicts](#if-github-says-your-branch-has-conflicts)
8. [Using AI (Codex etc.)](#using-ai-codex-etc)
9. [Rules](#rules)
10. [Stuck? Common problems](#stuck-common-problems)
11. [Words you'll see](#words-youll-see)

## Before the workshop: one-time setup

Install these before the workshop. Each one takes a few minutes.

1. **Git.** Windows: install [Git for Windows](https://git-scm.com/downloads/win). It includes **Git Bash**, the terminal you will use. Keep the default options on every screen. Mac/Linux: follow https://git-scm.com/downloads.
2. **VS Code** from https://code.visualstudio.com.
3. **Docker Desktop** from https://www.docker.com/products/docker-desktop/. Windows: it runs on WSL 2. Let the installer set that up, and restart your laptop if it asks. You can skip signing in to Docker.
4. **Node.js**, the **LTS** version (24 or newer), from https://nodejs.org.
5. A **GitHub account** at https://github.com/signup.

If VS Code was open while you installed these, close it and open it again so it can find them.

## Open a Git Bash terminal in VS Code

**Windows:**

1. In VS Code, click **Terminal > New Terminal**.
2. In the terminal panel, click the **⌄** next to the **+** and pick **Git Bash**.
3. Make Git Bash the default, so every new terminal uses it: press `Ctrl+Shift+P`, type `Terminal: Select Default Profile`, and pick **Git Bash**.

**Mac/Linux:** click **Terminal > New Terminal**. The default terminal is fine.

Every command below goes in this terminal: paste it and press Enter.

### Check that everything installed

Print the version of each tool:

```bash
git --version
docker --version
node --version
```

Each line should print a version number. If one says `command not found`, install that tool again, then close and reopen VS Code.

## Tell Git who you are (once)

Git puts your name and email on every commit. Use the email address of your GitHub account.

Set your name:

```bash
git config --global user.name "Your Name"
```

Set your email:

```bash
git config --global user.email "you@example.com"
```

## Fix your issue, step by step

### 1. Claim your issue

Comment "I'd like to work on this" on the issue you were given. Wait until a maintainer assigns you or replies, so two people don't fix the same thing.

### 2. Fork the repo

Go to https://github.com/voss-labs/vkit, click **Fork** (top right), then **Create fork**. You now have your own copy at `https://github.com/<your-username>/vkit`.

### 3. Clone your fork

In the commands below, replace `<your-username>` with your GitHub username (without the `<` and `>`).

Go to your home folder:

```bash
cd ~
```

Download your fork to your laptop:

```bash
git clone https://github.com/<your-username>/vkit.git
```

Go into the project folder:

```bash
cd vkit
```

Open the project in VS Code:

```bash
code .
```

A new VS Code window opens with the project (if `code` is not found, use **File > Open Folder** and pick `vkit`). If it asks whether you trust the authors, click **Yes, I trust the authors**.

Open a terminal in this new window (**Terminal > New Terminal**). It starts inside the `vkit` folder. Use this window from now on.

### 4. Add the original repo as `upstream`

Your fork does not update by itself. `upstream` lets you pull in other people's merged changes later.

```bash
git remote add upstream https://github.com/voss-labs/vkit.git
```

### 5. Make a branch

A branch keeps your fix separate from `main`. Name it `fix-` plus a few words about your issue. For example, for an issue about the bill splitter accepting 0 people:

```bash
git checkout -b fix-bill-zero-people
```

Git Bash shows your branch name in brackets at the end of the prompt, like `(fix-bill-zero-people)`.

### 6. Run the site

Open Docker Desktop first, and wait until it says it is running. Look for its whale icon in the system tray (bottom right) on Windows, or the menu bar on Mac.

Start the site:

```bash
docker compose up
```

The first time, it downloads a few things, so give it a minute. When the text stops scrolling, open the page your issue is about, for example http://localhost:8080/tools/bill-splitter/.

Leave this terminal running. Open a second terminal with the **+** button in the terminal panel, and type all the next commands there. (Done for the day? Press `Ctrl+C` in the first terminal, on Mac too, to stop the site.)

### 7. See the problem yourself

Follow the steps in the issue until you see the bug (or notice the missing feature). If you can't, say so in the issue thread before you change anything.

### 8. Make your change

Open the files your issue names (from the Explorer on the left of VS Code) and change only what the issue asks for. Using Codex or another AI is fine; read [Using AI](#using-ai-codex-etc) first.

### 9. Save and check in the browser

Save with `Ctrl+S` (`Cmd+S` on Mac) and refresh the browser. If the page looks unchanged, do a hard refresh: `Ctrl+Shift+R` (`Cmd+Shift+R` on Mac).

Make sure the problem is gone and the rest of the tool still works.

### 10. Run the tests

Run all the automated tests:

```bash
npm test
```

Look for `fail 0` near the end. If a test fails, its name tells you what broke.

### 11. See what you changed

List the files you changed:

```bash
git status
```

You should only see the files you meant to change.

Show the exact lines you changed (press `q` to get back to the prompt):

```bash
git diff
```

### 12. Commit your change

Add the files you changed, by name. Naming them (instead of `git add .`) keeps anything else out of your PR, like a scratch file or editor settings.

```bash
git add tools/bill-splitter/bill.js
```

Save a snapshot (a commit) with a message that says what you changed:

```bash
git commit -m "Show an error when the number of people is 0"
```

A good message says what the change does: `Show an error when the number of people is 0`. A bad one tells the reader nothing: `fixed bug`, `update`, `changes`.

### 13. Push your branch

Send your branch to your fork on GitHub. The `-u` means next time a plain `git push` is enough.

```bash
git push -u origin fix-bill-zero-people
```

The first time you push:

- **Windows:** a window opens asking you to sign in to GitHub. Sign in (it usually goes through your browser), then come back to VS Code. The push finishes on its own.
- **Mac/Linux:** if Git asks for a username and password, press `Ctrl+C`. GitHub does not accept your account password here. Install the GitHub CLI from https://cli.github.com, then run the command below. Pick **GitHub.com**, then **HTTPS**, answer **Yes** to "Authenticate Git with your GitHub credentials?", and log in with your browser. Then run the push command again.

```bash
gh auth login
```

## Open the pull request

1. Go to your fork, `https://github.com/<your-username>/vkit`. A yellow banner shows your branch with a **Compare & pull request** button. Click it.
   No banner? Pick your branch from the branch menu, then click **Contribute** > **Open pull request**.
2. At the top, check where it goes: **base repository** must be `voss-labs/vkit` and **base** must be `main`. On the right you should see your fork and your branch.
3. Write a short title that says what you changed, like your commit message.
4. Copy this into the description and fill it in:

   ```markdown
   Closes #<issue number>

   ## What I changed
   <one or two sentences>

   ## How I tested it
   <what you tried in the browser, and that npm test passes>
   ```

   For example `Closes #12`. That line links your PR to the issue, and closes the issue when the PR is merged.
5. Click **Create pull request**. Well done, that's your first PR.

## After you open it

- **Checks waiting for approval.** At the bottom of your PR, the checks (CI) may say they are waiting for approval. That is normal for first-time contributors; a maintainer will start them.
- **A check failed.** Click **Details** next to it to see what went wrong.
- **A reviewer asks for changes.** Edit the files, then commit and push again on the same branch. Your PR updates by itself, so don't open a new one.

  ```bash
  # Add the files you changed (use your own file names)
  git add tools/bill-splitter/bill.js
  # Commit, saying what this fix changes
  git commit -m "Also reject a negative number of people"
  # Send it to your fork (and your PR)
  git push
  ```

- **Merged.** The live site, https://voss-labs.github.io/vkit/, updates within a couple of minutes.

## If GitHub says your branch has conflicts

A conflict means someone else changed the same lines as you, and their PR was merged first. That is normal when many people edit the same file, and it is fixable.

Commit your own work first (step 12). Then:

```bash
# Download the latest changes from the original repo
git fetch upstream
# Mix them into your branch
git merge upstream/main --no-edit
```

No `CONFLICT` in the output? Then just update your PR:

```bash
git push
```

Got a `CONFLICT`? Open the file it names in VS Code. Each conflict is highlighted, with buttons above it:

- **Accept Current Change** keeps your version.
- **Accept Incoming Change** keeps the version from `main`.
- **Accept Both Changes** keeps both. Then tidy the lines up so the code still makes sense.

Make sure no `<<<<<<<`, `=======` or `>>>>>>>` lines are left. Save, check the page, and run `npm test`. Then:

```bash
# Mark the file as fixed (use your own file name)
git add tools/bill-splitter/bill.js
# Finish the merge, keeping Git's ready-made message
git commit --no-edit
# Update your PR
git push
```

Not sure which lines to keep? Ask a volunteer. Everyone hits conflicts sooner or later.

## Using AI (Codex etc.)

AI tools are allowed and encouraged. But:

- Tell the AI which issue you are fixing (paste the issue text), and ask it to change only the files the issue names. For example:

  ```text
  I'm fixing this GitHub issue in the vkit repo: <paste the issue>.
  Change only tools/bill-splitter/bill.js. Explain each change you make.
  ```

- Run `git status` afterwards. If the AI changed files your issue doesn't mention, ask it to undo those changes.
- You must understand every line you submit.
- Test the change yourself, in the browser and with `npm test`.
- Reviewers will ask you to explain your change. "The AI wrote it" is not an answer.

## Rules

- One issue per person.
- One pull request per issue.
- Keep your pull request to that one issue. Spotted something else? Tell a maintainer instead of fixing it in the same PR.

## Stuck? Common problems

| What you see | What to do |
| --- | --- |
| `docker: command not found` or `Cannot connect to the Docker daemon` | Open Docker Desktop and wait until it says it is running. Then try again. |
| `port is already allocated`, or an error about `access permissions` (common on Windows) | Something else is using port 8080, maybe another `docker compose up`. Stop that program, or ask a maintainer. Don't commit a changed port. |
| The page didn't change after your edit | Check you saved, then hard refresh: `Ctrl+Shift+R` (`Cmd+Shift+R` on Mac). |
| A tool page is blank or its buttons do nothing after you double-clicked a file | Open http://localhost:8080 instead of the file. |
| `Please tell me who you are` | Do [Tell Git who you are](#tell-git-who-you-are-once). |
| `git push` asks for a password | See [step 13](#13-push-your-branch). |
| `node: command not found` or `npm: command not found` | Install Node.js, then close and reopen VS Code. |
| `fatal: not a git repository` | You are not in the project folder. Open a new terminal in the VS Code window that has `vkit` open. |
| The terminal fills with `~` lines and typing acts strange | Git opened the Vim editor. Press `Esc`, type `:wq`, and press Enter. |
| In Git Bash, a Docker command ending in a path like `/usr/share/...` fails with a strange `C:/Program Files/Git/...` path | Git Bash rewrote the path. Wrap the command after the image name in `sh -c "..."`, for example `docker run --rm vkit sh -c "ls -a /usr/share/nginx/html"`. |
| Docker won't install or start on your laptop | Ask a volunteer. Meanwhile, run `npx http-server . -c-1` in the `vkit` folder and open the address it prints. |

Still stuck? Ask in your issue thread, or ask a workshop volunteer. No question is too small.

## Words you'll see

- **Fork:** your own copy of someone else's repo, on GitHub.
- **Clone:** download a repo from GitHub to your laptop.
- **Branch:** a separate line of work, so your fix doesn't mix with `main`.
- **Commit:** a saved snapshot of your changes, with a message.
- **Push:** send your commits from your laptop to GitHub.
- **Pull request (PR):** asking a project to take your changes into its code.
- **Upstream:** the original repo you forked from, `voss-labs/vkit`.
- **Merge conflict:** two changes touched the same lines, and Git needs you to pick what to keep.
