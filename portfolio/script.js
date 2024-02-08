document.addEventListener('DOMContentLoaded', function () {
    const dlbutton = document.getElementById('dlbutton');
    const body = document.getElementById('body');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    const contactForm = document.getElementById('contactForm');

    if (dlbutton && body && hamburger && navLinks && menuToggle) {
        dlbutton.addEventListener('click', () => {
            body.classList.toggle('light-mode');

            if (body.classList.contains('light-mode')) {
                localStorage.setItem('mode', 'light-mode');
            } else {
                localStorage.setItem('mode', 'dark-mode');
            }
        });

        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });

        function validateEmail(email) {
            const re = /\S+@\S+\.\S+/;
            return re.test(String(email).toLowerCase());
        }
    
        function sanitizeInput(input) {
            return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
    
        function submitForm(event) {
            event.preventDefault();
    
            const name = sanitizeInput(document.getElementById('name').value);
            const email = sanitizeInput(document.getElementById('email').value);
            const message = sanitizeInput(document.getElementById('message').value);
    
            if (!validateEmail(email)) {
                document.getElementById('email-error').innerText = "Invalid email format";
                return;
            }
    
            console.log("Name:", name);
            console.log("Email:", email);
            console.log("Message:", message);
    
            contactForm.reset();
        }
    
        contactForm.addEventListener('submit', submitForm);

    }

    

});