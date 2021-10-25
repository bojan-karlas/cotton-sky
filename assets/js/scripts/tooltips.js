document.addEventListener("DOMContentLoaded", function(event) {

    function makeTooltips() {
        var elements = document.querySelectorAll('nav ul li a[title]');
        Array.prototype.forEach.call(elements, function (element) {
            var title = element.getAttribute("title");
            element.removeAttribute("title");

            var parent = element.closest("ul");
            var tooltipElement = parent ? parent.querySelector("q") : null;

            if (tooltipElement) {
                element.addEventListener("mouseover", function( event ) {
                    tooltipElement.innerHTML = title;
                });

                element.addEventListener("mouseout", function( event ) {
                    tooltipElement.innerHTML = "";
                });
            }
        });

        var elements = document.querySelectorAll('nav ul li a[clickmessage]');
        Array.prototype.forEach.call(elements, function (element) {
            var clickmessage = element.getAttribute("clickmessage");

            var parent = element.closest("ul");
            var tooltipElement = parent ? parent.querySelector("q") : null;
            
            if (tooltipElement) {
                element.addEventListener("click", function( event ) {
                    tooltipElement.innerHTML = clickmessage;
                });
    
                element.addEventListener("mouseout", function( event ) {
                    tooltipElement.innerHTML = "";
                });
            }
        });
    }
    makeTooltips();
    
});
