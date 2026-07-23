import React from 'react';
import { X } from 'lucide-react';
import { ContactForm } from './ContactForm';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div
        className="relative z-10 w-full max-w-3xl rounded-[2rem] border border-white/10 bg-[#090909] shadow-2xl overflow-hidden max-h-[calc(100vh-2rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-6 border-b border-white/10">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/50 mb-4 font-body">Start a Project</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
              Let’s get your project started.
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close contact form"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 md:p-10 overflow-y-auto max-h-[calc(100vh-14rem)]">
          <ContactForm className="space-y-12" />
        </div>
      </div>
    </div>
  );
}
