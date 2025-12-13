export async function sendBrevoEmail({ to, subject, htmlContent }) {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL || 'noreply@example.com';
    const senderName = process.env.SENDER_NAME || 'YouTube CTR Boost Lab';

    if (!apiKey) {
        console.error("❌ ERROR: BREVO_API_KEY is missing in Environment Variables!");
        return false;
    }

    console.log(`📧 Attempting to send email to ${to} from ${senderEmail}`);

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
            const errorText = await response.text();
            console.error("❌ Brevo API Error:", response.status, errorText);
            return false;
        }

        console.log("✅ Email sent successfully via Brevo!");
        return true;
    } catch (error) {
        console.error("Failed to send email:", error);
        return false; // Don't crash the app, just fail the email
    }
}
