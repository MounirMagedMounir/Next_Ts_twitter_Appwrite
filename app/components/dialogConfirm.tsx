import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React, { useState } from "react";

function dialogConfirm({buttonContent,dialogtitle ,continuebuttonhref }: { buttonContent:any,dialogtitle:any,continuebuttonhref:any }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    return (
      <>
        <Button  color="error" onClick={handleClickOpen}>
        
        {  buttonContent}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
           
            {dialogtitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              press continue
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>cansel</Button>
            <Button
              href={continuebuttonhref}
              autoFocus
            >
              continue
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );

}

export default dialogConfirm