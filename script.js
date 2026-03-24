document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. SETTINGS: Get these from your TiDB Data Service Dashboard
            const url = 'https://ap-southeast-1.data.tidbcloud.com/api/v1beta/app/dataapp-YZHtQoXh/endpoint/message__save'; 
            const publicKey = 'G3144U20';
            const privateKey = '76a4d987-d6f5-4f89-94a8-07fe3cb837e9';          // 2. DATA: Gathering info from your form inputs
            const btn = contactForm.querySelector('button');
            const originalBtnText = btn.innerText;
            
            const data = {
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                message: document.getElementById('userMessage').value
            };

            // Loading state
            btn.innerText = "Sending...";
            btn.disabled = true;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + btoa(publicKey + ':' + privateKey)
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert("✔ Success! Your message has been saved in Diraj's TiDB database.");
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    console.error("Database Error:", errorData);
                    alert("❌ Failed to save. Check TiDB Endpoint settings.");
                }
            } catch (error) {
                console.error("Network Error:", error);
                alert("❌ Connection Error. Make sure your TiDB endpoint is Deployed.");
            } finally {
                btn.innerText = originalBtnText;
                btn.disabled = false;
            }
        });
    }
});