import { Ticket } from '@acme/shared-models';
import { Box, FormControl, InputLabel, List, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useUsers } from '../users/hooks/useUsers';
import { useTickets } from './hooks/useTickets';
import { useToggleCompleteStatusTicket } from './hooks/useToggleCompleteStatusTicket';
import TicketItem from './TicketItem';

export function Tickets() {
  const { tickets, setAssignee } = useTickets();
  const { users } = useUsers();
  const toggleCompleteMutation = useToggleCompleteStatusTicket();

  function toggleCompleteStatus(ticket: Ticket): void {
    toggleCompleteMutation(ticket);
  }

  function setFilter(e: SelectChangeEvent<number | null>): void {
    const value = typeof e.target.value === 'number' ? e.target.value : 0;
    setAssignee(value);
  }

  return (<>
    <Box textAlign='center'>
      <Typography variant='h3'>Tickets</Typography>
    </Box>
    <Box sx={{
      margin: '0 auto',
      width: '500px',
    }}>
      <Box component="form" textAlign='center'>
        <FormControl fullWidth margin='normal'>
          <InputLabel id="assigneeFilter">Search by Assignee</InputLabel>
          <Select
            labelId="assigneeFilter"
            id="assigneeFilterId"
            label="Search by Assignee"
            defaultValue={-1}
            onChange={setFilter}
          >
            <MenuItem key={0} value={-1}>-</MenuItem>
            {users.map(u => <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <List>
          {tickets.map((t) => (
            <NavLink key={t.id} to={`${t.id}`}>
              <TicketItem
                ticket={t}
                toggleCompleteStatus={() => toggleCompleteStatus(t)} />
            </NavLink>
          ))}
        </List>
      </Box>
    </Box>
  </>
  );
}

export default Tickets;

