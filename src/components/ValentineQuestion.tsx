import { useCallback, useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ValentineQuestionProps {
  onYes: () => void
}

export function ValentineQuestion({ onYes }: ValentineQuestionProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [showDecorations, setShowDecorations] = useState(false)
  const [dodgeCount, setDodgeCount] = useState(0)
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null)
  const [noGone, setNoGone] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const fullText = 'will you be my valentine?'

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
        setTypingDone(true)
        setTimeout(() => setShowDecorations(true), 300)
        setTimeout(() => setShowButtons(true), 800)
      }
    }, 75)

    return () => clearInterval(interval)
  }, [])

  const dodgeNo = useCallback(() => {
    if (dodgeCount >= 2) {
      setNoGone(true)
      setShowEmoji(true)
      setTimeout(() => setShowEmoji(false), 1400)
      return
    }

    const vw = window.innerWidth
    const vh = window.innerHeight
    const padding = 70

    setNoPosition({
      x: padding + Math.random() * (vw - padding * 2),
      y: padding + Math.random() * (vh - padding * 2),
    })

    setDodgeCount((prev) => prev + 1)
  }, [dodgeCount])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
    >
      <div className="relative">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center lowercase leading-tight relative z-10"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 7vw, 5rem)',
            color: 'var(--color-text)',
            textShadow: '3px 3px 0px var(--color-shadow)',
            letterSpacing: '-0.03em',
            transition: 'color 0.4s, text-shadow 0.4s',
          }}
        >
          {displayedText}
          {!typingDone && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="inline-block ml-1"
              style={{
                color: 'var(--color-hot-pink)',
              }}
            >
              █
            </motion.span>
          )}
        </motion.h1>

        <AnimatePresence>
          {showDecorations && (
            <>
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 15,
                  delay: 0,
                }}
                className="absolute pointer-events-none select-none"
                style={{
                  top: -22,
                  right: -14,
                  fontSize: 24,
                  color: 'var(--color-yellow)',
                  transform: 'rotate(12deg)',
                }}
              >
                ✦
              </motion.span>
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 15,
                  delay: 0.1,
                }}
                className="absolute pointer-events-none select-none"
                style={{
                  top: -14,
                  left: -18,
                  fontSize: 16,
                  color: 'var(--color-blue)',
                  transform: 'rotate(-8deg)',
                }}
              >
                ✦
              </motion.span>
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.55 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 15,
                  delay: 0.2,
                }}
                className="absolute pointer-events-none select-none"
                style={{
                  bottom: -12,
                  right: '25%',
                  fontSize: 18,
                  color: 'var(--color-green)',
                  transform: 'rotate(5deg)',
                }}
              >
                ✦
              </motion.span>
              <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                }}
                width="140"
                height="10"
                viewBox="0 0 140 10"
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 pointer-events-none"
              >
                <motion.path
                  d="M2 6 Q 18 2, 35 6 Q 52 10, 70 5 Q 88 0, 105 6 Q 122 10, 138 4"
                  stroke="var(--color-hot-pink)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15,
                    ease: 'easeOut',
                  }}
                />
              </motion.svg>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-8 mt-14"
          >
            <motion.button
              onClick={onYes}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              className="relative uppercase tracking-widest"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.4rem',
                backgroundColor: 'var(--color-hot-pink)',
                color: 'var(--color-white)',
                border: '3px solid var(--color-plum)',
                borderRadius: 16,
                padding: '16px 52px',
                boxShadow: '5px 5px 0px var(--color-blue)',
                cursor: 'pointer',
                letterSpacing: '0.15em',
                transition: 'background-color 0.4s, border-color 0.4s, box-shadow 0.4s',
              }}
              whileHover={{
                boxShadow: '3px 3px 0px var(--color-blue)',
                x: 2,
                y: 2,
              }}
              whileTap={{
                boxShadow: '0px 0px 0px var(--color-blue)',
                x: 5,
                y: 5,
                scale: 0.97,
              }}
            >
              YES
            </motion.button>

            {!noPosition && !noGone && (
              <motion.button
                onMouseEnter={dodgeNo}
                onTouchStart={(e) => {
                  e.preventDefault()
                  dodgeNo()
                }}
                initial={{ opacity: 1 }}
                className="lowercase"
                style={{
                  fontFamily: 'var(--font-hand)',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text)',
                  border: '2.5px solid var(--color-plum)',
                  borderRadius: 12,
                  padding: '10px 28px',
                  boxShadow: '3px 3px 0px var(--color-green)',
                  cursor: 'pointer',
                  transition: 'border-color 0.4s, color 0.4s, box-shadow 0.4s',
                }}
              >
                nah
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {noPosition && !noGone && (
          <motion.button
            onMouseEnter={dodgeNo}
            onTouchStart={(e) => {
              e.preventDefault()
              dodgeNo()
            }}
            animate={{
              left: noPosition.x,
              top: noPosition.y,
            }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 22,
            }}
            className="fixed lowercase z-50"
            style={{
              fontFamily: 'var(--font-hand)',
              fontWeight: 700,
              fontSize: '1.2rem',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              border: '2.5px solid var(--color-plum)',
              borderRadius: 12,
              padding: '10px 28px',
              boxShadow: '3px 3px 0px var(--color-green)',
              cursor: 'pointer',
              transition: 'background-color 0.4s, border-color 0.4s, color 0.4s',
            }}
          >
            nah
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEmoji && noPosition && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 12,
            }}
            className="fixed z-50 select-none pointer-events-none"
            style={{
              left: noPosition.x + 10,
              top: noPosition.y,
              fontSize: '1.8rem',
            }}
          >
            🙄
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
