import useDialogState from '@/hooks/use-dialog-state';
import { Priority } from '@/pages/administration/priority/data/schema';
import React, { useMemo, useState } from 'react';

type PriorityDialogType = 'create' | 'edit' | 'delete';

interface PriorityContextType {
    open: PriorityDialogType | null;
    setOpen: (open: PriorityDialogType | null) => void;
    currentRow: Priority | null;
    setCurrentRow: React.Dispatch<React.SetStateAction<Priority | null>>;
    shouldReload: boolean;
    setShouldReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const PriorityContext = React.createContext<PriorityContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export default function PriorityProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<PriorityDialogType>(null);
    const [currentRow, setCurrentRow] = useState<Priority | null>(null);
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
    return <PriorityContext.Provider value={value}>{children}</PriorityContext.Provider>;
}

export const usePriorities = () => {
    const context = React.useContext(PriorityContext);
    if (context === null) {
        throw new Error('usePriority must be used within a PriorityProvider');
    }
    return context;
};
