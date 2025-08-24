import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import type { Task } from '../types/types'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'


interface Props {
tasks: Task[]
}


export default function TaskTable({ tasks }: Props) {
return (
<TableContainer component={Paper}>
<Table size="small" aria-label="tasks table">
<TableHead>
<TableRow>
<TableCell>ID</TableCell>
<TableCell>Title</TableCell>
<TableCell>Status</TableCell>
<TableCell align="right">Action</TableCell>
</TableRow>
</TableHead>
<TableBody>
{tasks.map((t) => (
<TableRow key={t.id} hover>
<TableCell>{t.id}</TableCell>
<TableCell>{t.title}</TableCell>
<TableCell>
<Chip
label={t.status}
color={t.status === 'done' ? 'success' : 'warning'}
size="small"
/>
</TableCell>
<TableCell align="right">
<Button
variant="contained"
component={RouterLink}
to={`/room/${t.id}`}
>
В комнату
</Button>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</TableContainer>
)
}