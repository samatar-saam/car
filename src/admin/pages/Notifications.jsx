// Notifications.jsx
import React, { useState, useEffect } from 'react';
import { Mail, Phone, User, MessageSquare, Calendar, AlertCircle, Loader } from 'lucide-react';

function Notifications() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:3001/contacts');
        if (!response.ok) throw new Error('Failed to fetch contacts');
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-purple-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading notifications...</p>
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
          <p className="text-gray-500 mt-2">Please make sure the JSON server is running.</p>
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Mail className="h-12 w-12 text-gray-400 mx-auto" />
          <p className="mt-4 text-gray-600 text-lg">No contact messages yet.</p>
          <p className="text-gray-500">When someone fills out the contact form, it will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Notifications</h1>
          <p className="mt-2 text-gray-600">
            All messages submitted through the contact form. Total: {contacts.length}
          </p>
        </div>

        {/* Table (Desktop) */}
        <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* If you have a timestamp field, use it. Otherwise fallback to ID */}
                      {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : `ID: ${contact.id}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{contact.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <a href={`mailto:${contact.email}`} className="text-sm text-purple-600 hover:underline">
                          {contact.email}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {contact.phone ? (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{contact.phone}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        {contact.subject || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <MessageSquare className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                        <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">{contact.message}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white rounded-xl shadow p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{contact.name}</span>
                </div>
                <span className="text-xs text-gray-400">
                  {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : `ID: ${contact.id}`}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href={`mailto:${contact.email}`} className="text-purple-600 hover:underline">
                  {contact.email}
                </a>
              </div>
              {contact.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{contact.phone}</span>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-gray-500">Subject:</span>
                <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                  {contact.subject || 'General'}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{contact.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;