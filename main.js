document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');

        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // Initial check

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* Feedback Form Handling */
    const feedbackForm = document.getElementById('feedbackForm');
    const formStatus = document.getElementById('formStatus');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formStatus = document.getElementById('formStatus');
            formStatus.textContent = 'Sending feedback...';
            formStatus.className = 'form-status';

            const formData = new FormData(feedbackForm);

            fetch("https://formsubmit.co/ajax/fayazshariffmohammad@gmail.com", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    // Show success message
                    formStatus.textContent = 'Thank you! We received your feedback.';
                    formStatus.className = 'form-status success';
                    feedbackForm.reset();

                    // Clear message after 5 seconds
                    setTimeout(() => {
                        formStatus.textContent = '';
                        formStatus.className = 'form-status';
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    formStatus.textContent = 'Oops! Something went wrong. Please try again.';
                    formStatus.className = 'form-status error';
                });
        });
    }

    // Instagram App Redirect - ANDROID FIX WITH MULTIPLE FALLBACK METHODS
    document.querySelectorAll('[data-insta-app]').forEach(link => {
        link.addEventListener('click', function (e) {
            const isAndroid = /Android/i.test(navigator.userAgent);

            if (isAndroid) {
                e.preventDefault();

                // Method 1: Use intent to open Instagram app with the profile URL
                const intentUrl = 'intent://instagram.com/_u/arfa.fiorello#Intent;package=com.instagram.android;scheme=https;end';

                // Create a timeout to fallback if app doesn't open (1 second)
                const timeout = setTimeout(() => {
                    // Fallback to web browser
                    window.location.href = 'https://www.instagram.com/arfa.fiorello/';
                }, 1000);

                try {
                    window.location.href = intentUrl;
                } catch (err) {
                    // If intent fails, go directly to web
                    clearTimeout(timeout);
                    window.location.href = 'https://www.instagram.com/arfa.fiorello/';
                }

                // Clear timeout if page unloads (app opened)
                const unloadHandler = () => clearTimeout(timeout);
                window.addEventListener('pagehide', unloadHandler);
                window.addEventListener('beforeunload', unloadHandler);
            }
            // For iOS and Desktop, let the default target="_blank" behavior work
        });
    });
});
