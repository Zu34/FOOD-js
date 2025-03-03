
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".navbar-nav .nav-item:first-child .nav-link").focus();
});

document.addEventListener("DOMContentLoaded", function () {
    // Declare the variable for the carousel
    let carouselElement = document.querySelector("#carouselExample");

    // Initialize Bootstrap Carousel
    let myCarousel = new bootstrap.Carousel(carouselElement, {
        interval: 6000, 
        wrap: true
    });

    console.log("Carousel initialized:", myCarousel); // Debugging log
});

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > window.innerHeight * 0.8) { 
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});






document.addEventListener("DOMContentLoaded", function () {
    const logo = document.querySelector(".navbar-brand"); // Logo
    const signInBtn = document.querySelector(".sign-in-btn"); // Sign In button
    const cartIcon = document.querySelector(".cart-icon"); // Cart icon

    function toggleNavbarElements() {
        if (window.innerWidth <= 768) {
            logo.style.display = "none"; // Hide logo
            signInBtn.style.display = "block"; // Show Sign In
            cartIcon.style.display = "none"; // Hide Cart icon
        } else {
            logo.style.display = "block"; // Show logo
            signInBtn.style.display = "none"; // Hide Sign In
            cartIcon.style.display = "inline-block"; // Show Cart icon
        }
    }

    // Run on page load & window resize
    toggleNavbarElements();
    window.addEventListener("resize", toggleNavbarElements);
});



// document.addEventListener("DOMContentLoaded", function () {
//     const chatbox = document.getElementById("chat-box");
//     const userInput = document.getElementById("user-input");
//     const chatbotContainer = document.getElementById("chatbot");
//     const openChatbotButton = document.getElementById("open-chatbot");
//     const closeChatButton = document.getElementById("close-chat");

//     // Show Chatbot
//     openChatbotButton.addEventListener("click", () => {
//         chatbotContainer.style.display = "block";
//     });

//     // Close Chatbot
//     closeChatButton.addEventListener("click", () => {
//         chatbotContainer.style.display = "none";
//     });

//     // Send message when Enter key is pressed
//     userInput.addEventListener("keypress", function (e) {
//         if (e.key === "Enter") {
//             sendMessage();
//         }
//     });

//     // Function to send message
//     async function sendMessage() {
//         const userText = userInput.value.trim();
//         if (!userText) return;

//         appendMessage("You: " + userText, "user");
//         userInput.value = ""; // Clear input field

//         try {
//             const response = await fetch("http://localhost:3000/chat", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ message: userText }),
//             });

//             const data = await response.json();
//             appendMessage("Bot: " + data.reply, "bot");
//         } catch (error) {
//             appendMessage("Bot: Error connecting to server", "bot");
//         }
//     }

//     // Function to append messages
//     function appendMessage(text, sender) {
//         const messageDiv = document.createElement("div");
//         messageDiv.textContent = text;
//         messageDiv.classList.add(sender);
//         chatbox.appendChild(messageDiv);
//         chatbox.scrollTop = chatbox.scrollHeight;
//     }
// });








