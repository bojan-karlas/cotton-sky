document.addEventListener("scroll", function() {
    var elements = document.querySelectorAll("aside:not(.right)");
    if (window.matchMedia('screen and (max-width:1000px)').matches) {
        Array.prototype.forEach.call(elements, function (element) {
            element.style.transform = "";
        });
    } else {
        Array.prototype.forEach.call(elements, function (element) {
            let elementTop = Math.min(Math.max(0, element.getBoundingClientRect().top), window.innerHeight)
            let diff = (elementTop - window.innerHeight / 2) / window.innerHeight;
            element.style.transform = `translateY(${diff * 40}px)`;
        });
    }
});