import * as storage from "https://cdn.skypack.dev/idb-keyval";

const checkboxen = document.querySelectorAll(".task-list-item-checkbox");

if (checkboxen.length) {
  for (let box of checkboxen) {
    // use the label text as the ID to store
    const label = box.labels[0].innerText.trim();
    // get saved checked state & update checkbox
    wasChecked(label).then((checked) => (box.checked = checked));
    // update saved state when checkbox is toggled
    box.addEventListener("input", (event) => {
      if (event.target.checked) {
        storage.set(label, true);
      } else {
        storage.del(label);
      }
    });
  }
}

function wasChecked(label) {
  return storage.get(label).then((previouslyChecked) => {
    if (previouslyChecked) {
      return true;
    } else {
      return false;
    }
  });
}
