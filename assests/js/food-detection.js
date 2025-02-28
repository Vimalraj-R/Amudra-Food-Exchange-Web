// food-detection.js - Handles food spoilage detection using AI/ML or predefined rules

// ========== GLOBAL VARIABLES ==========
let modelLoaded = false;

// ========== LOAD MACHINE LEARNING MODEL (IF USED) ==========
async function loadMLModel() {
    try {
        // Example: Loading a TensorFlow.js model (Replace with actual model path)
        model = await tf.loadLayersModel("path/to/model.json");
        modelLoaded = true;
        console.log("ML Model Loaded Successfully!");
    } catch (error) {
        console.error("Error loading ML model:", error);
    }
}

// ========== FOOD SPOILAGE CHECK FUNCTION ==========
function checkFoodSpoilage() {
    let foodType = document.getElementById("food-type").value;
    let temperature = parseFloat(document.getElementById("temperature").value);
    let humidity = parseFloat(document.getElementById("humidity").value);
    let expiryDate = new Date(document.getElementById("expiry-date").value);
    let currentDate = new Date();

    let resultBox = document.getElementById("result");
    resultBox.innerHTML = "";

    // ===== Rule-Based Approach (Simple Conditions) =====
    let spoilageDetected = false;
    let message = "";

    if (expiryDate < currentDate) {
        spoilageDetected = true;
        message = "⚠️ The food has already expired!";
    } else if (foodType.toLowerCase() === "vegetable" && temperature > 30) {
        spoilageDetected = true;
        message = "⚠️ High temperature detected! The vegetable might spoil faster.";
    } else if (foodType.toLowerCase() === "meat" && temperature > 10) {
        spoilageDetected = true;
        message = "⚠️ Meat should be stored below 10°C to avoid spoilage.";
    } else if (humidity > 80) {
        spoilageDetected = true;
        message = "⚠️ High humidity can lead to mold growth on food.";
    } else {
        message = "✅ The food is safe for now.";
    }

    // Display result
    resultBox.innerHTML = `<p class="${spoilageDetected ? "spoiled" : "safe"}">${message}</p>`;
}

// ========== EVENT LISTENERS ==========
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("food-detection-form")) {
        document.getElementById("food-detection-form").addEventListener("submit", function (event) {
            event.preventDefault();
            checkFoodSpoilage();
        });
    }

    // Uncomment if using ML model
    // loadMLModel();
});

document.addEventListener("DOMContentLoaded", function () {
    const foodImageInput = document.getElementById("foodImageInput");
    const previewImage = document.getElementById("previewImage");
    const resultText = document.getElementById("resultText");
    const detectFoodBtn = document.getElementById("detectFood");

    // Preview image when uploaded
    foodImageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewImage.style.display = "block";
                resultText.textContent = "Image uploaded, ready for analysis.";
            };
            reader.readAsDataURL(file);
        }
    });

    // Simulated AI food detection logic
    detectFoodBtn.addEventListener("click", function () {
        if (!previewImage.src) {
            alert("Please upload an image first.");
            return;
        }

        resultText.textContent = "Analyzing...";
        setTimeout(() => {
            const spoilageChance = Math.random();
            if (spoilageChance < 0.5) {
                resultText.textContent = "✅ The food appears fresh!";
                resultText.style.color = "#28a745";
            } else {
                resultText.textContent = "⚠️ The food may be spoiled!";
                resultText.style.color = "#dc3545";
            }
        }, 2000);
    });
});

