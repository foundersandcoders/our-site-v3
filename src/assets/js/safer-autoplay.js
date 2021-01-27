// Wrap around a video you want to autoplay.
// Don't set the autoplay attribute,
// since that can't respect user preferences.
// e.g. <safer-autoplay><video src="vid.mp4"></video></safer-autoplay>

class SaferAutoplay extends HTMLElement {
  connectedCallback() {
    const video = this.querySelector("video");

    // check if user opted out of motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion)");

    // play/pause depending on preference
    function checkMotion() {
      motionQuery.matches ? video.pause() : video.play();
    }

    // check on first load
    checkMotion();

    // re-check when preferences change
    motionQuery.addEventListener("change", checkMotion);
  }
}

window.customElements.define("safer-autoplay", SaferAutoplay);
