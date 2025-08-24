// src/pages/VideoRoomPage.tsx
import * as React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import VideoPlayer from '../components/VideoPlayer'

export default function VideoRoomPage() {
  const { id } = useParams<{ id: string }>()
  const [isMuted, setIsMuted] = useState(false)

  return (
    <Stack spacing={3} alignItems="center">
      <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
        <Button component={Link} to="/tasks" startIcon={<ArrowBackIcon />}>
          Назад
        </Button>
        <Typography variant="h5">Видео-комната задачи #{id}</Typography>
      </Stack>

      <VideoPlayer
        isMuted={isMuted}
        onBeforeRequest={() => console.log('Запрашиваем доступ к камере/микрофону...')}
        onInit={() => console.log('Поток инициализирован')}
        onError={(msg) => console.error('Ошибка:', msg)}
      />

      <Button
        variant="contained"
        color={isMuted ? 'error' : 'primary'}
        onClick={() => setIsMuted((prev) => !prev)}
      >
        {isMuted ? 'Включить микрофон' : 'Выключить микрофон'}
      </Button>
    </Stack>
  )
}
