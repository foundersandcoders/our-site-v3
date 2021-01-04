class Restraint extends HTMLElement {
  connectedCallback() {
    const form = this.querySelector("form");
    form.setAttribute("novalidate", "");
    form.querySelectorAll("input, select, textarea").forEach(initFields);
    form.addEventListener("submit", handleSubmit);
    form.addEventListener("invalid", handleInvalid, true);
    form.addEventListener("input", handleInput);
    if (this.getAttribute("validateonblur") !== null) {
      form.addEventListener("blur", handleBlur, true);
    }
  }
}

function initFields(field) {
  // inputs should start off valid
  field.setAttribute("aria-invalid", "false");
}

function handleSubmit(event) {
  // the form should not submit if there are any invalid fields
  // this mirrors the default form behaviour (without `novalidate`)
  const allValid = event.target.checkValidity();
  if (!allValid) {
    event.preventDefault();
  }
}

function handleInvalid(event) {
  const field = event.target;
  if (!field.id && !field.name) {
    console.warn(field, "is missing an ID or name attribute"); // eslint-disable-line no-console
  }
  // mark the input as invalid
  setValidity(field, false);

  // e.g. `required` -> "valueMissing", `minLength` -> "tooShort"
  const validity = getValidityKey(field);
  // get custom message from the element, or use browser default
  const message = field.dataset[validity] || field.validationMessage;

  const errorEl = getError(field);
  if (errorEl) errorEl.textContent = message;
}

function getError(field) {
  let errorId = field.id + "Error";
  if (isMulti(field)) {
    const id = field.id.replace(/\d+$/, "");
    errorId = id + "Error";
  }
  const error = field.form.querySelector("#" + errorId);
  if (!error) console.warn(`Cannot find error element for ${field}`); // eslint-disable-line no-console
  return error;
}

function isMulti(field) {
  return ["radio", "checkbox"].includes(field.type);
}

function getValidityKey(input) {
  // ValidityState inteface isn't iterable
  // afaict this is the only way to find out which constraint failed
  for (let key in input.validity) {
    if (input.validity[key]) return key;
  }
}

function handleInput(event) {
  const field = event.target;
  // mark the field as valid since the user is editing
  setValidity(field, true);
  const errorEl = getError(field);
  // clear any previous error
  if (errorEl) errorEl.textContent = "";
}

function handleBlur(event) {
  event.target.checkValidity();
}

function setValidity(field, valid) {
  field.setAttribute("aria-invalid", !valid);
  // change all matching radio/checkboxes too
  if (isMulti(field)) {
    field.form.querySelectorAll(`[name="${field.name}"]`).forEach((i) => {
      i.setAttribute("aria-invalid", !valid);
    });
  }
}

window.customElements.define("restrain-form", Restraint);
