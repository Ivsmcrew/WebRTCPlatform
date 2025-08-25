import { useEffect, useRef, useState } from 'react'
import { getAverageVolume } from '../utils/utils'

interface UseVideoStreamProps {
  isMuted: boolean
  onBeforeRequest?: () => void
  onInit?: () => void
  onError?: (message: string) => void
}

export function useVideoStream({ isMuted, onBeforeRequest, onInit, onError }: UseVideoStreamProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [volume, setVolume] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

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
        setIsLoading(false)

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
          const avg = getAverageVolume(dataArray)
          setVolume(avg)
          animationFrameId = requestAnimationFrame(updateVolume)
        }

        updateVolume()
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'getUserMedia error'
        onError?.(msg)
        setIsLoading(false)
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

  return { videoRef, volume, isLoading }
}
