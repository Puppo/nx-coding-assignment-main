import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { queryKeys } from '../../react-query/constants';

function addTicket(description: string) {
  try {
    return axios.post(`/api/tickets`, { description }).then((res) => {
      if (!(res.status >= 200 && res.status < 300))
        throw new Error('Failed to create ticket');
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

type UseAddTicket = UseMutateFunction<void, unknown, string, unknown>;

export function useAddTicket(): UseAddTicket {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate } = useMutation<void, unknown, string, unknown>(
    async (description) => {
      await addTicket(description);
    },
    {
      onSuccess: () => {
        enqueueSnackbar(`Ticket added`, { variant: 'success' });
        queryClient.invalidateQueries([queryKeys.tickets]);
      },
      onError: () => {
        enqueueSnackbar(`Ops... Problem on add ticket`, {
          variant: 'error',
        });
      },
    }
  );

  return mutate;
}
