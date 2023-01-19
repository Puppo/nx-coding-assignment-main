import { User } from "@acme/shared-models";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { queryKeys } from "../../react-query/constants";

interface UseUser {
  users: User[];
}

function fetchUsers() {
  return axios.get('/api/users').then((res) => {
    if (res.status === 200)
      return res.data;

    throw new Error('Error fetching users');
  });
}

export function useUsers(): UseUser {
  const { data: users = [] } = useQuery<User[]>([queryKeys.users], fetchUsers);

  return { users };
}