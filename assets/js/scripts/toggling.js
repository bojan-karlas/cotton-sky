function toggleClass(query, className) {
    var elements = document.querySelectorAll(query);
    Array.prototype.forEach.call(elements, function (element) {
        element.classList.toggle(className);
    });
}

function ensureHasClass(query, className) {
    var elements = document.querySelectorAll(query);
    Array.prototype.forEach.call(elements, function (element) {
        element.classList.add(className);
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
        toggleClass(query, "hidden")
      }
}

var elements = document.querySelectorAll("body>header>nav .selected");
Array.prototype.forEach.call(elements, function (element) {
  element.addEventListener("click", function(event) {
    toggleClass('dropdown');
    event.preventDefault();
  }, false);
});