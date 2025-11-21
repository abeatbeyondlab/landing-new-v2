'use client'

import { useEffect } from 'react'

export function ManifestLoader() {
  useEffect(() => {
    // Defer loading of the manifest to avoid blocking the critical path
    const link = document.createElement('link')
    link.rel = 'manifest'
    link.href = '/site.webmanifest'
    document.head.appendChild(link)
  }, [])

  return null
}
