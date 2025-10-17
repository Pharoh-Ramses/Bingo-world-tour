"use client"

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import BingoBoard from '@/components/BingoBoard'
import { hasBingo, findWinningPatterns, getTimeUntilNextReveal, formatTimeRemaining } from '@/lib/game-logic'
import { useWebSocket } from '@/lib/useWebSocket'
import { WSIncomingMessage, Location } from '@/lib/websocket-types'


interface GameSession {
  id: string
  code: string
  status: 'WAITING' | 'STARTING' | 'ACTIVE' | 'PAUSED' | 'ENDED'
  revealInterval: number
  currentRevealIndex: number
  maxReveals: number
  playerCount: number
  startedAt?: string
}

interface RevealedLocation {
  id: string
  locationId: string
  locationName: string
  revealIndex: number
  revealedAt: string
}

interface PlayerBoard {
  id: string
  boardLayout: (string | null)[]
  isReady: boolean
}

interface LocationData {
  id: string
  name: string
  description: string | null
  imageUrl: string | null
  category: string | null
}

const ActiveGamePage = () => {
  const params = useParams()
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const sessionCode = params.sessionCode as string

  const [session, setSession] = useState<GameSession | null>(null)
  const [playerBoard, setPlayerBoard] = useState<PlayerBoard | null>(null)
  const [revealedLocations, setRevealedLocations] = useState<RevealedLocation[]>([])
  const [allLocations, setAllLocations] = useState<LocationData[]>([])
  const [selectedTiles, setSelectedTiles] = useState<boolean[]>(new Array(25).fill(false))
  const [winningPattern, setWinningPattern] = useState<string | null>(null)
  const [timeUntilNextReveal, setTimeUntilNextReveal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmittingBingo, setIsSubmittingBingo] = useState(false)
  const [error, setError] = useState('')

  const fetchGameData = useCallback(async () => {
    try {
      // Fetch session status
      const sessionResponse = await fetch(`/api/game/${sessionCode}/status`)
      if (sessionResponse.ok) {
        const sessionData = await sessionResponse.json()
        setSession(sessionData)
      }

      // Fetch player board
      const boardResponse = await fetch(`/api/game/${sessionCode}/board`)
      if (boardResponse.ok) {
        const boardData = await boardResponse.json()
        setPlayerBoard(boardData)
      }

      // Fetch all locations (hybrid approach)
      const locationsResponse = await fetch('/api/locations')
      if (locationsResponse.ok) {
        const locationsData = await locationsResponse.json()
        setAllLocations(locationsData.locations)
      }

      // Fetch revealed locations
      const revealedResponse = await fetch(`/api/game/${sessionCode}/revealed`)
      if (revealedResponse.ok) {
        const revealedData = await revealedResponse.json()
        setRevealedLocations(revealedData)
      }
    } catch (error) {
      console.error('Failed to fetch game data:', error)
      setError('Failed to load game data')
    } finally {
      setIsLoading(false)
    }
  }, [sessionCode])

  // WebSocket message handler
  const handleWebSocketMessage = useCallback((message: WSIncomingMessage) => {
    switch (message.type) {
      case 'connected':
        // Initialize revealed locations from server data
        if (message.data.revealedLocations) {
          setRevealedLocations(message.data.revealedLocations)
        }
        setSession(prev => prev ? { ...prev, status: message.data.status } : null)
        break
        
      case 'location-revealed':
        // Add new revealed location
        const newRevealedLocation: RevealedLocation = {
          id: `revealed-${Date.now()}`,
          locationId: message.data.id,
          locationName: message.data.name,
          revealIndex: revealedLocations.length + 1,
          revealedAt: new Date().toISOString()
        }
        setRevealedLocations(prev => [...prev, newRevealedLocation])
        break
        
      case 'game-paused':
        setSession(prev => prev ? { ...prev, status: 'PAUSED' } : null)
        break
        
      case 'game-resumed':
        setSession(prev => prev ? { ...prev, status: 'ACTIVE' } : null)
        break
        
      case 'game-ended':
        setSession(prev => prev ? { ...prev, status: 'ENDED' } : null)
        router.push(`/game/${sessionCode}/results`)
        break
        
      case 'winner-found':
        // Show notification or handle winner announcement
        console.log('Winner found:', message.data)
        break
        
      case 'error':
        setError(message.message)
        break
    }
  }, [revealedLocations.length, router, sessionCode])

  // WebSocket connection
  const { connectionState, send } = useWebSocket({
    sessionCode,
    userId: user?.id,
    onMessage: handleWebSocketMessage,
    onError: (error) => setError(`WebSocket error: ${error}`)
  })

  useEffect(() => {
    // Check for BINGO after each tile selection
    if (playerBoard && revealedLocations.length > 0) {
      const revealedIds = revealedLocations.map(r => r.locationId)
      const hasWin = hasBingo(selectedTiles, revealedIds.map(id => 
        playerBoard.boardLayout.includes(id)
      ))
      
      if (hasWin) {
        const patterns = findWinningPatterns(selectedTiles, revealedIds.map(id => 
          playerBoard.boardLayout.includes(id)
        ))
        if (patterns.length > 0) {
          setWinningPattern(patterns[0])
        }
      } else {
        setWinningPattern(null)
      }
    }
  }, [selectedTiles, revealedLocations, playerBoard])

  useEffect(() => {
    // Timer for next reveal
    if (session?.status === 'ACTIVE' && session.revealInterval) {
      const interval = setInterval(() => {
        const nextRevealTime = new Date(Date.now() + session.revealInterval * 60 * 1000)
        const timeRemaining = getTimeUntilNextReveal(nextRevealTime)
        setTimeUntilNextReveal(timeRemaining)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [session])


  useEffect(() => {
    if (isLoaded && user && sessionCode) {
      fetchGameData()
    } else if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [isLoaded, user, sessionCode, router, fetchGameData])

  const handleTileClick = useCallback((position: number) => {
    if (position === 12) return // Center is always selected
    
    setSelectedTiles(prev => {
      const newSelection = [...prev]
      newSelection[position] = !newSelection[position]
      return newSelection
    })
  }, [])

  const handleSubmitBingo = async () => {
    if (!winningPattern) return

    setIsSubmittingBingo(true)
    setError('')

    try {
      const response = await fetch(`/api/game/${sessionCode}/bingo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          winningPattern,
          selectedTiles
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to submit BINGO')
        setIsSubmittingBingo(false)
        return
      }

      const result = await response.json()
      
      if (result.success) {
        // Redirect to results or show winner modal
        router.push(`/game/${sessionCode}/results`)
      } else {
        setError('Invalid BINGO - please check your board')
        setIsSubmittingBingo(false)
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setIsSubmittingBingo(false)
    }
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-12 lg:py-16">
        <div className="text-center">
          <p className="body-1 text-tertiary-300">Loading game...</p>
        </div>
      </div>
    )
  }

  if (!session || !playerBoard) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-12 lg:py-16">
        <div className="text-center">
          <p className="body-1 text-tertiary-300">Game not found</p>
          <Button 
            variant="outline" 
            onClick={() => router.push('/join')}
            className="mt-4"
          >
            Back to Join Game
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-12 lg:py-16">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="heading-1 text-tertiary-500">
            BINGO World Tour
          </h1>
          <p className="body-1 text-tertiary-300 mt-2">
            Session {session.code} • {session.playerCount} players
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-4">
            <Badge className={`${session.status === 'ACTIVE' ? 'bg-success text-white' : 'bg-warning text-white'}`}>
              {session.status === 'ACTIVE' ? 'Game Active' : 'Game Paused'}
            </Badge>
            <Badge className={`${
              connectionState === 'connected' ? 'bg-success text-white' : 
              connectionState === 'connecting' ? 'bg-warning text-white' : 
              'bg-error text-white'
            }`}>
              {connectionState === 'connected' ? 'Connected' : 
               connectionState === 'connecting' ? 'Connecting...' : 
               'Disconnected'}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Game Board */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="heading-3 text-tertiary-500">
                  Your BINGO Board
                </CardTitle>
                <CardDescription>
                  Click on revealed locations to mark them. Get 5 in a row to win!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BingoBoard
                  boardLayout={playerBoard.boardLayout}
                  revealedLocations={revealedLocations.map(r => r.locationId)}
                  selectedTiles={selectedTiles}
                  onTileClick={handleTileClick}
                  locations={allLocations}
                  isGameActive={session.status === 'ACTIVE'}
                  winningPattern={winningPattern}
                />
                
                {winningPattern && (
                  <div className="mt-6 text-center">
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={handleSubmitBingo}
                      disabled={isSubmittingBingo}
                      className="px-8 py-4 text-lg"
                    >
                      {isSubmittingBingo ? 'Submitting...' : '🎉 CALL BINGO! 🎉'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Game Info Sidebar */}
          <div className="space-y-6">
            {/* Game Status */}
            <Card>
              <CardHeader>
                <CardTitle className="heading-4 text-tertiary-500">
                  Game Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="body-3 text-tertiary-400">Revealed Locations</p>
                  <p className="body-2 text-tertiary-600">
                    {revealedLocations.length}/{session.maxReveals}
                  </p>
                </div>
                <div>
                  <p className="body-3 text-tertiary-400">Next Reveal</p>
                  <p className="body-2 text-tertiary-600">
                    {session.status === 'ACTIVE' ? formatTimeRemaining(timeUntilNextReveal) : 'Paused'}
                  </p>
                </div>
                <div>
                  <p className="body-3 text-tertiary-400">Players</p>
                  <p className="body-2 text-tertiary-600">
                    {session.playerCount} active
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Latest Revealed */}
            <Card>
              <CardHeader>
                <CardTitle className="heading-4 text-tertiary-500">
                  Latest Revealed
                </CardTitle>
              </CardHeader>
              <CardContent>
                {revealedLocations.length === 0 ? (
                  <p className="body-2 text-tertiary-300 text-center py-4">
                    No locations revealed yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {revealedLocations.slice(-5).reverse().map((location) => (
                      <div 
                        key={location.id}
                        className="p-3 bg-primary-100 rounded-lg border border-primary-300"
                      >
                        <p className="body-3 text-tertiary-600 font-medium">
                          #{location.revealIndex} - {location.locationName}
                        </p>
                        <p className="body-4 text-tertiary-400">
                          {new Date(location.revealedAt).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Error Display */}
            {error && (
              <Card>
                <CardContent className="p-4 bg-error/10 border border-error/20 rounded-lg">
                  <p className="text-sm text-error">{error}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActiveGamePage
