import Dialog from "@mui/material/Dialog";
import { Box, DialogActions, DialogTitle, Stack, Typography } from "@mui/material";
import { AppButton } from "@components/Button";

type DialogProps = {
  title: string;
  onConfirm: () => void;
  isOpen: boolean;
  onClose: () => void;
  onConfirmText?: string;
  onCloseText?: string;
  hideCloseButton?: boolean
};
export const AppDialog = ({
  title,
  onConfirm,
  isOpen,
  onClose,
  onConfirmText = "Sim",
  onCloseText = "Não",
  hideCloseButton = false
}: DialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}
      sx={{
        '.MuiPaper-root': {
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }
      }}
    >
      <DialogTitle
        sx={{
          width: "100%",
          padding: 0,
        }}
      >
        <Typography variant="h6"
          sx={{
            color: theme => theme.palette.secondary.main,
            fontWeight: 600,
            fontSize: "2rem",
            '@media (max-width: 768px)': {
              fontSize: '20px'
            }
          }}
        >{title}</Typography>
        </DialogTitle>
      <DialogActions
        sx={{
          padding: 0
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: "1rem",
          }}
        >
         {!hideCloseButton && <Stack
            sx={{
              width: '100%'
            }}
          >
            <AppButton title={onCloseText} onClick={onClose} buttonVariant="secondary" />
          </Stack>}
          <Stack
            sx={{
              width: '100%'
            }}
          >
            <AppButton title={onConfirmText} onClick={onConfirm} buttonVariant="primary" />
          </Stack>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
