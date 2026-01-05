import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

export default function ConfirmationDialog({ 
    open, 
    onClose, 
    onConfirm, 
    title = 'Are you sure?', 
    message = 'This action cannot be undone', 
    confirmText = 'Ok', 
    cancelText = 'Cancel', 
    confirmColor = 'primary' 
}){
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} color={confirmColor} variant='contained'>
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
