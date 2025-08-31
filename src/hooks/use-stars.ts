import { useState, useEffect } from 'react'

export function useStars(serverId: string, initialStars: number = 0) {
  const [stars, setStars] = useState(initialStars)
  const [hasStarred, setHasStarred] = useState(false)

  useEffect(() => {
    // Load stars from localStorage
    const savedStars = localStorage.getItem(`stars_${serverId}`)
    if (savedStars) {
      setStars(parseInt(savedStars))
    }

    // Check if user has starred this server
    const userStarred = localStorage.getItem(`starred_${serverId}`)
    setHasStarred(userStarred === 'true')
  }, [serverId])

  const toggleStar = () => {
    if (hasStarred) {
      // Remove star
      const newStars = Math.max(0, stars - 1)
      setStars(newStars)
      setHasStarred(false)
      localStorage.setItem(`stars_${serverId}`, newStars.toString())
      localStorage.removeItem(`starred_${serverId}`)
    } else {
      // Add star
      const newStars = stars + 1
      setStars(newStars)
      setHasStarred(true)
      localStorage.setItem(`stars_${serverId}`, newStars.toString())
      localStorage.setItem(`starred_${serverId}`, 'true')
    }
  }

  return { stars, hasStarred, toggleStar }
}
