document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');

        const windowHeight = window.innerHeight;
        reveals.forEach(element => {
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

    // Instagram Deep Linking Logic
    const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');

    if (instagramLinks) {
        instagramLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only run this logic on mobile devices
                if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    e.preventDefault();

                    const username = "arfa.fiorello"; // Correct username
                    const appUrl = `instagram://user?username=${username}`;
                    const webUrl = `https://www.instagram.com/${username}`;

                    // Try to open the app
                    window.location.href = appUrl;

                    // Fallback: If the app doesn't open within 500ms, go to the browser version
                    setTimeout(() => {
                        window.location.href = webUrl;
                    }, 500);
                }
            });
        });
    }
});


