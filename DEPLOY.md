# Deployment Guide

Follow these steps to get your app online.

## Step 1: Push to GitHub

Since you don't have the GitHub CLI installed, you'll need to create the repository manually.

1.  **Log in to GitHub**: Go to [github.com](https://github.com) and sign in.
2.  **Create New Repository**:
    *   Click the **+** icon in the top right -> **New repository**.
    *   Name it `youtube-ctr-boost-lab`.
    *   Set it to **Public** or **Private** (your choice).
    *   **Do NOT** initialize with README, .gitignore, or License (we already have them).
    *   Click **Create repository**.
3.  **Push Code**:
    *   Copy the commands under "**…or push an existing repository from the command line**".
    *   It will look something like this (run these in your terminal):
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/youtube-ctr-boost-lab.git
    git branch -M main
    git push -u origin main
    ```

## Step 2: Deploy on Vercel

Vercel is the creators of Next.js, so deployment is seamless.

1.  **Log in to Vercel**: Go to [vercel.com](https://vercel.com) and sign in (usually with GitHub).
2.  **Import Project**:
    *   On your dashboard, click **"Add New..."** -> **"Project"**.
    *   You should see your `youtube-ctr-boost-lab` repository in the list (if you connected GitHub). Click **Import**.
3.  **Configure Project**:
    *   **Framework Preset**: Should automatically detect `Next.js`.
    *   **Root Directory**: Leave as `./`.
    *   **Environment Variables**:
        *   Expand the section.
        *   Add `BREVO_API_KEY` and paste your key (from `.env.local`).
        *   Add `SENDER_EMAIL` and paste your verified sender email.
4.  **Deploy**:
    *   Click **Deploy**.
    *   Wait ~1 minute. You'll get a live URL (e.g., `https://youtube-ctr-boost-lab.vercel.app`).

## Step 3: Verify

1.  Visit your new URL.
2.  Try analyzing a title.
3.  Try the email gate (check your inbox!).
