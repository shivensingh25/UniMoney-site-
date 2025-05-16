import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('PYoFuUb5yNF4hZiXJ');

export const sendWaitlistEmail = async (formData: {
  email: string;
  hardestPart: string;
  fromCountry: string;
  university: string;
}) => {
  try {
    const response = await emailjs.send(
      'service_alm33rh',
      'template_p7qx7eb',
      {
        from_email: formData.email,
        reply_to: formData.email,
        hardest_part: formData.hardestPart,
        from_country: formData.fromCountry,
        university: formData.university,
        to_name: 'UniMoney Team',
        from_name: 'Waitlist Form',
      }
    );

    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw new Error('Failed to send email. Please try again.');
  }
}; 