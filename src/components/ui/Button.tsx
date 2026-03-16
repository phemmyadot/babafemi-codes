'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
}

const sizeClasses = {
  sm:  'px-4 py-2 text-sm',
  md:  'px-6 py-3 text-base',
  lg:  'px-8 py-4 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, href, as: Tag = 'button', ...props }, ref) => {
    const base =
      'inline-flex items-center gap-2 font-display font-semibold rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'bg-gradient-accent text-white shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 hover:scale-[1.02] active:scale-[0.98]',
      outline:
        'border border-border-bright text-text-primary hover:border-accent-primary hover:text-accent-primary hover:bg-accent-primary/5 active:scale-[0.98]',
    }

    const classes = `${base} ${variants[variant]} ${sizeClasses[size]} ${className}`

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
