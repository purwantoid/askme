import React, {useState} from 'react'
import {Role} from "@/pages/roles/data/schema";
import useDialogState from "@/hooks/use-dialog-state";

type RolesDialogType = 'create' | 'edit' | 'delete';

interface RolesContextType {
    open: RolesDialogType | null;
    setOpen: (open: RolesDialogType | null) => void;
    currentRow: Role | null;
    setCurrentRow: React.Dispatch<React.SetStateAction<Role | null>>;
}

const RolesContext = React.createContext<RolesContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export default function RolesProvider({children}: Props) {
    const [open, setOpen] = useDialogState<RolesDialogType>(null);
    const [currentRow, setCurrentRow] = useState<Role | null>(null);
    return (
        <RolesContext.Provider value={{open, setOpen, currentRow, setCurrentRow}}>
            {children}
        </RolesContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRoles = () => {
    const context = React.useContext(RolesContext);
    if (!context) {
        throw new Error('useRoles must be used within a RolesProvider');
    }
    return context;
}