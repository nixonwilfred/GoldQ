import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL;
const toEmail = process.env.RESEND_TO_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    if (!name || !email || !message) {
      return Response.json({ message: "Please fill in all fields." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    if (!resend || !fromEmail || !toEmail) {
      return Response.json(
        { message: "Email service is not configured yet. Please set environment variables." },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `GoldQ Contact: ${name}`,
      replyTo: email,
      text: `New contact form submission from GoldQ\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New GoldQ Contact Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { message: "Something went wrong while sending your message." },
        { status: 500 }
      );
    }

    return Response.json({ message: "Email sent successfully." });
  } catch (err) {
    console.error("Contact route error:", err);
    return Response.json(
      { message: "Something went wrong while sending your message." },
      { status: 500 }
    );
  }
}
