// Main Client Interaction Scripts

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate on Scroll) with mobile overflow protection
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 30,
            disableMutationObserver: false
        });
    }

    // 2. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 3. Navbar scroll effect
    const navbar = document.getElementById('main-navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-[#080F18]/95', 'shadow-lg', 'shadow-black/50');
            navbar.classList.remove('bg-[#0D1B2A]/90');
        } else {
            navbar.classList.remove('bg-[#080F18]/95', 'shadow-lg', 'shadow-black/50');
            navbar.classList.add('bg-[#0D1B2A]/90');
        }
    });
});
