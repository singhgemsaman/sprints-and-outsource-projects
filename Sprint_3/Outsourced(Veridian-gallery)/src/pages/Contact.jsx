import { useState } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Contact.css';

export default function Contact() {
  useDocumentTitle('Contact | Veridian Gallery');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1 className="page-title">Get in <span>Touch</span></h1>
        <p className="page-subtitle">We'd love to hear from you. Reach out for inquiries, appointments, or collaborations.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-card">
            <h3><span className="icon">◈</span> Visit Us</h3>
            <p>742 Evergreen Gallery Row<br />New York, NY 10012</p>
            <div className="map-placeholder" aria-label="Map location placeholder">
              ◎ Interactive Map
            </div>
          </div>

          <div className="contact-card">
            <h3><span className="icon">◈</span> Gallery Hours</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>Tuesday – Friday: 10:00 AM – 7:00 PM</li>
              <li>Saturday: 11:00 AM – 8:00 PM</li>
              <li>Sunday: 12:00 PM – 5:00 PM</li>
              <li>Monday: Closed</li>
            </ul>
          </div>

          <div className="contact-card">
            <h3><span className="icon">◈</span> Contact Details</h3>
            <p>
              Phone: +1 (212) 555-0187<br />
              Email: patrons@veridiangallery.com<br />
              Private Viewings: By appointment only
            </p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send a Message</h3>
          {submitted && (
            <div className="form-success">
              Thank you for your message. We'll respond within 24 hours.
            </div>
          )}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
          </div>
          <button type="submit" className="submit-btn">Send Inquiry</button>
        </form>
      </div>
    </div>
  );
}
