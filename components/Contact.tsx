/**
 * مكون قسم الاتصال؛ يضم نموذجاً لارسال الرسائل عبر البريد الإلكتروني، 
 * بالإضافة إلى عرض معلومات التواصل مثل البريد والموقع الجغرافي.
 */
import React, { useState } from 'react';
import { TranslationData } from '../types';
import { Mail, MapPin } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

interface ContactProps {
  data: TranslationData['contact'];
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  const { settings } = useContent();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailTo = settings.contactEmail || "Aamr.alawad@gmail.com";
    window.location.href = `mailto:${emailTo}?subject=Inquiry from ${formData.name}&body=${formData.message} (Contact: ${formData.email})`;
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-white">
          <span className="gradient-text">{data.title}</span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Info Card */}
          <div className="lg:w-1/3 bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-700 h-fit">
            <h3 className="text-xl font-bold text-white mb-6">{data.infoTitle}</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-brand-primary mt-1 flex-shrink-0" />
                <div className="overflow-hidden">
                  <p className="text-sm text-slate-400">Email</p>
                  <a href={`mailto:${settings.contactEmail}`} className="text-white hover:text-brand-primary transition-colors font-medium break-all block">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-brand-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="text-white font-medium">{settings.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-2/3">
            <div className="mb-6">
               <h3 className="text-xl font-bold text-white mb-2">{data.formTitle}</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">{data.name}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-base text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">{data.email}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-base text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">{data.message}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-base text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-brand-primary/20 transition-all transform active:scale-95"
              >
                {data.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;