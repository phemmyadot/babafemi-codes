'use client'

import { useState, useEffect } from 'react'

const titles = [
  'Senior Software Engineer',
  'Mobile Developer',
  'Full Stack Engineer',
  'React Native Specialist',
  'AWS Certified Architect',
]

export function Typewriter() {
  const [index, setIndex]       = useState(0)
  const [text, setText]         = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = titles[index]
    const speed   = isDeleting ? 40 : 90

    const timer = setTimeout(() => {
      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 2000)
        return
      }
      if (isDeleting && text === '') {
        setIsDeleting(false)
        setIndex((i) => (i + 1) % titles.length)
        return
      }
      setText(
        isDeleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1)
      )
    }, speed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, index])

  return (
    <span className="gradient-text">
      {text}
      <span className="animate-pulse text-accent-primary">|</span>
    </span>
  )
}
