import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartBalloon } from './HeartBalloon'
import arrowCursor from './archery-arrow.svg'

interface BalloonConfig {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

interface FloatingBalloonsProps {
  onAllPopped: () => void
}

export function FloatingBalloons({ onAllPopped }: FloatingBalloonsProps) {
  const balloons = useMemo<BalloonConfig[]>(() => {
    const positions = [
      { x: 10, y: 18 },
      { x: 74, y: 12 },
      { x: 32, y: 42 },
      { x: 85, y: 48 },
      { x: 15, y: 62 },
      { x: 55, y: 22 },
      { x: 62, y: 65 },
      { x: 40, y: 80 },
    ]
    return positions.map((pos, i) => ({
      id: i,
      x: pos.x + (Math.random() * 6 - 3),
      y: pos.y + (Math.random() * 4 - 2),
      size: 60 + Math.random() * 30,
      delay: i * 0.12,
    }))
  }, [])

  const [poppedIds, setPoppedIds] = useState<Set<number>>(new Set())
  const [showHint, setShowHint] = useState(true)
  const needleRef = useRef<HTMLDivElement>(null)

  const handlePop = useCallback(
    (id: number) => {
      setPoppedIds((prev) => {
        const next = new Set(prev)
        next.add(id)
        return next
      })
      if (showHint) setShowHint(false)
    },
    [showHint]
  )

  useEffect(() => {
    if (poppedIds.size === balloons.length) onAllPopped()
  }, [poppedIds.size, balloons.length, onAllPopped])

  // Track mouse movement for custom cursor - using direct DOM manipulation for performance
  useEffect(() => {
    const needle = needleRef.current
    if (!needle) return

    const handleMouseMove = (e: MouseEvent) => {
      // Direct DOM update - no re-render, super smooth!
      needle.style.left = `${e.clientX}px`
      needle.style.top = `${e.clientY}px`
      needle.style.opacity = '1'
    }

    const handleMouseDown = () => {
      if (needle) {
        needle.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(0.9)'
      }
    }

    const handleMouseUp = () => {
      if (needle) {
        needle.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(1)'
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div
      className="absolute inset-0"
      style={{
        cursor: 'none', // Hide default cursor
      }}
    >
      {/* Custom arrow cursor */}
      <div
        ref={needleRef}
        className="fixed pointer-events-none z-50"
        style={{
          width: 48,
          height: 48,
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%) rotate(0deg) scale(1)',
          opacity: 0,
          transition: 'transform 0.1s ease-out',
          willChange: 'left, top, transform',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
        }}
        id="arrow-cursor"
      >
        <img src={arrowCursor} alt="" width="48" height="48" />
      </div>

      {/* Bold colored decorative shapes */}
      <motion.span
        className="absolute pointer-events-none select-none"
        style={{
          top: '8%',
          left: '6%',
          fontSize: 22,
          color: 'var(--color-blue)',
          opacity: 0.2,
        }}
        animate={{
          rotate: [0, 15, 0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ✦
      </motion.span>
      <motion.span
        className="absolute pointer-events-none select-none"
        style={{
          top: '5%',
          right: '10%',
          fontSize: 16,
          color: 'var(--color-green)',
          opacity: 0.25,
        }}
        animate={{
          rotate: [0, -10, 0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ✦
      </motion.span>
      <motion.span
        className="absolute pointer-events-none select-none"
        style={{
          bottom: '20%',
          right: '8%',
          fontSize: 26,
          color: 'var(--color-coral)',
          opacity: 0.15,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ✦
      </motion.span>

      {/* Color dots */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 8,
          height: 8,
          backgroundColor: 'var(--color-yellow)',
          opacity: 0.3,
          top: '35%',
          left: '92%',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 6,
          height: 6,
          backgroundColor: 'var(--color-lavender)',
          opacity: 0.25,
          top: '75%',
          left: '5%',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 7,
          height: 7,
          backgroundColor: 'var(--color-hot-pink)',
          opacity: 0.2,
          top: '12%',
          left: '45%',
        }}
      />

      {/* Hearts */}
      {balloons.map((b) =>
        !poppedIds.has(b.id) ? (
          <HeartBalloon
            key={b.id}
            id={b.id}
            x={b.x}
            y={b.y}
            size={b.size}
            delay={b.delay}
            onPop={handlePop}
          />
        ) : null
      )}

      {/* Hint text */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 4,
              transition: {
                duration: 0.25,
              },
            }}
            transition={{
              duration: 0.8,
              delay: 1.2,
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 select-none"
          >
            <motion.p
              className="text-lg tracking-wide"
              style={{
                fontFamily: 'var(--font-hand)',
                color: 'var(--color-hot-pink)',
                opacity: 0.7,
                fontSize: '1.3rem',
              }}
            >
              pop them! ↓
            </motion.p>
            <svg
              width="80"
              height="6"
              viewBox="0 0 80 6"
              style={{
                opacity: 0.4,
              }}
            >
              <path
                d="M2 4 Q 20 1, 40 3 Q 60 5, 78 2"
                stroke="var(--color-blue)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
