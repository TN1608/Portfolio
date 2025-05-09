import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend("re_erYqowuA_Lc1WoNQJ9f5RUwHMjPAYxidXY");

export async function POST(request: Request) {
    try {
        const { name, email, subject, message } = await request.json()

        // Validate input
        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }

        // Gửi email qua Resend
        const { data, error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>", // Địa chỉ email gửi (cần verify domain trên Resend)
            to: "tuanngdinh.1608@gmail.com", // Email của bạn
            subject: `New Contact Form Submission: ${subject}`,
            html: `
        <h2>New Message from Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
        })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }
}