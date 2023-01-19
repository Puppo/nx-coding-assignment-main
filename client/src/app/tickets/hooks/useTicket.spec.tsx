import { Ticket } from '@acme/shared-models';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react-hooks';
import nock from 'nock';
import { useTicket } from './useTicket';

const queryClient = new QueryClient();
const wrapper = ({ children }: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useTicket', () => {
  const ticket: Ticket = {
    id: 1,
    description: 'test',
    completed: false,
    assigneeId: 1,
  };

  it('should return ticket', async () => {
    nock('http://localhost')
      .get('/api/tickets/1')
      .reply(200, ticket);

    const { result, waitFor } = renderHook(() => useTicket(ticket.id), { wrapper });

    await waitFor(() => !!result.current.ticket);

    expect(result.current.ticket).toEqual(ticket);

  });
});

