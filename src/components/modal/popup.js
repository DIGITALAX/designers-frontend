import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

function PopupModal(props) {
  const { open, handleClose, children } = props;
  console.log(open)


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: "bg-black outline rounded-lg border-2 border-black w-485" }}
    >
      <div style={{ backgroundColor: 'black' }}>
        <p className="text-right text-gray-50 absolute r-2 cursor-pointer" onClick={() => handleClose()}>x</p>
        <DialogContent className="mt-2">
            { children }
        </DialogContent>
      </div>
    </Dialog>
  );
}

export default PopupModal;
