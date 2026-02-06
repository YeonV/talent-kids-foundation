import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailBody = `
Neuer Bewerber

Name: ${name}
E-Mail: ${email}

Nachricht:
${message}
    `.trim();

    // In production, you would use a service like Nodemailer, SendGrid, or similar
    // For now, we'll log it and return success
    console.log('Email to be sent to info@talent-kids-foundation.de:');
    console.log('Subject: Neuer Bewerber');
    console.log('Body:', emailBody);

    // TODO: Implement actual email sending
    // Example with nodemailer:
    // const transporter = nodemailer.createTransport({ ... });
    // await transporter.sendMail({
    //   from: email,
    //   to: 'info@talent-kids-foundation.de',
    //   subject: 'Neuer Bewerber',
    //   text: emailBody,
    //   replyTo: email
    // });

    return NextResponse.json(
      { success: true, message: 'Nachricht erfolgreich gesendet' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Fehler beim Senden der Nachricht' },
      { status: 500 }
    );
  }
}
