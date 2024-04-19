import { Upload, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import { useState } from "react";

interface CustomInputProps {
  label?: string;
  placeholder?: string;
  variant?: "standard" | "filled" | "outlined";
  fullWidth?: boolean;
  value?: string | unknown;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  InputLabelProps?: TextFieldProps["InputLabelProps"];
  sx?: TextFieldProps["sx"];
  InputProps?: TextFieldProps["InputProps"];
  disabled?: boolean;
  type?: string;
  labelVariant?: "primary" | "secondary";
  required?: boolean;
  multiline?: boolean;
  error?: string;
  BoxStyle?: TextFieldProps["sx"];
}
export const CustomInput = ({
  label,
  placeholder,
  variant = "outlined",
  fullWidth,
  value,
  onChange,
  sx,
  InputProps,
  disabled = false,
  type = "text",
  labelVariant = "primary",
  required = false,
  multiline = false,
  error,
  BoxStyle
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  if (type === "file") {
    return (
      <Box
        sx={{
          label: {
            color: (theme) =>
              labelVariant === "primary"
                ? theme.palette.primary.main
                : theme.palette.secondary.main,
            fontWeight: 600,
            fontSize: ".875rem",
          },
          display: "flex",
          flexDirection: "column",
          gap: ".75rem",
          position: "relative",
        }}
      >
        <label htmlFor={label}>
          {label}
          {required && " *"}
        </label>
        <input
          type="file"
          accept='image/*'
          id={label}
          style={{ display: "none" }}
          onChange={onChange}
        />
        <TextField
          placeholder={placeholder}
          variant={variant}
          fullWidth={fullWidth}
          onChange={undefined}
          InputLabelProps={{
            style: { color: "gray" },
          }}
          sx={{
            "& :disabled": {
              backgroundColor: "#EEE8FA",
            },
            "*": {
              border: "2px !important #A29DB1", 
              color: "#380478",
              borderRadius: "10px !important",
            },
            "&::placeholder": {
              color: "#380478",
            },
            "&": {
              borderRadius: ".5rem !important",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#380478",
              },
            mb: 2,
            ...sx,
          }}
          InputProps={{
            endAdornment: (
              <Upload
                sx={{
                  cursor: "pointer",
                  color: '#F5006A !important',
                  opacity: 0.3,
                }}
                />
            ),
          }}
          type="text"
          value={
            (value as {name?: string})?.name ?? ''
          }
          onClick={() => {
            const input = document.getElementById(label!);
            if (input) {
              input.click();
            }
          }}
        />
        
      {error !== '' && <Typography
        sx={{
          color: "red",
          fontSize: ".75rem",
          position: "absolute",
          bottom: "-.2rem",
        }}
      >
        {error}
      </Typography>}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        label: {
          color: (theme) =>
            labelVariant === "primary"
              ? theme.palette.primary.main
              : theme.palette.secondary.main,
          fontWeight: 600,
          fontSize: ".875rem",
        },
        display: "flex",
        flexDirection: "column",
        gap: ".75rem",
        position: "relative",
        ...BoxStyle
      }}
    >
      <label htmlFor={label}>
        {label}
        {required && " *"}
      </label>
      <TextField
        placeholder={placeholder}
        variant={variant}
        fullWidth={fullWidth}
        disabled={disabled}
        // label={label}
        value={value}
        onChange={onChange}
        multiline={multiline}
        minRows={multiline ? 3 : 1}
  
        InputLabelProps={{
          style: { color: "gray" },
        }}
        sx={{
          "& :disabled": {
            backgroundColor: "#EEE8FA",
          },
          "*": {
            border: "2px !important #A29DB1",
            color: "#380478 !important",
            borderRadius: "10px !important",
          },
          "&::placeholder": {
            color: "#380478",
          },
          "&": {
            borderRadius: ".5rem !important",
          },
          // focus on input changes the border color
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#380478",
            },
          mb: 2,
          ...sx,
        }}
        InputProps={
          type === "password"
            ? {
                endAdornment: showPassword ? (
                  <Visibility
                    onClick={() => setShowPassword(false)}
                    sx={{
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <VisibilityOff
                    onClick={() => setShowPassword(true)}
                    sx={{
                      cursor: "pointer",
                      opacity: 0.3,
                    }}
                  />
                ),
              }
            : InputProps
        }
        inputProps={{
          style: { paddingLeft: "1rem" },
        }}
        type={type === "password" && showPassword ? "text" : type}
      />
      {error !== '' && <Typography
        sx={{
          color: "red",
          fontSize: ".75rem",
          position: "absolute",
          bottom: "-.2rem",
        }}
      >
        {error}
      </Typography>}
    </Box>
  );
};
