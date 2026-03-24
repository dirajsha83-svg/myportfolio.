const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 1. Paste your unique URL here
    const url = 'https://ap-southeast-1.data.tidbcloud.com/api/v1beta/app/dataapp-.../endpoint'; 
    
    // 2. Paste your API Keys here
    const publicKey = 'YOUR_PUBLIC_KEY';
    const privateKey = 'YOUR_PRIVATE_KEY';

    const data = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        message: document.getElementById('userMessage').value
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // This encodes your keys for security
                'Authorization': 'Basic ' + btoa(publicKey + ':' + privateKey)
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Success! Your message has been saved to the TiDB Cloud Database.");
            contactForm.reset(); // Clears the form for the next user
        } else {
            alert("Database connection failed. Please check your API keys or URL.");
        }
    } catch (error) {
        console.error("Network Error:", error);
        alert("Unable to reach TiDB Cloud. Check your internet connection.");
    }
});