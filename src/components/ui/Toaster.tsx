'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'
import { ToastType } from '@/lib/toast'

interface ToastItem {
  id:      number
  message: string
  type:    ToastType
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    const handler = (e: Event) => {
      const { message, type } = (e as CustomEvent<{ message: string; type: ToastType }>).detail
      const id = Date.now()
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4500)
    }
    window.addEventListener('app:toast', handler)
    return () => window.removeEventListener('app:toast', handler)
  }, [])

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-3 items-center pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`
            pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl
            border text-sm font-mono animate-in fade-in slide-in-from-bottom-4 duration-300
            ${t.type === 'success'
              ? 'bg-surface border-success/30 text-success'
              : 'bg-surface border-danger/30 text-danger'}
          `}
        >
          {t.type === 'success'
            ? <CheckCircle size={16} className="shrink-0" />
            : <XCircle    size={16} className="shrink-0" />}
          <span className="text-text-primary">{t.message}</span>
          <button
            onClick={() => dismiss(t.id)}
            className="ml-2 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
