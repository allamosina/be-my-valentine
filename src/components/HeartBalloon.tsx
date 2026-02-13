import React, { useCallback, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PopParticle {
  id: number
  angle: number
  distance: number
  colorVar: string
  isStar: boolean
}

interface HeartBalloonProps {
  id: number
  x: number
  y: number
  size: number
  delay: number
  onPop: (id: number) => void
}

const particleColorVars = [
  'var(--color-hot-pink)',
  'var(--color-blue)',
  'var(--color-coral)',
  'var(--color-green)',
  'var(--color-lavender)',
  'var(--color-yellow)',
]

// Gradient combos using CSS variable pairs + contrasting shadow
const heartStyles = [
  {
    from: 'var(--color-hot-pink)',
    to: 'var(--color-coral)',
    shadow: 'var(--color-blue)',
  },
  {
    from: 'var(--color-lavender)',
    to: 'var(--color-hot-pink)',
    shadow: 'var(--color-green)',
  },
  {
    from: 'var(--color-blue)',
    to: 'var(--color-green)',
    shadow: 'var(--color-coral)',
  },
  {
    from: 'var(--color-coral)',
    to: 'var(--color-yellow)',
    shadow: 'var(--color-hot-pink)',
  },
  {
    from: 'var(--color-green)',
    to: 'var(--color-blue)',
    shadow: 'var(--color-lavender)',
  },
  {
    from: 'var(--color-hot-pink)',
    to: 'var(--color-lavender)',
    shadow: 'var(--color-yellow)',
  },
  {
    from: 'var(--color-yellow)',
    to: 'var(--color-coral)',
    shadow: 'var(--color-blue)',
  },
  {
    from: 'var(--color-blue)',
    to: 'var(--color-lavender)',
    shadow: 'var(--color-hot-pink)',
  },
]

export function HeartBalloon({ id, x, y, size, delay, onPop }: HeartBalloonProps) {
  const [isPopped, setIsPopped] = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  const rotation = useMemo(
    () => (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 7),
    []
  )
  const popRotation = useMemo(() => (Math.random() > 0.5 ? 15 : -15), [])

  const style = heartStyles[id % heartStyles.length]

  const particles = useMemo<PopParticle[]>(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        angle: i * 45 + (Math.random() * 20 - 10),
        distance: 35 + Math.random() * 50,
        colorVar: particleColorVars[i % particleColorVars.length],
        isStar: i % 3 === 0,
      })),
    []
  )

  const floatParams = useMemo(
    () => ({
      yOffset: 6 + Math.random() * 10,
      xOffset: 3 + Math.random() * 6,
      duration: 2.2 + Math.random() * 1.5,
    }),
    []
  )

  const handlePop = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (isPopped) return

      setIsPopped(true)
      setShowParticles(true)
      setTimeout(() => onPop(id), 450)
    },
    [id, isPopped, onPop]
  )

  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        zIndex: 10,
      }}
    >
      <AnimatePresence>
        {!isPopped && (
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: rotation,
              y: [0, -floatParams.yOffset, 0, floatParams.yOffset * 0.4, 0],
              x: [0, floatParams.xOffset, 0, -floatParams.xOffset, 0],
            }}
            exit={{
              scale: [1, 1.5, 0],
              rotate: [rotation, rotation + popRotation, rotation + popRotation * 2],
              opacity: [1, 1, 0],
              transition: {
                duration: 0.35,
                ease: 'easeOut',
              },
            }}
            transition={{
              scale: {
                duration: 0.45,
                delay,
                type: 'spring',
                stiffness: 400,
                damping: 15,
              },
              opacity: {
                duration: 0.3,
                delay,
              },
              rotate: {
                duration: 0.45,
                delay,
              },
              y: {
                duration: floatParams.duration,
                delay: delay + 0.45,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              x: {
                duration: floatParams.duration * 1.4,
                delay: delay + 0.45,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            onClick={handlePop}
            onTouchEnd={handlePop}
            className="select-none"
            style={{
              filter: `drop-shadow(4px 4px 0px ${style.shadow})`,
              transformOrigin: 'center center',
              transition: 'filter 0.4s ease',
            }}
            whileHover={{
              scale: 1.12,
              rotate: rotation + 3,
            }}
            whileTap={{
              scale: 0.9,
            }}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`hg-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={style.from} />
                  <stop offset="100%" stopColor={style.to} />
                </linearGradient>
              </defs>
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={`url(#hg-${id})`}
                stroke="var(--color-plum)"
                strokeWidth="1"
              />
              <ellipse cx="8.5" cy="7" rx="2.5" ry="1.8" fill="white" opacity="0.4" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showParticles &&
          particles.map((p) => {
            const rad = (p.angle * Math.PI) / 180
            return (
              <motion.div
                key={`p-${id}-${p.id}`}
                initial={{
                  scale: 1,
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                }}
                animate={{
                  x: Math.cos(rad) * p.distance,
                  y: Math.sin(rad) * p.distance,
                  scale: 0,
                  opacity: 0,
                  rotate: Math.random() * 180,
                }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                }}
                className="absolute pointer-events-none"
                style={{
                  left: size / 2 - 6,
                  top: size / 2 - 6,
                }}
              >
                {p.isStar ? (
                  <span
                    style={{
                      fontSize: 14,
                      color: p.colorVar,
                      fontWeight: 800,
                    }}
                  >
                    ✦
                  </span>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill={p.colorVar}
                    />
                  </svg>
                )}
              </motion.div>
            )
          })}
      </AnimatePresence>
    </div>
  )
}
