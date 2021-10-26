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

function ensureDoesNotHaveClass(query, className) {
  var elements = document.querySelectorAll(query);
  Array.prototype.forEach.call(elements, function (element) {
      element.classList.remove(className);
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

document.addEventListener("DOMContentLoaded", function(event) {
  var elements = document.querySelectorAll("body>header>nav .selected");

  Array.prototype.forEach.call(elements, function (element) {
    element.addEventListener("click", function(event) {
      toggleClass("body>header>nav ul", 'dropdown');
      event.stopPropagation();
      event.preventDefault();
    }, false);
  });

  var elements = document.querySelectorAll("body");
  Array.prototype.forEach.call(elements, function (element) {
    element.addEventListener("click", function(event) {
      ensureDoesNotHaveClass("body>header>nav ul", 'dropdown');
    }, false);
  });
});
