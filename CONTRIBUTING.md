# Contributing to vkit

Thanks for helping! Each person works on **one** issue. Here is the full flow.

## Steps

1. **Claim your issue.** Comment on the issue you were given, so others know you are on it.
2. **Fork** this repo on GitHub (the "Fork" button, top right).
3. **Clone your fork:**

   ```bash
   git clone https://github.com/<your-username>/vkit.git
   cd vkit
   ```

4. **Make a branch** for your fix:

   ```bash
   git checkout -b fix-<short-name>
   ```

   For example: `git checkout -b fix-bill-zero-people`.

5. **Run the site and see the problem yourself first:**

   ```bash
   docker compose up
   ```

   Open http://localhost:8080 and follow the steps in the issue until you can see the bug (or the missing feature).

6. **Make your change.**
7. **Check it in the browser.** Refresh the page and make sure the problem is gone and nothing else broke.
8. **Run the tests:**

   ```bash
   npm test
   ```

9. **Commit** with a clear message that says what you changed:

   ```bash
   git add .
   git commit -m "Show an error when the number of people is 0"
   ```

10. **Push** your branch to your fork:

    ```bash
    git push origin fix-<short-name>
    ```

11. **Open a pull request** on GitHub. In the description, write `Closes #<issue number>` (for example `Closes #12`), so the issue closes when your PR is merged.

## Using AI (Codex etc.)

AI tools are allowed and encouraged. But:

- You must understand every line you submit.
- Test the change yourself, in the browser and with `npm test`.
- Reviewers will ask you to explain your change. "The AI wrote it" is not an answer.

## Rules

- One issue per person.
- Keep your pull request to that one issue. Don't fix other things in the same PR.
