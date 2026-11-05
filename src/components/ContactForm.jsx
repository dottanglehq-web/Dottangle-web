import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitInquiry } from '../lib/contactApi';

export default function ContactForm({ compact = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const busy = useRef(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    services: [],
    website: '',
    message: ''
  });

  // Read URL query params (e.g. ?plan=Signature or ?service=web or ?subject=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    const service = params.get('service');
    const subjectParam = params.get('subject');

    if (subjectParam) {
      setFormData(prev => ({ ...prev, subject: subjectParam }));
    } else if (plan) {
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry regarding ${plan} Plan`,
        message: `Hi Dot Tangle team, I would like to explore the ${plan} engagement scope for our company.`
      }));
    } else if (service) {
      setFormData(prev => ({
        ...prev,
        subject: `New Project: ${service}`,
        message: `Hi Dot Tangle team, we are looking for high-performance capabilities in ${service}.`
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setError('');
    setIsSubmitting(true);
    try {
      const result = await submitInquiry(formData, { signal: AbortSignal.timeout(20000) });
      try { sessionStorage.setItem('contactConfirmation', result.confirmationStatus || 'pending'); } catch { /* Storage can be disabled by browser privacy settings. */ }
      navigate('/thank-you', { replace: true });
    } catch (err) {
      setError(err.name === 'TimeoutError' || err.name === 'TypeError' ? 'Connection interrupted. Please retry; duplicate inquiries are prevented.' : err.message);
    } finally {
      busy.current = false;
      setIsSubmitting(false);
    }
  };

  return (
              <form aria-busy={isSubmitting} id="contactMessageForm" onSubmit={handleSubmit} className={`contact-form-grid ${compact ? 'contact-form-compact' : ''}`}>

                {/* Row 1: Your Name & Company */}
                <div className="contact-field-group">
                  <label className="contact-field-label" htmlFor="contactName">Your Name</label>
                  <input
                    id="contactName"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={120}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Full Name"
                    className="contact-input"
                  />
                </div>

                <div className="contact-field-group">
                  <label className="contact-field-label" htmlFor="contactCompany">Company</label>
                  <input
                    id="contactCompany"
                    name="company"
                    type="text"
                    maxLength={160}
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company"
                    className="contact-input"
                  />
                </div>

                {/* Row 2: Phone & Email */}
                <div className="contact-field-group">
                  <label className="contact-field-label" htmlFor="contactPhone">Phone</label>
                  <input
                    id="contactPhone"
                    name="phone"
                    type="tel"
                    required
                    pattern="[+0-9 ()-]{7,30}"
                    maxLength={30}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Your Phone Number"
                    className="contact-input"
                  />
                </div>

                <div className="contact-field-group">
                  <label className="contact-field-label" htmlFor="contactEmail">Email</label>
                  <input
                    id="contactEmail"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email Address"
                    className="contact-input"
                  />
                </div>

                <div className="contact-field-group contact-field-full">
                  <label className="contact-field-label" htmlFor="contactService">Selected Service</label>
                  <select id="contactService" required className="contact-input" value={formData.services[0] || ''}
                    onChange={e => setFormData(prev => ({ ...prev, services: [e.target.value] }))}>
                    <option value="">Select a service</option>
                    {['Website Development', 'Mobile App Development', 'AI & Automation', 'Branding & Design', 'Digital Marketing', 'Cloud & Consulting', 'Other'].map(service => <option key={service}>{service}</option>)}
                  </select>
                </div>
                <div className="contact-honeypot" aria-hidden="true">
                  <label htmlFor="contactWebsite">Leave this field empty</label>
                  <input id="contactWebsite" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
                </div>
                {error && <p role="alert" className="contact-field-full" style={{ color: '#f87171' }}>{error}</p>}
                {/* Row 3: Subject (Full Width) */}
                <div className="contact-field-group contact-field-full">
                  <label className="contact-field-label" htmlFor="contactSubject">Subject</label>
                  <input
                    id="contactSubject"
                    name="subject"
                    type="text"
                    required
                    minLength={2}
                    maxLength={200}
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Tell Your Subject"
                    className="contact-input"
                  />
                </div>

                {/* Row 4: Message (Full Width) */}
                <div className="contact-field-group contact-field-full">
                  <label className="contact-field-label" htmlFor="contactMessage">Message</label>
                  <textarea
                    id="contactMessage"
                    name="message"
                    required
                    rows={5}
                    minLength={10}
                    maxLength={4000}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="contact-textarea"
                  />
                </div>

                {/* Row 5: Send Message Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-submit-btn"
                  id="contactSubmitBtn"
                >
                  {isSubmitting && <span className="contact-spinner" aria-hidden="true" />}
                  <span aria-live="polite">{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>

              </form>
  );
}
