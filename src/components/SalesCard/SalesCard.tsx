import { Box } from '@mui/material';

const Card= ({children}: {children: React.ReactNode}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: "1.25rem",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: "#380478",
        borderRadius: ".875rem",
        '*': { color: "#FFFFFF !important" }

      }}
    >
      {children}
    </Box>
  );
}

const SalesCardTitle = ({children}: {children: React.ReactNode}) => {
  return (
    <Box
      sx={{
        fontSize: "1.5rem",
        fontWeight: 600,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}

const SalesCardContent = ({children}: {children: React.ReactNode}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {children}
    </Box>
  );
}

const SalesCardFooter = ({children}: {children: React.ReactNode}) => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {children}
    </Box>
  );
}

export const SalesCard = {
  Box: Card,
  Title: SalesCardTitle,
  Content: SalesCardContent,
  Footer: SalesCardFooter,
} 
