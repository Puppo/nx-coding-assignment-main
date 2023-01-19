import { Ticket, User } from '@acme/shared-models';
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { queryKeys } from '../../react-query/constants';

function assignTicket(ticket: Ticket, user: User) {
  try {
    return axios
      .put(`/api/tickets/${ticket.id}/assign/${user.id}`)
      .then((res) => {
        if (!(res.status >= 200 && res.status < 300))
          throw new Error('Failed to assign ticket');
      });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

type UseAssignTicket = UseMutateFunction<
  void,
  unknown,
  { user: User; ticket: Ticket },
  unknown
>;

export function useAssignTicket(): UseAssignTicket {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate } = useMutation<
    void,
    unknown,
    { user: User; ticket: Ticket },
    unknown
  >(
    async ({ user, ticket }) => {
      await assignTicket(ticket, user);
    },
    {
      onSuccess: () => {
        enqueueSnackbar(`Ticket assigned`, { variant: 'success' });
        queryClient.invalidateQueries([queryKeys.tickets]);
        queryClient.invalidateQueries([queryKeys.ticket]);
      },
      onError: () => {
        enqueueSnackbar(`Ops... Problem on assign ticket`, {
          variant: 'error',
        });
      },
    }
  );

  return mutate;
}
