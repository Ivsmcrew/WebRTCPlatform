import { Box, LinearProgress } from "@mui/material";

interface Props {
	volume: number
	isMuted: boolean
}

/**
 * Индикатор громкости
 */
export default function VolumeIndicator({ volume, isMuted }: Props) {
	return (
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
	)
}