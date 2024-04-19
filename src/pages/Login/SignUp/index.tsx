import {
  Box,
  IconButton,
  InputAdornment,
  Stack, 
  Typography,
} from "@mui/material";
import { UseMobile } from "@context/mobileContext";
import { useEffect, useState } from "react";
import { SignUp } from "./models/SignUp";
import { SignUpService } from "./services/signUpService";
import { useNavigate } from "react-router-dom";
import BGLogin from "@assets/bg-login.png";
import Logo from "@assets/logo-svg.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AppButton } from "@components/Button";
import { CEPMask, CLEARMasks, CPFMask, TELEFONEMask } from "@utils/mask/mask";
import { emailRegex } from '@utils/regex/email';
import { CustomInput } from '@components/index';
import { useDialog } from '@context/DialogContext/useDialog';
import { Loading } from '@components/Loading/Loading';

export default function Index() {
  const [signUp, setSignUp] = useState<SignUp>(new SignUp());
  const [showPassword, setShowPassword] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isMobile } = UseMobile();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [canSignIn, setCanSignIn] = useState(false);


  const [erros, setErros] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf: "",
    phone: "",
    cep: "",
  });

  const validate = () => {
    const localErros = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      cpf: "",
      phone: "",
      cep: "",
    }; 
    if (step == 1) {
      if (signUp.name.length < 3) localErros.name = "Nome inválido";
      if (!CPFMask(signUp.cpf).match(/\d{3}\.\d{3}\.\d{3}-\d{2}/)) (localErros.cpf = "CPF inválido");
      if (!TELEFONEMask(signUp.phone).match(/\(\d{2}\)\s\d{5}-\d{4}/)) (localErros.phone = "Telefone inválido");
      if (!CEPMask(signUp.cep).match(/\d{5}-\d{3}/)) (localErros.cep = "CEP inválido");
    }
    if (step == 2) {
      if (!signUp.email.match(emailRegex)) localErros.email = "E-mail inválido";
      if (signUp.password.length < 6) localErros.password = "A senha deve conter no minimo 6 caracteres";
      if (signUp.confirmPassword != signUp.password) localErros.confirmPassword = "Senhas não conferem";
    }

    setErros(localErros);
    return Object.values(localErros).every((v) => v === "");
  };


  const {showSuccessDialog} = useDialog()


  const handleSignUp = async () => {
    const isValid = validate();
    if(!isValid) return;
    if (step == 1) {
      setStep(2);
    } else {
      try{
        setIsLoading(true);
        if (signUp.password != signUp.confirmPassword) return;
        signUp.createdAt = new Date().toISOString();
        signUp.cep = CLEARMasks(signUp.cep);
        signUp.cpf = CLEARMasks(signUp.cpf);
        signUp.phone = CLEARMasks(signUp.phone);
        const response = await SignUpService.Post(signUp);
        if (response) setCanSignIn(true);
      } catch(err: any){  
        const responseToPT = err.response.data.erros[0].includes('There is already an actived user registered') ? 'Já existe um usuário cadastrado com esse e-mail ou cpf' : err.response.data.erros[0]
        showSuccessDialog({
          title: responseToPT ?? 'Ocorreu um erro',
          onConfirm () {
            setStep(1)
          },
        })
      }finally{
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if(!Object.values(erros).every((v) => v === "")){
      const isValid = validate()
      setIsFormInvalid(!isValid);
      return
    }
    if (
      step == 1 &&
      signUp.cep.trim() != "" &&
      signUp.cpf.trim() != "" &&
      signUp.name.trim() != "" &&
      signUp.phone.trim() != ""
    ) {
      setIsFormInvalid(false);
      return;
    }
    if (
      step == 2 &&
      signUp.email.trim() != "" &&
      signUp.password.trim() != "" &&
      signUp.confirmPassword.trim() != "" &&
      signUp.confirmPassword === signUp.password
    ) {
      setIsFormInvalid(false);
      return;
    }

    return setIsFormInvalid(true);
  }, [signUp]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  return (
    <Box
      width="100%"
      height="100vh" 
      alignItems="center"
      display="flex"
      flexDirection={isMobile ? "column" : "row"} 
      boxSizing={"border-box"}
    >
      {
        isLoading && <Loading
        />
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
        gap={1}
        justifyContent="center"
        px={2}
      >
        {
          canSignIn ? <Stack
          sx={{
            display: "flex",
            flexDirection: "column", 
            gap: 8,
            alignItems: "center",
            height: '100%',
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "left", fontWeight: "600", fontSize: "32px",
            color: theme => theme.palette.secondary.main
          }}
          >
            Cadastro Efetuado!
          </Typography>
          <AppButton
          buttonVariant="primary"
          title='Fazer Login'
          onClick={() => navigate('/')}
          sx={{
            width: '100%',
          }}
          />
        </Stack>
        :
        <>
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
            sx={{ textAlign: "left", fontWeight: "600", fontSize: "32px",
            color: theme => theme.palette.secondary.main
          }}
          >
            {step == 1 ? "Dados pessoais" : "Dados de acesso"}
          </Typography>
          <Typography
            variant="h6"
            sx={{ textAlign: "left", fontWeight: "600", fontSize: "16px" }}
          >
            {`Etapa ${step} de 2`}
          </Typography>
        </Stack>

        {step == 1 && (
          <>
            <CustomInput
              label="Nome Completo"
              value={signUp.name}
              labelVariant='secondary'
              onChange={(event) => {
                setSignUp({ ...signUp, name: event.target.value });
              }}
              error={erros.name}
            
            /> 
            <CustomInput
              label="CPF"
              value={CPFMask(signUp.cpf)}
              labelVariant='secondary'
              onChange={(event) => {
                setSignUp({ ...signUp, cpf: CPFMask(event.target.value) });
              }}
              error={erros.cpf}
            /> 
            <CustomInput
              label="Telefone"
              value={TELEFONEMask(signUp.phone)}
              labelVariant='secondary'
              onChange={(event) => {
                setSignUp({ ...signUp, phone: TELEFONEMask(event.target.value) });
              }}
              error={erros.phone}
            />
            <CustomInput
              label="CEP"
              value={CEPMask(signUp.cep)}
              labelVariant='secondary'
              onChange={(event) => {
                setSignUp({ ...signUp, cep: CEPMask(event.target.value) });
              }}
              error={erros.cep}
            />
          </>
        )}
        {step == 2 && (
          <>
            <CustomInput
              label="E-mail"
              value={signUp.email}
              labelVariant='secondary'
              onChange={(event) => {
                setSignUp({ ...signUp, email: event.target.value });
              }}
              error={erros.email}
            /> 
            <CustomInput
              label="Senha"
              value={signUp.password}
              labelVariant='secondary'
              onChange={(event) => {
                setSignUp({ ...signUp, password: event.target.value });
              }}
              error={erros.password}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            /> 
            <CustomInput
              label="Confirmar Senha"
              value={signUp.confirmPassword}
              labelVariant='secondary'
              onChange={(event) => {
                setSignUp({ ...signUp, confirmPassword: event.target.value });
              }}
              error={erros.confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}/>
          </>
        )}

        <AppButton
          buttonVariant="primary"
          title={step == 1 ? "Avançar" : "Cadastrar"}
          onClick={() => handleSignUp()}
          disabled={isFormInvalid}
        />
      </>
      }
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
