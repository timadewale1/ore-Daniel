const nodemailer = require('nodemailer');

const guestInvitationTemplate = (guestName, guestEmail, attending, guestCount, message) => {
  const attendanceStatus = attending === 'yes' 
    ? '✓ You\'re attending – we can\'t wait to celebrate with you!'
    : '✗ We understand and will miss you, but thank you for letting us know.';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Oreoluwa & Daniel - RSVP Confirmation</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Cormorant Garamond', 'EB Garamond', serif;
          background: linear-gradient(135deg, #6b783c 0%, #4a5429 100%);
          padding: 20px;
          color: #2a2a1e;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #f5f0e8;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(74, 84, 41, 0.3);
        }
        .header {
          background: linear-gradient(160deg, #4a5429 0%, #3d4a22 100%);
          color: #f5f0e8;
          padding: 60px 40px;
          text-align: center;
        }
        .monogram {
          font-family: 'Cinzel', serif;
          font-size: 3rem;
          letter-spacing: 0.15em;
          margin-bottom: 20px;
        }
        .monogram span {
          color: #c8a96e;
        }
        .divider {
          width: 120px;
          height: 1px;
          background: #c8a96e;
          margin: 20px auto;
        }
        .subtitle {
          font-style: italic;
          font-size: 0.9rem;
          color: rgba(245,240,232,0.8);
          letter-spacing: 0.1em;
        }
        .content {
          padding: 50px 40px;
          text-align: center;
        }
        .greeting {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          color: #6b783c;
          margin-bottom: 25px;
          font-weight: 300;
        }
        .status {
          display: inline-block;
          background: #eef0e2;
          border: 2px solid #6b783c;
          padding: 15px 30px;
          margin: 20px 0;
          border-radius: 4px;
          font-size: 1rem;
          color: #4a5429;
          font-weight: 500;
        }
        .status-attend {
          border-color: #27ae60;
          color: #27ae60;
        }
        .status-decline {
          border-color: #c0392b;
          color: #c0392b;
        }
        .details {
          background: rgba(107,120,60,0.08);
          padding: 30px;
          margin: 30px 0;
          border-left: 4px solid #6b783c;
          text-align: left;
        }
        .detail-item {
          margin-bottom: 15px;
        }
        .detail-label {
          font-weight: 600;
          color: #6b783c;
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .detail-value {
          color: #2a2a1e;
          font-size: 1.1rem;
          margin-top: 4px;
        }
        .message-box {
          background: #f5f0e8;
          border: 1px dashed #c8d0a0;
          padding: 20px;
          margin: 25px 0;
          font-style: italic;
          color: #5a5a48;
        }
        .footer {
          background: #eef0e2;
          padding: 30px 40px;
          text-align: center;
          border-top: 1px solid #c8d0a0;
        }
        .footer-text {
          font-size: 0.9rem;
          color: #6b783c;
          margin-bottom: 15px;
        }
        .footer-verse {
          font-style: italic;
          font-size: 0.85rem;
          color: #8a9a50;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="monogram">D <span>&</span> O</div>
          <div class="divider"></div>
          <div class="subtitle">Oreoluwa & Daniel • May 30, 2026</div>
        </div>

        <div class="content">
          <div class="greeting">Thank you, ${guestName}!</div>
          
          <p style="color: #5a5a48; font-size: 1rem; line-height: 1.6; margin-bottom: 25px;">
            We've received your RSVP response. Here's a summary of your details:
          </p>

          <div class="status ${attending === 'yes' ? 'status-attend' : 'status-decline'}">
            ${attendanceStatus}
          </div>

          <div class="details">
            <div class="detail-item">
              <div class="detail-label">Guest Name</div>
              <div class="detail-value">${guestName}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Email</div>
              <div class="detail-value">${guestEmail}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Number of Guests</div>
              <div class="detail-value">${guestCount} ${guestCount == 1 ? 'person' : 'people'}</div>
            </div>
          </div>

          ${message ? `
            <div class="message-box">
              <strong style="color: #6b783c;">Your Message:</strong><br><br>
              "${message}"
            </div>
          ` : ''}

          <p style="color: #5a5a48; font-size: 0.95rem; line-height: 1.6;">
            We're thrilled to celebrate this special moment with you. 
            If you have any questions, feel free to reach out!
          </p>
        </div>

        <div class="footer">
          <div class="footer-text">With love & gratitude</div>
          <div class="footer-verse">"Where you go I will go, and where you stay I will stay." — Ruth 1:16</div>
        </div>
      </div>
    </body>
    </html>
  `;
};

const adminNotificationTemplate = (guestName, guestEmail, attending, guestCount, message) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; }
        .header { background: #6b783c; color: white; padding: 20px; text-align: center; border-radius: 4px; }
        .content { padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #6b783c; }
        .value { color: #333; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New RSVP Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Guest Name:</span>
            <span class="value">${guestName}</span>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <span class="value">${guestEmail}</span>
          </div>
          <div class="field">
            <span class="label">Attending:</span>
            <span class="value">${attending === 'yes' ? 'Yes' : 'No'}</span>
          </div>
          <div class="field">
            <span class="label">Number of Guests:</span>
            <span class="value">${guestCount}</span>
          </div>
          ${message ? `
            <div class="field">
              <span class="label">Message:</span>
              <div class="value" style="margin-top: 8px; background: #f0f0f0; padding: 12px; border-left: 3px solid #6b783c;">
                ${message}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fname, femail, fattend, fguests, fmessage } = req.body;

    if (!fname || !femail || !fattend) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Email config missing');
      return res.status(500).json({ error: 'Email not configured' });
    }

    const guestCount = parseInt(fguests) || 1;
    const messageText = fmessage ? String(fmessage).trim() : '';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: femail,
      subject: 'Oreoluwa & Daniel - RSVP Confirmation',
      html: guestInvitationTemplate(fname, femail, fattend, guestCount, messageText),
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'timadewale1@gmail.com',
      subject: `RSVP: ${fname}`,
      html: adminNotificationTemplate(fname, femail, fattend, guestCount, messageText),
    });

    return res.status(200).json({ success: true, message: 'RSVP submitted!' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
};
