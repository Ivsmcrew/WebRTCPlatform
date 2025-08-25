import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
	return (
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
	)
}