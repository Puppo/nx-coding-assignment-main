import { Ticket } from "@acme/shared-models";
import CheckIcon from '@mui/icons-material/Check';
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useUsers } from "../../users/hooks/useUsers";


interface TicketItemProps {
  ticket: Ticket
  toggleCompleteStatus(): void
}

export default function TicketItem(props: TicketItemProps) {
  const { users } = useUsers();
  const user = users.find(u => u.id === props.ticket.assigneeId);

  function onCompleteStatusClick(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    props.toggleCompleteStatus();
  }

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText
          primary={props.ticket.description}
          secondary={user?.name || props.ticket.assigneeId}
        />
        <CheckIcon
          onClick={onCompleteStatusClick}
          color={props.ticket.completed ? 'primary' : 'disabled'} />
      </ListItemButton>
    </ListItem>
  )
}
