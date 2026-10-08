'use client';

import { useState } from 'react';
import { site } from '@/data/site';
import { waLink } from '@/lib/format';

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const message = String(form.get('message') || '').trim();

    const text =
      `Assalam o Alaikum ${site.name}!\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Message: ${message}`;

    window.open(waLink(text), '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" type="text" required placeholder="Your name" autoComplete="name" />
      </label>
      <label>
        Phone / WhatsApp
        <input name="phone" type="tel" required placeholder="03xx xxxxxxx" autoComplete="tel" />
      </label>
      <label>
        Message
        <textarea name="message" rows={4} required placeholder="Which fabric are you looking for?" />
      </label>
      <button className="btn btn-wa btn-lg" type="submit">
        Send on WhatsApp
      </button>
      {sent ? (
        <p className="ok small" role="status">
          Your message has been prepared in WhatsApp — press send and we will reply shortly, in shaa Allah.
        </p>
      ) : null}
    </form>
  );
}
