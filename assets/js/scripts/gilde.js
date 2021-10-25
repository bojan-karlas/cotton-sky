document.addEventListener("DOMContentLoaded", function(event) {

    var glideObjects = document.querySelectorAll(".glide");
    if (glideObjects.length > 0) {
        new Glide(".glide", {
            type: "carousel",
            autoplay: 5000,
            hoverpause: true,
            gap: "3em"
        }).mount()
    }
    
});