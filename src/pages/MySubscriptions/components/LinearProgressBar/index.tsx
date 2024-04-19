import {
  Box,
  LinearProgress,
  LinearProgressProps, 
} from "@mui/material"; 

export default function Index(
  props: LinearProgressProps
) { 

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: '100%' }}>
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" {...props} 
          sx={{
            borderRadius: 10,
            height: '8px', 
            backgroundColor: '#EEE8FA'
          }}
          color='secondary'
          
        />
      </Box> 
    </Box>
  );
}
