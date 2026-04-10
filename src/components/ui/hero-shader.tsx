"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // The moving layer is addressed directly via DOM ref — no React re-renders on mousemove
  const layerRef = useRef<HTMLDivElement>(null)
  const [isDark, setIsDark] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (!layerRef.current || !containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30
        // Direct DOM mutation — no React setState, no re-render, no TBT cost
        layerRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.15)`
      })
    }

    container.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* CSS-only mesh gradient background — moved by direct DOM style, not setState */}
      <div
        ref={layerRef}
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: 'translate(0px, 0px) scale(1.15)', willChange: 'transform' }}
      >
        {isDark ? (
          <>
            <div className="absolute inset-0 bg-[#0a1a10]" />
            <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#003318] blur-[120px] opacity-80" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#004d25] blur-[120px] opacity-70" />
            <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-[#006633] blur-[100px] opacity-50" />
            <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#001a0d] blur-[80px] opacity-60" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[#f8f9fa]" />
            <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#e9ecef] blur-[120px] opacity-80" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#dee2e6] blur-[100px] opacity-70" />
            <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-[#f1f3f5] blur-[80px] opacity-60" />
          </>
        )}
      </div>

      {/* Neon green glow edges - only in dark mode */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#00ff6640] via-[#00ff6615] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00ff6630] via-[#00ff6610] to-transparent" />
          <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#00ff6625] via-[#00ff6608] to-transparent" />
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#00ff6625] via-[#00ff6608] to-transparent" />
          <div className="absolute top-0 left-0 w-48 h-48 bg-[radial-gradient(circle_at_top_left,_#00ff6650_0%,_transparent_70%)]" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,_#00ff6650_0%,_transparent_70%)]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[radial-gradient(circle_at_bottom_left,_#00ff6640_0%,_transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_bottom_right,_#00ff6640_0%,_transparent_70%)]" />
        </div>
      )}

      {children}
    </div>
  )
}
