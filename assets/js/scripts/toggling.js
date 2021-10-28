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

  var menuUlElement = document.querySelector("body>header>nav ul");
  var menuLiElements = menuUlElement.querySelectorAll("li");

  var dropDownEventListener = function(event) {
    toggleClass("body>header>nav ul", 'dropdown-open');
    event.stopPropagation();
    event.preventDefault();
  }

  var swapSelectionListener = function(event) {
    var targetLi = event.target.closest("li");
    
    Array.prototype.forEach.call(menuLiElements, function (element) {
      if (element === targetLi) {
        element.classList.add("selected");
        element.addEventListener("click", dropDownEventListener, false);
      } else {
        element.classList.remove("selected");
        element.removeEventListener("click", dropDownEventListener, false);
      }
    });
  }

  Array.prototype.forEach.call(menuLiElements, function (element) {
    if (element.classList.contains("selected")) {
      element.addEventListener("click", dropDownEventListener, false);
    } else {
      element.addEventListener("click", swapSelectionListener, false);
    }
  });

  var bodyElement = document.querySelector("body");
  bodyElement.addEventListener("click", function(event) {
    menuUlElement.classList.remove("dropdown-open");
  }, false);
});
