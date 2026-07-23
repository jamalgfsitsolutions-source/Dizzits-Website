import React from 'react';
import { ArrowUpRight } from './Icons';
import { Paperclip } from 'lucide-react';

interface ContactFormProps {
  className?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export function ContactForm({ className = '', onSubmit }: ContactFormProps) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(event);
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        <div className="space-y-4">
          <label className="text-[15px] text-white/90 font-light block">Your Email</label>
          <input
            type="email"
            placeholder="Enter the Email"
            className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 hover:border-blue-500/50 transition-colors text-sm font-light"
          />
        </div>
        <div className="space-y-4">
          <label className="text-[15px] text-white/90 font-light block">Your Phone</label>
          <div className="flex gap-3">
            <select
              className="w-32 bg-transparent border-b border-white/20 px-3 py-3 text-white text-sm appearance-none focus:outline-none focus:border-blue-500 hover:border-blue-500/50 transition-colors"
              aria-label="Country code"
            >
              <option value="+1">US +1</option>
              <option value="+44">UK +44</option>
              <option value="+91">IN +91</option>
              <option value="+61">AU +61</option>
              <option value="+49">DE +49</option>
              <option value="+81">JP +81</option>
              <option value="+971">AE +971</option>
            </select>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="flex-1 bg-transparent border-b border-white/20 pb-4 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 hover:border-blue-500/50 transition-colors text-sm font-light"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <label className="text-[15px] text-white/90 font-light block">I'm interested in..</label>
        <div className="flex flex-wrap gap-4">
          {['Website Development', 'Logo Design', 'Mobile Application', 'Game Development', 'Digital Marketing', 'Branding', 'Video Animation'].map((interest) => (
            <button
              type="button"
              key={interest}
              className="px-6 py-2.5 rounded-full border border-white/20 text-white/70 text-sm font-light hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors"
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <label className="text-[15px] text-white/90 font-light block">Your Budget</label>
        <div className="flex flex-wrap gap-4">
          {['< $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $20,000', '> $20,000'].map((budget) => (
            <button
              type="button"
              key={budget}
              className="px-6 py-2.5 rounded-full border border-white/20 text-white/70 text-sm font-light hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors"
            >
              {budget}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[15px] text-white/90 font-medium block">More About The Project</label>
        <textarea
          rows={1}
          className="w-full bg-transparent border-b border-white/20 pb-4 pt-16 text-white focus:outline-none focus:border-blue-500 hover:border-blue-500/50 transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-8">
        <button type="button" className="flex items-center gap-2 text-white/70 hover:text-blue-500 transition-colors text-sm font-light">
          <Paperclip className="w-4 h-4" />
          Add an Attachment
        </button>

        <button
          type="submit"
          className="group bg-black text-white px-3 py-3 pl-8 rounded-full flex items-center gap-6 hover:bg-blue-600 transition-colors border border-white/5 hover:border-blue-600"
        >
          <span className="text-sm font-light">Send Request</span>
          <div className="w-10 h-10 bg-white group-hover:text-blue-600 text-black rounded-full flex items-center justify-center transition-colors">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </button>
      </div>
    </form>
  );
}
