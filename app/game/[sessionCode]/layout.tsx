"use client"

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const router = useRouter()
  const { user } = useUser()
  const sessionCode = params.sessionCode as string
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  const handleExit = () => {
    if (showExitConfirm) {
      router.push('/join')
    } else {
      setShowExitConfirm(true)
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => setShowExitConfirm(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* Sticky Top Bar - Mobile Optimized */}
      <div className="sticky top-0 z-50 bg-white border-b border-neutral-200 px-4 py-3 safe-area-top">
        <div className="flex items-center justify-between">
          {/* Session Info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="body-3 text-tertiary-400">Session:</span>
              <span className="body-2 text-tertiary-600 font-mono font-medium">
                {sessionCode}
              </span>
            </div>
            <Badge className="bg-success text-white text-xs">
              Connected
            </Badge>
          </div>

          {/* Exit Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExit}
            className={`
              transition-all duration-200
              ${showExitConfirm 
                ? 'bg-error text-white border-error hover:bg-error/90' 
                : 'text-tertiary-500 hover:text-error hover:border-error'
              }
            `}
          >
            {showExitConfirm ? 'Tap again to exit' : 'Exit'}
          </Button>
        </div>
      </div>

      {/* Main Content - Mobile Optimized Padding */}
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-20 sm:py-8 lg:py-12 safe-area-bottom">
        {children}
      </main>
    </div>
  )
}
