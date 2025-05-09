import {NextResponse} from "next/server"
import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    try {
        const {name, email, subject, message} = await request.json()

        if (!name || !email || !subject || !message) {
            return NextResponse.json({error: "All fields are required"}, {status: 400})
        }

        const {data, error} = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: "tyngominer@gmail.com", // Hoặc email đã verify
            subject: `New Contact Form Submission: ${subject}`,
            html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .header { background-color: #007bff; color: #ffffff; text-align: center; padding: 20px; }
            .content { padding: 20px; color: #333333; }
            .content p { margin: 10px 0; line-height: 1.6; }
            .content strong { color: #007bff; }
            .footer { text-align: center; padding: 10px; font-size: 12px; color: #777777; background-color: #f4f4f4; }
            @media only screen and (max-width: 600px) {
              .container { width: 100% !important; margin: 0; }
              .content { padding: 10px; }
            }
          </style>
        </head>
        <body>
          <table class="container" role="presentation">
            <tr>
              <td>
                <div class="header">
                  <h1>New Message from Portfolio</h1>
                </div>
                <div class="content">
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
                  <p><strong>Subject:</strong> ${subject}</p>
                  <p><strong>Message:</strong> ${message}</p>
                </div>
                <div class="footer">
                  <p>This is an automated message from my portfolio. Please do not reply directly to this email.</p>
                </div>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
        })

        if (error) {
            return NextResponse.json({error: error.message}, {status: 500})
        }

        return NextResponse.json({message: "Email sent successfully"}, {status: 200})
    } catch (error) {
        console.error("Error sending email:", error)
        return NextResponse.json({error: "Failed to send email"}, {status: 500})
    }
}