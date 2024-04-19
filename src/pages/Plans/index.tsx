import { Box, Divider, Stack, Typography } from "@mui/material";
import { PlansCard } from "./components/PlansCard";
import Currency from "@assets/currency.svg";
import { AppButton } from "@components/Button";
import Wallet from "@assets/wallet.svg";
import CardSVG from "@assets/card-plans.svg";
import { UseMobile } from "@context/mobileContext";
import { PlansService } from "./Services/PlansService";
import { useEffect, useState } from "react";
import { Plan } from "./Models/PlansModel";
import { Loading } from '@components/Loading/Loading';

export const Planos = () => {
  const { isMobile } = UseMobile();
  const [plans, setPlans] = useState<Plan[]>([])

  const [isLoading, setIsLoading] = useState(false);

  const fetchPlans = async ()=>{
    setIsLoading(true);
    const response = await PlansService.GetAll();
    if(response){
      setPlans(response)
    }
    setIsLoading(false);
  }
  useEffect(()=>{
    fetchPlans();
  },[])
  return (
    <Box
      sx={{
        padding: "2rem 1.5rem",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {isLoading && <Loading />}
      <Stack
        sx={{ 
          textAlign: isMobile ? "left" : "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: "600",
            mb: "2rem",
            color: theme => theme.palette.secondary.main,
          }}
        >
          Nossos planos
        </Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: isMobile ? "nowrap" : "wrap",
            gap: "2rem", 
            overflowX: isMobile ? "scroll" : "none",
            width: "100vw",
            paddingRight: "2rem",
            pb: ".5rem",
            minHeight: "400px",
          }}
        >
          {plans.map((plan)=>(
          <PlansCard currency={plan.coinValue} title={plan.name} value={plan.price} 
          id={plan.id}
          key={plan.id}
          />
          ))}
        </Stack>
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: isMobile ? "auto" : "640px",
          gap: "1rem",
          width: "100%",
          padding: "1rem",
          border: isMobile ? "none" : "1px solid #A29DB1",
          borderRadius: "2rem",
          boxSizing: "border-box",
          mt: "3rem",
          textAlign: "center",
        }}
      >
        <Stack
          sx={{
            width: isMobile ? "100%" : "30%",
            padding: "2rem",
            mt: "2rem",
            boxSizing: "border-box",
          }}
        >
          <Typography
            sx={{
              color: "#000000 !important",
            }}
          >
            Funciona de forma similar a moeda de um jogo, a diferença é a
            recorrência do pagamento
          </Typography>
          <Stack alignItems={"center"} mt="40px">
            <img
              src={Currency}
              style={{
                width: "64px",
              }}
            />
          </Stack>
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: "600",
              color: "#833FD7",
            }}
          >
            1.000
          </Typography>
          <Typography
            sx={{
              fontWeight: "600",
              color: "#833FD7",
              mb: "24px",
            }}
          >
            Xêros / mês
          </Typography>
          <AppButton title="Assinar" buttonVariant="primary" />
          <Typography sx={{ mt: "40px", color: "#000" }}>
            Esse valor será debitado todo mês no cartão de crédito do aluno
            (igual Netflix).
          </Typography>
        </Stack>
        <Divider orientation="vertical" />
        <Stack
          sx={{
            width: isMobile ? "100%" : "40%",
            padding: "2rem",
            mt: "2rem",
            boxSizing: "border-box",
          }}
        >
          <Typography sx={{ color: "#000" }}>
            O valor debitado entrará na carteira digital da plataforma em
            formato de “Xêros”. Caso o aluno não gaste todos os créditos
            mensais, o valor será acumulado
          </Typography>
          <Stack alignItems={"center"} mt="40px">
            <img
              src={Wallet}
              style={{
                width: "200px",
              }}
            />
          </Stack>
          <Typography
            sx={{
              fontSize: "20px",
              color: "#000",
              mt: "20px",
            }}
          >
            Caso assine algum curso, o valor será descontado da carteira
            digital.{" "}
          </Typography>

          <Typography sx={{ color: "#000", mt: "24px", fontSize: "20px" }}>
            Contando 1 mês da inscrição, será avaliado automaticamente se existe
            saldo para renovação. Caso não haja, não terá mais acesso ao
            conteúdo do professor.
          </Typography>
        </Stack>
        <Divider orientation="vertical" />
        <Stack
          sx={{
            width: isMobile ? "100%" : "30%",
            padding: "2rem",
            mt: "2rem",
            boxSizing: "border-box",
          }}
        >
          <img
            src={CardSVG}
            style={{
              height: isMobile ? "auto" : "413px",
              width: isMobile ? "100%" : "auto",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", 
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                color: theme => theme.palette.secondary.main,
              }}
            >
              1000{" "}
              <p
                style={{
                  color: "#F5006A",
                }}
              >
                -100
              </p>
              =900

            </Typography>
            <Typography
              sx={{
                color: "#A29DB1",
                textAlign: "start",
              }}
            >
              Nesse caso restou 900 Xêros para usar em outros cursos
            </Typography>
          </Box>

        </Stack>
      </Box>
    </Box>
  );
};
