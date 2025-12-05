import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const {
      name,
      email,
      phone,
      eventType,
      eventDate,
      eventLocation,
      guestCount,
      cocktailCount,
      barmanCount,
      barCount,
      message,
    } = data;

    // Configuration du transporteur email
    // IMPORTANT: Remplacez ces valeurs par vos propres identifiants
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // Votre email
        pass: process.env.SMTP_PASSWORD, // Mot de passe d'application
      },
    });

    // Contenu de l'email
    const emailContent = `
      <h1 style="color: #C9A962;">Nouvelle demande de devis - Cocktail 416</h1>
      
      <h2>Informations client</h2>
      <ul>
        <li><strong>Nom:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Téléphone:</strong> ${phone}</li>
      </ul>
      
      <h2>Détails de l'événement</h2>
      <ul>
        <li><strong>Type d'événement:</strong> ${eventType}</li>
        <li><strong>Date:</strong> ${eventDate}</li>
        <li><strong>Lieu:</strong> ${eventLocation}</li>
        <li><strong>Nombre d'invités:</strong> ${guestCount}</li>
      </ul>
      
      <h2>Services demandés</h2>
      <ul>
        <li><strong>Nombre de cocktails:</strong> ${cocktailCount}</li>
        <li><strong>Nombre de barmans:</strong> ${barmanCount}</li>
        <li><strong>Besoin de bar(s):</strong> ${barCount}</li>
      </ul>
      
      ${message ? `<h2>Message</h2><p>${message}</p>` : ''}
      
      <hr style="border-color: #C9A962; margin: 20px 0;">
      <p style="color: #888;">Cet email a été envoyé depuis le formulaire de devis de cocktail416.com</p>
    `;

    // Envoi de l'email
    await transporter.sendMail({
      from: `"Cocktail 416" <${process.env.SMTP_USER}>`,
      to: process.env.DEVIS_EMAIL || process.env.SMTP_USER, // Email où recevoir les devis
      replyTo: email,
      subject: `🍸 Nouvelle demande de devis - ${eventType} - ${name}`,
      html: emailContent,
    });

    // Email de confirmation au client
    await transporter.sendMail({
      from: `"Cocktail 416" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Votre demande de devis - Cocktail 416`,
      html: `
        <h1 style="color: #C9A962;">Merci pour votre demande, ${name} !</h1>
        <p>Nous avons bien reçu votre demande de devis pour votre ${eventType.toLowerCase()}.</p>
        <p>Notre équipe vous contactera dans les <strong>24 heures</strong> pour discuter des détails et vous proposer une offre personnalisée.</p>
        <br>
        <p>À très bientôt,</p>
        <p><strong>L'équipe Cocktail 416</strong></p>
        <p style="color: #888; font-size: 12px;">Genève et ses alentours</p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Demande envoyée avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de l\'envoi de la demande' },
      { status: 500 }
    );
  }
}

