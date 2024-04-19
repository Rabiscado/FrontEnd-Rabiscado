import {
  Box,
  IconButton,
  InputAdornment,
  Stack, 
  Typography,
} from "@mui/material";
import { UseMobile } from "@context/mobileContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Login } from "./models/Login";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UserContext } from "@context/UserContext/Index";
import BGLogin from "@assets/bg-login.png";
import Logo from "@assets/logo-svg.svg"

import { AppButton } from "@components/Button";
import { CustomInput } from '@components/index';
import { useDialog } from '@context/DialogContext/useDialog';
import { Loading } from '@components/Loading/Loading';

export default function Index() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState<Login>(new Login());
  const { handleLogin } = useContext(UserContext);
  const { isMobile } = UseMobile();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { showSuccessDialog } = useDialog();

  const handleUserLogin = async () => {
    try{ 
      setIsLoading(true);
      await handleLogin(login.email, login.password);
      navigate("/");
    } catch(err: any){   
      const responseToPT = err.response.data[0].includes('User and/or password are incorrect') ? 'Usuario ou senha incorreto' : err.response.data.erros[0]
      showSuccessDialog({
        title: responseToPT ?? 'Ocorreu um erro',
        onConfirm () {
        },
      })
    }
    finally{
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box
      width="100%" 
      height="100vh"
      alignItems="center"
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      padding={isMobile? "1.563rem" : "0"}
      boxSizing={"border-box"}
    >
      {
        isLoading && <Loading/>}
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
        gap={'1rem'}
        justifyContent="center"
        px={2}
      >
        <Typography variant="h4" sx={{ textAlign: "left", fontWeight: "600", marginBottom: '1rem', 
        color: '#380478'
        }}>
          Bem vindo!
        </Typography>
        <CustomInput
          label="Email ou Celular"
          labelVariant='secondary'
          value={login.email}
          onChange={(event) => {
            setLogin({ ...login, email: event.target.value });
          }}
        />
        <CustomInput
          label="Senha"
          labelVariant='secondary'
          value={login.password}
          onChange={(event) => {
            setLogin({ ...login, password: event.target.value });
          }}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}/>
        <Link
          to="/esqueci-senha" 
        >
          <Typography
            sx={{
              textDecoration: "underline",
              color: '#380478',
              marginTop: '-1rem',
              mb: 4
            }}
          >Esqueceu sua senha?</Typography>
        </Link>
        <AppButton title="Entrar" buttonVariant="primary" onClick={handleUserLogin} />
        <Link to="/cadastro" style={{ color: "white", width: "100%" }}>
          <AppButton title="Cadastrar" buttonVariant="secondary" />
        </Link>
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
