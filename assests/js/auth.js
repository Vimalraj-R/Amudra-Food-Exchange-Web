// auth.js - Handles user authentication (Login, Signup, Logout)

// ========== GLOBAL VARIABLES ==========
const users = JSON.parse(localStorage.getItem("users")) || []; // Store user data locally
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

// ========== SIGNUP FUNCTION ==========
function signup(event) {
    event.preventDefault();

    // Get form data
    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    // Validate input
    if (!name || !email || !password) {
        alert("All fields are required!");
        return;
    }

    // Check if email already exists
    let userExists = users.some(user => user.email === email);
    if (userExists) {
        alert("Email already registered! Try logging in.");
        return;
    }

    // Save user
    let newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    alert("Signup successful! Please log in.");
    document.getElementById("signup-form").reset();
}

// ========== LOGIN FUNCTION ==========
function login(event) {
    event.preventDefault();

    // Get form data
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    // Validate input
    if (!email || !password) {
        alert("Both fields are required!");
        return;
    }

    // Check if user exists
    let user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        alert("Invalid credentials! Please check your email and password.");
        return;
    }

    // Save logged-in user
    loggedInUser = user;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    alert(`Welcome, ${user.name}!`);
    window.location.href = "dashboard.html"; // Redirect to dashboard
}

// ========== LOGOUT FUNCTION ==========
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out.");
    window.location.href = "index.html"; // Redirect to home page
}

// ========== CHECK AUTH STATE ==========
function checkAuth() {
    if (!loggedInUser) {
        alert("You need to log in first!");
        window.location.href = "login.html";
    }
}

// ========== AUTO-POPULATE USER INFO ==========
function displayUserInfo() {
    if (loggedInUser) {
        document.getElementById("user-name").innerText = loggedInUser.name;
    }
}

// ========== EVENT LISTENERS ==========
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("signup-form")) {
        document.getElementById("signup-form").addEventListener("submit", signup);
    }
    if (document.getElementById("login-form")) {
        document.getElementById("login-form").addEventListener("submit", login);
    }
    if (document.getElementById("logout-btn")) {
        document.getElementById("logout-btn").addEventListener("click", logout);
    }
    if (document.getElementById("user-name")) {
        displayUserInfo();
    }
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Example authentication (Replace with backend API integration)
    if (email === "admin@amudra.com" && password === "password123") {
        alert("Login Successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Email or Password!");
    }
});

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Password Validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Simulated Registration (Replace with API call to backend)
    const user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration Successful! Redirecting to login...");
    window.location.href = "login.html";
});
