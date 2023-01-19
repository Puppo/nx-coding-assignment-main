import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useUsers } from '../users/hooks/useUsers';
import { useAssignTicket } from './hooks/useAssignTicket';
import { useTicket } from './hooks/useTicket';
import { useToggleCompleteStatusTicket } from './hooks/useToggleCompleteStatusTicket';

export function TicketDetail() {
  const { id } = useParams();
  const { users } = useUsers();

  const { ticket, isLoading } = useTicket(parseInt(id!, 10));

  const assignUserMutation = useAssignTicket();
  const toggleCompleteMutation = useToggleCompleteStatusTicket();

  function toggleCompleteStatus(): void {
    if (!ticket) return;
    toggleCompleteMutation(ticket);
  }

  function assignUser(e: SelectChangeEvent<number | null>): void {
    if (!ticket) return;
    const user = users.find(u => u.id === e.target.value);
    if (!user) return;
    assignUserMutation({ ticket, user });
  }

  return isLoading ? null : (<>
    <Box textAlign='center'>
      <Typography variant='h3'>Ticket {ticket?.id}</Typography>
    </Box>
    <Box
      component="form"
      sx={{
        margin: '0 auto',
        width: '500px',
      }}
    >

      <div>
        <FormControl fullWidth margin='normal'>
          <TextField
            required
            disabled
            label="Description"
            value={ticket?.description}
          />
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <InputLabel id="assignee">Assignee</InputLabel>
          <Select
            labelId="assignee"
            id="assigneeId"
            defaultValue={ticket?.assigneeId}
            label="Assignee"
            onChange={assignUser}
          >
            <MenuItem key={''} value={''}>-</MenuItem>
            {users.map(u => <MenuItem key={u.id} value={u.id} selected={u.id === ticket?.assigneeId}>{u.name}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControlLabel control={<Checkbox defaultChecked={ticket?.completed} onChange={toggleCompleteStatus} />} label="Complete" />
      </div>

    </Box>
  </>
  );
}

export default TicketDetail;

