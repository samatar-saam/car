// ContactPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  HeadphonesIcon,
  Sparkles,
  ChevronRight,
  Building2,
  Globe2,
  Award,
  Users,
  Calendar,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Car, // added for footer
} from "lucide-react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agreeToTerms: false
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });

  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for reaching out! Our concierge team will respond within 2 hours.',
      });

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        agreeToTerms: false,
      });
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Something went wrong. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "How quickly do you respond to inquiries?",
      answer: "Our concierge team aims to respond to all inquiries within 2 hours during business hours. For urgent matters, we recommend calling our 24/7 support line."
    },
    {
      question: "Can I book a car directly through the contact form?",
      answer: "While you can express interest through this form, we recommend using our online booking system for immediate reservations. Our team will assist with any special requests or complex bookings."
    },
    {
      question: "Do you offer airport delivery?",
      answer: "Yes! We provide complimentary delivery to all major airports in Dubai, including DXB, DWC, and SHJ. Simply specify your flight details when booking."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, Amex), bank transfers, and cryptocurrency for premium bookings. A deposit is required to confirm reservations."
    },
    {
      question: "Is there a minimum rental period?",
      answer: "Our standard minimum rental period is 24 hours. For luxury and exotic vehicles, a 2-day minimum may apply during peak seasons."
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Background Accents */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="absolute left-[-120px] top-10 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute right-[-80px] top-24 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl" />
        <div className="absolute left-1/3 top-0 h-52 w-52 rounded-full bg-purple-200/20 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 mb-6">
              <HeadphonesIcon className="h-4 w-4" />
              <span>24/7 Concierge Support</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Get in <span className="text-purple-600">Touch</span> with Our Team
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
              Have questions about our fleet, need assistance with a booking, or want to discuss 
              corporate arrangements? Our concierge team is here to help, 24 hours a day, 7 days a week.
            </p>

            {/* Quick Stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-slate-500">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">2h</div>
                <div className="text-sm text-slate-500">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-sm text-slate-500">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Form */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a message</h2>
              <p className="text-slate-600 mb-8">
                Fill out the form below and our team will respond within 2 hours.
              </p>

              {formStatus.submitted && formStatus.success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-800 font-medium">Message sent successfully!</p>
                    <p className="text-green-600 text-sm">{formStatus.message}</p>
                  </div>
                </div>
              )}

              {formStatus.submitted && !formStatus.success && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-medium">Submission Failed</p>
                    <p className="text-red-600 text-sm">{formStatus.message}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name <span className="text-purple-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email <span className="text-purple-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone & Subject Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject <span className="text-purple-600">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition appearance-none bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="fleet">Fleet Information</option>
                      <option value="corporate">Corporate Account</option>
                      <option value="support">Customer Support</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message <span className="text-purple-600">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition resize-none"
                    placeholder="How can we help you today?"
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    id="terms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="terms" className="text-sm text-slate-600">
                    I agree to the processing of my data in accordance with the{" "}
                    <a href="/privacy" className="text-purple-600 hover:text-purple-700 underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all hover:-translate-y-0.5 shadow-lg shadow-purple-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Direct Contact Cards */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Direct Contact</h2>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-purple-100 p-3 text-purple-600">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Call Us</p>
                      <h3 className="text-xl font-semibold text-slate-900 mt-1">+971 4 123 4567</h3>
                      <p className="text-sm text-slate-500 mt-1">Available 24/7 for urgent inquiries</p>
                    </div>
                  </div>

                  {/* WhatsApp (popular in Dubai) */}
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-purple-100 p-3 text-purple-600">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">WhatsApp</p>
                      <h3 className="text-xl font-semibold text-slate-900 mt-1">+971 50 123 4567</h3>
                      <p className="text-sm text-slate-500 mt-1">Quick responses via messaging</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-purple-100 p-3 text-purple-600">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Email</p>
                      <h3 className="text-xl font-semibold text-slate-900 mt-1">concierge@rentex.com</h3>
                      <p className="text-sm text-slate-500 mt-1">For non-urgent inquiries</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-purple-100 p-3 text-purple-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Headquarters</p>
                      <h3 className="text-xl font-semibold text-slate-900 mt-1">Dubai, UAE</h3>
                      <p className="text-sm text-slate-500 mt-1">Sheikh Zayed Road, Dubai Marina</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Business Hours</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-purple-100 p-3 text-purple-600">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-900">Concierge Support</span>
                        <span className="text-purple-600 font-semibold">24/7</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">Always available for urgent matters</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-purple-100 p-3 text-purple-600">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-900">Office Hours</span>
                        <span className="text-purple-600 font-semibold">9AM - 9PM</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">Saturday - Thursday (Closed Fridays)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Connect With Us</h2>
                <p className="text-slate-600 mb-6">Follow us on social media for the latest fleet updates and offers.</p>
                
                <div className="flex gap-3">
                  {[Instagram, Facebook, Twitter, Linkedin].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="rounded-xl bg-purple-50 p-3 text-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:text-white transition-all"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Find Us in <span className="text-purple-600">Dubai</span></h2>
            <p className="mt-4 text-lg text-slate-600">Visit our flagship location in the heart of the city</p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.6827671385!2d54.89784791995288!3d25.07501270393265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20Marina%2C%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1709824000000!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rentex Dubai Location"
              className="w-full"
            />
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 text-center border border-slate-200">
              <Building2 className="h-5 w-5 text-purple-600 mx-auto mb-2" />
              <p className="font-medium">Dubai Marina</p>
              <p className="text-sm text-slate-500">Main Showroom</p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center border border-slate-200">
              <Globe2 className="h-5 w-5 text-purple-600 mx-auto mb-2" />
              <p className="font-medium">DXB Airport</p>
              <p className="text-sm text-slate-500">Terminal 1 & 3</p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center border border-slate-200">
              <Award className="h-5 w-5 text-purple-600 mx-auto mb-2" />
              <p className="font-medium">Palm Jumeirah</p>
              <p className="text-sm text-slate-500">Atlantis Hotel</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
              Frequently Asked
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Questions? We have <span className="text-purple-600">answers</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Find quick answers to common questions about our services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition"
                >
                  <span className="font-semibold text-slate-900">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  )}
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 pb-5 text-slate-600 border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              View all FAQs
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-12 shadow-xl">
            <div className="absolute -left-10 top-0 h-52 w-52 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-52 w-52 rounded-full bg-purple-400/10 blur-3xl" />
            
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to experience Rentex?
              </h2>
              <p className="mt-4 text-lg text-purple-100">
                Browse our fleet of luxury vehicles and book your dream car today.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/cars"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-purple-700 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Explore Fleet
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER – Added */}
      <footer id="contact" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900">RENTEX</h4>
                  <p className="text-xs uppercase tracking-[0.2em] text-purple-700">Luxury Mobility</p>
                </div>
              </div>
              <p className="mt-6 leading-7 text-slate-600">
                A modern luxury car rental platform built for premium experiences, elegant service,
                and exceptional delivery.
              </p>
              <div className="mt-6 flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="rounded-xl bg-white p-3 text-slate-600 shadow-sm transition hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Fleet</h5>
              <ul className="mt-6 space-y-4 text-slate-600">
                {["Luxury Sedans", "Sports Cars", "Executive SUVs", "Electric", "Event Fleet"].map(
                  (item) => (
                    <li key={item}>
                      <a href="#" className="transition hover:text-purple-700">
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Services</h5>
              <ul className="mt-6 space-y-4 text-slate-600">
                {[
                  "Airport Transfers",
                  "Wedding Rentals",
                  "Corporate Bookings",
                  "Long-Term Hire",
                  "VIP Concierge",
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="transition hover:text-purple-700">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Contact</h5>
              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3 text-slate-600">
                  <Phone className="mt-0.5 h-5 w-5 text-purple-700" />
                  <span>+971 4 123 4567</span>
                </div>
                <div className="flex items-start gap-3 text-slate-600">
                  <Mail className="mt-0.5 h-5 w-5 text-purple-700" />
                  <span>concierge@rentex.com</span>
                </div>
                <div className="flex items-start gap-3 text-slate-600">
                  <MapPin className="mt-0.5 h-5 w-5 text-purple-700" />
                  <span>Dubai, United Arab Emirates</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between">
            <p>© {new Date().getFullYear()} Rentex. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-purple-700">Privacy</a>
              <a href="#" className="hover:text-purple-700">Terms</a>
              <a href="#" className="hover:text-purple-700">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA - Matches other pages */}
      <Link
        to="/contact"
        className="fixed bottom-7 right-7 z-40 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 p-4 text-white shadow-2xl shadow-purple-700/30 transition hover:scale-110 hover:from-purple-700 hover:to-purple-800"
      >
        <HeadphonesIcon className="h-6 w-6" />
      </Link>
    </div>
  );
}

export default ContactPage;