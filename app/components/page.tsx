"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Download, Heart, Star, Menu, Search } from "lucide-react"

export default function ComponentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-20 py-16">
      <div className="space-y-20">
        {/* Header */}
        <div className="text-center space-y-8">
          <h1 className="heading-1 text-tertiary-500">Component Library</h1>
          <p className="body-1 text-tertiary-300 max-w-2xl mx-auto">
            A comprehensive collection of reusable UI components built with your design system.
            Each component follows the typography, color, and effects systems from your Figma design.
          </p>
        </div>

        {/* Buttons Section */}
        <section className="space-y-8">
          <div>
            <h2 className="heading-2 text-tertiary-500 mb-4">Buttons</h2>
            <p className="body-2 text-tertiary-300">Various button styles and sizes for different use cases.</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Different button styles using your design system colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="accent">Accent Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="link">Link Button</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" icon={<ArrowRight className="h-4 w-4" />}>
                  Read More
                </Button>
                <Button variant="outline" icon={<Download className="h-4 w-4" />}>
                  Download
                </Button>
                <Button variant="ghost" icon={<Heart className="h-4 w-4" />}>
                  ♡ Button
                </Button>
                <Button variant="primary" icon={<Star className="h-4 w-4" />}>
                  Get Started
                </Button>
                <Button variant="primary" icon={<Menu className="h-4 w-4" />}>
                  Main Menu
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cards Section */}
        <section className="space-y-8">
          <div>
            <h2 className="heading-2 text-tertiary-500 mb-4">Cards</h2>
            <p className="body-2 text-tertiary-300">Flexible card components for displaying content.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Standard card with default styling</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="body-2 text-neutral-600">
                  This is a default card component with standard padding and styling.
                </p>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Card with enhanced shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="body-2 text-neutral-600">
                  This card has an elevated shadow effect for more prominence.
                </p>
              </CardContent>
            </Card>
            
            <Card variant="filled">
              <CardHeader>
                <CardTitle>Filled Card</CardTitle>
                <CardDescription>Card with primary background</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="body-2 text-neutral-600">
                  This card uses a filled background with primary colors.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Input Fields Section */}
        <section className="space-y-8">
          <div>
            <h2 className="heading-2 text-tertiary-500 mb-4">Input Fields</h2>
            <p className="body-2 text-tertiary-300">Form input components with various types and states.</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Input Variants</CardTitle>
              <CardDescription>Different input field types and states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input
                    label="Text Input"
                    placeholder="Enter your text..."
                    hint="This is a hint text to help users"
                    required
                  />
                  
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    showPasswordToggle
                    hint="Must be at least 8 characters"
                    required
                  />
                  
                  <Input
                    label="Search"
                    type="search"
                    placeholder="Search..."
                    icon={<Search className="h-4 w-4" />}
                  />
                </div>
                
                <div className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    hint="We'll never share your email"
                  />
                  
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="(555) 123-4567"
                    hint="Include country code"
                  />
                  
                  <Input
                    label="Error State"
                    placeholder="This field has an error"
                    error="This field is required"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Avatars Section */}
        <section className="space-y-8">
          <div>
            <h2 className="heading-2 text-tertiary-500 mb-4">Avatars</h2>
            <p className="body-2 text-tertiary-300">User avatar components with status indicators.</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Avatar Variants</CardTitle>
              <CardDescription>Different avatar sizes and status indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="heading-6 text-neutral-800 mb-3">Sizes</h3>
                  <div className="flex items-center gap-4">
                    <Avatar size="sm" fallback="JS" />
                    <Avatar size="default" fallback="JS" />
                    <Avatar size="lg" fallback="JS" />
                    <Avatar size="xl" fallback="JS" />
                    <Avatar size="2xl" fallback="JS" />
                  </div>
                </div>
                
                <div>
                  <h3 className="heading-6 text-neutral-800 mb-3">With Status</h3>
                  <div className="flex items-center gap-4">
                    <Avatar fallback="JS" status="online" showStatus />
                    <Avatar fallback="JS" status="away" showStatus />
                    <Avatar fallback="JS" status="busy" showStatus />
                    <Avatar fallback="JS" status="offline" showStatus />
                  </div>
                </div>
                
                <div>
                  <h3 className="heading-6 text-neutral-800 mb-3">Avatar Group</h3>
                  <AvatarGroup max={3}>
                    <Avatar fallback="AJ" />
                    <Avatar fallback="JS" />
                    <Avatar fallback="MW" />
                    <Avatar fallback="DK" />
                    <Avatar fallback="LP" />
                  </AvatarGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges Section */}
        <section className="space-y-8">
          <div>
            <h2 className="heading-2 text-tertiary-500 mb-4">Badges & Tags</h2>
            <p className="body-2 text-tertiary-300">Badge and tag components for labels and status.</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Badge Variants</CardTitle>
              <CardDescription>Different badge styles and sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="heading-6 text-neutral-800 mb-3">Variants</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="accent">Accent</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="heading-6 text-neutral-800 mb-3">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge size="sm">Small</Badge>
                    <Badge size="default">Default</Badge>
                    <Badge size="lg">Large</Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="heading-6 text-neutral-800 mb-3">With Icons & Removable</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary" icon="🇮🇳">India</Badge>
                    <Badge variant="default" removable>Filter Option</Badge>
                    <Badge variant="success" icon="✓">Completed</Badge>
                    <Badge variant="warning" removable>Pending</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Design System Info */}
        <section className="space-y-8">
          <Card variant="accent">
            <CardHeader>
              <CardTitle>Design System Integration</CardTitle>
              <CardDescription>All components use your custom design system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="heading-6 text-tertiary-500 mb-2">Typography</h3>
                  <p className="body-3 text-tertiary-300">
                    Uses Cormorant Garamond for headings and DM Sans for body text with proper scales.
                  </p>
                </div>
                <div>
                  <h3 className="heading-6 text-tertiary-500 mb-2">Colors</h3>
                  <p className="body-3 text-tertiary-300">
                    Implements your complete color palette with primary, secondary, accent, and feedback colors.
                  </p>
                </div>
                <div>
                  <h3 className="heading-6 text-tertiary-500 mb-2">Effects</h3>
                  <p className="body-3 text-tertiary-300">
                    Uses your shadow system (E0-E9) and stroke system for consistent visual hierarchy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
