document.addEventListener('DOMContentLoaded', () => {

    // --- GLOBAL CODE (Runs on every page for header, login, etc.) ---
    const searchBtn = document.querySelector('#search-btn');
    const searchBar = document.querySelector('.search-bar-container');
    const formBtn = document.querySelector('#login-btn');
    const loginForm = document.querySelector('.login-form-container');
    const formClose = document.querySelector('#form-close');
    const menu = document.querySelector('#menu-bar');
    const navbar = document.querySelector('.navbar');

    // Close all active windows on scroll
    window.onscroll = () => {
        if(searchBtn) searchBtn.classList.remove('fa-times');
        if(searchBar) searchBar.classList.remove('active');
        if(menu) menu.classList.remove('fa-times');
        if(navbar) navbar.classList.remove('active');
        if(loginForm) loginForm.classList.remove('active');
    }

    // Toggle mobile menu
    if (menu) {
        menu.addEventListener('click', () => {
            menu.classList.toggle('fa-times');
            navbar.classList.toggle('active');
        });
    }

    // Toggle search bar
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchBtn.classList.toggle('fa-times');
            searchBar.classList.toggle('active');
        });
    }

    // Show login form
    if (formBtn) {
        formBtn.addEventListener('click', () => {
            loginForm.classList.add('active');
        });
    }

    // Close login form
    if (formClose) {
        formClose.addEventListener('click', () => {
            loginForm.classList.remove('active');
        });
    }

    // --- PAGE-SPECIFIC CODE ---

    // 1. Explore Page Logic (Book Section)
    if (document.getElementById('interest-input')) {
        // ... all the code from your "book section" would go here ...
        console.log("Running Explore Page script");
    }

    // 2. Services Page Logic (Package Section)
    if (document.querySelector('.services .box')) {
        // ... all the code from your "package aka service section" would go here ...
        console.log("Running Services Page script");
    }

    // 3. Planner Page Logic (Itinerary Section)
    if (document.getElementById('itinerary-form')) {
        // ... all the code from your "itanery" section would go here ...
        console.log("Running Planner Page script");
    }

    // 4. Gallery Page Logic
    if (document.querySelector('.slide')) {
        // ... all the code from your "gallery section" would go here ...
        console.log("Running Gallery Page script");
    }
});
