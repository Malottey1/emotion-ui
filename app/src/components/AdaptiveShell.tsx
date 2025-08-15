// app/src/components/AdaptiveShell.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import VideoProbe from './VideoProbe'
import { moodToTheme } from '../state/emotionMachine'

export default function AdaptiveShell(){
  const [mood, setMood] = useState('neutral')
  return (
    <div className={`min-h-screen transition-colors ${moodToTheme(mood as any)} p-6`}>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">Emotion‑Adaptive UI</h1>
        <VideoProbe onEmotion={(e)=> setMood(e.label)} />
        <motion.div animate={{ scale: mood==='joy'?1.02:1 }} className="p-4 rounded-2xl shadow bg-white/70 backdrop-blur">
          <p className="text-lg">
            {mood==='sad' ? 'Hey, want to slow down? I’m here to help.' :
             mood==='angry' ? 'Let’s keep it crisp. What do you need?' :
             mood==='joy' ? 'Love the energy! What’s next?' :
             'How can I assist today?'}
          </p>
        </motion.div>
      </div>
    </div>
  )
}