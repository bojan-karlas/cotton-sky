function toggleHidden(query) {
    var elements = document.querySelectorAll(query);
    Array.prototype.forEach.call(elements, function (element) {
        element.classList.toggle("hidden");
    });
}

function ensureHidden(query) {
    var elements = document.querySelectorAll(query);
    Array.prototype.forEach.call(elements, function (element) {
        element.classList.add("hidden");
    });
}

function shareOrToggleHidden(query, title, url) {
    if (navigator.share) {
        navigator.share({
          title: title,
          url: url
        })
        .catch(console.error);
      } else {
        toggleHidden(query)
      }
}
