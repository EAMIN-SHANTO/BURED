import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

interface Certificate {
  _id: string;
  certificateId: string;
  memberName: string;
  studentId: string;
  clubDepartment: string;
  certificateTitle: string;
  issueDate: string;
  issuedBy: string;
  verificationUrl: string;
  createdAt: string;
}

interface FormData {
  memberName: string;
  studentId: string;
  clubDepartment: string;
  certificateTitle: string;
  issueDate: string;
}

const CertificateManagement: React.FC = () => {
  const { API_URL, user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<FormData>({
    memberName: '',
    studentId: '',
    clubDepartment: '',
    certificateTitle: '',
    issueDate: new Date().toISOString().split('T')[0]
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchCertificates();
  }, [API_URL]);

  const fetchCertificates = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Fetching certificates...');
      console.log('API URL:', API_URL);
      console.log('With credentials:', true);
      
      const response = await fetch(`${API_URL}/api/certificates`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Failed to fetch certificates');
      }
      
      const data = await response.json();
      console.log('Certificates data:', data);
      
      if (data.success) {
        setCertificates(data.certificates || []);
      } else {
        setError(data.message || 'Failed to fetch certificates');
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const url = editingId 
        ? `${API_URL}/api/certificates/${editingId}` 
        : `${API_URL}/api/certificates`;
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${editingId ? 'update' : 'create'} certificate`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(data.message || `Certificate ${editingId ? 'updated' : 'created'} successfully`);
        setFormData({
          memberName: '',
          studentId: '',
          clubDepartment: '',
          certificateTitle: '',
          issueDate: new Date().toISOString().split('T')[0]
        });
        setEditingId(null);
        fetchCertificates();
      } else {
        setError(data.message || `Failed to ${editingId ? 'update' : 'create'} certificate`);
      }
    } catch (error) {
      console.error(`Error ${editingId ? 'updating' : 'creating'} certificate:`, error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  const handleEdit = (certificate: Certificate) => {
    setEditingId(certificate._id);
    setFormData({
      memberName: certificate.memberName,
      studentId: certificate.studentId,
      clubDepartment: certificate.clubDepartment,
      certificateTitle: certificate.certificateTitle,
      issueDate: new Date(certificate.issueDate).toISOString().split('T')[0]
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      memberName: '',
      studentId: '',
      clubDepartment: '',
      certificateTitle: '',
      issueDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleDelete = async (id: string) => {
    if (confirmDelete !== id) {
      setConfirmDelete(id);
      return;
    }
    
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch(`${API_URL}/api/certificates/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete certificate');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(data.message || 'Certificate deleted successfully');
        setConfirmDelete(null);
        fetchCertificates();
      } else {
        setError(data.message || 'Failed to delete certificate');
      }
    } catch (error) {
      console.error('Error deleting certificate:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Certificate Management</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Update Certificate' : 'Create New Certificate'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Member Name
              </label>
              <input
                type="text"
                name="memberName"
                value={formData.memberName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student ID
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                name="clubDepartment"
                value={formData.clubDepartment}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certificate Title
              </label>
              <input
                type="text"
                name="certificateTitle"
                value={formData.certificateTitle}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Date
              </label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingId ? 'Update Certificate' : 'Create Certificate'}
            </button>
            
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">Certificates</h2>
        
        {loading ? (
          <div className="p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading certificates...</p>
          </div>
        ) : certificates.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No certificates found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Certificate ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issued By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {certificates.map((cert) => (
                  <tr key={cert._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {cert.certificateId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cert.memberName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cert.studentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cert.clubDepartment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cert.certificateTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(cert.issueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cert.issuedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(cert)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        
                        {confirmDelete === cert._id ? (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleDelete(cert._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={cancelDelete}
                              className="text-gray-600 hover:text-gray-800"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleDelete(cert._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateManagement; 