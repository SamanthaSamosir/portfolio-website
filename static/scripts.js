document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Force scroll to #about on page load, ignoring any hash in the URL
    function scrollToAboutSection() {
        const aboutSection = document.querySelector('#about');
        const sectionTop = aboutSection.offsetTop;

        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });

        // Update the URL hash to #about
        window.history.pushState(null, '', '#about');
    }

    // Function to update active nav link immediately
    function setActiveNavLink(link) {
        navLinks.forEach(navLink => {
            navLink.parentElement.classList.remove('active');
        });
        link.parentElement.classList.add('active');
    }

    // Smooth scrolling for nav links with active state update
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior

            // Set the active nav link before scrolling
            setActiveNavLink(this);

            const targetSection = document.querySelector(this.getAttribute('href'));
            const sectionTop = targetSection.offsetTop;

            window.scrollTo({
                top: sectionTop, // Scroll to the top of the section
                behavior: 'smooth' // Smooth scroll animation
            });

            // Update the URL hash without jumping
            window.history.pushState(null, '', this.getAttribute('href'));
        });
    });

    // Update active state based on scroll position
    document.addEventListener('scroll', function() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - sectionHeight / 2) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.parentElement.classList.add('active');
            }
        });
    });

    // Force the scroll to top or about section on page load
    scrollToAboutSection();
});
