import nodemailer from 'nodemailer';
import { fileURLToPath } from 'node:url';
import { renderEmail, emailLinks, studioIntroduction } from './emailTemplate.js';
export const businessEmail = 'dottanglehq@gmail.com';
export function smtpTransport(env = process.env) {
  const user = env.SMTP_USER || env.SMTP_EMAIL;
  if (!env.SMTP_HOST || !user || !env.SMTP_PASS) return null;
  const port = Number(env.SMTP_PORT || 587);
  if (![465, 587].includes(port)) throw new Error('SMTP_PORT must be 465 or 587');
  return nodemailer.createTransport({ host: env.SMTP_HOST, port, secure: port === 465,
    requireTLS: port === 587, auth: { user, pass: env.SMTP_PASS },
    connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 30000 });
}
export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const submissionTime = item => new Date(item.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', timeZoneName: 'short' });

export function emailFor(item, channel, env = process.env) {
  const fields = { 'Customer Name': item.name, Email: item.email, Phone: item.phone, Company: item.company || 'Not provided', Service: item.services.join(', '), Subject: item.subject, Message: item.message, 'Submission Time': submissionTime(item), 'Submission ID': item.submissionId };
  const message = channel === 'admin' ? `New Contact Form Submission\n\n${Object.entries(fields).map(([k,v]) => `${k}: ${v}`).join('\n')}` : `Hello ${item.name},\n\nThank you for contacting Dot Tangle!\n\nWe have successfully received your inquiry. Our team will review your requirements and shortly connect with you.\n\nWe appreciate your interest in our services and look forward to working with you.\n\nBest Regards,\nTeam Dot Tangle\n${businessEmail}`;
  const text = `${message}\n\nAbout Dottangle\n${studioIntroduction}\n\nWebsite: ${emailLinks.website}\nServices: ${emailLinks.services}\nInstagram: ${emailLinks.instagram}\nCall: +91 7973574376`;
  const html = channel === 'admin'
    ? renderEmail('New Contact Form Submission', `<p style="margin:0 0 18px">A new inquiry has arrived from your website. The complete details are below.</p><table width="100%" cellpadding="0" cellspacing="0" style="width:100%;table-layout:fixed;border-collapse:collapse">${Object.entries(fields).map(([k,v]) => `<tr><th class="email-label" scope="row" style="text-align:left;vertical-align:top;padding:12px 10px 12px 0;width:32%;border-bottom:1px solid #f1f5f9;font-size:12px;color:#64748b">${k}</th><td class="email-value" style="vertical-align:top;padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#334155;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word">${escapeHtml(v)}</td></tr>`).join('')}</table>`)
    : renderEmail('We have received your inquiry', message.split('\n\n').map(p => `<p style="margin:0 0 18px">${escapeHtml(p).replace(/\n/g,'<br>')}</p>`).join(''));

  return { from: env.SMTP_FROM || `Dot Tangle <${businessEmail}>`, to: channel === 'admin' ? env.ADMIN_EMAIL || businessEmail : item.email,
    replyTo: channel === 'admin' ? item.email : businessEmail, subject: channel === 'admin' ? `New Contact Form Submission — ${item.submissionId}` : 'Thank You for Contacting Dot Tangle!', text, html,
    attachments: [{ filename: 'dottangle-logo.png', path: fileURLToPath(new URL('../public/dottangle-logo.png', import.meta.url)), cid: 'dottangle-logo@dottangle', contentDisposition: 'inline' }],
    messageId: `<${item.submissionId}.${channel}@dottangle.com>` };
}
export function notificationProviders(env = process.env) {
  const transport = smtpTransport(env);
  return async (item, channel) => {
    if (!['admin', 'customer'].includes(channel)) throw Object.assign(new Error('Unsupported email channel'), { code: 'INVALID_CHANNEL' });
    if (!transport) throw Object.assign(new Error(), { code: 'PENDING_CONFIGURATION' });
    const result = await transport.sendMail(emailFor(item, channel, env));
    if (!result.accepted?.length || result.rejected?.length) throw Object.assign(new Error(), { code: 'RECIPIENT_REJECTED' });
    return { status: 'accepted', providerId: result.messageId };
  };
}
