import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profile } from '@/lib/portfolio';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ name: data.get('name'), email: data.get('email'), message: data.get('message'), _replyto: data.get('email'), _subject: `Portfolio message from ${data.get('name')}`, _captcha: 'false' }) });
      const result = await response.json();
      if (!response.ok || result.success === false || result.success === 'false') throw new Error('Message not accepted');
      setStatus('success'); form.reset();
    } catch { setStatus('error'); }
  }
  return <form className="contact-form" onSubmit={submit}>
    <label htmlFor="contact-name">YOUR NAME</label><input id="contact-name" name="name" autoComplete="name" required placeholder="Your name" />
    <label htmlFor="contact-email">YOUR EMAIL</label><input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
    <label htmlFor="contact-message">YOUR MESSAGE</label><textarea id="contact-message" name="message" required rows={4} placeholder="A role, a collaboration, or an idea…" />
    <Button variant="seal" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : status === 'success' ? 'Message sent' : 'Send a message'}{status === 'success' ? <Check /> : <ArrowUpRight />}</Button>
    <p className="form-status" role="status">{status === 'success' ? 'Thank you. Your message has been accepted.' : status === 'error' ? 'Your message could not be sent. Please try again or email me directly.' : ''}</p>
  </form>;
}