'use client'

import { useEffect } from 'react'

export function FontLoader() {
  useEffect(() => {
    const calSansLink = document.createElement('link')
    calSansLink.href = 'https://fonts.googleapis.com/css2?family=Cal+Sans:wght@400;500;600;700&display=swap'
    calSansLink.rel = 'stylesheet'
    document.head.appendChild(calSansLink)

    const interLink = document.createElement('link')
    interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    interLink.rel = 'stylesheet'
    document.head.appendChild(interLink)

    return () => {
      document.head.removeChild(calSansLink)
      document.head.removeChild(interLink)
    }
  }, [])

  return null
}


