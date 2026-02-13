# 💕 Be My Valentine

A playful, interactive Valentine's Day mini-game built with React, TypeScript, and Framer Motion.

## 🎈 Features

### Three Interactive Phases:

1. **Balloon Popping** - Heart balloons continuously float upward from the bottom of the screen. Click to pop them!
   - Responsive target count: 5 balloons on mobile, 8 on desktop
   - Smooth upward floating animation with playful wobble
   - Satisfying pop animation with particle effects

2. **The Question** - "will you be my valentine?"
   - Typewriter effect for the question text
   - Interactive "Yes" button with neon glow
   - Playful "No" button that dodges the cursor/touch
   - Collision detection ensures buttons never overlap
   - After 2 dodge attempts, the "No" button disappears with a 🙄 emoji

3. **Final Scene** - Sweet conclusion
   - First line: "i knew you would 😜"
   - Second line (after delay): "ok, now we go get wine."
   - Ambient floating hearts and twinkling stars

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎨 Design

- **Aesthetic**: Retro neon with cyberpunk vibes
- **Color Palette**:
  - Hot Pink (#FF00E5)
  - Cyan (#00FFFF)
  - Lavender (#BF5FFF)
  - Coral (#FF5F1F)
- **Fonts**:
  - Syne (display) for bold statements
  - Caveat (handwriting) for playful text
- **Background**: Dark with subtle dot grid pattern

## 📱 Responsive & Accessible

- ✅ Works on desktop and mobile
- ✅ Touch-friendly interactions
- ✅ Keyboard-focusable buttons
- ✅ Smooth animations with GPU acceleration
- ✅ Proper cleanup to prevent memory leaks

## 🛠️ Technical Implementation

### Key Features:

**Phase 1 - Balloon Spawning:**
- Continuous spawning system with randomized intervals (800-1500ms)
- Upward float animation (6 seconds from bottom to top)
- Auto-cleanup for balloons that escape
- Responsive target count based on viewport width
- Maximum concurrent balloons to maintain performance

**Phase 2 - Dodge Logic:**
- Collision detection using `getBoundingClientRect()`
- Boundary calculations accounting for button dimensions
- Cooldown system (250ms) to prevent jittery movement
- Touch support with `touchstart` events
- Proper `touchAction: none` to prevent scroll issues

**Phase 3 - Final Scene:**
- Sequenced animations with proper timing
- Ambient floating shapes with infinite loop
- Twinkling star effects

### Configuration:

All timing and behavior constants are centralized:

```typescript
// FloatingBalloons
SPAWN_INTERVAL_MIN: 800ms
SPAWN_INTERVAL_MAX: 1500ms
RISE_DURATION: 6000ms
TARGET_POPS: 5 (mobile) / 8 (desktop)

// ValentineQuestion
TYPING_SPEED: 75ms per character
MAX_DODGE_COUNT: 2
DODGE_COOLDOWN: 250ms
COLLISION_PADDING: 80px

// FinalScene
LINE2_DELAY: 2500ms
```

## 📁 Project Structure

```
be-my-valentine/
├── src/
│   ├── components/
│   │   ├── FloatingBalloons.tsx  # Phase 1: Balloon spawning & management
│   │   ├── HeartBalloon.tsx      # Individual balloon with pop animation
│   │   ├── ValentineQuestion.tsx # Phase 2: Question with dodge logic
│   │   └── FinalScene.tsx        # Phase 3: Final message
│   ├── App.tsx                   # Main phase orchestration
│   ├── index.tsx                 # Entry point
│   └── index.css                 # Global styles & CSS variables
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🧪 Testing Checklist

- [x] Balloons spawn continuously from bottom
- [x] Balloons float upward smoothly
- [x] Balloons auto-remove when reaching top
- [x] Pop counter tracks correctly
- [x] Phase transition occurs after target pops
- [x] "No" button dodges cursor without overlapping "Yes"
- [x] "No" button stays within viewport bounds
- [x] "No" button has cooldown to prevent jitter
- [x] Touch interactions work on mobile
- [x] Final scene shows both lines with proper timing
- [x] No memory leaks from intervals/timeouts

## 💡 Future Enhancements

- [ ] Sound effects for balloon pops
- [ ] Vibration feedback on mobile
- [ ] Share results to social media
- [ ] Multiple language support
- [ ] Custom messages
- [ ] Save state to localStorage

## 📄 License

This is a personal Valentine's Day project. Feel free to use it to ask someone special! 💕

---

Made with ❤️ and a lot of neon ✨
