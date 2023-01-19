import { Ticket } from '@acme/shared-models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { queryKeys } from '../../react-query/constants';

function fetchTickets(): Promise<Ticket[]> {
  return axios('/api/tickets').then((res) => {
    if (res.status >= 200 && res.status < 300) return res.data;
    throw new Error('Failed to fetch tickets');
  });
}

interface UseTickets {
  tickets: Ticket[];
  setAssignee: Dispatch<SetStateAction<number>>;
}

export function useTickets(): UseTickets {
  const [assignee, setAssignee] = useState<number>(-1);

  const filterByAssignee = useCallback(
    (tickets: Ticket[]) => {
      return tickets.filter((ticket) => ticket.assigneeId === assignee);
    },
    [assignee]
  );

  const { data: tickets = [] } = useQuery([queryKeys.tickets], fetchTickets, {
    select: assignee === -1 ? undefined : filterByAssignee,
  });

  return { tickets, setAssignee };
}
