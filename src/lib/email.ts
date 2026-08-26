import nodemailer from 'nodemailer';
import { IInquiry } from '@/types';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

export async function sendInquiryEmails(inquiry: IInquiry) {
  // If SMTP is not configured, log and exit gracefully
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[Email Service] SMTP not configured. Notification skipped for:', inquiry.fullName);
    return;
  }

  try {
    const adminEmail = process.env.ADMIN_ALERT_EMAIL || 'info@magica-group.com';
    const fromAddress = process.env.SMTP_FROM || 'Magica Zone <info@magica-group.com>';

    // 1. Admin Alert Email
    await transporter.sendMail({
      from: fromAddress,
      to: adminEmail,
      subject: `🚨 New Event Booking: ${inquiry.fullName} (${inquiry.category})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #2563eb; margin-bottom: 8px;">New Booking Inquiry Received</h2>
          <p style="color: #4b5563; font-size: 14px;">A new event inquiry has been submitted on the Magica Zone platform.</p>
          
          <table style="width: 100%; font-size: 14px; margin-top: 16px; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px; font-weight: bold; color: #374151;">Client Name:</td><td style="padding: 8px; color: #111827;">${inquiry.fullName}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px; font-weight: bold; color: #374151;">Phone:</td><td style="padding: 8px; color: #111827;"><a href="tel:${inquiry.phone}">${inquiry.phone}</a></td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px; font-weight: bold; color: #374151;">Email:</td><td style="padding: 8px; color: #111827;"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px; font-weight: bold; color: #374151;">Program Category:</td><td style="padding: 8px; color: #111827; text-transform: capitalize;">${inquiry.category.replace('_', ' ')}</td></tr>
            <tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px; font-weight: bold; color: #374151;">Participants:</td><td style="padding: 8px; color: #111827;">${inquiry.estimatedParticipants}</td></tr>
            ${inquiry.eventDate ? `<tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 8px; font-weight: bold; color: #374151;">Event Date:</td><td style="padding: 8px; color: #111827;">${new Date(inquiry.eventDate).toLocaleDateString()}</td></tr>` : ''}
            ${inquiry.notes ? `<tr><td style="padding: 8px; font-weight: bold; color: #374151;">Notes / Package:</td><td style="padding: 8px; color: #111827;">${inquiry.notes}</td></tr>` : ''}
          </table>

          <div style="margin-top: 24px; text-align: center;">
            <a href="https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px; display: inline-block;">Reply via WhatsApp</a>
          </div>
        </div>
      `,
    });

    // 2. Client Confirmation Email
    await transporter.sendMail({
      from: fromAddress,
      to: inquiry.email,
      subject: `Thank you for contacting Magica Zone! | شكراً لتواصلك مع ماجيكا زون`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; line-height: 1.6;">
          <h2 style="color: #2563eb;">Hello ${inquiry.fullName},</h2>
          <p style="color: #374151; font-size: 14px;">We have successfully received your event booking request. Our coordination team is reviewing your requirements and will contact you within 24 hours.</p>
          
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0; font-size: 13px; color: #475569;">
            <strong>Program:</strong> ${inquiry.category.replace('_', ' ').toUpperCase()}<br/>
            <strong>Expected Group Size:</strong> ${inquiry.estimatedParticipants} participants
          </div>

          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

          <div style="direction: rtl; text-align: right; font-family: 'Cairo', Tahoma, Arial, sans-serif;">
            <h3 style="color: #2563eb;">مرحباً ${inquiry.fullName}،</h3>
            <p style="color: #374151; font-size: 14px;">تم استلام طلب حجز الفعالية الخاص بكم بنجاح. يقوم فريق العمل بمراجعة التفاصيل وسنتواصل معكم هاتفياً أو عبر الواتساب خلال 24 ساعة لتأكيد البرنامج.</p>
          </div>

          <p style="font-size: 12px; color: #9ca3af; margin-top: 30px; text-align: center;">Magica Zone • Cairo, Egypt • +20 10 03937096</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('[Email Service Error]', error);
  }
}