document.addEventListener("DOMContentLoaded", function(event) {

    function makeIds () {
        var content = document.querySelector('main')
        var headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6, h7')
        var headingMap = {}

        Array.prototype.forEach.call(headings, function (heading) {
            var id = heading.id ? heading.id : heading.textContent.trim().toLowerCase()
            .split(' ').join('-').replace(/[!@#$%^&*():]/ig, '').replace(/\//ig, '-')
            headingMap[id] = !isNaN(headingMap[id]) ? ++headingMap[id] : 0
            if (headingMap[id]) {
            heading.id = id + '-' + headingMap[id]
            } else {
            heading.id = id
            }
        })
    }
    makeIds();

    let headingSelector = "h2, h3, h4";
    {{ with $.Site.Params.tocHeadingSelector }} headingSelector = "{{ . }}"{{ end }}

    tocbot.init({
        // Where to render the table of contents.
        tocSelector: ".js-toc",
        // Where to grab the headings to build the table of contents.
        contentSelector: "main",
        // Which headings to grab inside of the contentSelector element.
        headingSelector: headingSelector,

        orderedList: false,
    });
});