// Scroll-to-top button: appears once the page has been scrolled down roughly
// one viewport, and zooms out again near the top. Shares the bottom-right stack
// with the TOC FAB and reuses the same easing curve (handled in CSS).
window.addEventListener("load", function () {
    var button = document.querySelector(".scroll-top");
    if (!button) {
        return;
    }

    function update() {
        var scrolled = window.scrollY || document.documentElement.scrollTop;
        button.classList.toggle("visible", scrolled > window.innerHeight);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
});
