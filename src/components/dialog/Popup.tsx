import { Dialog, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { FC, ReactNode } from "react";

interface PopupProps {
    isOpen: boolean,
    onClose: () => void;
    title: string;
    maxWidth: "lg" | "md" | "sm" | "xl" | "xs" ;
    fullWidth?: boolean;
    children: ReactNode;
}

const Popup: FC<PopupProps> = ({ isOpen, onClose, title, maxWidth, fullWidth = false, children }) => {

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            className='z-99999'
        >
            <DialogTitle>{title}</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>
            {children}
        </Dialog>
    )

}

export default Popup;