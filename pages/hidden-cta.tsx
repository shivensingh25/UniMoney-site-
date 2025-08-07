import WaitlistForm from '../components/WaitlistForm';
import { useState } from 'react';

const HiddenCtaPage = () => {
  // Always open the form, but provide a dummy onClose that just reloads the page or navigates away
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] via-[#c8e6c9] to-[#b2dfdb]">
      <WaitlistForm isOpen={true} onClose={() => {}} />
    </div>
  );
};

export default HiddenCtaPage;
