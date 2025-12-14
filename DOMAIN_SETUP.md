# How to Connect a Custom Domain

Follow these steps to point a custom domain (e.g., `www.your-awesome-tool.com`) to your Vercel app.

## Step 1: Add Domain in Vercel

1.  Go to your **Vercel Dashboard**.
2.  Select your project: **youtube-ctr-boost-lab**.
3.  Click on **Settings** -> **Domains**.
4.  Enter your domain name (e.g., `ctrboostlab.com`) in the input field and click **Add**.
5.  Vercel will provide you with the required DNS records (usually an A Record and a CNAME).

## Step 2: Configure DNS at Your Registrar

Log in to where you bought your domain (Namecheap, GoDaddy, Google Domains, etc.) and look for "DNS Settings" or "Manage DNS".

### option A: Nameservers (Easiest)
If you want Vercel to manage the DNS (Recommended):
1.  In Vercel, it might ask you to change nameservers to `ns1.vercel-dns.com` and `ns2.vercel-dns.com`.
2.  Go to your specific registrar's "Nameservers" section and choose "Custom DNS".
3.  Paste the Vercel nameservers there.
4.  Wait 1-24 hours for propagation.

### Option B: A Record & CNAME (If keeping current DNS)
If you just want to point the website but keep email/other stuff elsewhere:
1.  **A Record**:
    *   **Host/Name**: `@`
    *   **Value/Target**: `76.76.21.21` (This is Vercel's standard IP)
2.  **CNAME Record**:
    *   **Host/Name**: `www`
    *   **Value/Target**: `cname.vercel-dns.com`

## Step 3: Verify

1.  Go back to Vercel Domains settings.
2.  It should say "Valid Configuration" (Green Check) after a few minutes.
3.  Vercel will automatically generate an SSL certificate (HTTPS) for you.

## Troubleshooting

*   **Invalid Configuration**: Double check no other "A Records" exist for `@`. Remove old ones.
*   **Propagation**: DNS changes can take up to 48 hours, but usually happen in 15 minutes.
