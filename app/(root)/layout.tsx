import React from 'react'
import Header from '@/components/Header'


const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='max-w-7xl mx-auto min-h-screen'>
      <div className="container py-10">
        <Header />
        {children}
      </div>
    </main>
  )
}

export default Layout