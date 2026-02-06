"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.6
    
    setMousePosition({ x, y })
  }, [])

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => {
      setIsActive(false)
      setMousePosition({ x: 0, y: 0 })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
      container.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
        container.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [handleMouseMove])

  const darkColors: [string, string, string, string] = ["#003318", "#004d25", "#006633", "#001a0d"]
  const lightColors: [string, string, string, string] = ["#f8f9fa", "#e9ecef", "#dee2e6", "#f1f3f5"]

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* SVG Filters */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-strong">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Background Shaders - Mouse responsive */}
      <MeshGradient
        className="absolute inset-0 w-full h-full transition-all duration-300 ease-out"
        speed={isActive ? 0.25 : 0.1}
        colors={isDark ? darkColors : lightColors}
        offsetX={mousePosition.x}
        offsetY={mousePosition.y}
        distortion={isActive ? 0.5 : 0.3}
        swirl={isActive ? 0.4 : 0.2}
      />
      
      {/* Neon green glow edges - only in dark mode */}
      {isDark && (
        <div 
          className="absolute inset-0 pointer-events-none transition-transform duration-500 ease-out"
          style={{ 
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)` 
          }}
        >
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
