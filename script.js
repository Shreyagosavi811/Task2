// Elements Selection
const createBtn = document.getElementById('create-btn');
const blogContainer = document.getElementById('blog-container');
const blogForm = document.getElementById('blog-form');
const publishedBlogs = document.getElementById('published-blogs');

// Check if Admin is Logged In
function isAdminLoggedIn() {
    const admin = JSON.parse(localStorage.getItem('admin'));
    return !!admin;
}

// Toggle Blog Form Visibility for Admin
function setupCreateButton() {
    if (isAdminLoggedIn()) {
        createBtn.classList.remove('hidden');
        createBtn.addEventListener('click', () => {
            blogContainer.classList.toggle('hidden');
        });
    } else {
        createBtn.classList.add('hidden');
    }
}

// Handle Blog Creation
if (blogForm) {
    blogForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!isAdminLoggedIn()) {
            alert("Only admins can create blogs.");
            return;
        }

        const title = document.getElementById('title').value.trim();
        const image = document.getElementById('image').value.trim();
        const content = document.getElementById('content').value.trim();

        if (!title || !image || !content) {
            alert("All fields are required!");
            return;
        }

        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs.push({ title, image, content, rating: 0 });
        localStorage.setItem('blogs', JSON.stringify(blogs));

        blogForm.reset();
        blogContainer.classList.add('hidden');
        alert("Blog created successfully!");
        loadBlogs();
    });
}

// Load Blogs for Admin (With Delete Button)
function loadBlogs() {
    publishedBlogs.innerHTML = '<h2>Published Blogs</h2>';
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

    blogs.forEach((blog, index) => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');
        blogCard.innerHTML = `
            <img src="${blog.image}" alt="${blog.title}">
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            <button class="delete-btn">Delete</button>
        `;

        const deleteBtn = blogCard.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteBlog(index));

        publishedBlogs.appendChild(blogCard);
    });
}

// Delete Blog
function deleteBlog(index) {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.splice(index, 1);  // Remove the Blog
    localStorage.setItem('blogs', JSON.stringify(blogs));
    alert("Blog deleted successfully.");
    loadBlogs();  // Refresh the list
}

// Initialize Admin Dashboard
document.addEventListener('DOMContentLoaded', () => {
    setupCreateButton();
    loadBlogs();
});


//AUTHENTICATION//

// Elements Selection
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

// Handle Signup
if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('signup-username').value.trim();
        const password = document.getElementById('signup-password').value.trim();

        if (!username || !password) {
            alert("Username and Password are required!");
            return;
        }

        const existingAdmin = JSON.parse(localStorage.getItem('admin'));
        if (existingAdmin) {
            alert("Admin already exists. Please login.");
            return;
        }

        const adminCredentials = { username, password };
        localStorage.setItem('admin', JSON.stringify(adminCredentials));
        alert("Admin account created successfully.");
        window.location.href = 'login.html';
    });
}

// Handle Login
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();

        const adminCredentials = JSON.parse(localStorage.getItem('admin'));
        if (
            adminCredentials &&
            adminCredentials.username === username &&
            adminCredentials.password === password
        ) {
            alert("Login successful!");
            window.location.href = 'home.html';
        } else {
            alert("Invalid credentials.");
        }
    });
}
