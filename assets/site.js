(function () {
  function setExpanded(button, menu, expanded) {
    if (!button || !menu) return;
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
    menu.classList.toggle("active", expanded);
  }

  window.toggleMobileMenu = function (trigger) {
    var menu = document.getElementById("mobileMenu");
    var button = trigger || document.querySelector(".hamburger");
    if (!menu || !button) return;
    var open = button.getAttribute("aria-expanded") === "true";
    setExpanded(button, menu, !open);
  };

  document.addEventListener("DOMContentLoaded", function () {
    var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (!page || page === "") page = "index.html";
    document.querySelectorAll(".desktop-nav a, #mobileMenu a").forEach(function (link) {
      var href = (link.getAttribute("href") || "").toLowerCase();
      if (href === page) {
        link.setAttribute("aria-current", "page");
        link.classList.add("is-current");
      }
    });

    var hamburger = document.querySelector(".hamburger");
    var menu = document.getElementById("mobileMenu");
    if (hamburger && menu) {
      hamburger.addEventListener("click", function () {
        window.toggleMobileMenu(hamburger);
      });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") setExpanded(hamburger, menu, false);
      });
    }
  });
})();
