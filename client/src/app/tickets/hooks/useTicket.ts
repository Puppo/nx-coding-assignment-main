import { Ticket } from '@acme/shared-models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryKeys } from '../../react-query/constants';

function fetchTicket(id: number): Promise<Ticket | null> {
  return axios.get(`/api/tickets/${id}`).then(async (res) => {
    if (res.status >= 200 && res.status < 300) return res.data;
    if (res.status === 404) return null;
    throw new Error('Failed to fetch ticket');
  });
}

interface UseTickets {
  ticket: Ticket | null;
  isLoading: boolean;
}

export function useTicket(id: number): UseTickets {
  const { data: ticket = null, isLoading } = useQuery(
    [queryKeys.tickets, id],
    () => fetchTicket(id)
  );

  return { ticket, isLoading };
}
