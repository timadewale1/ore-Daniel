# Deployment Guide - Vercel

Your wedding website can be deployed to **Vercel** (completely free tier available), and emails will continue to work seamlessly.

## Why Vercel?

✅ **Works perfectly with Nodemailer emails**
✅ **Free tier includes serverless functions**
✅ **Automatic HTTPS and SSL**
✅ **Lightning-fast globally distributed hosting**
✅ **Zero-configuration deployment from Git**

## Prerequisites

1. GitHub account with your project pushed (if not done yet, follow Git setup below)
2. Vercel account (free at https://vercel.com)

## Deployment Steps

### Step 1: Push to GitHub (if not already done)

```bash
git add .
git commit -m "Add RSVP email system"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Click **"New Project"**
3. Select your GitHub repository
4. Click **"Import"**
5. Vercel will auto-detect it's a Node.js project

### Step 3: Add Environment Variables

On the Vercel project settings page:

1. Go to **Settings → Environment Variables**
2. Add these variables:
   - `EMAIL_SERVICE` = `gmail`
   - `EMAIL_USER` = `timadewale1@gmail.com`
   - `EMAIL_PASSWORD` = `your-16-char-app-password`
3. Click **"Save"**
4. **Redeploy** your project for changes to take effect

### Step 4: Deploy

Click the **"Deploy"** button. Vercel will:
- Build your project
- Deploy to production
- Give you a live URL

Your site is now live! 🎉

## How Email Works on Vercel

The `api/rsvp.js` file runs as a **serverless function**. When someone submits the RSVP form:

1. Frontend sends data to your serverless function
2. Vercel automatically routes `/api/rsvp` requests to `api/rsvp.js`
3. Nodemailer sends emails via Gmail's SMTP
4. Guest gets styled confirmation email
5. Admin gets notification at timadewale1@gmail.com

**It's exactly the same as local — no changes needed!**

## Testing Locally Before Deployment

Before deploying to Vercel, test locally:

```bash
npm install
npm start
```

Then access `http://localhost:3000` and test the RSVP form.

## Custom Domain

To add your own domain (e.g., `oreoluwaanddaniel.com`):

1. In Vercel project settings → **Domains**
2. Add your domain
3. Follow the DNS setup instructions
4. DNS changes take 24-48 hours to propagate

## Environment Variables for Vercel

Your `.env` file is **NOT uploaded** to Vercel (it's in `.gitignore`).

Instead, set environment variables in Vercel's dashboard:
- **Never commit `.env` to git**
- Always use Vercel's Environment Variables section
- This keeps your credentials secure

## Troubleshooting

### "Email not sent" on Vercel

**Check:**
1. Environment variables are set in Vercel dashboard
2. Gmail app password is correct (16 characters)
3. 2-factor authentication is enabled on Gmail
4. Redeploy after adding environment variables

### Function Timeout

Nodemailer might take 5-10 seconds. Vercel's free tier allows up to 10 seconds per request.

### "Cannot find module 'nodemailer'"

Make sure `package.json` is in the root folder and includes `nodemailer` in dependencies.

## Production Email Service (Optional)

For production sites, consider using **SendGrid** or **AWS SES** instead of Gmail for better reliability:

### SendGrid Setup
1. Create free SendGrid account
2. Get API key
3. Update `api/rsvp.js` to use SendGrid

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

## Local Development Tips

- **Test emails locally first** before deploying
- **Keep `.env` file private** — add to `.gitignore`
- **Check Vercel logs** if issues arise: `vercel logs`

## Git Setup (If Needed)

If your project isn't on GitHub yet:

```bash
git init
git add .
git commit -m "Initial commit: wedding website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/orewedding.git
git push -u origin main
```

---

**Questions?**
- Check `RSVP_EMAIL_SETUP.md` for local development
- Review `vercel.json` for configuration
- Visit https://vercel.com/docs for Vercel help
