import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useEffect, useState } from "react";
import { PlanAdmCRUDService } from "../../services/plans/plansAdmService";
import { GetPlan } from "../../Models/Plans";

import { AppButton } from "@components/Button";
import { CreatePlanModal } from "./CreatePlanModal/CreatePlanModal";
import { UseMobile } from "@context/mobileContext";
import DrawerMobile from "./DrawerMobile/DrawerMobile";
import { Add } from '@mui/icons-material';
import { CustomInput } from '@components/index';
import { IError } from '@Models/Error';
import { useDialog } from '@context/DialogContext/useDialog';
import { Loading } from '@components/Loading/Loading';

export const PlansAdmin = () => {
  const [plansData, setPlansData] = useState<GetPlan[]>([]);

  const [isModalCreatePlanOpen, setIsModalCreatePlanOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<GetPlan>({} as GetPlan);
  const [mobileStep, setMobileStep] = useState(0);

  const { showSuccessDialog } = useDialog();

  const fetchData = async () => {
    setIsLoading(true);
    const data = await PlanAdmCRUDService.GetAll();
    setPlansData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectPlan = (plan: GetPlan) => {
    setSelectedPlan(plan);
    setMobileStep(1);
  };

  const [isLoading, setIsLoading] = useState(true);

  const editNewPlan = async () => {
    try{
      setIsLoading(true);
      const response = await PlanAdmCRUDService.Put(selectedPlan)
      if(response){
        setPlansData(plansData.map((plan) => plan.id === selectedPlan.id ? response : plan))
        showSuccessDialog({
          title: "Plano editado com sucesso",
          onConfirm: () => {}
        })
      }
    } catch(error){
      const err = error as IError
      const title = err.response?.data?.erros[0] ?? "Erro ao editar"
      showSuccessDialog({
        title,
        onConfirm: () => {}
      })
    }finally{
      setIsLoading(false);
    }
      
  };

  const { isMobile } = UseMobile();

  return (
    <>
    
        {
          isLoading && <Loading />
        }
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          paddingY: "0 1rem",
          minHeight: "90vh", 
          boxSizing: "border-box",
          paddingX: !isMobile ? 0 : "24px",
        }}
      >
        {mobileStep === 0 && (
          <>
            <Stack
              sx={{
                width: isMobile ? "100%" : "30%",
                borderRight: isMobile ? "none" : "1px solid #E0E0E0",
                
              }}
            >
              <Stack
                sx={{
                  display: isMobile ? "flex" : "block",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  sx={{
                    fontSize: isMobile ? "32px" : "32px",
                    ml: "1rem",
                    my: !isMobile ? "2rem" : "0",
                    color: theme => theme.palette.secondary.main,
                    fontWeight: "600",
                  }}
                >
                  Planos
                </Typography>
                {isMobile && (
                  <Typography
                    sx={{
                      color: "#F5006A",
                      fontWeight: "600",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => setIsModalCreatePlanOpen(true)}
                  >
                    + Adicionar novo plano
                  </Typography>
                )}
              </Stack>

              <Stack gap={2}>
                {plansData.map((plan, index) => (
                  <Stack
                    key={index}
                    onClick={
                      isMobile
                        ? () => handleSelectPlan(plan)
                        : () => setSelectedPlan(plan)
                    }
                    sx={{
                      width: "100%",
                      backgroundColor:
                        selectedPlan.id == plan.id ? "#833FD7" : "#fff",
                      padding: "1rem",
                      color: selectedPlan.id == plan.id ? "#fff" : "#833FD7",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  > 
                      {plan.name} 
                    <IconButton>
                      <DeleteForeverIcon
                        sx={{
                          color:
                            selectedPlan.id == plan.id ? "#fff" : "#A29DB1",
                        }}
                      />
                    </IconButton>
                  </Stack>
                ))}
                
              </Stack>

              {!isMobile && (
                <Typography
                  sx={{
                    color: "#F5006A",
                    fontWeight: "700",
                    textDecoration: "underline",
                    mt: '1rem',
                    p: '1rem',
                    cursor: 'pointer', 
                    width: 'fit-content',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                  onClick={() => setIsModalCreatePlanOpen(true)}
                >
                  <Add       
                    sx={{
                      fontSize: '1.5rem'
                    }}             
                  />
                  Adicionar novo plano
                </Typography>
              )}
            </Stack>
            <Divider
              orientation="vertical"
              sx={{
                height: "100%",
              }}
            />
          </>
        )}
        <CreatePlanModal
          isOpen={isModalCreatePlanOpen}
          onClose={() => setIsModalCreatePlanOpen(false)}
          fetchData={() => fetchData()}
          onConfirm={(newPlan : any) => {
            setPlansData([...plansData, newPlan]);
            setSelectedPlan(newPlan);
          }}
        />

        {mobileStep === 1 && isMobile && (
          <Stack
            sx={{
              width: isMobile ? "100%" : "15%",
            }}
          >
            <Stack
              sx={{
                display: isMobile ? "flex" : "block",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              
              <TextField
                    sx={{ width: isMobile ? "100%" : "40rem" }}
                    placeholder="Escreva aqui o nome da aula"
                    variant="standard"
                    InputProps={{
                      sx: {
                        fontSize: isMobile ? "20px" : "40px",
                        color: theme => theme.palette.secondary.main,
                        fontWeight: "600",
                        mt: '1rem'
                      },
                    }}
                    value={selectedPlan.name}
                    onChange={(e) =>
                      setSelectedPlan({
                        ...selectedPlan,
                        name: e.target.value,
                      } as GetPlan)
                    }
                  />
              {/* <Typography
                sx={{
                  color: "#F5006A",
                  fontWeight: "600",
                  textDecoration: "underline", 
                  fontSize: '.8rem',
                  textAlign: 'center',
                  width: '50%',
                  padding: '1rem',
                }}
                onClick={() => setIsModalCreatePlanOpen(true)}
              >
                Adicionar novo plano
              </Typography> */}
            </Stack>
            <Typography
              sx={{
                color: "#A29DB1",
                my: "1rem",
              }}
            >Defina os valores mensais do seu plano</Typography>
            <Stack
              sx={{
                display: "flex",
                width: "100%",
              }}
            > 
            </Stack>
            <Stack
              sx={{
                width: "100%",
                gap: "1rem",
              }}
            >
              <CustomInput
                label='Valor em R$'
                labelVariant='secondary'
                InputProps={{
                  inputProps: { min: 0, inputMode: "numeric" },
                  sx: {
                    color: "#833FD7",
                    fontWeight: "400",
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography
                        sx={{
                          fontWeight: "600",
                          color: "#833FD7",
                        }}
                      >
                        R$
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                value={selectedPlan.price > 0 ? selectedPlan.price : ""}
                onChange={(e) =>
                  setSelectedPlan({
                    ...selectedPlan,
                    price: +e.target.value,
                  } as GetPlan)
                }
              /> 
              <CustomInput
                label='Valor em Moedas'
                labelVariant='secondary'
                InputProps={{
                  inputProps: { min: 0, inputMode: "numeric" },
                  sx: {
                    color: "#833FD7",
                    fontWeight: "400",
                  }, 
                }}
                value={selectedPlan.coinValue > 0 ? selectedPlan.coinValue : ""}
                onChange={(e) =>
                  setSelectedPlan({
                    ...selectedPlan,
                    coinValue: +e.target.value,
                  } as GetPlan)
                }
              />
              <AppButton
                title="Salvar"
                buttonVariant="primary"
                sx={{
                  marginTop: "1rem",
                }}
              />
            </Stack>
            <DrawerMobile
              selectedPlan={selectedPlan}
              plans={plansData}
              handleSelectPlan={handleSelectPlan}
              handleCreatePlan={() => setIsModalCreatePlanOpen(true)}
            />
          </Stack>
        )}

        {!isMobile && (
          <Stack
            sx={{
              width: "70%",
              pt: '1rem'
            }}
          >
            {plansData.length == 0 && !isMobile && (
              <Typography>Você ainda não tem um plano adicionado</Typography>
            )}
            {selectedPlan.id && !isMobile && (
              <>
                <Stack
                  sx={{
                    paddingX: "1rem",
                  }}
                > 
                  
                  <TextField
                    sx={{ width: isMobile ? "100%" : "40rem" }}
                    placeholder="Escreva aqui o nome da aula"
                    variant="standard"
                    InputProps={{
                      sx: {
                        fontSize: isMobile ? "20px" : "40px",
                        color: theme => theme.palette.secondary.main,
                        fontWeight: "600",
                      },
                    }}
                    value={selectedPlan.name}
                    onChange={(e) =>
                      setSelectedPlan({
                        ...selectedPlan,
                        name: e.target.value,
                      } as GetPlan)
                    }
                  />
                  <Typography
                    sx={{
                      color: "#A29DB1",
                      fontSize: "24px",
                      mb: "1rem",
                    }}
                  >
                    Defina os valores mensais do seu plano
                  </Typography>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "50%",
                    }}
                  >  
                  </Stack>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row", 
                      width: "60%",
                      gap: "1rem",
                    }}
                  >
                    <CustomInput
                      label='Valor em R$'
                      labelVariant='secondary'
                      InputProps={{
                        inputProps: { min: 0, inputMode: "numeric" },

                        sx: {
                          color: "#833FD7",
                          fontWeight: "400",
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography
                              sx={{
                                fontWeight: "600",
                                color: "#833FD7",
                              }}
                            >
                              R$
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                      value={selectedPlan.price > 0 ? selectedPlan.price : ""}
                      onChange={(e) =>
                        setSelectedPlan({
                          ...selectedPlan,
                          price: +e.target.value,
                        } as GetPlan)
                      }
                    />
                    <CustomInput
                      label='Valor em Moedas'
                      labelVariant='secondary'
                      InputProps={{
                        inputProps: { min: 0, inputMode: "numeric" },

                        sx: {
                          color: "#833FD7",
                          fontWeight: "400",
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography
                              sx={{
                                fontWeight: "700",
                                color: "#833FD7",
                              }}
                            >
                              R$
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                      value={
                        selectedPlan.coinValue > 0 ? selectedPlan.coinValue : ""
                      }
                      onChange={(e) =>
                        setSelectedPlan({
                          ...selectedPlan,
                          coinValue: +e.target.value,
                        } as GetPlan)
                      }
                    />
                  </Stack>
                </Stack>

                <Stack
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    padding: "3rem",
                  }}
                >
                  <Stack
                    sx={{
                      width: "30%",
                    }}
                  >
                    <AppButton
                      title="Salvar"
                      buttonVariant="primary"
                      onClick={() => editNewPlan()}
                    />
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>
        )}
      </Box>
    </>
  );
};
