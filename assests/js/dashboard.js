// dashboard.js - Handles dashboard interactions for Amudra

// ========== GLOBAL VARIABLES ==========
let donations = JSON.parse(localStorage.getItem("donations")) || []; // Store food donations locally
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

// ========== CHECK AUTHENTICATION ==========
function checkAuth() {
    if (!loggedInUser) {
        alert("You need to log in first!");
        window.location.href = "login.html";
    }
}

// ========== DISPLAY USER INFO ==========
function displayUserInfo() {
    if (loggedInUser) {
        document.getElementById("user-name").innerText = loggedInUser.name;
    }
}

// ========== ADD NEW FOOD DONATION ==========
function addDonation(event) {
    event.preventDefault();

    // Get form data
    let foodItem = document.getElementById("food-item").value;
    let quantity = document.getElementById("food-quantity").value;
    let expiryDate = document.getElementById("expiry-date").value;
    let location = document.getElementById("food-location").value;

    // Validate input
    if (!foodItem || !quantity || !expiryDate || !location) {
        alert("All fields are required!");
        return;
    }

    // Save donation
    let newDonation = {
        donor: loggedInUser.name,
        foodItem,
        quantity,
        expiryDate,
        location,
        status: "Available",
        timestamp: new Date().toLocaleString()
    };

    donations.push(newDonation);
    localStorage.setItem("donations", JSON.stringify(donations));

    alert("Donation added successfully!");
    document.getElementById("donation-form").reset();
    loadDonations(); // Refresh donations list
}

// ========== LOAD DONATIONS INTO DASHBOARD ==========
function loadDonations() {
    let donationList = document.getElementById("donation-list");
    donationList.innerHTML = "";

    if (donations.length === 0) {
        donationList.innerHTML = "<p>No donations available yet.</p>";
        return;
    }

    donations.forEach((donation, index) => {
        let donationItem = document.createElement("div");
        donationItem.classList.add("donation-item");
        donationItem.innerHTML = `
            <h3>${donation.foodItem} (${donation.quantity})</h3>
            <p><strong>Donor:</strong> ${donation.donor}</p>
            <p><strong>Expiry:</strong> ${donation.expiryDate}</p>
            <p><strong>Location:</strong> ${donation.location}</p>
            <p><strong>Status:</strong> <span class="${donation.status === "Available" ? "status-available" : "status-picked"}">${donation.status}</span></p>
            <button onclick="markAsPicked(${index})" ${donation.status === "Picked Up" ? "disabled" : ""}>Mark as Picked</button>
        `;
        donationList.appendChild(donationItem);
    });
}

// ========== MARK DONATION AS PICKED ==========
function markAsPicked(index) {
    donations[index].status = "Picked Up";
    localStorage.setItem("donations", JSON.stringify(donations));
    loadDonations(); // Refresh donations list
}

// ========== LOGOUT FUNCTION ==========
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out.");
    window.location.href = "index.html"; // Redirect to home page
}

// ========== EVENT LISTENERS ==========
document.addEventListener("DOMContentLoaded", function() {
    checkAuth();
    displayUserInfo();
    loadDonations();

    if (document.getElementById("donation-form")) {
        document.getElementById("donation-form").addEventListener("submit", addDonation);
    }

    if (document.getElementById("logout-btn")) {
        document.getElementById("logout-btn").addEventListener("click", logout);
    }
});
