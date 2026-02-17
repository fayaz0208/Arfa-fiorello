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

    // Instagram App Redirect - ANDROID WITH PROPER URL INTENT
    document.querySelectorAll('[data-insta-app]').forEach(link => {
        link.addEventListener('click', function (e) {
            const isAndroid = /Android/i.test(navigator.userAgent);

            if (isAndroid) {
                e.preventDefault();

                // Use the _u/ parameter format which works better on Android
                const intentUrl = 'intent://instagram.com/_u/arfa.fiorello#Intent;package=com.instagram.android;scheme=https;end';

                let appOpened = false;

                // Set a timeout to detect if app opened
                const timeout = setTimeout(() => {
                    if (!appOpened) {
                        // App didn't open, fallback to web
                        window.location.href = 'https://www.instagram.com/arfa.fiorello?igsh=NDQ4b3gwa3J2aHFx';
                    }
                }, 1200);

                // If page hides/unloads, the app likely opened
                const onPageHide = () => {
                    appOpened = true;
                    clearTimeout(timeout);
                };

                window.addEventListener('pagehide', onPageHide, { once: true });
                window.addEventListener('beforeunload', onPageHide, { once: true });

                // Try to open the app
                window.location.href = intentUrl;
            }
            // For iOS and Desktop, let the default target="_blank" behavior work
        });
    });
});
