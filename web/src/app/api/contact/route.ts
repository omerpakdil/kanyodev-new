import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, company, projectType, budget, message } = body;

        // Validate required fields
        if (!name || !email || !projectType || !message) {
            return NextResponse.json(
                { error: "Zorunlu alanlar eksik" },
                { status: 400 }
            );
        }

        // Send email
        const info = await transporter.sendMail({
            from: `"KanyoDev" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || "info@kanyodev.com",
            replyTo: email,
            subject: `Yeni Proje Talebi: ${projectType} - ${name}`,
            html: `
        <h2>Yeni Proje Talebi</h2>
        <hr />
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "Belirtilmedi"}</p>
        <p><strong>Şirket:</strong> ${company || "Belirtilmedi"}</p>
        <p><strong>Proje Tipi:</strong> ${projectType}</p>
        <p><strong>Tahmini Bütçe:</strong> ${budget || "Belirtilmedi"}</p>
        <hr />
        <h3>Proje Detayları:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">Bu mesaj KanyoDev web sitesi iletişim formundan gönderilmiştir.</p>
      `,
        });

        return NextResponse.json({ success: true, id: info.messageId });
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            { error: "Mail gönderilemedi" },
            { status: 500 }
        );
    }
}
