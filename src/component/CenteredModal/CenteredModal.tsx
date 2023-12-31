import { Box, Modal, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

export type CenteredModalProps = {
  open: boolean;

  handleClose: () => void;

  sx?: SxProps<Theme>

  children: ReactNode;
}

export default function CenteredModal({ open, handleClose, sx, children }: CenteredModalProps) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
      sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
      borderRadius: "5px",
      maxWidth: 'calc(100vw - 40px)', // Subtract 40px from total width
      maxHeight: 'calc(100vh - 40px)', // Subtract 40px from total height
      padding: 0,
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      outline: 'none',
      ...sx
      }}
      >
      {children}
      </Box>

    </Modal>
  )
}