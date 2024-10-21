import React, { useState } from 'react';
import '../styles/EmailForm.css';  

const EmailForm = ({ results }) => {
  const [email, setEmail] = useState('');

  const handleSendEmail = () => {
    // Generate email content
    const emailContent = results.map((result) => result.title).join('\n');
    window.location.href = `mailto:${email}?subject=Search Results&body=${encodeURIComponent(emailContent)}`;
  };

  return (
    <div className="email-form-container">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      />
      <button onClick={handleSendEmail}>Send Results</button>
    </div>
  );
};

export default EmailForm;
