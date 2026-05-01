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

    // 1. Send welcome email TO the subscriber
    const { error: welcomeError } = await resend.emails.send({
      from: fromEmail,
      to: cleanEmail,
      subject: "Welcome to GoldQ 👋 Your daily levels are on the way",
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 32px; border-radius: 12px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #f5c518; font-size: 28px; margin: 0; letter-spacing: 2px;">GOLDQ</h1>
            <p style="color: #888; font-size: 13px; margin: 4px 0 0;">NQ Futures & Gold Analysis</p>
          </div>

          <!-- Main message -->
          <h2 style="color: #ffffff; font-size: 22px; margin: 0 0 12px;">Hey, welcome aboard! 🎉</h2>
          <p style="color: #ccc; line-height: 1.7; margin: 0 0 16px;">
            You're now part of a growing group of traders who get <strong style="color: #f5c518;">free daily levels</strong> for NQ Futures and Gold (XAUUSD) — delivered straight to their inbox before the New York open.
          </p>
          <p style="color: #ccc; line-height: 1.7; margin: 0 0 24px;">
            Here's what to expect every morning:
          </p>

          <!-- Features -->
          <div style="background: #1a1a1a; border-left: 3px solid #f5c518; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="margin: 0 0 10px; color: #fff;">📊 <strong>1H Structure Bias</strong> — Know the direction before price moves</p>
            <p style="margin: 0 0 10px; color: #fff;">🟦 <strong>FVG / IFVG Zones</strong> — Key imbalance areas identified for you</p>
            <p style="margin: 0 0 10px; color: #fff;">🧱 <strong>Breaker Blocks</strong> — High-probability reversal zones</p>
            <p style="margin: 0; color: #fff;">💧 <strong>Liquidity Sweep Targets</strong> — Where smart money is likely hunting</p>
          </div>

          <p style="color: #ccc; line-height: 1.7; margin: 0 0 24px;">
            Keep an eye on your inbox — your first daily levels will arrive soon. In the meantime, feel free to check out the analysis on the site.
          </p>

          <!-- CTA Button -->
          <div style="text-align: center; margin-bottom: 32px;">
            <a href="https://goldq.vercel.app/analysis" style="background: #f5c518; color: #000; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px;">
              View Latest Analysis →
            </a>
          </div>

          <!-- Footer -->
          <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;" />
          <p style="color: #555; font-size: 12px; text-align: center; margin: 0;">
            You're receiving this because you signed up at GoldQ.<br/>
            Questions? Reply to this email anytime.
          </p>
        </div>
      `,
      text: `Welcome to GoldQ! You'll receive free daily levels for NQ and Gold before the NY open. Stay tuned!`
    });

    if (welcomeError) {
      console.error("Welcome email error:", welcomeError);
    }

    // 2. Send notification email TO you (admin)
    const { error: notifyError } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: "🔔 New GoldQ Subscriber",
      replyTo: cleanEmail,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; padding: 24px; max-width: 480px;">
          <h2 style="margin: 0 0 8px; color: #111;">New subscriber 🎉</h2>
          <p style="margin: 0; color: #333; font-size: 16px;">
            <strong>${cleanEmail}</strong> just joined your GoldQ newsletter.
          </p>
        </div>
      `,
      text: `New GoldQ subscriber: ${cleanEmail}`
    });

    if (notifyError) {
      console.error("Notify email error:", notifyError);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Subscribe route error:", err);
    return Response.json({ error: "Unable to submit right now. Please try again." }, { status: 500 });
  }
}
