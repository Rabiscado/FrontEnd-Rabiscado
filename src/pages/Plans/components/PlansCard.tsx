import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Currency from "@assets/currency.svg";
import { AppButton } from "@components/Button";
import { useState } from "react";
import { UseMobile } from "@context/mobileContext";
import { useDialog } from '@context/DialogContext/useDialog';
import { useNavigate } from 'react-router-dom';

type PlansProps = {
  title: string;
  value: number;
  currency: number;
  id?: number;
};
export const PlansCard = ({ title, value, currency, id }: PlansProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const {isMobile} = UseMobile();

  const navigate = useNavigate()

  const {
    openDialog
  } = useDialog()

  return (
    <Card
      onMouseLeave={() => setIsHovering(false)}
      onMouseEnter={() => setIsHovering(true)}
      sx={{
        border: "1px solid #A29DB1",
        padding: "1rem",
        borderRadius: "16px", 
        width: isMobile ? "40%" : "336px",
        minWidth:isMobile ? "250px" : "336px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: isHovering ? "#380478" : "fff",
        alignItems: "center",
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontSize: "32px",  
            whiteSpace: "nowrap",
            maxWidth: "120%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: isHovering ? "#fff" : "#833FD7",
          }}
        >
          {title}
        </Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            mb: "3rem",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "48px",
              fontWeight: "600",
              color: isHovering ? "#ffaf00" : "#380478",
            }}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
              maximumFractionDigits: 0,
            }).format(value)}
          </Typography>
          <Typography
            sx={{
              fontWeight: "600",
              mb: ".5rem",
              color: isHovering ? "#ffaf00" : "#380478",
            }}
          >
            /mês
          </Typography>
        </Stack>
        <img
          src={Currency}
          style={{
            width: "64px",
          }}
        />
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: "600",
            color: isHovering? "#fff": "#833FD7",
          }}
        >
          {currency}
        </Typography>
        <Typography
          sx={{
            fontWeight: "600",
            color: isHovering? "#fff": "#833FD7",
          }}
        >
          Xêros / mês
        </Typography>
      </CardContent>
      <CardActionArea
        sx={{
          mt: "2rem",
        }}
      >
        <AppButton title="Assinar" buttonVariant="primary" 
          onClick={() => openDialog({
            onConfirm: () => navigate(`/inscrever?planoid=${id}`),
            title: 'Assinar este plano?',
            onConfirmText: 'Sim',
          })}

        />
      </CardActionArea>
    </Card>
  );
};
