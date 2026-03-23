// UserReport.jsx
import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  Send, 
  User, 
  Mail, 
  Phone, 
  Flag, 
  FileText, 
  Paperclip, 
  Calendar,
  X,
  Loader
} from 'lucide-react';

function UserReport() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    reportCategory: '',
    subject: '',
    description: '',
    incidentDate: '',
    attachments: null,
    agreeToTerms: false
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');

  const categories = [
    'Booking Issue',
    'Vehicle Condition',
    'Customer Service',
    'Payment Problem',
    'Technical Glitch',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({ ...prev, attachments: file }));
      setFileName(file ? file.name : '');
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.reportCategory || !formData.description) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all required fields.'
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please enter a valid email address.'
      });
      setIsSubmitting(false);
      return;
    }

    // Prepare payload (without the file for now; we'll handle file separately or convert to base64)
    // For simplicity, we'll send text fields only and ignore file in this example.
    // If you want to send files, you'd need to use FormData and set appropriate headers.
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      reportCategory: formData.reportCategory,
      subject: formData.subject,
      description: formData.description,
      incidentDate: formData.incidentDate,
      agreeToTerms: formData.agreeToTerms,
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:3001/Report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      }

      const data = await response.json();

      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your report. Our team will investigate and get back to you within 24 hours.'
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        reportCategory: '',
        subject: '',
        description: '',
        incidentDate: '',
        attachments: null,
        agreeToTerms: false
      });
      setFileName('');
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearFile = () => {
    setFormData(prev => ({ ...prev, attachments: null }));
    setFileName('');
    // Reset file input value
    const fileInput = document.getElementById('attachments');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Flag className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Report a Challenge</h1>
          <p className="mt-2 text-gray-600">
            We're sorry you experienced an issue. Please provide details so we can resolve it quickly.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
          {/* Status Messages */}
          {formStatus.submitted && formStatus.success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">Report submitted successfully!</p>
                <p className="text-green-600 text-sm">{formStatus.message}</p>
              </div>
            </div>
          )}

          {formStatus.submitted && !formStatus.success && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Submission Failed</p>
                <p className="text-red-600 text-sm">{formStatus.message}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500"
                  placeholder="+971 50 123 4567"
                />
              </div>
            </div>

            {/* Incident Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Date (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Report Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="reportCategory"
                value={formData.reportCategory}
                onChange={handleChange}
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500 bg-white"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject (Brief Title)
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500"
                placeholder="e.g., Booking not confirmed"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500 resize-none"
                  placeholder="Please provide as much detail as possible (e.g., date, time, car model, booking reference, etc.)"
                />
              </div>
            </div>

            {/* File Attachment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments (Optional)
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                  <Paperclip className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Choose file</span>
                  <input
                    type="file"
                    id="attachments"
                    name="attachments"
                    onChange={handleChange}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                  />
                </label>
                {fileName && (
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg">
                    <span className="text-sm text-gray-600 truncate max-w-xs">{fileName}</span>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Accepted formats: JPG, PNG, PDF, DOC, DOCX (max 5MB). File will be reviewed by our team.
              </p>
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                id="terms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="mt-1 w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I confirm that the information provided is accurate and I consent to the processing of my data
                for the purpose of investigating this report. I understand that false reports may be subject to review.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all hover:-translate-y-0.5 shadow-lg shadow-red-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Report
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>For urgent matters, please call our 24/7 support line: <span className="font-medium">+971 4 123 4567</span></p>
        </div>
      </div>
    </div>
  );
}

export default UserReport;