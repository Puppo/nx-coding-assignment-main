import { Box, Button, FormControl, Grid, TextField } from '@mui/material';
import React from 'react';
import { useAddTicket } from '../hooks/useAddTicket';

export default function AddTicket() {
  const addTicketMutation = useAddTicket();

  function onAddSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    const description = form.elements.namedItem('description') as HTMLInputElement;
    if (!description) return;

    addTicketMutation(description.value);

    description.value = '';
  }

  return (
    <Box component="form" aria-label="form" margin={'20px 0'} onSubmit={onAddSubmit}>
      <Grid container>
        <Grid item flex={1}>
          <FormControl fullWidth>
            <TextField
              required
              autoComplete='off'
              id="description"
              name='description'
              label="Add new Ticket"
            />
          </FormControl>
        </Grid>

        <Grid item alignItems="stretch" style={{ display: "flex" }}>
          <Button variant='outlined' type='submit'>Add</Button>
        </Grid>
      </Grid>
    </Box>
  )
}
