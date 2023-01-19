import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import { Route, Routes } from 'react-router-dom';

import { queryClient } from './react-query/queryClient';
import TicketDetail from './tickets/TicketDetail';
import Tickets from './tickets/Tickets';

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3}>
          <Box>
            <Typography variant='h1'>Ticketing App</Typography>
          </Box>

          <Routes>
            <Route path="/" element={<Tickets />} />
            {/* Hint: Try `npx nx g component TicketDetails --no-export` to generate this component  */}
            <Route path="/:id" element={<TicketDetail />} />
          </Routes>
          <ReactQueryDevtools />
        </SnackbarProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
