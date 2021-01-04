class TextDate extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector("input");
    this.input.addEventListener("blur", this.confirmDate.bind(this));
    this.output = document.createElement("output");
    this.output.setAttribute("aria-live", "assertive");
    this.output.classList.add("info");
    this.append(this.output);
  }
  confirmDate() {
    // need to grab constituent parts to support dd/mm/yyyy
    // regex supports either slashes or hyphens as separator
    const [day, month, year] = this.input.value.split(/[/-]/);
    const date = new Date(year, month - 1, day);
    if (date.toString() === "Invalid Date") {
      this.input.setCustomValidity("Please enter a valid date");
      this.input.checkValidity();
    } else {
      // formats to human-readable string like "8 March 1991"
      const formatted = date.toLocaleDateString("en-gb", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      this.output.textContent = `You entered: ${formatted}`;
    }
  }
}

window.customElements.define("text-date", TextDate);
