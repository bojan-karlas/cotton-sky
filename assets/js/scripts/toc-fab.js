// Floating table-of-contents button (FAB) for narrow / mobile viewports.
// It mirrors the top-level (h2) entries of the desktop TOC that tocbot builds,
// and reuses tocbot's scroll spy to keep the resting caption in sync with the
// heading currently in view.
window.addEventListener("load", function () {
    var toc = document.querySelector(".js-toc");
    var fab = document.querySelector(".toc-fab");
    if (!toc || !fab) {
        return;
    }

    var listContainer = fab.querySelector(".toc-fab-list");
    var topList = toc.querySelector(":scope > ul");
    var topLinks = topList ? topList.querySelectorAll(":scope > li > a") : [];
    if (topLinks.length === 0) {
        return;
    }

    // Build the FAB menu from tocbot's top-level entries.
    var ul = document.createElement("ul");
    Array.prototype.forEach.call(topLinks, function (link) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = link.getAttribute("href");
        // Remember tocbot's real TOC link so a FAB tap can delegate to it and
        // reuse tocbot's smooth-scroll animation.
        a.tocLink = link;
        var span = document.createElement("span");
        span.textContent = link.textContent;
        a.appendChild(span);
        li.appendChild(a);
        ul.appendChild(li);
    });
    listContainer.appendChild(ul);
    var items = ul.querySelectorAll("li");

    // Reuse tocbot's active-link tracking: map whatever heading it marks active
    // to its enclosing top-level (h2) entry.
    function activeTopHref() {
        var active = toc.querySelector(".toc-link.is-active-link");
        if (!active) {
            return topLinks[0].getAttribute("href");
        }
        var li = active.closest("li");
        while (li && li.parentElement !== topList) {
            li = li.parentElement.closest("li");
        }
        var anchor = li ? li.querySelector(":scope > a") : null;
        return anchor ? anchor.getAttribute("href") : topLinks[0].getAttribute("href");
    }

    function updateActive() {
        var href = activeTopHref();
        Array.prototype.forEach.call(items, function (li) {
            var a = li.querySelector("a");
            li.classList.toggle("is-active", a.getAttribute("href") === href);
        });
    }
    updateActive();

    // Now that a caption is in place, reveal the FAB (avoids an empty-pill
    // flash during page load; pages with no headings never reach this point).
    fab.classList.add("toc-ready");

    // Re-sync whenever tocbot moves its active-link class as the page scrolls.
    var observer = new MutationObserver(updateActive);
    observer.observe(toc, { subtree: true, attributes: true, attributeFilter: ["class"] });

    // Tap the pill to open; tap an item to jump to it and close.
    fab.addEventListener("click", function (event) {
        if (!fab.classList.contains("toc-open")) {
            fab.classList.add("toc-open");
            var active = ul.querySelector("li.is-active");
            if (active) {
                active.scrollIntoView({ block: "nearest" });
            }
            event.preventDefault();
        } else if (event.target.closest("a")) {
            fab.classList.remove("toc-open");
            var itemAnchor = event.target.closest("a");
            if (itemAnchor.tocLink) {
                // Delegate to tocbot's real link so the jump animates the same
                // way as the desktop TOC instead of doing an instant jump.
                event.preventDefault();
                itemAnchor.tocLink.click();
            }
        }
        event.stopPropagation();
    });

    // Tap anywhere outside the FAB to close it.
    document.addEventListener("click", function (event) {
        if (!fab.contains(event.target)) {
            fab.classList.remove("toc-open");
        }
    });
});
