import { GmailService } from "@wrtnlabs/connector-gmail";

import { MyGlobal } from "../../MyGlobal";

/**
 * Email Provider.
 *
 * - Encapsulates Gmail connector usage
 * - Validates environment variables upfront
 * - Provides a simple API to send HTML emails
 */
export namespace EmailProvider {
  /**
   * Send a simple email.
   *
   * - Accepts a single recipient, subject, and plain text body
   * - Body will be wrapped with basic HTML and escaped safely
   * - Returns the provider-specific message id
   */
  export async function sendSimpleEmail(props: {
    to: string;
    subject: string;
    bodyText: string;
  }): Promise<string> {
    // Validate environment variables
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? MyGlobal.env.GOOGLE_CLIENT_ID;
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? MyGlobal.env.GOOGLE_CLIENT_SECRET;
    const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN ?? MyGlobal.env.GOOGLE_REFRESH_TOKEN;
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
      throw new Error(
        "Missing Gmail credentials: GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET/GOOGLE_REFRESH_TOKEN",
      );
    }

    // Create connector instance
    const gmail = new GmailService({
      googleClientId: GOOGLE_CLIENT_ID,
      googleClientSecret: GOOGLE_CLIENT_SECRET,
      googleRefreshToken: GOOGLE_REFRESH_TOKEN,
    });

    // Escape the body content for safe HTML
    const safe = props.bodyText
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br/>");

    const html = `<!doctype html><html><body><div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu;line-height:1.6;font-size:14px;color:#111">
      <p>${safe}</p>
      <hr/>
      <p style="color:#555">Sent via Agentica</p>
    </div></body></html>`;

    const res = await gmail.sendEmail({
      to: [props.to],
      subject: props.subject,
      body: html,
    });
    return res.id;
  }
}


