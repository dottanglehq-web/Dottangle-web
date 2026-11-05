import 'dotenv/config';
import { smtpTransport, businessEmail } from './notifications.js';
const transport = smtpTransport();
if (!transport) { console.log('Pending Configuration: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM'); process.exitCode = 1; }
else {
  try {
    await transport.verify();
    console.log('SMTP connection, TLS and authentication verified.');
    const to = process.argv[2];
    if (to) {
      const result = await transport.sendMail({ from: process.env.SMTP_FROM || `Dot Tangle <${businessEmail}>`, to, subject: 'Dot Tangle SMTP verification', text: 'SMTP test. Please confirm receipt in your inbox.' });
      console.log(result.accepted?.length && !result.rejected?.length ? 'Provider accepted test email. Inbox receipt must be checked by recipient.' : 'Test recipient rejected.');
    }
  } catch { console.error('SMTP verification failed. Check backend credentials, sender authorization and TLS settings.'); process.exitCode = 1; }
}
