'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'

interface ValentineButtonsProps {
  currentStep: number
  onYes: () => void
  noHoverPosition: { x: number; y: number }
  setNoHoverPosition: (pos: { x: number; y: number }) => void
}

export default function ValentineButtons({
  currentStep,
  onYes,
  noHoverPosition,
  setNoHoverPosition,
}: ValentineButtonsProps) {
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate button size based on step
  const yesButtonScale = 1 + currentStep * 0.25

  const handleNoHover = () => {
    if (!containerRef.current || !noButtonRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const button = noButtonRef.current.getBoundingClientRect()

    // Generate random position within container
    const randomX = Math.random() * (container.width - button.width * 2)
    const randomY = Math.random() * (container.height - button.height * 2)

    setNoHoverPosition({ x: randomX, y: randomY })
  }

  const handleNoClick = () => {
    handleNoHover()
  }

  return (
    <div
      ref={containerRef}
      className="relative h-64 flex items-center justify-center gap-6 px-4"
    >
      {/* Yes Button */}
      <Button
        onClick={onYes}
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full transition-all duration-300 whitespace-nowrap"
        style={{
          padding: `${12 + currentStep * 6}px ${24 + currentStep * 12}px`,
          fontSize: `${16 + currentStep * 4}px`,
        }}
      >
        YES! 💕
      </Button>

      {/* No Button - runs away */}
      <button
        ref={noButtonRef}
        onClick={handleNoClick}
        onMouseEnter={handleNoHover}
        onTouchStart={handleNoHover}
        className="absolute px-6 py-3 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold rounded-full transition-all duration-500 whitespace-nowrap cursor-pointer"
        style={{
          transform: `translate(${noHoverPosition.x}px, ${noHoverPosition.y}px)`,
        }}
      >
        No 😢
      </button>
    </div>
  )
}
