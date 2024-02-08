document.addEventListener('DOMContentLoaded', function () {
    // Existing code...

    const languageFlags = document.querySelectorAll('.language-flag');

    const translations = {
        'bs': {
            'nav-home': 'index-bs.html',
            'nav-about': 'onama-bs.html',
            'nav-contact': 'kontakt-bs.html'
        },
        'en': {
            'nav-home': 'index-en.html',
            'nav-about': 'onama-en.html',
            'nav-contact': 'kontakt-en.html'
        },
        'de': {
            'nav-home': 'index-de.html',
            'nav-about': 'onama-de.html',
            'nav-contact': 'kontakt-de.html'
        }
    };

    languageFlags.forEach(flag => {
        flag.addEventListener('click', function (event) {
            event.preventDefault();
            const selectedLanguage = this.getAttribute('data-lang');
            const homePage = translations[selectedLanguage]['nav-home'];

            // Switch from localStorage to sessionStorage
            sessionStorage.setItem('selectedLanguage', selectedLanguage);

            window.location.href = homePage;
        });
    });

    const storedLanguage = sessionStorage.getItem('selectedLanguage');

    if (storedLanguage && window.location.pathname === '/') {
        const homePage = translations[storedLanguage]['nav-home'];
        window.location.href = homePage;
    }

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links ul');

    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    function validateForm() {

        var fullname = document.getElementById("fullname").value.trim();
        var email = document.getElementById("email").value.trim();
        var message = document.getElementById("message").value.trim();

        var sanitizedFullname = sanitizeInput(fullname);
        var sanitizedEmail = sanitizeInput(email);
        var sanitizedMessage = sanitizeInput(message);

        // Validate email
        if (sanitizedEmail.length === 0 || !sanitizedEmail.includes("@")) {
            alert("Please enter a valid email address.");
            return false;
        }

        // Validate other fields
        if (sanitizedFullname.length === 0) {
            alert("Please enter your name.");
            return false;
        }

        if (sanitizedMessage.length === 0) {
            alert("Please enter your message.");
            return false;
        }

        // Additional checks, if needed...

        document.getElementById("fullname").value = sanitizedFullname;
        document.getElementById("email").value = sanitizedEmail;
        document.getElementById("message").value = sanitizedMessage;

        // If all validations pass, you can proceed with your form submission logic.
        // For now, I'll just alert a success message.
        alert("Form submitted successfully!");

        return true;
    }

    // Get the form element and attach the validateForm function to its submit event
    var form = document.getElementById("forma");
    form.addEventListener('submit', validateForm);


    function sanitizeInput(input) {
        // Use a regular expression to remove special characters
        return input.replace(/[^\w\s@.]/gi, '');
    }
});