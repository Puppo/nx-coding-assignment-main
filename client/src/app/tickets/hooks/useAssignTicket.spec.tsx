import { Ticket, User } from '@acme/shared-models';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react-hooks';
import nock from 'nock';
import { SnackbarProvider } from 'notistack';
import { useAssignTicket } from './useAssignTicket';

const queryClient = new QueryClient();
const wrapper = ({ children }: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <SnackbarProvider maxSnack={3}>
      {children}
    </SnackbarProvider>
  </QueryClientProvider>
);

describe('useAssignTicket', () => {
  const ticket: Ticket = {
    id: 1,
    description: 'test',
    completed: false,
    assigneeId: 1,
  };

  const user: User = {
    id: 3,
    name: 'test',
  }

  it('should return ticket', async () => {
    const spyRequest = jest.fn();
    nock('http://localhost')
      .put(`/api/tickets/${ticket.id}/assign/${user.id}`)
      .reply(204, () => {
        spyRequest();
      });

    const { result, waitFor } = renderHook(() => useAssignTicket(), { wrapper });

    result.current({ ticket, user });

    await waitFor(() => spyRequest.mock.calls.length === 1);
  });
});

