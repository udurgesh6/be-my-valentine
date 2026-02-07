'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ValentineButtons from '@/components/valentine-buttons'
import ValentineSuccess from '@/components/valentine-success'
import HeartAnimation from '@/components/heart-animation'

const valentineDays = {
  rose: {
    emoji: '🌹',
    title: 'Will you accept this Rose?',
    subtitle: 'Rose Day - February 7th',
    color: 'from-red-50 via-pink-50 to-rose-50'
  },
  propose: {
    emoji: '💍',
    title: 'Will you be mine?',
    subtitle: 'Propose Day - February 8th',
    color: 'from-purple-50 via-pink-50 to-red-50'
  },
  chocolate: {
    emoji: '🍫',
    title: 'Sweet like chocolate, will you be mine?',
    subtitle: 'Chocolate Day - February 9th',
    color: 'from-amber-50 via-orange-50 to-red-50'
  },
  teddy: {
    emoji: '🧸',
    title: 'Will you cuddle with me?',
    subtitle: 'Teddy Day - February 10th',
    color: 'from-yellow-50 via-pink-50 to-red-50'
  },
  promise: {
    emoji: '🤝',
    title: 'Promise to be mine forever?',
    subtitle: 'Promise Day - February 11th',
    color: 'from-blue-50 via-indigo-50 to-purple-50'
  },
  hug: {
    emoji: '🤗',
    title: 'Can I give you a hug?',
    subtitle: 'Hug Day - February 12th',
    color: 'from-green-50 via-emerald-50 to-teal-50'
  },
  kiss: {
    emoji: '💋',
    title: 'May I kiss you?',
    subtitle: 'Kiss Day - February 13th',
    color: 'from-pink-100 via-rose-50 to-red-50'
  },
  valentine: {
    emoji: '💕',
    title: 'Will you be my Valentine?',
    subtitle: 'Valentine\'s Day - February 14th',
    color: 'from-pink-50 via-white to-red-50'
  }
}

const funnyMessages = [
  'Are you sure?',
  'Really sure?',
  'Think about it... 💭',
  'This is your last chance to say no!',
  'I\'m not asking anymore, you have to say yes!',
  'Pretty please with strawberries on top? 🍓',
  'You\'ve made me the happiest person ever! 💕'
]

export default function ValentinePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const name = decodeURIComponent(params.name as string)
  const day = (searchParams.get('day') || 'valentine') as keyof typeof valentineDays
  
  const [currentStep, setCurrentStep] = useState(0)
  const [yesClicked, setYesClicked] = useState(false)
  const [noHoverPosition, setNoHoverPosition] = useState({ x: 0, y: 0 })

  const currentDay = valentineDays[day] || valentineDays.valentine
  const isComplete = yesClicked && currentStep >= funnyMessages.length - 1

  if (isComplete) {
    return <ValentineSuccess name={name} day={day} />
  }

  return (
    <main className={`min-h-screen bg-gradient-to-br ${currentDay.color} flex items-center justify-center p-4 relative overflow-hidden`}>
      {/* Floating hearts background */}
      <HeartAnimation />

      <div className="max-w-lg w-full z-10 text-center">
        {/* Main Question or Confirmation */}
        <div className="mb-12">
          <div className="flex justify-center mb-8 text-6xl animate-pulse">
            {currentDay.emoji}
          </div>
          <p className="text-sm font-semibold text-primary/70 mb-2 uppercase tracking-wide">
            {currentDay.subtitle}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-pretty">
            {currentStep === 0
              ? `${name}, ${currentDay.title.toLowerCase()}`
              : funnyMessages[currentStep - 1]}
          </h1>
          <p className="text-lg text-muted-foreground">
            {currentStep === 0 ? 'Please choose wisely 😊' : 'Be honest! 🥰'}
          </p>
        </div>

        {/* Buttons */}
        <ValentineButtons
          currentStep={currentStep}
          onYes={() => {
            setYesClicked(true)
            if (currentStep < funnyMessages.length) {
              setCurrentStep(currentStep + 1)
            }
          }}
          noHoverPosition={noHoverPosition}
          setNoHoverPosition={setNoHoverPosition}
        />

        {/* Decorative hearts */}
        <div className="flex justify-center gap-8 mt-12 text-3xl opacity-70">
          <span>💘</span>
          <span>{currentDay.emoji}</span>
          <span>💘</span>
        </div>
      </div>
    </main>
  )
}
