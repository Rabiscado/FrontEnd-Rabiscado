import { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Stack, 
  Typography, 
} from "@mui/material";
import { AppButton } from "@components/Button";
import { UseMobile } from "@context/mobileContext";

import { PostPlan } from "../../../Models/Plans";
import { PlanAdmCRUDService } from "../../../services/plans/plansAdmService";
import { CustomInput } from '@components/index';
import { IError } from '@Models/Error';
import { useDialog } from '@context/DialogContext/useDialog';
import { Loading } from '@components/Loading/Loading';

type CreatePlanModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fetchData: () => void;
  onConfirm?: (data?:any) => void;
};

export const CreatePlanModal = ({
  isOpen,
  onClose,
  onConfirm,
}: CreatePlanModalProps) => {
  const { isMobile } = UseMobile();
  const [plan, setPlan] = useState<PostPlan>(new PostPlan());
  const [isLoading, setIsLoading] = useState(false);

  const {showSuccessDialog} = useDialog()

  useEffect(() => {
    setPlan(new PostPlan());
  }, [isOpen]);

  const addNewPlan = async () => {
    try{
      setIsLoading(true);
      const response = await PlanAdmCRUDService.Post(plan)
      if(response){
        onConfirm && onConfirm(response);
        showSuccessDialog({
          title: "Plano cadastrado com sucesso",
          onConfirm: () => {}
        })
        onClose();
      }
    } catch (error) {
      const err = error as IError
      const title = err.response?.data?.erros[0] ?? "Erro ao cadastrar"
      showSuccessDialog({
        title,
        onConfirm: () => {}
      })
    } finally {
      setIsLoading(false);
    }
      
  };

  const NumMask = (value: string) : number => {
    return Number(value.replace(/\D/g, ''));
  }
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: isMobile ? "90vw" : "40vw",
        }}
      >
      {
        isLoading && <Loading/>
      }
        <Stack sx={{ textAlign: "left" }} gap={2}>
          <Typography variant="h5" sx={{ fontWeight: "600", color: theme => theme.palette.secondary.main }}>
            Novo Plano
          </Typography>
          <Stack sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            '@media (max-width: 760px)': {
              gridTemplateColumns: "1fr"
            }
          }}>
            <CustomInput
              label='Nome do Plano'
              labelVariant='secondary'
              value={plan.name}
              onChange={(e) => setPlan({ ...plan, name: e.target.value })}
            />
            <CustomInput
              label='Valor em R$'
              labelVariant='secondary'
              value={plan.price}
              onChange={(e) => setPlan({ ...plan, price: NumMask(e.target.value)})} 
            />
            <CustomInput
              label='Valor em Moedas'
              labelVariant='secondary'
              value={plan.coinValue}
              onChange={(e) => setPlan({ ...plan, coinValue: NumMask(e.target.value) })}            
            />
          </Stack>
          <Stack sx={{ width: "100%", alignItems: "flex-end" }}>
            <Stack sx={{ width: "20%",
              '@media (max-width: 760px)': {
                width: "100%"
              }
          }}>
              <AppButton
                buttonVariant="primary"
                title="Adicionar"
                onClick={() => addNewPlan()}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};
