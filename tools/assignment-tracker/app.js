// Assignment Tracker: add assignments, tick them off, delete them.
// The list is saved in the browser with localStorage.

const STORAGE_KEY = "vkit-assignments";

const input = document.getElementById("new-assignment");
const addButton = document.getElementById("add");
const list = document.getElementById("list");

// Each assignment looks like { text: "DBMS journal", done: false }
let assignments = [];

// Write the whole list to localStorage as JSON.
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
}

// Rebuild the list on the page from the assignments array.
function render() {
  list.innerHTML = "";

  assignments.forEach((assignment, index) => {
    const item = document.createElement("li");
    if (assignment.done) {
      item.classList.add("done");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = assignment.done;
    checkbox.addEventListener("change", () => {
      assignment.done = checkbox.checked;
      save();
      render();
    });

    const text = document.createElement("span");
    text.textContent = assignment.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      assignments.splice(index, 1);
      save();
      render();
    });

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });
}

// Add whatever is typed in the box as a new assignment.
function addAssignment() {
  assignments.push({ text: input.value, done: false });
  input.value = "";
  save();
  render();
}

addButton.addEventListener("click", addAssignment);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addAssignment();
  }
});

render();
