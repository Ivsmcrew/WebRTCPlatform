import { Link } from "react-router-dom";

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const TEXTS = {
	ERROR_CODE: "404",
	ERROR_MESSAGE: "Oops! Page not found",
	BUTTON_TEXT: "Go to tasks page",
} as const

/**
 * Страница 404
 */
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
        {TEXTS.ERROR_CODE}
      </Typography>
      <Typography variant="h5" color="text.secondary">
				{TEXTS.ERROR_MESSAGE}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/tasks"
        sx={{ mt: 2 }}
      >
				{TEXTS.BUTTON_TEXT}
      </Button>
    </Box>
	)
}