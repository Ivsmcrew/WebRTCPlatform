import { Link as RouterLink } from 'react-router-dom'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

import type { Task } from '../types/types'

const TEXT = {
	ID: 'ID',
	TITLE: 'Title',
	STATUS: 'Status',
	ACTION: 'Action',
	BUTTON_TEXT: 'В комнату',
}

interface Props {
	tasks: Task[]
}

/**
 * Таблица задач
 */
export default function TaskTable({ tasks }: Props) {
	return (
		<TableContainer component={Paper}>
			<Table size="small" aria-label="tasks table">
				<TableHead>
					<TableRow>
						<TableCell>{TEXT.ID}</TableCell>
						<TableCell>{TEXT.TITLE}</TableCell>
						<TableCell>{TEXT.STATUS}</TableCell>
						<TableCell align="right">{TEXT.ACTION}</TableCell>
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
									{TEXT.BUTTON_TEXT}
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}