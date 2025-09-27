import useDialogState from '@/hooks/use-dialog-state';
import React, { useMemo, useState } from 'react';
import { User } from '../data/schema';

type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete';

interface UsersContextType {
    open: UsersDialogType | null;
    setOpen: (str: UsersDialogType | null) => void;
    currentRow: User | null;
    setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>;
    shouldReload: boolean;
    setShouldReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsersContext = React.createContext<UsersContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export default function UsersProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<UsersDialogType>(null);
    const [currentRow, setCurrentRow] = useState<User | null>(null);
    const [shouldReload, setShouldReload] = useState(false);
    const value = useMemo(
        () => ({
            open,
            setOpen,
            currentRow,
            setCurrentRow,
            shouldReload,
            setShouldReload,
        }),
        [open, currentRow, shouldReload]
    );

    return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUsers = () => {
    const usersContext = React.useContext(UsersContext);

    if (!usersContext) {
        throw new Error('useUsers has to be used within <UsersContext>');
    }

    return usersContext;
};
