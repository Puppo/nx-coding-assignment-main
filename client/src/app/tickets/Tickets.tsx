import { Box, Typography } from '@mui/material';
import AddTicket from './components/AddTicket';
import TicketList from './components/TicketList';

export function Tickets() {
  return (<>
    <Box textAlign='center'>
      <Typography variant='h3'>Tickets</Typography>
    </Box>
    <Box sx={{
      margin: '0 auto',
      width: '500px',
    }}>

      <AddTicket />

      <TicketList />
    </Box>
  </>
  );
}

export default Tickets;

