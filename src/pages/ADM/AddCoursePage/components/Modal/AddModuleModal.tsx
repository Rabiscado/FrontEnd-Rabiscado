import { Modal, CustomInput as Input } from "@components/index";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { CourseCRUD } from "../../Models/CourseCRUD";
import { AppButton } from "@components/Button";

export const AddModuleModal: React.FC<{
  onConfirm: (nome: string) => void;
  onClose: () => void;
  isOpen: boolean;
  currentModule?: CourseCRUD["modules"][0];
}> = ({ onConfirm, onClose, isOpen, currentModule }) => {
  const [name, setName] = React.useState("");

  function handleConfirm() {
    onConfirm(name);
    onClose();
    setName("");
  }

  useEffect(() => {
    if (currentModule) {
      setName(currentModule.name);
      return;
    }
    setName("");
  }, [isOpen, currentModule]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={currentModule ? "Editar módulo" : "Adicionar módulo"}
      width="40%"
      onClick={
        () => {}
      }
      hideButton
    >
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Input
            label="Nome do módulo"
            placeholder="Nome do módulo"
            labelVariant="secondary"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <AppButton
          onClick={handleConfirm}
          title="Adicionar"
          buttonVariant="primary"
          sx={{
            width: "200px",
            "@media (max-width: 760px)": {
              width: "100%",
            },
          }}
          disabled={name === ""}
        ></AppButton>
      </Box>
    </Modal>
  );
};
