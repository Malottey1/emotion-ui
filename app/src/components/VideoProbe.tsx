// app/src/components/VideoProbe.tsx
import { useEffect, useRef } from 'react'

export default function VideoProbe({ onEmotion }: { onEmotion:(e:any)=>void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      if (videoRef.current) videoRef.current.srcObject = stream
      const ws = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws/frames')
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const push = () => {
        if (!videoRef.current || videoRef.current.readyState < 2) return
        const v = videoRef.current
        canvas.width = 224; canvas.height = 224
        ctx.drawImage(v, 0, 0, 224, 224)
        const data = canvas.toDataURL('image/jpeg', 0.6)
        if (ws.readyState === 1) ws.send(data)
      }
      const id = setInterval(push, 200)
      ws.onmessage = (m) => onEmotion(JSON.parse(m.data))
      return () => { clearInterval(id); ws.close() }
    })()
  }, [])
  return <video ref={videoRef} autoPlay playsInline className="rounded-2xl w-64 h-48 object-cover" />
}