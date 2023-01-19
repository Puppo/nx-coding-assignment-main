import { Ticket } from '@acme/shared-models';
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { queryKeys } from '../../react-query/constants';

function completeTicket(ticket: Ticket) {
  return axios.put(`/api/tickets/${ticket.id}/complete`).then((res) => {
    if (!(res.status >= 200 && res.status < 300))
      throw new Error('Failed to complete ticket');
  });
}

function incompleteTicket(ticket: Ticket) {
  return axios.delete(`/api/tickets/${ticket.id}/complete`).then((res) => {
    if (!(res.status >= 200 && res.status < 300))
      throw new Error('Failed to incomplete ticket');
  });
}

export function useToggleCompleteStatusTicket(): UseMutateFunction<
  boolean,
  unknown,
  Ticket,
  unknown
> {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate } = useMutation<boolean, unknown, Ticket, unknown>(
    async (ticket) => {
      if (!ticket.completed && !ticket.assigneeId)
        throw new Error('Ticket must have an assignee');

      if (ticket.completed) await incompleteTicket(ticket);
      else await completeTicket(ticket);
      return !ticket.completed;
    },
    {
      onSuccess: (status) => {
        const message = status ? 'Completed' : 'Incomplete';
        enqueueSnackbar(`Ticket set ${message} `, { variant: 'success' });
        queryClient.invalidateQueries([queryKeys.tickets]);
        queryClient.invalidateQueries([queryKeys.ticket]);
      },
      onError: () => {
        enqueueSnackbar('Ops... Problem on toggle status ticket!', {
          variant: 'error',
        });
      },
    }
  );

  return mutate;
}
