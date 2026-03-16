import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { getProfile } from '@/lib/queries'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { name, email, message } = await req.json()

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  const profile = await getProfile()
  const to = profile?.email ?? process.env.CONTACT_TO_EMAIL

  if (!to) {
    return NextResponse.json({ error: 'Recipient not configured.' }, { status: 500 })
  }

  const { error } = await resend.emails.send({
    from:    'Portfolio Contact <onboarding@resend.dev>',
    to,
    replyTo: email,
    subject: `New message from ${name}`,
    text:    `Name: ${name}\nEmail: ${email}\n\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
