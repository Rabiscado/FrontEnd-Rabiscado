import { Box } from "@mui/material";
type TagsProps = {
  tag: string;
};
export const Tags = ({ tag }: TagsProps) => {
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      borderRadius="40px"
      sx={{
        backgroundColor: "#EEE8FA",
        padding: "5px 20px",
        fontSize: "12px",
      }}
    >
      {tag}
    </Box>
  );
};
