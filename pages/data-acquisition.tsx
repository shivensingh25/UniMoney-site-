import { useState } from 'react';
import { useRouter } from 'next/router';

const DataAcquisition = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    country: '',
    university: '',
    course: '',
    loanAmount: '',
    income: '',
    cosigner: '',
    document: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Here you would typically save the form data
    // For now, we'll just redirect to the documents upload page
    setTimeout(() => {
      router.push('/upload-documents');
    }, 2000); // Show the thank you message for 2 seconds before redirecting
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] via-[#c8e6c9] to-[#b2dfdb]">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-4 font-display tracking-tight">Thank you!</h2>
          <p className="text-lg text-gray-700 font-medium">Your data has been received. Redirecting to document upload...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] via-[#c8e6c9] to-[#b2dfdb]">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-2xl space-y-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center font-display tracking-tight">Loan Data Acquisition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm tracking-wide">Full Name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Full Name" />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm tracking-wide">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Email" />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm tracking-wide">Phone</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Phone" />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm tracking-wide">Date of Birth</label>
            <input name="dob" type="date" value={form.dob} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm tracking-wide">Address</label>
            <input name="address" value={form.address} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Address" />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm tracking-wide">Country</label>
            <input name="country" value={form.country} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Country" />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm tracking-wide">University</label>
            <input name="university" value={form.university} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="University" />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm tracking-wide">Course</label>
            <input name="course" value={form.course} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Course" />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm tracking-wide">Loan Amount</label>
            <input name="loanAmount" type="number" value={form.loanAmount} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Loan Amount" />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm tracking-wide">Annual Income</label>
            <input name="income" type="number" value={form.income} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Annual Income" />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm tracking-wide">Co-signer Info</label>
            <input name="cosigner" value={form.cosigner} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Co-signer Info" />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm tracking-wide">Upload Document</label>
            <input name="document" type="file" onChange={handleChange} className="w-full text-gray-900 placeholder-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all" />
          </div>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-base tracking-wide">Submit</button>
      </form>
    </div>
  );
};

export default DataAcquisition; 