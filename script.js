document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const serverMessage = document.getElementById('servermessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            const data = {
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                message: document.getElementById('userMessage').value
            };

            serverMessage.innerText = "Sending...";

            try {
                const response = await fetch('/contact', { // Changed to relative path
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                serverMessage.innerText = result.message;
                
                if (response.ok) {
                    contactForm.reset();
                }
            } catch (error) {
                serverMessage.innerText = "Error: Backend not reachable.";
                console.error("Error:", error);
            }
        });
    }
});