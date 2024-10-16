document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    let currentSection = '';

    // Smooth scrolling function
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            const targetSection = document.querySelector(this.getAttribute('href'));
            const sectionTop = targetSection.offsetTop;

            window.scrollTo({
                top: sectionTop, // Scroll to the top of the section
                behavior: 'smooth' // Smooth scroll animation
            });
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
});
