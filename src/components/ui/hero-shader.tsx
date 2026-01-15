"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

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

      {/* Background Shaders - More visible green tones */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        speed={isActive ? 0.25 : 0.1}
        colors={["#003318", "#004d25", "#006633", "#001a0d"]}
      />
      
      {/* Neon green glow edges */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top edge glow */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#00ff6640] via-[#00ff6615] to-transparent" />
        {/* Bottom edge glow */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00ff6630] via-[#00ff6610] to-transparent" />
        {/* Left edge glow */}
        <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#00ff6625] via-[#00ff6608] to-transparent" />
        {/* Right edge glow */}
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#00ff6625] via-[#00ff6608] to-transparent" />
        {/* Corner glows */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-[radial-gradient(circle_at_top_left,_#00ff6650_0%,_transparent_70%)]" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,_#00ff6650_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[radial-gradient(circle_at_bottom_left,_#00ff6640_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_bottom_right,_#00ff6640_0%,_transparent_70%)]" />
      </div>

      {children}
    </div>
  )
}
