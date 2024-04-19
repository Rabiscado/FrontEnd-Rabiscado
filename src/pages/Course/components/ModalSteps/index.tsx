import { Box, Dialog } from "@mui/material";

export default function Index({
  handleClose,
  open,
  src
}: {
  handleClose: () => void;
  open: boolean;
  src: string;
}) {
  return (
    <Dialog onClose={handleClose} open={open}
      fullWidth
      maxWidth="lg"
      sx={{
        ".MuiDialog-paper": {
          borderRadius: "20px",
          backgroundColor: "#00000000",
          boxShadow: "none",
        }
      }}
    >
      <Box
        sx={{ 
          width: "100%",
          height: "100%",
          maxHeight: "80vh", 
          backgroundColor: "#fff", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center", 
        }}
      >
        <img
          style={{   objectFit: "fill",
            width: "100%",
            height: "90%",
            maxHeight: "80vh",
        }}
          src={src}
          alt="Imagem do curso"
        />
      </Box>
    </Dialog>
  );
}
