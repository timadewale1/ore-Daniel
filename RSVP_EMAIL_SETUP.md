# RSVP Email Setup Guide

This guide will help you set up the email system to send styled invitation confirmations to your wedding guests.

## Prerequisites

- Node.js installed on your system (download from https://nodejs.org/)
- A Gmail account (or other supported email service)

## Setup Steps

### 1. Install Dependencies

Navigate to the wedding website folder and run:

```bash
npm install
```

This will install all required packages including Express and Nodemailer.

### 2. Gmail Configuration

To use Gmail with Nodemailer, you need to create an **App Password**:

1. Go to Google Account: https://myaccount.google.com/
2. Click **Security** in the left sidebar
3. Scroll down to **App passwords** (requires 2-factor authentication)
4. Select **Mail** and **Windows Computer** (or your device)
5. Google will generate a 16-character password
6. Copy this password

### 3. Create Environment Variables File

Create a file named `.env` in the wedding folder with your email credentials:

```
EMAIL_SERVICE=gmail
EMAIL_USER=timadewale1@gmail.com
EMAIL_PASSWORD=your-16-char-app-password-here
PORT=3000
```

**Important:** 
- Never share this `.env` file
- This is already in `.gitignore` so it won't be committed to git
- Replace the placeholder values with your actual credentials

### 4. Start the Server

Run the server with:

```bash
npm start
```

You should see: `RSVP server running on http://localhost:3000`

Keep this terminal open while testing.

### 5. Test the RSVP Form

1. Open http://localhost:3000 in your browser
2. Fill out the RSVP form
3. Check your email inbox for:
   - **Guest confirmation email**: A beautifully styled invitation card
   - **Admin notification**: Details sent to timadewale1@gmail.com

## Email Features

### Guest Confirmation Email
- Beautifully styled matching your website theme
- Displays guest name, email, attendance status, and number of guests
- Includes their personal message
- Professional footer with wedding verse

### Admin Notification Email
- Receives all RSVP submissions
- Simple, clear format for database entry
- Includes guest message in highlighted box

## Troubleshooting

### "EAUTH: Invalid login" Error
- **Cause**: Wrong Gmail app password
- **Fix**: Double-check you created an App Password (not your regular password)
- Ensure 2-factor authentication is enabled on your Gmail

### "Failed to send email" Error
- Check internet connection
- Verify EMAIL_USER and EMAIL_PASSWORD are correct in `.env`
- Ensure Gmail app password was created correctly

### Port 3000 Already in Use
- Change `PORT=3001` in your `.env`
- Update frontend to fetch from new port if needed

### Testing Locally Without Email
- For testing without sending real emails, comment out the `transporter.sendMail()` calls
- Just log the data to console instead

## Production Deployment

Before deploying to production:

1. **Don't commit `.env`**: Make sure `.env` is in `.gitignore`
2. **Use environment variables**: On hosting services (Heroku, Vercel, etc.), set env vars in their dashboard
3. **Use production email**: Consider using a proper email service like SendGrid or AWS SES
4. **Enable error logging**: Add logging to track email failures

## Email Service Alternatives

You can use other email services by modifying `server.js`:

### SendGrid
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

### Outlook/Hotmail
```javascript
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

## Support

If you encounter issues:
1. Check the console output for error messages
2. Verify your `.env` file has no typos
3. Test Gmail login at https://myaccount.google.com/
4. Ensure Node.js is properly installed: `node --version`
