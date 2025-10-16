import Link from 'next/link'
import NavItems from './NavItems'
import AuthButton from './AuthButton'

const Header = () => {
  return (
    <header className="bg-white border-b border-neutral-200 h-[85px]">
      <div className="max-w-7xl mx-auto px-20 py-6">
        <div className="flex items-center justify-between h-[36px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-[30px] h-[30px] bg-primary-500 rounded flex items-center justify-center">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-white"
              >
                <path 
                  d="M12 2L2 7L12 12L22 7L12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M2 17L12 22L22 17" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M2 12L12 17L22 12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="heading-5 text-tertiary-500">
              Sunset Leisure Travel
            </span>
          </Link>
          
              {/* Navigation */}
              <div className="hidden sm:flex items-center gap-8">
                <NavItems />
                <AuthButton />
              </div>
        </div>
      </div>
    </header>
  )
}

export default Header