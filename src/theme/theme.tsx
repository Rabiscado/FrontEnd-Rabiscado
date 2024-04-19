import { createTheme } from '@mui/material';


const theme = createTheme({
  palette: {
    primary: {
      main: "#F5006A",
    },
    secondary: {
      main: "#380478",
      light: "#EEE8FA"
    },
    text: {
      primary: "#030303",
      secondary: "#A29DB1",
    },
    grey: {

    },
    
  },
  typography: {
    fontFamily: "Segoe UI, sans-serif",
    fontSize: 16,
    allVariants: {
      color: "#8070af",
    },
  },
 
});

export default theme;
