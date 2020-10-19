const main = document.querySelector("main");
const template = document.createElement("template");
template.innerHTML = `
  <form class="stack" style="--flow-space: var(--space5)">
    <h2>Check your progress</h2>
    <div class="stack2">
      <label for="username">
        Enter your Codewars username
      </label>
      <div class="hstack">
        <input id="username" placeholder="username" required>
        <button type="submit">
          Check
          <span id="codewarsLoading" hidden>...</span>
        </button>
      </div>
      <div id="codewarsError" style="color: var(--quarternary)" role="alert" aria-live="polite"></div>
    </div>
  </form>
  `;
const content = template.content.cloneNode(true);
content.querySelector("form").onsubmit = (event) => {
  event.preventDefault();
  const username = event.target.username.value;
  const errorEl = event.target.querySelector("#codewarsError");
  const loadingEl = event.target.querySelector("#codewarsLoading");
  errorEl.textContent = "";
  loadingEl.hidden = false;

  fetch(
    `https://cors-anywhere.herokuapp.com/https://www.codewars.com/api/v1/users/${username}/code-challenges/completed`
  )
    .then((response) => {
      if (!response.ok) {
        const error = new Error("HTTP Error");
        error.status = response.status;
        throw error;
      }
      return response.json();
    })
    .then(({ data }) => {
      toggleCompleted(data);
    })
    .catch((error) => {
      const message =
        error.status === 404 ? "User not found" : "Something went wrong";
      errorEl.textContent = message;
    })
    .finally(() => {
      loadingEl.hidden = true;
    });
};
main.append(content);

function toggleCompleted(completed) {
  for (let kata of completed) {
    // a link with href containing the ID means it's in the list
    const link = main.querySelector(`a[href*="${kata.id}"]`);
    if (!link) continue;
    const checkbox = link.previousElementSibling;
    if (!checkbox) continue;
    checkbox.checked = true;
    // pretend the user checked it
    // so our "save checkbox state" handler runs
    checkbox.dispatchEvent(new Event("input"));
  }
}
