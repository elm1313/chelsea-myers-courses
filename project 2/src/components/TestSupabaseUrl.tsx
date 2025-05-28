import React, { useState, useEffect } from 'react';
import { getScormContentUrl } from '../utils/supabase';

const TestSupabaseUrl: React.FC = () => {
  const [supabaseUrl, setSupabaseUrl] = useState<string>('');
  const [scormUrl, setScormUrl] = useState<string>('');
  
  useEffect(() => {
    // Get the raw Supabase URL from env
    const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'Not set';
    setSupabaseUrl(rawUrl);
    
    // Generate the SCORM URL
    const generatedUrl = getScormContentUrl('quantum-upgrade');
    setScormUrl(generatedUrl);
  }, []);
  
  return (
    <div className="p-4 bg-gray-800 text-white rounded-md">
      <h2 className="text-xl font-bold mb-4">Supabase URL Debug Information</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold">Raw VITE_SUPABASE_URL:</h3>
        <code className="block bg-gray-900 p-2 rounded mt-1">{supabaseUrl}</code>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold">Generated SCORM URL:</h3>
        <code className="block bg-gray-900 p-2 rounded mt-1 break-all">{scormUrl}</code>
      </div>
      
      <div className="mt-8">
        <h3 className="font-semibold mb-2">Manual URL Test:</h3>
        <p className="text-sm mb-2">Click to test if this URL works directly:</p>
        <a 
          href={scormUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline break-all"
        >
          {scormUrl}
        </a>
      </div>
    </div>
  );
};

export default TestSupabaseUrl;