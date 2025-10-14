import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const Home = () => {
  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="heading-1 text-neutral-1000">Sunset Bingo</h1>
          <p className="body-1 text-neutral-600 max-w-2xl mx-auto">
            A beautiful bingo game with a complete design system built from your Figma specifications.
            Experience the power of consistent typography, colors, and effects.
          </p>
        </div>

        {/* Design System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary-500">Typography</CardTitle>
              <CardDescription>Cormorant Garamond & DM Sans</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="body-3 text-neutral-600">
                Complete typography system with H1-H6 headings and B1-B4 body text scales.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-secondary-500">Colors</CardTitle>
              <CardDescription>Complete Color Palette</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="body-3 text-neutral-600">
                Primary, secondary, accent, neutral, and feedback colors with multiple shades.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-accent-500">Effects</CardTitle>
              <CardDescription>Shadows & Elevation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="body-3 text-neutral-600">
                Elevation effects (E0-E4), sunken effects (E5-E8), and glow effects (E9).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-success-500">Strokes</CardTitle>
              <CardDescription>Border System</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="body-3 text-neutral-600">
                Complete stroke system from 0px to 12px with consistent border widths.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Component Library CTA */}
        <Card variant="elevated">
          <CardHeader className="text-center">
            <CardTitle>Component Library</CardTitle>
            <CardDescription>
              Explore our comprehensive collection of reusable UI components
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="body-2 text-neutral-600 mb-6">
              All components are built using your design system and include buttons, cards, 
              input fields, avatars, badges, and more. Each component follows your typography, 
              color, and effects specifications.
            </p>
            <Link href="/components">
              <Button size="lg">
                <span>→</span>
                View Component Library
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Examples */}
        <div className="space-y-6">
          <h2 className="heading-2 text-neutral-1000 text-center">Quick Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ready to Use</CardTitle>
                <CardDescription>Components are production-ready</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="body-2 text-neutral-600">
                  All components are built with TypeScript, accessibility in mind, and follow 
                  your exact design specifications.
                </p>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm">Primary</Button>
                  <Button variant="outline" size="sm">Outline</Button>
                  <Button variant="ghost" size="sm">Ghost</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consistent Design</CardTitle>
                <CardDescription>Follows your design system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="body-2 text-neutral-600">
                  Every component uses your typography scales, color palette, shadow effects, 
                  and border system for perfect consistency.
                </p>
                <div className="flex gap-2">
                  <Button variant="success" size="sm">Success</Button>
                  <Button variant="warning" size="sm">Warning</Button>
                  <Button variant="destructive" size="sm">Error</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home