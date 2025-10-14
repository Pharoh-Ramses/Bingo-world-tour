"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItems = () => {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/components', label: 'Components' }
  ]

  return (
    <nav className="flex items-center gap-8">
      {navLinks.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              body-2 font-medium transition-colors duration-200
              ${isActive 
                ? 'text-primary-500 underline underline-offset-4' 
                : 'text-neutral-800 hover:text-primary-500'
              }
            `}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default NavItems
