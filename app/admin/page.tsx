"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface GameSession {
  id: string
  code: string
  status: 'WAITING' | 'STARTING' | 'ACTIVE' | 'PAUSED' | 'ENDED'
  revealInterval: number
  currentRevealIndex: number
  playerCount: number
  createdAt: string
  startedAt?: string
  endedAt?: string
}

const AdminDashboard = () => {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [sessions, setSessions] = useState<GameSession[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoaded && user) {
      // Check if user is admin (you can implement this check based on your needs)
      // For now, we'll allow any signed-in user to access admin
      fetchSessions()
    } else if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [isLoaded, user, router])

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/admin/sessions')
      if (response.ok) {
        const data = await response.json()
        setSessions(data.sessions)
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'WAITING': return 'bg-accent-sand text-tertiary-600'
      case 'ACTIVE': return 'bg-success text-white'
      case 'PAUSED': return 'bg-warning text-white'
      case 'ENDED': return 'bg-neutral-400 text-white'
      default: return 'bg-neutral-300 text-tertiary-600'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'WAITING': return 'Waiting for Players'
      case 'STARTING': return 'Starting Soon'
      case 'ACTIVE': return 'Game Active'
      case 'PAUSED': return 'Paused'
      case 'ENDED': return 'Game Ended'
      default: return status
    }
  }

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-20 py-16">
        <div className="text-center">
          <p className="body-1 text-tertiary-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to sign-in
  }

  return (
    <div className="max-w-7xl mx-auto px-20 py-16">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-1 text-tertiary-500">Admin Dashboard</h1>
            <p className="body-1 text-tertiary-300 mt-2">
              Manage your BINGO World Tour game sessions
            </p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => router.push('/admin/sessions/create')}
            className="px-8 py-3"
          >
            Create New Session
          </Button>
        </div>

        {/* Sessions List */}
        <div className="space-y-6">
          <h2 className="heading-3 text-tertiary-500">Game Sessions</h2>
          
          {isLoading ? (
            <div className="text-center py-8">
              <p className="body-1 text-tertiary-300">Loading sessions...</p>
            </div>
          ) : sessions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="body-1 text-tertiary-300 mb-4">
                  No game sessions yet. Create your first session to get started!
                </p>
                <Button 
                  variant="primary" 
                  onClick={() => router.push('/admin/sessions/create')}
                >
                  Create Session
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {sessions.map((session) => (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="heading-4 text-tertiary-500">
                            Session {session.code}
                          </h3>
                          <p className="body-2 text-tertiary-300">
                            {session.playerCount} players • {session.revealInterval}min intervals
                          </p>
                          <p className="body-3 text-tertiary-300">
                            Created {new Date(session.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(session.status)}>
                          {getStatusText(session.status)}
                        </Badge>
                        
                        <div className="flex gap-2">
                          {session.status === 'WAITING' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => router.push(`/admin/sessions/${session.id}`)}
                            >
                              Manage
                            </Button>
                          )}
                          {session.status === 'ACTIVE' && (
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => router.push(`/admin/sessions/${session.id}`)}
                            >
                              Control Panel
                            </Button>
                          )}
                          {session.status === 'ENDED' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => router.push(`/game/${session.code}/results`)}
                            >
                              View Results
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
