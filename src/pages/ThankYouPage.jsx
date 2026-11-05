import React from 'react';
import { Link } from 'react-router-dom';
export default function ThankYouPage() {
  return <div className="contact-page"><section className="contact-form-card thank-you-card" aria-labelledby="thank-you-heading">
    <div className="thank-you-check" aria-hidden="true">✓</div>
    <div className="contact-pill-badge">DOT TANGLE</div>
    <h1 id="thank-you-heading">Thank You for Getting in Touch!</h1>
    <p>Your inquiry has been successfully submitted. Our team has received your information and will shortly connect with you.</p>
    <p>A confirmation email will be sent to your registered email address.</p>
    <Link className="contact-submit-btn" to="/">Back to Home</Link>
  </section></div>;
}
