import { Box, CircularProgress } from '@mui/material';

export const Loading: React.FC = () => { 
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "rgba(255, 255, 255, 0.5)",
        zIndex: 4,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <CircularProgress
        size={200}
        thickness={2}
      />
    </Box>
  );
  };