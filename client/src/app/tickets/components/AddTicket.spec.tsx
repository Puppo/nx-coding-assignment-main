
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import AddTicket from './AddTicket';

const mockedMutate = jest.fn();

jest.mock('../hooks/useAddTicket', () => {
  return {
    useAddTicket: () => {
      return mockedMutate;
    }
  }
})

const queryClient = new QueryClient();
const wrapper = ({ children }: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <SnackbarProvider maxSnack={3}>
      {children}
    </SnackbarProvider>
  </QueryClientProvider>
);

describe('AddTicket', () => {

  function renderComponent() {
    return render(<AddTicket />, { wrapper });
  }

  it('should render', () => {
    renderComponent();

    expect(screen.findAllByText('Add new Ticket')).toBeTruthy();
  });

  it('should add ticket', () => {
    renderComponent();

    const button = screen.getByRole('button');
    const input = screen.getByRole<HTMLInputElement>('textbox');

    input.value = 'test';
    button.click();

    expect(mockedMutate.mock.calls.length).toBe(1)

  });

})