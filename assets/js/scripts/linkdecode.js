document.addEventListener("DOMContentLoaded", function(event) {
    // Convert mailto: address links
    const mailtoLinks = document.querySelectorAll('a[href-encoded]');
    mailtoLinks.forEach(link => {
        const encodedEmail = link.getAttribute('href-encoded');
        link.addEventListener('click', () => {
            link.setAttribute('href', decodeURIComponent(atob(encodedEmail)));
        });
        link.addEventListener('mouseover', () => {
            link.setAttribute('href', decodeURIComponent(atob(encodedEmail)));
        });
    });
});
