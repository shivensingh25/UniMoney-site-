import { useEffect } from 'react';
import * as gtag from '../utils/gtag';

export default function TestGA() {
  useEffect(() => {
    console.log('GA Tracking ID:', gtag.GA_TRACKING_ID);
    console.log('GA Enabled:', gtag.isGAEnabled);
    
    // Test event
    gtag.event({
      action: 'test_event',
      category: 'testing',
      label: 'GA Test Page Load'
    });
  }, []);

  const testButtonClick = () => {
    gtag.trackButtonClick('Test Button', 'Test Page');
    alert('Button click tracked! Check console and GA Real-Time events.');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Google Analytics Test Page</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded">
            <h2 className="font-semibold text-blue-800">GA Configuration:</h2>
            <p>Tracking ID: {gtag.GA_TRACKING_ID || 'Not found'}</p>
            <p>Enabled: {gtag.isGAEnabled ? 'Yes' : 'No'}</p>
          </div>
          
          <button
            onClick={testButtonClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Test Button Click Tracking
          </button>
          
          <div className="p-4 bg-green-50 rounded">
            <h2 className="font-semibold text-green-800">How to Test:</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm text-green-700">
              <li>Open browser console (F12)</li>
              <li>Look for "Google Analytics initialized" message</li>
              <li>Click the test button above</li>
              <li>Check Google Analytics Real-Time events</li>
              <li>Verify gtag function is available: type <code>window.gtag</code> in console</li>
            </ol>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded">
            <h2 className="font-semibold text-yellow-800">Troubleshooting:</h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
              <li>Ensure NEXT_PUBLIC_GA_ID is set in .env.local</li>
              <li>Restart dev server after changing .env.local</li>
              <li>Check network tab for gtag.js requests</li>
              <li>Verify tracking ID format: G-XXXXXXXXXX</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}