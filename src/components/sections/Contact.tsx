'use client'

import { useState } from 'react'
import { Send, Linkedin, Mail } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-surface border border-border rounded-md px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors duration-150'

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-content mx-auto">
        <AnimatedSection>
          <SectionHeader
            label="06 / Contact"
            title="Let's work"
            titleAccent="together"
            description="Have a project in mind or want to explore opportunities? I'd love to hear from you."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <AnimatedSection delay={100}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-text-muted uppercase tracking-widest mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-text-muted uppercase tracking-widest mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs text-text-muted uppercase tracking-widest mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full justify-center"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                <Send size={16} />
              </Button>

              {status === 'success' && (
                <p className="text-success text-sm font-mono text-center">
                  ✓ Message sent — I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-danger text-sm font-mono text-center">
                  Something went wrong. Try emailing me directly.
                </p>
              )}
            </form>
          </AnimatedSection>

          {/* Links */}
          <AnimatedSection delay={200}>
            <div className="space-y-6 md:pt-2">
              <p className="text-text-secondary leading-relaxed">
                I&apos;m currently open to senior engineering roles, contract work,
                and interesting side projects. If you&apos;re building something worth
                building — let&apos;s talk.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:babafemiadojutelegan@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-lg bg-surface border border-border hover:border-accent-primary group transition-colors duration-200"
                >
                  <div className="p-2 rounded-md bg-surface-elevated group-hover:bg-accent-primary/10 transition-colors">
                    <Mail size={18} className="text-accent-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-0.5">Email</p>
                    <p className="text-text-primary text-sm">babafemiadojutelegan@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/badojutelegan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-surface border border-border hover:border-accent-primary group transition-colors duration-200"
                >
                  <div className="p-2 rounded-md bg-surface-elevated group-hover:bg-accent-primary/10 transition-colors">
                    <Linkedin size={18} className="text-accent-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-0.5">LinkedIn</p>
                    <p className="text-text-primary text-sm">linkedin.com/in/badojutelegan</p>
                  </div>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
