import {
  Box, 
  Stack, 
  Typography,
} from "@mui/material";
import { UseMobile } from "@context/mobileContext";
import { useEffect, useState } from "react";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import BGLogin from "@assets/bg-login.png";
import Logo from "@assets/logo-svg.svg"

 
import { AppButton } from "@components/Button";
import { SignUp } from "../SignUp/models/SignUp"; 
import { RecoverPassword } from "./services/RecoverPassword";
import { ForgotPassword } from "../models/ForgotPasswordModel";
import { CustomInput } from '@components/index';
import { Loading } from '@components/Loading/Loading';
import { emailRegex } from '@utils/regex/email';
import { useDialog } from '@context/DialogContext/useDialog';
import { IError } from '@Models/Error';

export default function Index() {
  const [signUp, setSignUp] = useState<SignUp>(new SignUp()); 
  const { isMobile } = UseMobile();
  const [step, setStep] = useState(1); 
  const navigate = useNavigate();
  
  const location = useLocation();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');

  const {showSuccessDialog} = useDialog();

  const handleSignUp = async () => {
    if (!validateForm()) return;
  
    setIsLoading(true);
    if (step == 1) {
      try {
        const response = await RecoverPassword.GenerateToken(signUp.email)
        if (response) {
          showSuccessDialog({
            title: "Verifique seu e-mail",
            onConfirm: () => {
            }
          })
        }
  
      } catch (error) {
        const err = error as IError;
        const title = err.response?.data?.erros[0] ?? "Erro ao enviar email";
        showSuccessDialog({
          title,
          onConfirm: () => {
          }
        })
      } finally {
        setIsLoading(false);
      }
    } else {
      if (signUp.password != signUp.confirmPassword) return;
      try {
  
        const data: ForgotPassword = {
          confirmNewPassword: signUp.confirmPassword,
          password: signUp.password,
          email: email,
          tokenRecoverPassword: token,
          newPassword: signUp.password
        }
        const response = await RecoverPassword.ChangePassword(data)
        if (response) {
          showSuccessDialog({
            title: "Sua senha foi alterada com sucesso!",
            onConfirm: () => {
              navigate('/')
            }
          })
        }
      } catch (error) {
        const err = error as IError;
        const title = err.response?.data?.erros[0] ?? "Erro ao alterar senha";
        showSuccessDialog({
          title,
          onConfirm: () => {
          }
        })
      } finally {
        setIsLoading(false);
      }
    }
  };
 

  const [searchParams] = useSearchParams();

  useEffect(() => { 
    const tokenParam = searchParams.get('token');
    const emailParam = searchParams.get('email');

    if (tokenParam && emailParam) {
      setToken(tokenParam);
      setEmail(emailParam);
      setStep(2)
    }
  }, [location.search]);

  const [isLoading, setIsLoading] = useState(false);

  const [erros, setErros] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
      confirmPassword: "",
    };
    if(step == 1){
      if(!signUp.email.match(emailRegex)){
        errors.email = "Email inválido";
      }
    }
    if(step == 2){
      if(signUp.password.length < 6){
        errors.password = "Senha deve ter no mínimo 6 caracteres";
      }
      if(signUp.confirmPassword != signUp.password){
        errors.confirmPassword = "Senhas não conferem";
      }
    }
    setErros(errors);
    return Object.values(errors).every((err) => err === "");
  }

  useEffect(() => {
    if(Object.values(erros).every((err) => err === "")) 
      return;
    validateForm();
  }, [signUp]);

      

 
  return (
    <Box
      width="100vw"
      height="100vh" 
      alignItems="center"
      display="flex"
      flexDirection={isMobile ? "column" : "row"} 
      boxSizing={"border-box"}
    >
      {
        isLoading && <Loading/>
      }
      {isMobile && (
        <Stack
          sx={{
            width: "80%",
            paddingTop: "4.125rem",
            boxSizing: "border-box",
            marginBottom: "3.125rem",
          }}
        >
          <img src={Logo} />
        </Stack>
      )}
     <Stack
        width={isMobile ? "100%" : "50%"}
        alignItems="left"
        gap={4}
        justifyContent="center"
        px={2}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "left", fontWeight: "600", fontSize:"32px",
            color: theme => theme.palette.secondary.main
          }}
          >
            {step == 1 ? "Esqueci minha senha" : "Redefina sua senha"}
          </Typography>
        </Stack>
        {/* <AlertModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={
            step == 1
              ? "Verifique seu e-mail"
              : "Sua senha foi alterada com sucesso!"
          }
        /> */}
        {step == 1 && (
          <>
          <CustomInput
            label="Email"
            value={signUp.email}
            onChange={(event) => {
              setSignUp({ ...signUp, email: event.target.value });
            }}
            labelVariant="secondary"
            error={erros.email}
            />
            {/* <TextField
              label="Email"
              value={signUp.email}
              onChange={(event) => {
                setSignUp({ ...signUp, email: event.target.value });
              }}
              variant="outlined"
              fullWidth
              InputLabelProps={{
                style: { color: "gray" },
              }}
              inputProps={{
                style: { color: "black" },
              }}
            /> */}
          </>
        )}
        {step == 2 && (
          <>
            <CustomInput
              label="Nova senha"
              value={signUp.password}
              onChange={(event) => {
                setSignUp({ ...signUp, password: event.target.value });
              }}
              labelVariant="secondary"
              type="password"
              error={erros.password}
              />
            <CustomInput
              label="Confirme a nova senha"
              value={signUp.confirmPassword}
              onChange={(event) => {
                setSignUp({ ...signUp, confirmPassword: event.target.value });
              }}
              labelVariant="secondary"
              type="password"
              error={erros.confirmPassword}
              />
          </>
        )}

        <AppButton
          buttonVariant="primary"
          title={step == 1 ? "Confirmar" : "Confirmar"}
          onClick={handleSignUp}
        />
      </Stack>
    
      {!isMobile && (
        <Stack sx={{ width: "100%", height: '100%' }}>
          <img
            src={BGLogin}
            style={{ objectFit: "fill", width: '100%', height:'100vh' }}
          />
        </Stack>
      )}
    </Box>
  );
}
