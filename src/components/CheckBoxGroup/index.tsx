import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export type CheckBoxGroupProps = {
  label: string;
  values: string[];
  variant?: "primary" | "secondary";
  labelVariant?: "primary" | "secondary";
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?:number | number[];
};

export const CheckBoxGroup = ({
  label,
  values,
  labelVariant = "primary",
  variant = "primary",
  required = false,
  onChange,
  value,
}: CheckBoxGroupProps) => {
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
        gap: ".5rem",
      }}
    >
      <label htmlFor={label}>
        {label}
        {required && " *"}
      </label>
      <FormGroup>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          {values.map((v, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox defaultChecked={index === 0} 
              onChange={
                () => {
                  onChange && onChange({target: ({value: Number(index+1).toString()})} as React.ChangeEvent<HTMLInputElement>)
                }
              }
              checked={value ? (value as number[]).includes(index+1) : false}
              />}
              label={v}
              color={variant === "primary" ? "#F5006A" : "#380478"}
            />
          ))}
        </Box>
      </FormGroup>
    </Box>
  );
};
