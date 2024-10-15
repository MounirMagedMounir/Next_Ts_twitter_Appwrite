import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@mui/material";
  import React, { useState } from "react";
  
  function dialogalert({
    continueclick,
    canselclick,
    opendialog,
    triggerbutton,
    buttonContent,
    dialogtitle,
    continuebuttonhref,
  }: {
    continueclick: any;
    canselclick: any;
    opendialog: boolean;
    triggerbutton: boolean;
    buttonContent: any;
    dialogtitle: any;
    continuebuttonhref: any;
  }) {
    const [open, setOpen] = useState(true);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    return (
      <>
       
        <Dialog
          open={ open&&opendialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{dialogtitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              press continue
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                canselclick();
              }}
            >
              cansel
            </Button>
            <Button
              href={continuebuttonhref}
              onClick={() => {
                handleClose();
                continueclick();
              }}
              autoFocus
            >
              continue
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  
  export default dialogalert;
  