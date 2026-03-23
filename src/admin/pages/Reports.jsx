// Reports.jsx
import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  Loader, 
  Flag, 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  FileText, 
  Check, 
  X, 
  Filter,
  Eye
} from 'lucide-react';

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' or 'pending'
  const [actionInProgress, setActionInProgress] = useState(null); // { id, type }

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/Report');
      if (!response.ok) throw new Error('Failed to fetch reports');
      const data = await response.json();
      setReports(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const acceptReport = async (id) => {
    if (!window.confirm('Are you sure you want to accept this report? It will be marked as resolved.')) return;
    
    setActionInProgress({ id, type: 'accept' });
    try {
      const response = await fetch(`http://localhost:3001/Report/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'accepted' })
      });
      if (!response.ok) throw new Error('Failed to accept report');
      
      // Update local state
      setReports(prevReports =>
        prevReports.map(report =>
          report.id === id ? { ...report, status: 'accepted' } : report
        )
      );
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setActionInProgress(null);
    }
  };

  const deleteReport = async (id) => {
    if (!window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) return;
    
    setActionInProgress({ id, type: 'delete' });
    try {
      const response = await fetch(`http://localhost:3001/Report/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete report');
      
      // Remove from local state
      setReports(prevReports => prevReports.filter(report => report.id !== id));
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setActionInProgress(null);
    }
  };

  const filteredReports = reports.filter(report => {
    if (filter === 'pending') return report.status !== 'accepted';
    return true;
  });

  const pendingCount = reports.filter(r => r.status !== 'accepted').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-red-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="mt-4 text-red-600 font-medium">Error: {error}</p>
          <p className="text-gray-500 mt-2">Please make sure the JSON server is running and has a 'Report' array.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Reports</h1>
              <p className="mt-2 text-gray-600">
                Manage submitted user reports. Total: {reports.length} ({pendingCount} pending)
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white rounded-lg shadow px-3 py-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="text-sm bg-transparent focus:outline-none"
                >
                  <option value="all">All Reports</option>
                  <option value="pending">Pending Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No reports found.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">{report.fullName}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <a href={`mailto:${report.email}`} className="text-sm text-red-600 hover:underline">
                              {report.email}
                            </a>
                          </div>
                          {report.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{report.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          report.reportCategory === 'Other' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {report.reportCategory || 'General'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <p className="text-sm text-gray-600 line-clamp-2">{report.description}</p>
                          {report.subject && (
                            <p className="text-xs text-gray-500 mt-1">Subject: {report.subject}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          report.status === 'accepted' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status === 'accepted' ? 'Accepted' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          {report.status !== 'accepted' && (
                            <button
                              onClick={() => acceptReport(report.id)}
                              disabled={actionInProgress?.id === report.id}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition disabled:opacity-50"
                              title="Accept"
                            >
                              {actionInProgress?.id === report.id && actionInProgress.type === 'accept' ? (
                                <Loader className="h-4 w-4 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => deleteReport(report.id)}
                            disabled={actionInProgress?.id === report.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                            title="Delete"
                          >
                            {actionInProgress?.id === report.id && actionInProgress.type === 'delete' ? (
                              <Loader className="h-4 w-4 animate-spin" />
                            ) : (
                              <X className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredReports.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500">
              No reports found.
            </div>
          ) : (
            filteredReports.map((report) => (
              <div key={report.id} className="bg-white rounded-xl shadow p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Flag className={`h-5 w-5 ${report.status === 'accepted' ? 'text-green-500' : 'text-red-500'}`} />
                    <span className="font-medium text-gray-900">{report.fullName}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    report.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status === 'accepted' ? 'Accepted' : 'Pending'}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a href={`mailto:${report.email}`} className="text-red-600 hover:underline">{report.email}</a>
                  </div>
                  {report.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{report.phone}</span>
                    </div>
                  )}
                  {report.incidentDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(report.incidentDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Category:</span>
                    <span className="text-gray-600">{report.reportCategory || 'General'}</span>
                  </div>
                  {report.subject && (
                    <div>
                      <span className="font-medium">Subject:</span>
                      <p className="text-gray-600 mt-1">{report.subject}</p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Description:</span>
                    <p className="text-gray-600 mt-1 whitespace-pre-wrap">{report.description}</p>
                  </div>
                  <div className="text-xs text-gray-400 pt-2">
                    {report.createdAt ? `Submitted: ${new Date(report.createdAt).toLocaleString()}` : 'Date not recorded'}
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                  {report.status !== 'accepted' && (
                    <button
                      onClick={() => acceptReport(report.id)}
                      disabled={actionInProgress?.id === report.id}
                      className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition disabled:opacity-50"
                    >
                      {actionInProgress?.id === report.id && actionInProgress.type === 'accept' ? (
                        <Loader className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      Accept
                    </button>
                  )}
                  <button
                    onClick={() => deleteReport(report.id)}
                    disabled={actionInProgress?.id === report.id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition disabled:opacity-50"
                  >
                    {actionInProgress?.id === report.id && actionInProgress.type === 'delete' ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;