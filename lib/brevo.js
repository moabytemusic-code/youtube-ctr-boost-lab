export async function sendBrevoEmail({ to, subject, htmlContent }) {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL || 'noreply@example.com';
    const senderName = process.env.SENDER_NAME || 'YouTube CTR Boost Lab';

    if (!apiKey) {
        console.warn("BREVO_API_KEY is not set. Email not sent.");
        return false;
    }

    const url = 'https://api.brevo.com/v3/smtp/email';

    const body = {
        sender: { name: senderName, email: senderEmail },
        to: [{ email: to }],
        subject: subject,
        htmlContent: htmlContent
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "api-key": apiKey,
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Brevo API Error:", errorData);
            throw new Error(`Brevo API Failed: ${response.statusText}`);
        }

        return true;
    } catch (error) {
        console.error("Failed to send email:", error);
        return false; // Don't crash the app, just fail the email
    }
}
