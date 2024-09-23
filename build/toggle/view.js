/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/toggle/view.js ***!
  \****************************/
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log("Hello World! (from cjp-blocks-toggle block)");
function handleToggles() {
  const allToggles = document.querySelectorAll(".toggle-title");
  allToggles.forEach(toggle => {
    toggle.addEventListener("click", e => {
      //
      const target = e.target;
      const targetToggle = target.closest(".toggle-single");
      const content = targetToggle.querySelector(".toggle-content");
      if (!targetToggle.classList.contains("open")) {
        targetToggle.classList.add("open");
        const newHeight = parseInt(targetToggle.getAttribute("data-open")) + 6 * 8;
        targetToggle.style.height = `${newHeight}px`;
        content.classList.add("visible");
      } else {
        targetToggle.classList.remove("open");
        const newHeight = parseInt(targetToggle.getAttribute("data-close")) + 4 * 8;
        targetToggle.style.height = `${newHeight}px`;
        setTimeout(() => {
          content.classList.remove("visible");
        }, 500);
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", handleToggles);
function calculateToggleHeights() {
  //
  const toggleSingles = document.querySelectorAll(".toggle-single");
  toggleSingles.forEach(toggleSingle => {
    //
    const toggleTitle = toggleSingle.querySelector(".toggle-title");
    const toggleContent = toggleSingle.querySelector(".toggle-content");
    const closedHeight = toggleTitle.offsetHeight;
    let openHeight = toggleTitle.offsetHeight;
    if (toggleContent && !toggleContent.classList.contains("hidden")) {
      toggleContent.style.display = "block";
      openHeight += toggleContent.offsetHeight;
      toggleContent.style.display = "";
    }
    toggleSingle.setAttribute("data-close", closedHeight.toString());
    toggleSingle.setAttribute("data-open", openHeight.toString());
    toggleSingle.style.height = `${parseInt(toggleSingle.getAttribute("data-close")) + 4 * 8}px`;
  });
}
document.addEventListener("DOMContentLoaded", calculateToggleHeights);
window.addEventListener("resize", () => {
  setTimeout(calculateToggleHeights, 500);
});
/* eslint-enable no-console */
/******/ })()
;
//# sourceMappingURL=view.js.map