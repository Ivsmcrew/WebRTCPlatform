import { Link } from "react-router-dom";

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default function NotFoundPage() {
	return(
		<Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      textAlign="center"
      gap={2}
    >
      <Typography variant="h2" color="error" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Oops! Page not found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/tasks"
        sx={{ mt: 2 }}
      >
        Go to tasks page
      </Button>
    </Box>
	)
}