import { useNavigate } from "react-router-dom";
import { useDialog } from "@context/DialogContext/useDialog";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import {
  Place,
  UndoOutlined,
  CreateOutlined,
  SignalCellularAlt,
  PersonOffOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import Currency from "@assets/currency.svg";

export type CourseCardProps = {
  id: number;
  image: string;
  title: string;
  numberSubscribers: number;
  address: string;
  level: Array<{
    id: number;
    courseId: number;
    levelId: number;
    level: {
      id: number;
      name: string;
      description: string;
      disabled: boolean;
    };
  }>;
  themes: string[];
  value: number;
  isActive: boolean;
  onEdit: () => void;
  onRemove: () => void;
  onDesactivate: () => void;
  onReactivate: () => void;
};

export const CourseCard = ({
  id,
  image,
  title,
  level,
  value,
  themes,
  onEdit,
  address,
  isActive,
  onRemove,
  onReactivate,
  onDesactivate,
  numberSubscribers,
}: CourseCardProps) => {
  const { openDialog } = useDialog();

  const handleEditar = () => {
    onEdit();
  };

  const handleDesativar = () => {
    openDialog({
      title: "Deseja desativar este curso?",
      onConfirm: () => onDesactivate(),
    });
  };

  const handleReativar = () => {
    openDialog({
      title: "Deseja reativar este curso?",
      onConfirm: () => onReactivate(),
    });
  };

  const handleRemover = () => {
    openDialog({
      title: "Deseja deletar permanentemente este curso?",
      onConfirm: () => onRemove(),
    });
  };

  const navigate = useNavigate();

  return (
    <>
      <Box
        width="100%"
        height="auto"
        border="1px solid #EEE8FA"
        borderRadius="1.25rem"
      >
        <img
          src={image}
          style={{
            objectFit: "fill",
            borderRadius: "20px 20px 0 0",
            width: "100%",
            height: "240px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/add-curso/" + id);
          }}
        />
        <Stack width="100%" padding="0rem 1rem">
          <Stack
            width="100%"
            display="flex"
            flexDirection="column"
            gap="1rem"
            borderBottom="1px solid #EEE8FA"
          >
            <Stack
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignContent="center"
              textAlign="left"
            >
              <Typography
                fontStyle="normal"
                fontSize="1.25rem"
                fontWeight={600}
                color={(theme) => theme.palette.secondary.main}
                onClick={() => {
                  navigate("/add-curso/" + id);
                }}
                style={{ cursor: "pointer" }}
              >
                {title}
              </Typography>
              <Typography
                fontStyle="normal"
                fontSize="1rem"
                fontWeight={400}
                color={(theme) => theme.palette.text.secondary}
              >
                {numberSubscribers} inscritos
              </Typography>
            </Stack>
            <Stack
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignContent="center"
              textAlign="left"
            >
              <Stack
                display="flex"
                flexDirection="row"
                width="100%"
                alignItems="center"
                gap="0.5rem"
              >
                <Place
                  style={{ width: "20px", height: "20px", color: "#F5006A" }}
                />
                <Typography
                  fontStyle="normal"
                  fontSize="1rem"
                  fontWeight={400}
                  color={(theme) => theme.palette.text.secondary}
                >
                  {address}
                </Typography>
              </Stack>
              <Stack
                display="flex"
                flexDirection="row"
                width="100%"
                alignItems="center"
                gap="0.5rem"
              >
                <SignalCellularAlt
                  style={{ width: "20px", height: "20px", color: "#F5006A" }}
                />
                <Typography
                  fontStyle="normal"
                  fontSize="1rem"
                  fontWeight={400}
                  color={(theme) => theme.palette.text.secondary}
                >
                  Nivel: {level && level.map((value) => value.level.name + " ")}
                </Typography>
              </Stack>
            </Stack>
            <Box
              display="flex"
              flexWrap="wrap"
              gap="0.1rem"
              justifyContent="left"
              marginBottom="1rem"
            >
              {themes.map((value, index) => (
                <Box
                  key={index}
                  padding="0.25rem 0.5rem"
                  width="fit-content"
                  borderRadius="1rem"
                  bgcolor={(theme) => theme.palette.secondary.light}
                >
                  <Typography
                    width="100px"
                    fontStyle="normal"
                    textAlign="center"
                    fontSize="0.75rem"
                    fontWeight={400}
                    color={(theme) => theme.palette.secondary.main}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Stack>
        </Stack>
        <Stack
          padding="1rem"
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignContent="center"
          textAlign="left"
        >
          <Stack
            display="flex"
            flexDirection="row"
            gap="0.5rem"
            alignItems="center"
            justifyContent="left"
          >
            <img
              src={Currency}
              style={{
                width: "20px",
              }}
            />
            <Typography
              fontStyle="normal"
              fontSize="1.125rem"
              fontWeight={600}
              color={(theme) => theme.palette.primary.main}
            >
              {value}
            </Typography>
          </Stack>
          <Stack
            display="flex"
            flexDirection="row"
            gap="0.5rem"
            alignContent="center"
            justifyContent="right"
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton onClick={() => handleEditar()}>
              <CreateOutlined style={{ width: "20px", height: "20px" }} />
            </IconButton>
            {isActive && (
              <IconButton onClick={() => handleDesativar()}>
                <PersonOffOutlined style={{ width: "20px", height: "20px" }} />
              </IconButton>
            )}
            {!isActive && (
              <IconButton onClick={() => handleRemover()}>
                <DeleteOutlineOutlined
                  style={{ width: "20px", height: "20px" }}
                />
              </IconButton>
            )}
            {!isActive && (
              <IconButton onClick={() => handleReativar()}>
                <UndoOutlined style={{ width: "20px", height: "20px" }} />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Box>
      {/* <ModalEditCourse
        id={id}
        isOpen={isEditCourseModalOpen}
        onClose={closeEditCourseModal}
      /> */}
    </>
  );
};
