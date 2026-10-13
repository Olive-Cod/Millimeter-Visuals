/* =========================================================
   MILLIMETER VISUALS — PHOTO PROTECTION
A single file for all pages. Add a line
in the <head> of each HTML:

<script src="js/protect.js" defer></script>

What it does:
- Blocks right-click and the "Save image" menu on photos.
- Blocks dragging photos to the desktop.
- Blocks "hold to save" on mobile.
- Hides photos if someone prints or saves the page as a PDF.
- Adds the copyright notice in the footer.

What it DOES NOT do (no website can): prevent screenshots or hide photos in "Inspect".
========================================================= */

(function () {
  "use strict";

  // Areas where there are photos (includes the layers on top of the photos))
  var MEDIA = [
    "img",
    ".hero",
    ".hgallery",
    ".gallery-cover",
    ".slider-card",
    ".strip-item",
    ".lightbox",
    ".slide-media",
    ".founder-media",
    ".intro"
  ].join(",");

  // 1) Styles: no drag, no selection, and no menu when holding down
  var style = document.createElement("style");
  style.setAttribute("data-protect", "");
  style.textContent =
    "img{-webkit-user-drag:none;user-drag:none;}" +
    MEDIA + "{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;}" +
    "@media print{img,.hero-slides,.cover-media,.slide-media{display:none!important;}}";
  document.head.appendChild(style);

  // 2) Right-click on photos (and on the layers covering them)
  document.addEventListener("contextmenu", function (event) {
    var el = event.target;
    if (el && el.closest && el.closest(MEDIA)) {
      event.preventDefault();
    }
  }, true);

  // 3) Drag a photo off the page
  document.addEventListener("dragstart", function (event) {
    var el = event.target;
    if (el && el.tagName === "IMG") {
      event.preventDefault();
    }
  }, true);

  // 4) Copyright notice in the footer
  function addNotice() {
    var legal = document.querySelector(".footer-bottom > span");
    if (!legal || legal.hasAttribute("data-notice")) return;
    legal.setAttribute("data-notice", "");
    legal.textContent = legal.textContent.trim() +
      "";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addNotice);
  } else {
    addNotice();
  }
})();
