'use client'

import React, { useEffect, useState } from 'react'

export default function HeartAnimation() {
  const [hearts, setHearts] = useState<Array<{
    top: number
    duration: number
    opacity: number
    emoji: string
  }>>([])

  useEffect(() => {
    // Generate hearts only on client side to avoid hydration mismatch
    const heartEmojis = ['💕', '💗', '💝', '💘', '❤️']
    const generatedHearts = Array.from({ length: 12 }).map((_, i) => ({
      top: Math.random() * 100,
      duration: 4 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.3,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)]
    }))
    setHearts(generatedHearts)
  }, [])

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
            opacity: 0.5;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        .floating-heart {
          position: absolute;
          pointer-events: none;
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((heart, i) => (
          <div
            key={i}
            className="floating-heart text-2xl md:text-4xl"
            style={{
              left: `${(i * 8.33) % 100}%`,
              top: `${heart.top}%`,
              animation: `float ${heart.duration}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              opacity: heart.opacity,
            }}
          >
            {heart.emoji}
          </div>
        ))}
      </div>
    </>
  )
}
