import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Mail, User } from 'lucide-react';
import { sound } from '../utils/audio.ts';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      sound.playSuccess();
      setFormData({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="relative z-10 py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      <div className="max-w-2xl mx-auto text-center">
        {/* Title matching PDF */}
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Contact Us
        </h2>
        <p className="mt-3 text-[#b0b8d0] text-sm sm:text-base">
          Have questions about device specifications, compatibility, bulk orders or warranties? Drop us a note!
        </p>

        {submitted ? (
          <div className="mt-10 p-8 rounded-2xl bg-white/[0.06] border border-cyan-400/40 text-center animate-fadeIn backdrop-blur-md">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
            <p className="mt-2 text-cyan-300 font-medium">
              Thanks! We will contact you soon.
            </p>
            <p className="mt-1 text-xs text-[#b0b8d0]">
              Our support team typically replies within 2 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 max-w-[480px] mx-auto flex flex-col gap-4 text-left"
          >
            {/* Name Input */}
            <div>
              <label htmlFor="contact-name" className="sr-only">
                Your Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full pl-11 pr-4 py-3.5 rounded-[10px] bg-white/10 border border-transparent focus:border-[#00e5ff] text-white placeholder-white/50 text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="contact-email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  className="w-full pl-11 pr-4 py-3.5 rounded-[10px] bg-white/10 border border-transparent focus:border-[#00e5ff] text-white placeholder-white/50 text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-white/40 absolute left-4 top-4 pointer-events-none" />
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Message"
                  className="w-full pl-11 pr-4 py-3.5 rounded-[10px] bg-white/10 border border-transparent focus:border-[#00e5ff] text-white placeholder-white/50 text-sm focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* Submit Button matching PDF */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-8 rounded-full bg-gradient-to-r from-[#00e5ff] to-[#7c4dff] text-white font-bold text-base hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_25px_#00e5ff] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
