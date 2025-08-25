import { Outlet } from 'react-router-dom'

import { AppBar, Toolbar, Typography, Container } from '@mui/material'

const HEADER_TITLE = 'Tasks & Video Room'

/**
 * Основной каркас приложения
 */
export default function MainLayout() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {HEADER_TITLE}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </>
  )
}