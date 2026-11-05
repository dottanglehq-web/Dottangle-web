import React from 'react';
import { Link } from 'react-router-dom';
export default function ThankYouPage() {
  let status;
  try { status = sessionStorage.getItem('contactConfirmation'); } catch { status = 'pending'; }
  return <div className="contact-page"><section className="contact-form-card thank-you-card" aria-labelledby="thank-you-heading">
    <div className="thank-you-check" aria-hidden="true">✓</div>
    <div className="contact-pill-badge">DOT TANGLE</div>
    <h1 id="thank-you-heading">Thank You for Getting in Touch!</h1>
    <p>Your information has been successfully submitted. Our team has received your inquiry and will shortly connect with you.</p>
    <p>{status === 'accepted' ? 'A confirmation email has been sent to your registered email address. Please check your inbox.' : 'Your confirmation email is queued. Please check your inbox shortly.'}</p>
    <Link className="contact-submit-btn" to="/">Back to Home</Link>
  </section></div>;
}
