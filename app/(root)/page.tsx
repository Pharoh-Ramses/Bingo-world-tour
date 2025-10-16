import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-20 py-16">
      <div className="space-y-20">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <h1 className="heading-1 text-tertiary-500">BINGO World Tour</h1>
          <p className="body-1 text-tertiary-300 max-w-2xl mx-auto">
            Join the ultimate travel-themed bingo experience with Sunset Leisure Travel! 
            Play with destinations from around the world and win amazing prizes.
          </p>
        </div>

        {/* Buttons Section */}
        <div className="space-y-8">
          <h2 className="heading-3 text-tertiary-500">Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h3 className="body-1 text-tertiary-300">Primary Buttons</h3>
                    <div className="space-y-4">
                      <Button variant="primary" className="w-full rounded-lg h-12">
                        Book Now
                      </Button>
                      <Button variant="primary" className="w-full flex items-center gap-2 rounded-lg h-12">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        Explore Destinations
                      </Button>
                    </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="body-1 text-tertiary-300">Secondary Buttons</h3>
                <div className="space-y-4">
                  <Button variant="secondary" className="w-full rounded-lg h-12">
                    Learn More
                  </Button>
                  <Button variant="outline" className="w-full rounded-lg h-12">
                    View Details
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="body-1 text-tertiary-300">Icon Buttons</h3>
                <div className="space-y-4">
                  <Button className="w-12 h-12 rounded-full bg-accent-soft-coral hover:bg-accent-soft-coral/90 text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </Button>
                  <Button className="w-12 h-12 rounded-full bg-accent-sage hover:bg-accent-sage/90 text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>

        {/* Call to Action */}
        <div className="text-center space-y-8">
          <h2 className="heading-2 text-tertiary-500">Ready to Play?</h2>
          <p className="body-1 text-tertiary-300 max-w-2xl mx-auto">
            Join a game session with a code from your convention host, or create your own 
            session to host friends and family for an exciting travel-themed bingo experience.
          </p>
          <div className="flex gap-6 justify-center">
            <Link href="/join">
              <Button variant="primary" className="px-8 py-3 rounded-lg h-12">
                Join Game
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" className="px-8 py-3 rounded-lg h-12">
                Host Game
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home