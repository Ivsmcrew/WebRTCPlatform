import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import CircularProgress from '@mui/material/CircularProgress'

interface Props {
  isMuted: boolean
  onBeforeRequest?: () => void
  onInit?: () => void
  onError?: (message: string) => void
}

export default function VideoPlayer({ isMuted, onBeforeRequest, onInit, onError }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [volume, setVolume] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    let audioContext: AudioContext | null = null
    let analyser: AnalyserNode | null = null
    let dataArray: Uint8Array | null = null
    let animationFrameId: number

    async function init() {
      try {
        onBeforeRequest?.()
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        if (cancelled) return

        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play().catch(() => {})
        }
        stream.getAudioTracks().forEach((t) => (t.enabled = !isMuted))
        onInit?.()
        setLoading(false) // видео готово

        // --- Setup microphone level indicator ---
        audioContext = new AudioContext()
        await audioContext.resume()
        const source = audioContext.createMediaStreamSource(stream)
        analyser = audioContext.createAnalyser()
        analyser.fftSize = 256
        source.connect(analyser)
        dataArray = new Uint8Array(analyser.fftSize)

    	const updateVolume = () => {
        if (!analyser || !dataArray) return
        analyser.getByteFrequencyData(dataArray)
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length
        setVolume(Math.min(1, (avg / 255) * 10)) // нормируем 0-1
        animationFrameId = requestAnimationFrame(updateVolume)
      }

        updateVolume()
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'getUserMedia error'
        onError?.(msg)
        setLoading(false)
      }
    }

    init()

    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
      if (videoRef.current) videoRef.current.srcObject = null
      if (audioContext) audioContext.close()
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  useEffect(() => {
    const stream = streamRef.current
    if (!stream) return
    stream.getAudioTracks().forEach((t) => (t.enabled = !isMuted))
  }, [isMuted])

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
				sx={{
					position: 'relative',
					width: '100%',
					maxWidth: 640,
					borderRadius: 2,
					aspectRatio: '16/9',
					backgroundColor: 'rgba(0,0,0,0.1)',
					overflow: 'hidden',
				}}
			>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={false}
          style={{ width: '100%', borderRadius: 2 }}
        />
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 2,
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        )}
      </Box>

      {/* Индикатор микрофона */}
      <Box sx={{ width: '50%', mt: 2 }}>
        <LinearProgress
          variant="determinate"
          value={isMuted ? 0 : volume * 100}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(0,0,0,0.1)',
            '& .MuiLinearProgress-bar': { backgroundColor: isMuted ? 'gray' : 'green' },
          }}
        />
      </Box>
    </Box>
  )
}
