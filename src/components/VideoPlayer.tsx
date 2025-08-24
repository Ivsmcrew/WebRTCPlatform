import * as React from 'react'
import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'


interface Props {
isMuted: boolean
onBeforeRequest?: () => void
onInit?: () => void
onError?: (message: string) => void
}


export default function VideoPlayer({ isMuted, onBeforeRequest, onInit, onError }: Props) {
const videoRef = useRef<HTMLVideoElement | null>(null)
const streamRef = useRef<MediaStream | null>(null)


// Request camera/mic on mount
useEffect(() => {
let cancelled = false
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
// apply initial mute state
stream.getAudioTracks().forEach((t) => (t.enabled = !isMuted))
onInit?.()
} catch (e) {
const msg = e instanceof Error ? e.message : 'getUserMedia error'
onError?.(msg)
}
}
init()
return () => {
cancelled = true
// cleanup tracks
streamRef.current?.getTracks().forEach((t) => t.stop())
streamRef.current = null
if (videoRef.current) {
videoRef.current.srcObject = null
}
}
}, [])


// Sync mute state with audio tracks
useEffect(() => {
const stream = streamRef.current
if (!stream) return
stream.getAudioTracks().forEach((t) => (t.enabled = !isMuted))
}, [isMuted])


return (
<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
<video
ref={videoRef}
autoPlay
playsInline
muted={false} // слышим себя, если дорожка не выключена
style={{ width: '100%,', maxWidth: 640, borderRadius: 12 }}
/>
</Box>
)
}