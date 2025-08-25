import Box from '@mui/material/Box'

import { useVideoStream } from './hooks/useVideoStream'
import VolumeIndicator from './components/VolumeIndicator'
import Loader from './components/Loader'

interface Props {
  isMuted: boolean
  onBeforeRequest?: () => void
  onInit?: () => void
  onError?: (message: string) => void
}

export default function VideoPlayer({ isMuted, onBeforeRequest, onInit, onError }: Props) {
  const { videoRef, volume, isLoading } = useVideoStream({ isMuted, onBeforeRequest, onInit, onError })

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
        {isLoading && <Loader />}
      </Box>

			<VolumeIndicator
				volume={volume}
				isMuted={isMuted}
			/>
    </Box>
  )
}
