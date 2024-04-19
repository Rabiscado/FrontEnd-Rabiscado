import { useEffect, useState } from "react";
import { Modal, ModalProps } from "@components/index";
import { UseMobile } from "@context/mobileContext";

type Props = { id: number } & Pick<ModalProps, "isOpen" | "onClose">;

export const ModalEditCourse = ({ isOpen, onClose }: Props) => {
  const { isMobile } = UseMobile();
  const totalSteps = isMobile ? 3 : 1;
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    setCurrentStep(1);
  }, [isMobile]);

  const handleConfirm = () => {
    currentStep !== totalSteps
      ? setCurrentStep(currentStep + 1)
      : console.log("Curso editado com sucesso");
  };

  return (
    <Modal
      title="Editar curso"
      isOpen={isOpen}
      onClose={onClose}
      onClick={() => handleConfirm()}
    >
      <div>
        a
      </div>
      {/* <CourseForm currentStep={currentStep}

      /> */}
    </Modal>
  );
};
