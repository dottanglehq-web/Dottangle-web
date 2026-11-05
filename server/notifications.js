import nodemailer from 'nodemailer';
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
const wrap = body => `<div style="background:#0c0e14;color:#e2e8f0;font:16px/1.7 Arial,sans-serif;max-width:620px;margin:auto;border-radius:16px;overflow:hidden"><div style="padding:24px;background:#6d28d9;color:white;font-size:26px;font-weight:bold">Dot Tangle</div><div style="padding:24px;overflow-wrap:anywhere">${body}</div><div style="padding:20px;color:#cbd5e1">Team Dot Tangle · ${businessEmail}</div></div>`;
export function emailFor(item, channel, env = process.env) {
  const fields = { 'Customer Name': item.name, Email: item.email, Phone: item.phone, Company: item.company || 'Not provided', Service: item.services.join(', '), Subject: item.subject, Message: item.message, 'Submission Time': submissionTime(item), 'Submission ID': item.submissionId };
  const text = channel === 'admin' ? `New Contact Form Submission\n\n${Object.entries(fields).map(([k,v]) => `${k}: ${v}`).join('\n')}` : `Hello ${item.name},\n\nThank you for contacting Dot Tangle!\n\nWe have successfully received your inquiry. Our team will review your requirements and shortly connect with you.\n\nWe appreciate your interest in our services and look forward to working with you.\n\nBest Regards,\nTeam Dot Tangle\n${businessEmail}`;
  const html = channel === 'admin' ? wrap(`<h1 style="font-size:24px">New Contact Form Submission</h1><table style="width:100%;table-layout:fixed">${Object.entries(fields).map(([k,v]) => `<tr><th style="text-align:left;vertical-align:top;padding:10px;width:32%">${k}</th><td style="padding:10px;white-space:pre-wrap;overflow-wrap:anywhere">${escapeHtml(v)}</td></tr>`).join('')}</table>`) : wrap(text.split('\n\n').map(p => `<p>${escapeHtml(p).replace(/\n/g,'<br>')}</p>`).join(''));
  return { from: env.SMTP_FROM || `Dot Tangle <${businessEmail}>`, to: channel === 'admin' ? env.ADMIN_EMAIL || businessEmail : item.email,
    replyTo: channel === 'admin' ? item.email : businessEmail, subject: channel === 'admin' ? `New Contact Form Submission — ${item.submissionId}` : 'Thank You for Contacting Dot Tangle!', text, html,
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
