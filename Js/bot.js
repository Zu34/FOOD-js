document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const chatbotContainer = document.getElementById("chatbot");
    const openChatbotButton = document.getElementById("open-chatbot");
    const closeChatButton = document.getElementById("close-chat");

    // Show Chatbot
    openChatbotButton.addEventListener("click", () => {
        chatbotContainer.style.display = "block";
    });

    // Close Chatbot
    closeChatButton.addEventListener("click", () => {
        chatbotContainer.style.display = "none";
    });

    // Send message when Enter key is pressed
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    // Function to send message
    async function sendMessage() {
        const userInput = document.getElementById("user-input").value;
        if (!userInput.trim()) return;
    
        try {
            const response = await fetch("http://localhost:3000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userInput })
            });
    
            const data = await response.json();
            document.getElementById("chat-box").innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
    
    // Function to append messages
    function appendMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = text;
        messageDiv.classList.add(sender);
        chatbox.appendChild(messageDiv);
        chatbox.scrollTop = chatbox.scrollHeight;
    }
});
