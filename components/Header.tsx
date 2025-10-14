import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-neutral-100 shadow-e1 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image 
              src="/assets/logo.png" 
              alt="Sunset Bingo" 
              width={100} 
              height={100}
              className="h-12 w-auto"
            />
          </Link>
          
          <div className="hidden sm:block">
            <NavItems />
          </div>
          
          {/* User Dropdown - placeholder for future implementation */}
          <div className="hidden sm:block">
            {/* User Dropdown will go here */}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header