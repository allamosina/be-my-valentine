import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

interface AmbientShape {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  colorVar: string
  type: 'heart' | 'star'
}

const shapeColorVars = [
  'var(--color-hot-pink)',
  'var(--color-blue)',
  'var(--color-green)',
  'var(--color-coral)',
  'var(--color-lavender)',
  'var(--color-yellow)',
]

export function FinalScene() {
  const [showSecondLine, setShowSecondLine] = useState(false)

  const ambientShapes = useMemo<AmbientShape[]>(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: 5 + Math.random() * 90,
        delay: Math.random() * 3,
        duration: 8 + Math.random() * 6,
        size: 12 + Math.random() * 12,
        colorVar: shapeColorVars[i % shapeColorVars.length],
        type: i % 3 === 0 ? 'star' : 'heart',
      })),
    []
  )

  useEffect(() => {
    const timer = setTimeout(() => setShowSecondLine(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  const stars = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: 15 + Math.random() * 70,
        y: 20 + Math.random() * 60,
        size: 14 + Math.random() * 12,
        colorVar: shapeColorVars[i % shapeColorVars.length],
        delay: Math.random() * 2,
        rotation: (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 15),
      })),
    []
  )

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Twinkling stars */}
      {stars.map((s) => (
        <motion.span
          key={`star-${s.id}`}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: s.size,
            color: s.colorVar,
            transform: `rotate(${s.rotation}deg)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.5, 0.15, 0.5, 0],
            scale: [0.8, 1.1, 0.9, 1.1, 0.8],
          }}
          transition={{
            duration: 3,
            delay: s.delay + 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ✦
        </motion.span>
      ))}

      {/* Ambient floating shapes */}
      {ambientShapes.map((h) => (
        <motion.div
          key={h.id}
          className="absolute pointer-events-none"
          style={{ left: `${h.x}%` }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.3, 0.3, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {h.type === 'star' ? (
            <span
              style={{
                fontSize: h.size,
                color: h.colorVar,
                fontWeight: 800,
              }}
            >
              ✦
            </span>
          ) : (
            <svg width={h.size} height={h.size} viewBox="0 0 24 24">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={h.colorVar}
              />
            </svg>
          )}
        </motion.div>
      ))}

      {/* Primary line */}
      <motion.h1
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          type: 'spring',
          stiffness: 200,
          damping: 15,
        }}
        className="text-center lowercase leading-tight relative z-10"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(2.4rem, 8vw, 5rem)',
          color: 'var(--color-hot-pink)',
          textShadow: '4px 4px 0px var(--color-shadow)',
          letterSpacing: '-0.03em',
          transform: 'rotate(-2deg)',
          transition: 'color 0.4s, text-shadow 0.4s',
        }}
      >
        i knew you would 😜
      </motion.h1>

      {/* Bouncing heart sticker */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 12 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 12,
          delay: 1.2,
        }}
        className="absolute pointer-events-none select-none"
        style={{
          top: '30%',
          right: '10%',
          filter: 'drop-shadow(3px 3px 0px var(--color-blue))',
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="finaleHeart" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-coral)" />
              <stop offset="100%" stopColor="var(--color-hot-pink)" />
            </linearGradient>
          </defs>
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="url(#finaleHeart)"
            stroke="var(--color-plum)"
            strokeWidth="1"
          />
          <ellipse cx="8.5" cy="7" rx="2.5" ry="1.8" fill="white" opacity="0.35" />
        </svg>
      </motion.div>

      {/* Second line */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={showSecondLine ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{
          duration: 0.8,
          type: 'spring',
          stiffness: 200,
          damping: 18,
        }}
        className="text-center mt-5 relative z-10"
        style={{
          fontFamily: 'var(--font-hand)',
          fontWeight: 700,
          fontSize: 'clamp(1.5rem, 4.5vw, 2.6rem)',
          color: 'var(--color-blue)',
          transform: 'rotate(1deg)',
          letterSpacing: '0.02em',
          transition: 'color 0.4s',
        }}
      >
        ok, now we go get wine.
      </motion.p>

      {/* Bottom squiggle */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 3.5 }}
        width="120"
        height="10"
        viewBox="0 0 120 10"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <path
          d="M5 5 Q 18 1, 30 5 Q 42 9, 55 5 Q 68 1, 80 5 Q 92 9, 105 5 Q 115 1, 118 5"
          stroke="var(--color-green)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Color dots row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 pointer-events-none"
      >
        {[
          'var(--color-hot-pink)',
          'var(--color-blue)',
          'var(--color-yellow)',
          'var(--color-green)',
          'var(--color-lavender)',
          'var(--color-coral)',
        ].map((c, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: c,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
