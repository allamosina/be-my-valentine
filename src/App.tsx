import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FloatingBalloons } from './components/FloatingBalloons'
import { ValentineQuestion } from './components/ValentineQuestion'
import { FinalScene } from './components/FinalScene'

type Act = 'balloons' | 'pause' | 'question' | 'finale'

export function App() {
  const [act, setAct] = useState<Act>('balloons')
  const [isDark, setIsDark] = useState(false)

  // Apply dark class to html element so CSS variables cascade everywhere
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const handleAllPopped = useCallback(() => {
    setAct('pause')
    setTimeout(() => setAct('question'), 1500)
  }, [])

  const handleYes = useCallback(() => {
    setAct('finale')
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden dot-grid-bg">
      {/* Dark/Light mode toggle */}
      <motion.button
        onClick={() => setIsDark((prev) => !prev)}
        className="absolute z-50 select-none"
        style={{
          top: 16,
          right: 16,
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '0.75rem',
          backgroundColor: isDark
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(26,26,46,0.06)',
          color: 'var(--color-text)',
          border: `2px solid ${isDark ? 'rgba(191,95,255,0.3)' : 'rgba(26,26,46,0.15)'}`,
          borderRadius: 12,
          padding: '8px 14px',
          cursor: 'pointer',
          letterSpacing: '0.08em',
          backdropFilter: 'blur(8px)',
          transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
          boxShadow: isDark
            ? '0 0 12px rgba(191, 95, 255, 0.15)'
            : '3px 3px 0px rgba(51, 102, 255, 0.15)',
        }}
        whileHover={{
          scale: 1.06,
        }}
        whileTap={{
          scale: 0.95,
        }}
      >
        <span
          style={{
            fontSize: '1rem',
            marginRight: 6,
          }}
        >
          {isDark ? '☀️' : '🌙'}
        </span>
        <span className="uppercase">{isDark ? 'day' : 'night'}</span>
      </motion.button>

      {/* Persistent bold decorative elements */}
      <motion.span
        className="absolute pointer-events-none select-none z-0"
        style={{
          top: '3%',
          right: '4%',
          fontSize: 32,
          color: 'var(--color-yellow)',
          opacity: 0.12,
        }}
        animate={{
          rotate: [0, 8, 0, -8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ✦
      </motion.span>
      <motion.span
        className="absolute pointer-events-none select-none z-0"
        style={{
          bottom: '5%',
          left: '3%',
          fontSize: 22,
          color: 'var(--color-lavender)',
          opacity: 0.15,
        }}
        animate={{
          rotate: [0, -12, 0, 12, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ✦
      </motion.span>
      <motion.span
        className="absolute pointer-events-none select-none z-0"
        style={{
          top: '48%',
          left: '2%',
          fontSize: 16,
          color: 'var(--color-green)',
          opacity: 0.12,
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ✦
      </motion.span>

      {/* Corner squiggle */}
      <svg
        className="absolute pointer-events-none z-0"
        style={{
          top: 18,
          left: 18,
          opacity: 0.1,
        }}
        width="60"
        height="40"
        viewBox="0 0 60 40"
      >
        <path
          d="M5 20 Q 15 5, 25 20 Q 35 35, 45 20 Q 55 5, 58 20"
          stroke="var(--color-hot-pink)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Bold dots */}
      <div
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          width: 7,
          height: 7,
          backgroundColor: 'var(--color-blue)',
          opacity: 0.12,
          bottom: '10%',
          right: '7%',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          width: 5,
          height: 5,
          backgroundColor: 'var(--color-coral)',
          opacity: 0.15,
          top: '14%',
          left: '48%',
        }}
      />

      {/* Acts */}
      <AnimatePresence mode="wait">
        {act === 'balloons' && (
          <motion.div
            key="balloons"
            className="absolute inset-0 z-10"
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <FloatingBalloons onAllPopped={handleAllPopped} />
          </motion.div>
        )}
        {act === 'pause' && (
          <motion.div
            key="pause"
            className="absolute inset-0 z-10"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
            }}
          />
        )}
        {act === 'question' && (
          <motion.div
            key="question"
            className="absolute inset-0 z-10"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <ValentineQuestion onYes={handleYes} />
          </motion.div>
        )}
        {act === 'finale' && (
          <motion.div
            key="finale"
            className="absolute inset-0 z-10"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
          >
            <FinalScene />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
