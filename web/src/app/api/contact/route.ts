import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

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
        const { data, error } = await resend.emails.send({
            from: "KanyoDev <noreply@kanyodev.com>",
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

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json(
                { error: "Mail gönderilemedi" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            { error: "Bir hata oluştu" },
            { status: 500 }
        );
    }
}
