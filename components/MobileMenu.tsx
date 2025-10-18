"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import AuthButton from './AuthButton'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: "/join", label: "Join Game" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleMenu}
        className="sm:hidden p-2 h-10 w-10"
        aria-label="Toggle mobile menu"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
        >
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-e4">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <h2 className="heading-5 text-tertiary-500">Menu</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeMenu}
                  className="p-2 h-10 w-10"
                  aria-label="Close menu"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-6">
                <div className="space-y-4">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className={`
                          block px-4 py-3 rounded-lg transition-colors duration-200
                          ${
                            isActive
                              ? "bg-primary-100 text-primary-600 font-medium"
                              : "text-tertiary-600 hover:bg-neutral-100"
                          }
                        `}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              </nav>

              {/* Auth Section */}
              <div className="p-6 border-t border-neutral-200">
                <AuthButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileMenu
