import { AppButton } from "@components/Button";
import { UseMobile } from "@context/mobileContext";
import { Box, Modal, Stack, Typography } from "@mui/material";

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export const AlertModal = ({ isOpen, onClose, title }: AlertModalProps) => {
  const {isMobile} = UseMobile();
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width:isMobile? "90vw" : "20vw"
        }}
      >
        <Stack sx={{ textAlign: "center" }} gap={4}>
          <Typography variant="h5" sx={{fontWeight:"600"}}>{title}</Typography>
          <AppButton buttonVariant="primary" title="Fechar" onClick={onClose} />
        </Stack>
      </Box>
    </Modal>
  );
};
