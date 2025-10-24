import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Send appointment confirmation email
export const sendAppointmentConfirmation = async (appointment) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: appointment.customerEmail,
      subject: 'Confirmation de Rendez-vous - Coiffure Melimelo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Confirmation de Rendez-vous</h2>
          <p>Bonjour ${appointment.customerName},</p>
          <p>Votre rendez-vous a été confirmé avec succès:</p>
          <div style="background: #f5f5f5; padding: 20px; border-left: 4px solid #d4af37;">
            <p><strong>Barbier:</strong> ${appointment.barber.name}</p>
            <p><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString('fr-CH')}</p>
            <p><strong>Heure:</strong> ${appointment.appointmentTime}</p>
            <p><strong>Service:</strong> ${appointment.service}</p>
          </div>
          <p>Nous avons hâte de vous accueillir!</p>
          <p>Pour toute question, contactez-nous au: ${appointment.barber.phone}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Coiffure Melimelo<br>
            Rue des Draizes 61<br>
            2000 Neuchâtel<br>
            Switzerland
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

// Send contact form notification to admin
export const sendContactNotification = async (contact) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // Send to admin
      subject: `Nouveau Message de Contact - ${contact.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Nouveau Message de Contact</h2>
          <div style="background: #f5f5f5; padding: 20px; border-left: 4px solid #d4af37;">
            <p><strong>Nom:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            ${contact.phone ? `<p><strong>Téléphone:</strong> ${contact.phone}</p>` : ''}
            ${contact.subject ? `<p><strong>Sujet:</strong> ${contact.subject}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${contact.message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Reçu le: ${new Date().toLocaleString('fr-CH')}
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Notification email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

// Send new appointment notification to barber
export const sendBarberNotification = async (appointment) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // In production, this should be the barber's email
      subject: `Nouveau Rendez-vous - ${appointment.customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Nouveau Rendez-vous</h2>
          <p>Bonjour ${appointment.barber.name},</p>
          <p>Un nouveau rendez-vous a été créé:</p>
          <div style="background: #f5f5f5; padding: 20px; border-left: 4px solid #d4af37;">
            <p><strong>Client:</strong> ${appointment.customerName}</p>
            <p><strong>Téléphone:</strong> ${appointment.customerPhone}</p>
            ${appointment.customerEmail ? `<p><strong>Email:</strong> ${appointment.customerEmail}</p>` : ''}
            <p><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString('fr-CH')}</p>
            <p><strong>Heure:</strong> ${appointment.appointmentTime}</p>
            <p><strong>Service:</strong> ${appointment.service}</p>
            ${appointment.message ? `<p><strong>Message:</strong> ${appointment.message}</p>` : ''}
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Reçu le: ${new Date().toLocaleString('fr-CH')}
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Barber notification sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};
