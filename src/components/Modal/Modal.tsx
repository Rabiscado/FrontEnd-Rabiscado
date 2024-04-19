import { AppButton } from "@components/Button";
import { Modal as MuiModal, Box, Typography } from "@mui/material";

export type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  onClick: () => void;
  hideButton?: boolean;
  disabledButton?: boolean;
};

export const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  onClick,
  width = "80%",
  hideButton = false,
  disabledButton = false,
}: ModalProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,
    bgcolor: "background.paper",
    maxHeight: "95vh",
    overflowY: "auto",
    borderRadius: "1rem",
    boxShadow: 24,
    p: 2,
    "@media (max-width: 768px)": {
      width: "90%",
      top: "30%",
    },
  };

  return (
    <MuiModal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Box sx={style}>
          <div className="flex justify-center items-center w-full mb-8">
            <Typography
              sx={{
                color: (theme) => theme.palette.secondary.main,
                fontWeight: 600,
                fontSize: "1.5rem",
                mb: 2,
              }}
            >
              {title}
            </Typography>
          </div>
          {children}
          {
            !hideButton && <Box display="flex" width="100%" justifyContent="right" gap="0.5rem">
            <AppButton
              onClick={() => onClick()}
              title="Confirmar"
              buttonVariant="primary"
              disabled={disabledButton}
            />
          </Box>}
        </Box>
      </>
    </MuiModal>
  );
};
