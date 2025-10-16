import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-tertiary-500 h-[136px]">
      <div className="max-w-7xl mx-auto px-20 py-8">
        <div className="h-[72px] flex flex-col items-center justify-center space-y-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-primary-500 rounded flex items-center justify-center">
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
            <span className="heading-6 text-white">
              Sunset Leisure Travel
            </span>
          </div>
          
          {/* Tagline */}
          <p className="body-1 text-tertiary-100 text-center max-w-md">
            Creating unforgettable travel experiences since 1995
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
