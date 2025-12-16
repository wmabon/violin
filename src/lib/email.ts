// Email service for automated notifications
// Using SendGrid in production, mock for development

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  bookingNumber: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  venueName: string;
  packageName: string;
  totalPrice: number;
  depositAmount: number;
  balanceDue: number;
  balanceDueDate: string;
}

// Send email (mock implementation - replace with SendGrid in production)
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  console.log("Sending email:", {
    to: options.to,
    subject: options.subject,
  });

  // In production, use SendGrid:
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // await sgMail.send({ ...options, from: process.env.EMAIL_FROM });

  return true;
}

// Booking confirmation email
export async function sendBookingConfirmation(data: BookingEmailData): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
    </head>
    <body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1c1917; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #b45309; margin: 0;">Victoria Strings</h1>
        <p style="color: #78716c; margin: 5px 0 0 0;">Professional Violin Performances</p>
      </div>

      <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
        <h2 style="margin: 0 0 10px 0; color: #92400e;">Booking Confirmed!</h2>
        <p style="margin: 0; color: #78350f;">
          Thank you, ${data.customerName}! Your booking has been confirmed.
        </p>
      </div>

      <div style="background: #f5f5f4; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #44403c;">Booking Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Booking Reference</td>
            <td style="padding: 8px 0; text-align: right; font-family: monospace; font-weight: bold;">${data.bookingNumber}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Event Type</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 500;">${data.eventType}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Package</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 500;">${data.packageName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Date</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 500;">${data.eventDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Time</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 500;">${data.startTime}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Venue</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 500;">${data.venueName}</td>
          </tr>
        </table>
      </div>

      <div style="background: #f5f5f4; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #44403c;">Payment Summary</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #78716c;">Total Price</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 500;">$${data.totalPrice.toFixed(2)}</td>
          </tr>
          <tr style="color: #16a34a;">
            <td style="padding: 8px 0;">Deposit Paid</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 500;">-$${data.depositAmount.toFixed(2)}</td>
          </tr>
          <tr style="border-top: 2px solid #d6d3d1;">
            <td style="padding: 12px 0 8px 0; font-weight: bold;">Balance Due</td>
            <td style="padding: 12px 0 8px 0; text-align: right; font-weight: bold; color: #b45309;">$${data.balanceDue.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 8px 0; color: #78716c; font-size: 14px;">
              Due by ${data.balanceDueDate}
            </td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 30px;">
        <h3 style="color: #44403c;">What's Next?</h3>
        <ol style="color: #57534e; padding-left: 20px;">
          <li style="margin-bottom: 10px;">I'll reach out within 48 hours to discuss your event details</li>
          <li style="margin-bottom: 10px;">Access your <a href="https://victoriastrings.com/client" style="color: #b45309;">Client Portal</a> to manage song requests</li>
          <li style="margin-bottom: 10px;">The remaining balance is due 2 weeks before your event</li>
        </ol>
      </div>

      <div style="text-align: center; padding: 20px; background: #1c1917; border-radius: 12px; color: #fff;">
        <p style="margin: 0 0 10px 0;">Questions? I'm here to help!</p>
        <p style="margin: 0;">
          <a href="mailto:hello@victoriastrings.com" style="color: #fbbf24;">hello@victoriastrings.com</a>
          &nbsp;|&nbsp;
          <a href="tel:+15551234567" style="color: #fbbf24;">(555) 123-4567</a>
        </p>
      </div>

      <div style="text-align: center; margin-top: 30px; color: #a8a29e; font-size: 12px;">
        <p>&copy; ${new Date().getFullYear()} Victoria Strings. All rights reserved.</p>
        <p>
          <a href="https://victoriastrings.com/privacy" style="color: #78716c;">Privacy Policy</a>
          &nbsp;|&nbsp;
          <a href="https://victoriastrings.com/terms" style="color: #78716c;">Terms of Service</a>
        </p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: data.customerEmail,
    subject: `Booking Confirmed - ${data.eventType} on ${data.eventDate}`,
    html,
    text: `
Booking Confirmed!

Thank you, ${data.customerName}! Your booking has been confirmed.

Booking Reference: ${data.bookingNumber}
Event Type: ${data.eventType}
Package: ${data.packageName}
Date: ${data.eventDate}
Time: ${data.startTime}
Venue: ${data.venueName}

Payment Summary:
Total Price: $${data.totalPrice.toFixed(2)}
Deposit Paid: $${data.depositAmount.toFixed(2)}
Balance Due: $${data.balanceDue.toFixed(2)} (due by ${data.balanceDueDate})

Questions? Contact us at hello@victoriastrings.com or (555) 123-4567
    `,
  });
}

// Payment reminder email
export async function sendPaymentReminder(data: {
  customerName: string;
  customerEmail: string;
  bookingNumber: string;
  eventDate: string;
  balanceDue: number;
  dueDate: string;
}): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1c1917; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #b45309; margin: 0;">Victoria Strings</h1>
      </div>

      <p>Hi ${data.customerName},</p>

      <p>This is a friendly reminder that your balance payment of <strong>$${data.balanceDue.toFixed(2)}</strong> is due on <strong>${data.dueDate}</strong> for your upcoming event on ${data.eventDate}.</p>

      <p>You can pay your balance through your <a href="https://victoriastrings.com/client" style="color: #b45309;">Client Portal</a>.</p>

      <p>If you have any questions, please don't hesitate to reach out!</p>

      <p>Best,<br>Victoria</p>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e7e5e4; color: #a8a29e; font-size: 12px;">
        <p>Booking Reference: ${data.bookingNumber}</p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: data.customerEmail,
    subject: `Payment Reminder - Balance Due ${data.dueDate}`,
    html,
  });
}

// Event reminder email (sent 1 week before)
export async function sendEventReminder(data: {
  customerName: string;
  customerEmail: string;
  bookingNumber: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  venueName: string;
}): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1c1917; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #b45309; margin: 0;">Victoria Strings</h1>
      </div>

      <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin-bottom: 20px; text-align: center;">
        <h2 style="margin: 0; color: #92400e;">Your Event is in 1 Week!</h2>
      </div>

      <p>Hi ${data.customerName},</p>

      <p>I'm excited for your upcoming ${data.eventType.toLowerCase()}! Here's a quick reminder of the details:</p>

      <div style="background: #f5f5f4; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Date:</strong> ${data.eventDate}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${data.startTime}</p>
        <p style="margin: 5px 0;"><strong>Venue:</strong> ${data.venueName}</p>
      </div>

      <p>If you have any last-minute song requests or changes, please let me know as soon as possible through your <a href="https://victoriastrings.com/client" style="color: #b45309;">Client Portal</a>.</p>

      <p>Looking forward to creating beautiful music for your special day!</p>

      <p>Best,<br>Victoria</p>
    </body>
    </html>
  `;

  return sendEmail({
    to: data.customerEmail,
    subject: `1 Week Until Your Event - ${data.eventDate}`,
    html,
  });
}

// Thank you / review request email (sent after event)
export async function sendThankYouEmail(data: {
  customerName: string;
  customerEmail: string;
  eventType: string;
  eventDate: string;
}): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1c1917; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #b45309; margin: 0;">Victoria Strings</h1>
      </div>

      <p>Dear ${data.customerName},</p>

      <p>Thank you so much for having me perform at your ${data.eventType.toLowerCase()}! It was truly an honor to be part of such a special celebration.</p>

      <p>I hope the music added to the magic of your day. If you have a moment, I would be incredibly grateful if you could share your experience:</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://g.page/victoriastrings/review" style="display: inline-block; background: #b45309; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">Leave a Review</a>
      </div>

      <p>Your feedback not only means the world to me, but also helps other couples find the perfect music for their celebrations.</p>

      <p>Wishing you all the best,<br>Victoria</p>

      <p style="color: #78716c; font-size: 14px; margin-top: 30px;">
        P.S. Know someone planning an event? I offer a 10% referral discount for both you and your friend! Just have them mention your name when they book.
      </p>
    </body>
    </html>
  `;

  return sendEmail({
    to: data.customerEmail,
    subject: `Thank You - It Was a Beautiful ${data.eventType}!`,
    html,
  });
}
