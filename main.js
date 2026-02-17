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
                    formStatus.className = 'form-status error'; // You might want to add .error style
                });
        });
    }
    // Forced Instagram App Open for Mobile (Platform Specific)
    const instaLinks = document.querySelectorAll('a[href*="instagram.com"]');
    instaLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            const isInstagramApp = /Instagram/i.test(userAgent);
            const isiOS = /iPhone|iPad|iPod/i.test(userAgent);
            const isAndroid = /Android/i.test(userAgent);

            if (isiOS || isAndroid) {
                // Don't intercept if already inside Instagram's in-app browser
                if (isInstagramApp) return;

                e.preventDefault();
                const username = 'arfa.fiorello';
                const webUrl = this.href;
                let appUrl = `instagram://user?username=${username}`;

                if (isAndroid) {
                    appUrl = `intent://www.instagram.com/${username}/#Intent;package=com.instagram.android;scheme=https;end`;
                }

                // Try opening in App
                window.location.href = appUrl;

                // Fallback to web if app doesn't open in 500ms
                setTimeout(() => {
                    window.location.href = webUrl;
                }, 500);
            }
        });
    });
});
