import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };
    const cleanEmail = email?.trim().toLowerCase();

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const toEmail = process.env.RESEND_TO_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!resend || !toEmail || !fromEmail) {
      return Response.json(
        { error: "Email service is not configured yet. Please try again soon." },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: "New GoldQ Newsletter Signup",
      replyTo: cleanEmail,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; padding: 16px;">
          <h2 style="margin: 0 0 8px; color: #111;">New GoldQ signup</h2>
          <p style="margin: 0; color: #333;">Subscriber email: <strong>${cleanEmail}</strong></p>
        </div>
      `,
      text: `New GoldQ signup: ${cleanEmail}`
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Unable to submit right now. Please try again." }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Subscribe route error:", err);
    return Response.json({ error: "Unable to submit right now. Please try again." }, { status: 500 });
  }
}
