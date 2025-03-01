import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Certificate {
  certificateId: string;
  memberName: string;
  studentId: string;
  clubDepartment: string;
  certificateTitle: string;
  issueDate: string;
  issuedBy: string;
}

const CertificateVerification: React.FC = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { API_URL } = useAuth();

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const response = await fetch(`${API_URL}/api/certificates/verify/${certificateId}`);
        const data = await response.json();
        
        if (data.success) {
          setCertificate(data.certificate);
        } else {
          setError(data.message || 'Certificate verification failed');
        }
      } catch (err) {
        setError('Failed to verify certificate');
      } finally {
        setLoading(false);
      }
    };

    verifyCertificate();
  }, [certificateId, API_URL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-center mb-8">Certificate Verification</h1>
            
            {error ? (
              <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg text-center">
                <p className="font-medium">Invalid Certificate</p>
                <p className="mt-1">{error}</p>
              </div>
            ) : (
              <>
                <div className="bg-green-50 border border-green-200 text-green-600 px-6 py-4 rounded-lg text-center mb-8">
                  <p className="font-medium">Valid Certificate</p>
                  <p className="mt-1">This certificate has been verified as authentic.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-center mb-6">{certificate?.certificateTitle}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Certificate ID</p>
                      <p className="font-medium">{certificate?.certificateId}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Issued To</p>
                      <p className="font-medium">{certificate?.memberName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Student ID</p>
                      <p className="font-medium">{certificate?.studentId}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium">{certificate?.clubDepartment}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Issue Date</p>
                      <p className="font-medium">{new Date(certificate?.issueDate || '').toLocaleDateString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Issued By</p>
                      <p className="font-medium">{certificate?.issuedBy}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            <div className="mt-8 text-center">
              <Link to="/" className="text-blue-600 hover:text-blue-800">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerification; 