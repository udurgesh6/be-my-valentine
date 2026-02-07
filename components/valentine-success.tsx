'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface ValentineSuccessProps {
  name: string
  day?: string
}

const dayMessages = {
  rose: {
    emoji: '🌹',
    title: 'You accepted!',
    message: 'You accepted the rose! This beautiful beginning means the world to me.',
    subtitle: 'Our love story starts with a rose',
    hearts: ['🌹', '💕', '🌹']
  },
  propose: {
    emoji: '💍',
    title: 'You said YES!',
    message: 'You said yes to my proposal! I promise to cherish you forever.',
    subtitle: 'Forever starts now',
    hearts: ['💍', '💕', '💍']
  },
  chocolate: {
    emoji: '🍫',
    title: 'Sweet Success!',
    message: 'You accepted the chocolates! You make life sweeter than any treat.',
    subtitle: 'Sweet moments together',
    hearts: ['🍫', '💕', '🍫']
  },
  teddy: {
    emoji: '🧸',
    title: 'Cuddle Buddy!',
    message: 'You want to cuddle! I can\'t wait to hold you close.',
    subtitle: 'Warm hugs await',
    hearts: ['🧸', '💕', '🧸']
  },
  promise: {
    emoji: '🤝',
    title: 'You Promised!',
    message: 'You made a promise to be mine! I\'ll keep my promises to you always.',
    subtitle: 'A bond that lasts forever',
    hearts: ['🤝', '💕', '🤝']
  },
  hug: {
    emoji: '🤗',
    title: 'Hug Accepted!',
    message: 'You want a hug! Your embrace is my favorite place to be.',
    subtitle: 'Wrapped in your love',
    hearts: ['🤗', '💕', '🤗']
  },
  kiss: {
    emoji: '💋',
    title: 'Kiss Me!',
    message: 'You accepted the kiss! Every moment with you is magical.',
    subtitle: 'Sealed with a kiss',
    hearts: ['💋', '💕', '💋']
  },
  valentine: {
    emoji: '💝',
    title: 'Yes!',
    message: 'You\'ve made me the happiest person in the world! 💕',
    subtitle: 'You mean everything to me!',
    hearts: ['💕', '💗', '💝']
  }
}

export default function ValentineSuccess({ name, day = 'valentine' }: ValentineSuccessProps) {
  const [confetti, setConfetti] = useState(false)
  const [hearts, setHearts] = useState<Array<{
    left: number
    top: number
    duration: number
    delay: number
    emoji: string
  }>>([])

  const currentDay = dayMessages[day as keyof typeof dayMessages] || dayMessages.valentine

  useEffect(() => {
    setConfetti(true)
    
    // Generate hearts only on client side to avoid hydration mismatch
    const celebrationEmojis = ['💕', '💗', '💝', '💘', '🎉', currentDay.emoji]
    const generatedHearts = Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 0.5,
      emoji: celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)]
    }))
    setHearts(generatedHearts)
  }, [currentDay.emoji])

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated celebration hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-pulse"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              animation: `float ${heart.duration}s ease-in-out infinite`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            {heart.emoji}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
            opacity: 0.8;
          }
        }
      `}</style>

      <div className="max-w-2xl w-full z-10 text-center">
        {/* Celebration heading */}
        <div className="mb-8">
          <div className="text-6xl md:text-8xl mb-6 animate-bounce">
            {currentDay.emoji}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 text-pretty">
            {currentDay.title}
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-6">
            {name}, I&apos;m so happy!
          </p>
        </div>

        {/* Celebration GIF */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto border-4 border-primary">
          <img
            src="/fb0768d2ffd1eb6a3880fa7b03aaa2b0.gif"
            alt="Celebration"
            className="w-full h-auto"
          />
        </div>

        {/* Message */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-secondary mb-8 space-y-4">
          <p className="text-xl text-foreground font-semibold">
            {currentDay.message}
          </p>
          <p className="text-lg text-muted-foreground">
            {currentDay.subtitle}
          </p>
        </div>

        {/* Decorative footer */}
        <div className="flex justify-center gap-12 mt-12 text-5xl">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>
            {currentDay.hearts[0]}
          </span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
            {currentDay.hearts[1]}
          </span>
          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>
            {currentDay.hearts[2]}
          </span>
        </div>
      </div>
    </main>
  )
}
