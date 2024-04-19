import { Stack } from "@mui/material";
import { ButtonProps as MUIButtonProps } from "@mui/material/Button";
import { Button } from "@mui/material";

interface ButtonProps extends MUIButtonProps {
  title: string;
  buttonVariant: "primary" | "secondary";
}

export const AppButton = ({ title, buttonVariant, ...rest }: ButtonProps) => {
  return (
    <Stack sx={{ height: "58px", ...rest.sx }}>
      <Button
        variant="text"
        {...rest}
        sx={{
          textTransform: "none",
          height: "58px",
          backgroundColor: buttonVariant == "primary" ? "#F5006A" : "#fff",
          color: buttonVariant == "primary" ? "#fff" : "#F5006A",
          border: buttonVariant == "primary" ? "none" : "1px solid #F5006A",
          outline: "none",
          borderRadius: "8px",
          fontWeight: 700,
          whiteSpace: 'nowrap',
          fontSize: '1.25rem',
          padding: "0 1.5rem",
          "&:hover": {
            backgroundColor: buttonVariant == "primary" ? "#F5006A" : "#fff",
            color: buttonVariant == "primary" ? "#fff" : "#F5006A",
            border: buttonVariant == "primary" ? "none" : "1px solid #F5006A",
            filter: "brightness(1.1)",
          },
          "&:disabled": {
            backgroundColor: "#EEE8FA",
            color: "#A29DB1",
          },
          ...rest.sx,
        }}
      >
        {title}
      </Button>
    </Stack>
  );
};
