document.getElementById("requestForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const location = document.getElementById("location").value;
    const foodQuantity = document.getElementById("foodQuantity").value;
    const additionalInfo = document.getElementById("additionalInfo").value;

    // Simple form validation
    if (!name || !email || !phone || !location || !foodQuantity) {
        alert("Please fill in all required fields!");
        return;
    }

    // Simulated Request Submission (Replace with API call)
    const requestData = { name, email, phone, location, foodQuantity, additionalInfo };
    console.log("Food Request Submitted:", requestData);
    alert("Your food request has been submitted successfully!");

    // Reset Form
    document.getElementById("requestForm").reset();
});
