import { UserContext } from '@context/UserContext/Index';
import { useContext } from 'react';

export const useUser = () => useContext(UserContext)