import { Box, Stack, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export const HelpCenter = () => {
  return (
    <Box
      sx={{ 
        padding: "1rem",
        pt: "2rem",
      }}
    >
      <Typography
        sx={{
          fontSize: "2rem",
          fontWeight: "600",
          color: "#380478",
        }}
      >
        Central de ajuda
      </Typography>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: ".3rem",
          width: "fit-content",
          mt: "1rem",
          cursor: "pointer",
        }}
      >
        <FileDownloadIcon
          sx={{
            color: "#F5006A",
          }}
        />
        <Typography
          sx={{
            color: "#F5006A",
            fontWeight: "700",
            textDecoration: "underline",
          }}
        >
          Baixar PDF
        </Typography>
      </Stack>
    </Box>
  );
};
