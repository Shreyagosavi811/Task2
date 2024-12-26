// auth.js
import { createBtn, showMessage } from './script.js';

const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.nav');
const blogContainer = document.getElementById('blog-container');

// Toggle Blog Form Visibility
if (createBtn && blogContainer) {
    createBtn.addEventListener('click', () => {
        blogContainer.classList.toggle('hidden');
    });
}

// Toggle Mobile Navigation Menu
if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Handle Signup
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('signup-username').value.trim();
        const password = document.getElementById('signup-password').value.trim();

        if (!username || !password) {
            alert("Username and Password are required!");
            return;
        }

        const existingAdmin = JSON.parse(localStorage.getItem('admin')) || null;
        if (existingAdmin) {
            alert("Admin already exists. Please login.");
            return;
        }

        const adminCredentials = { username, password };
        localStorage.setItem('admin', JSON.stringify(adminCredentials));
        alert("Admin account created successfully. You can now login.");
        window.location.href = 'login.html';
    });
}

// Handle Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (!username || !password) {
            alert("Username and Password are required!");
            return;
        }

        const adminCredentials = JSON.parse(localStorage.getItem('admin'));
        if (
            adminCredentials &&
            adminCredentials.username === username &&
            adminCredentials.password === password
        ) {
            alert("Login successful!");
            window.location.href = 'home.html';
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });
}
