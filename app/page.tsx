'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import HeartAnimation from '@/components/heart-animation'

const valentineDays = [
  { key: 'rose', label: '🌹 Rose Day', date: 'Feb 7' },
  { key: 'propose', label: '💍 Propose Day', date: 'Feb 8' },
  { key: 'chocolate', label: '🍫 Chocolate Day', date: 'Feb 9' },
  { key: 'teddy', label: '🧸 Teddy Day', date: 'Feb 10' },
  { key: 'promise', label: '🤝 Promise Day', date: 'Feb 11' },
  { key: 'hug', label: '🤗 Hug Day', date: 'Feb 12' },
  { key: 'kiss', label: '💋 Kiss Day', date: 'Feb 13' },
  { key: 'valentine', label: '💕 Valentine\'s Day', date: 'Feb 14' }
]

export default function Home() {
  const [name, setName] = useState('')
  const [senderName, setSenderName] = useState('')
  const [selectedDay, setSelectedDay] = useState('valentine')
  const [link, setLink] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (name.trim()) {
      const encodedName = encodeURIComponent(name)
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

      const params = new URLSearchParams()
      if (selectedDay !== 'valentine') {
        params.set('day', selectedDay)
      }
      if (senderName.trim()) {
        params.set('sender', senderName.trim())
      }

      const queryString = params.toString()
      const fullLink = `${baseUrl}/valentine/${encodedName}${queryString ? `?${queryString}` : ''}`
      setLink(fullLink)
    }
  }

  const handleCopy = () => {
    if (link) {
      navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerate()
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating hearts background */}
      <HeartAnimation />

      <div className="max-w-2xl w-full z-10">
        {/* Header with hearts */}
        <div className="text-center mb-12">
          <div className="flex justify-center gap-4 mb-6 text-4xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>
              💝
            </span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
              💕
            </span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>
              💗
            </span>
          </div>
          <h1 className="text-5xl font-bold text-primary mb-3 text-pretty">
            Valentine's Week Special
          </h1>
          <p className="text-lg text-muted-foreground">
            Create a special link for each day of Valentine's Week
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-secondary">
          <div className="space-y-3">
            <label htmlFor="name" className="block text-lg font-semibold text-primary">
              Enter their name:
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Your special someone's name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 text-lg rounded-lg border-2 border-secondary focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="senderName" className="block text-lg font-semibold text-primary">
              Your name <span className="text-sm font-normal text-muted-foreground">(optional)</span>:
            </label>
            <Input
              id="senderName"
              type="text"
              placeholder="Enter your name..."
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 text-lg rounded-lg border-2 border-secondary focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Day Selection */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-primary">
              Choose a day:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {valentineDays.map((day) => (
                <button
                  key={day.key}
                  onClick={() => setSelectedDay(day.key)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedDay === day.key
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-secondary hover:border-primary/50 hover:bg-secondary/50'
                  }`}
                >
                  <div className="font-semibold text-sm">{day.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{day.date}</div>
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!name.trim()}
            className="w-full h-12 text-lg font-semibold rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 transform hover:scale-105"
          >
            ✨ Generate Link
          </Button>

          {/* Link Display */}
          {link && (
            <div className="space-y-3 pt-6 border-t-2 border-secondary">
              <p className="text-sm font-medium text-muted-foreground">Your Valentine Link:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={link}
                  readOnly
                  className="flex-1 px-4 py-3 bg-secondary rounded-lg text-sm text-foreground font-mono border-2 border-secondary"
                />
                <Button
                  onClick={handleCopy}
                  className="px-6 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-all duration-200"
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Share this link with your special someone!
              </p>
            </div>
          )}
        </div>

        {/* Footer decoration */}
        <div className="flex justify-center gap-8 mt-12 text-3xl opacity-70">
          <span>💘</span>
          <span>💑</span>
          <span>💘</span>
        </div>
      </div>
    </main>
  )
}
