import { useCallback, useEffect, useState } from "react";
import { Modal, ModalProps } from "@components/index";
import { UseMobile } from "@context/mobileContext";
import { CourseForm } from "../courseForm";
import { PostCourse } from '../../../../../Models/Course'; 
import { useDialog } from '@context/DialogContext/useDialog';
import { Box, CircularProgress } from '@mui/material';
import { emailRegex } from '../../../../../utils/regex/email';

type Props = Pick<ModalProps, "isOpen" | "onClose"> & {
  onConfirm: (data: PostCourse) => void;
  selectedCourse?: PostCourse;
};

export const ModalAddCourse = ({
  isOpen,
  onClose,
  onConfirm,
  selectedCourse,
}: Props) => {
  const { isMobile } = UseMobile();
  const totalSteps = isMobile ? 3 : 1;
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [isLoading, setIsLoading] = useState(false);

  const [course, setCourse] = useState<PostCourse>(new PostCourse());

  useEffect(() => {
    setCurrentStep(1);
    if (selectedCourse) {
      const forWhoIds = selectedCourse?.courseForWhos
        ? selectedCourse?.courseForWhos.map(
            (courseForWho) => courseForWho.forWhoId
          )
        : [];
      const levelIds = selectedCourse?.courseLevels
        ? selectedCourse?.courseLevels.map((courseLevel) => courseLevel.levelId)
        : [];
      setCourse({ ...selectedCourse, forWhoIds, levelIds });
      return;
    }
    setCourse(new PostCourse());
    setErros(initialErros);
  }, [selectedCourse, isOpen]);

  useEffect(() => {
    setCurrentStep(1);
  }, [isMobile]);

  const { showSuccessDialog } = useDialog();

  async function handleSubmit() {
    // const imageBase64FromFile = await new Promise((resolve, reject) => {
    //   const reader = new FileReader();
    //   reader.onload = () => resolve(reader.result);
    //   reader.onerror = reject;
    //   reader.readAsDataURL(course.file as Blob);
    // });
    try {
      setIsLoading(true);
      const data = {
        ...course,
      };
      await onConfirm(data);
    } catch (err: any) {
      showSuccessDialog({
        title: err.response.data.erros[0] ?? "Ocorreu um erro",
        onConfirm() {},
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleConfirm = () => {
    const isValid = validate(isMobile ? currentStep : undefined);
    if (!isValid) return;

    currentStep !== totalSteps
      ? setCurrentStep(currentStep + 1)
      : handleSubmit();
  };

  const initialErros = {
    name: "",
    professorEmail: "",
    description: "",
    file: "",
    video: "",
    levelIds: "",
    forWhoIds: "",
    value: "",
    localization: "",
    style: "",
    school: "",
  };

  const [erros, setErros] = useState(initialErros);

  const validate = useCallback(
    (stepPar?: number) => {
      const isValid = { ...initialErros };
      if (course.name.length < 2) {
        isValid.name = "Nome do curso deve ter no mínimo 2 caracteres";
      }
      if (course.professorEmail.length < 2) {
        isValid.professorEmail =
          "E-mail do professor deve ter no mínimo 2 caracteres";
      }

  if(!course.professorEmail.match(emailRegex)){
    isValid.professorEmail = 'E-mail do professor inválido';
  }
  if(course.description.length < 2){
     isValid.description = 'Descrição do curso deve ter no mínimo 2 caracteres';
  }
  if(stepPar === 1){
    setErros(isValid);
    return Object.values(isValid).every(x => x === '');
  }

  if(!course.file){
     isValid.file = 'Imagem de capa é obrigatória';
  }
  
  if(course.video.length < 2){
     isValid.video = 'Vídeo trailer deve ter no mínimo 2 caracteres';
  }
  if(course.levelIds?.length === 0){
     isValid.levelIds = 'Nível do curso é obrigatório';
  }
  if(course.forWhoIds?.length === 0){
     isValid.forWhoIds = 'Para quem é a dança é obrigatório';
  }
  
  if(stepPar === 2){
    setErros(isValid);
    return Object.values(isValid).every(x => x === '');
  }

      if (stepPar === 2) {
        setErros(isValid);
        return Object.values(isValid).every((x) => x === "");
      }

      if (course.value === 0) {
        isValid.value = "Valor do curso é obrigatório";
      }
      if (course.localization.length < 2) {
        isValid.localization = "Localização deve ter no mínimo 2 caracteres";
      }
      if (course.style.length < 2) {
        isValid.style = "Estilo deve ter no mínimo 2 caracteres";
      }
      if (course.school.length < 2) {
        isValid.school = "Escola deve ter no mínimo 2 caracteres";
      }

      setErros(isValid);
      return Object.values(isValid).every((x) => x === "");
    },
    [course, initialErros, setErros]
  );

  return (
    <Modal
      title={selectedCourse ? `Editar curso - ${selectedCourse.name}` : "Novo curso"}
      isOpen={isOpen}
      onClose={onClose}
      onClick={handleConfirm}
      disabledButton={isLoading}
    >
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(255,255,255,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <CircularProgress size={200} />
        </Box>
      )}
      <CourseForm
        currentStep={currentStep}
        course={course}
        setCourse={setCourse}
        erros={erros}
      />
    </Modal>
  );
};
