import { AppButton } from '@components/Button'
import { CustomInput } from '@components/Input/Input'
import { useUser } from '../../hooks/use-user'
import { Box, Grid, Typography } from '@mui/material'
import { CEPMask, CPFMask, TELEFONEMask } from '@utils/mask/mask' 
import { useEffect, useState } from 'react'
import { AuthService, UserService } from '../../services/user/userService' 
import { useDialog } from '@context/DialogContext/useDialog'
import { Loading } from '@components/Loading/Loading'

interface IUserForm {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  cep: string;
  email: string;
  coin: number;
  active: boolean;
  isAdmin: boolean;
  isProfessor: boolean;
  planId: number | null;
  plan: any; // tipo genérico para o plano, se houver
  subscriptions?: any[]; // tipo genérico para as inscrições, se houver
  password?: string;
  confirmPassword?: string;
  newPassword?: string;

}
class UserForm implements IUserForm {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  cep: string;
  email: string;
  coin: number;
  active: boolean;
  isAdmin: boolean;
  isProfessor: boolean;
  planId: number | null;
  plan: any; 
  subscriptions: any[]; 
  password?: string;
  confirmPassword?: string;
  newPassword?: string;


  constructor() {
    this.id = 1; // Se o id padrão for diferente, ajuste aqui
    this.name = "";
    this.cpf = "";
    this.phone = "";
    this.cep = "";
    this.email = "";
    this.coin = 0;
    this.active = false;
    this.isAdmin = true;
    this.isProfessor = true;
    this.planId = null;
    this.plan = null;
    this.subscriptions = [];
  }
}

export const SettingsPage: React.FC = () => {

  const [step, setStep] = useState(0)

  const [formData, setFormData] = useState<IUserForm>(new UserForm());

  const [defaultUserValues, setDefaultUserValues] = useState<IUserForm>(new UserForm())

  const [isDisabled, setIsDisabled] = useState(false)

  const [isValueEqual, setIsValueEqual] = useState(false)

  const {user, setUser} = useUser()

  const { showSuccessDialog, openDialog } = useDialog()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(user){
      const { id, name, cpf, phone, cep, email, coin, active, isAdmin, isProfessor, planId, plan, subscriptions } = user as any
      setFormData({
        id, name, cpf, phone, cep, email, coin, active, isAdmin, isProfessor, planId, plan, subscriptions
      })
    }
  }, [user])

  const handleEditUser = async () => {
    setIsLoading(true)
    try{
      delete formData.subscriptions
      const response = await UserService.Put(formData.id, formData as any)

      if(response){
        setDefaultUserValues(response)
        setUser(response)
        localStorage.setItem('user', JSON.stringify(response))
        setFormData(response)
        
      if(!formData.password){
        showSuccessDialog({
          title: 'Usuário atualizado com sucesso',
          onConfirm: () => {},
        })
      }

      }
  } catch (error : any){
    showSuccessDialog({
      title: error.response.data.erros[0] ?? 'Ocorreu um erro ao atualizar o usuario',
      onConfirm: () => {},
    })
  }


    if(formData.password){
      if(formData.email && formData.confirmPassword && formData.newPassword){
        try{

          const changePassword = {
            password: formData.password,
            newPassword: formData.newPassword,
            confirmNewPassword: formData.confirmPassword,
          }
          await AuthService.changePassword(changePassword)
          showSuccessDialog({
            title: 'Senha alterada',
            onConfirmText: 'Ok',
            onConfirm: () => {}
          })
        } catch (error : any){
          const message = error.response.data.erros[0] ?? 'Ocorreu um erro'

          const title = message.includes('Invalid password!') ? 'Senha inválida' : message

          

          showSuccessDialog({
            title,
            onConfirm: () => {},
          })
        }
      }
    }

    setIsLoading(false)


  }

  // useEffect(() => {
  //   const user = {
  //     id: 1,
  //     name: 'Lucas',
  //     email: 'lucas@email.com.br',
  //     cep: '12345678',
  //     password: '123456',
  //     newPassword: '',
  //     confirmPassword: '',
  //     phone: '123456789',
  //     cpf: '12345678900'
  //   }
  //   setDefaultUserValues(user)
  //   setFormData(user)
  // } , [])


  const validateForm = () => {
    
    const { name, email, phone, cep, password, newPassword, confirmPassword } = formData
    const erros = {
      name: '',
      email: '',
      phone: '',
      cep: '',
      senha: '',
      novaSenha: '',
      confirmarSenha: ''
    }
    if(name === ''){
      erros.name = 'Campo obrigatório'
    }
    if(email === ''){
      erros.email = 'Campo obrigatório'
    }
    if(phone === ''){
      erros.phone = 'Campo obrigatório'
    }
    if(cep === ''){
      erros.cep = 'Campo obrigatório'
    }
    if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)){
      erros.email = 'E-mail inválido';
    }
    if(TELEFONEMask(phone).length < 14){
      erros.phone = 'Telefone inválido'
    }
    if(CEPMask(cep).length < 8){
      erros.cep = 'CEP inválido'
    }
    if(password && password !== ''){
      if(newPassword === '' || !newPassword){
        erros.novaSenha = 'Campo obrigatório'
      }
      if(confirmPassword === ''){
        erros.confirmarSenha = 'Campo obrigatório'
      }
      if(newPassword !== confirmPassword){
        erros.confirmarSenha = 'As senhas não coincidem'
      }
      if(newPassword && newPassword.length < 6){
        erros.novaSenha = 'A senha deve ter no mínimo 6 caracteres'
      }
      if(password.length < 6){
        erros.senha = 'A senha deve ter no mínimo 6 caracteres'
      }
    }
    
    const hasError = Object.values(erros).some(error => error !== '')
    
    setFormErrors(erros)

    return hasError


  }

  useEffect(() => {
    if(JSON.stringify(defaultUserValues) === JSON.stringify(formData)){
      setIsValueEqual(true)
      return
    }
    setIsValueEqual(false)

    const shouldDisable = validateForm()
    setIsDisabled(shouldDisable)

  }, [{...formData}])

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    cep: '',
    senha: '',
    novaSenha: '',
    confirmarSenha: ''
  })
  

  useEffect(() => {
  }, [formData])

  const handleSubmitCancelPlan = async () => {
    try{
    setIsLoading(true)
    await UserService.UnsubscribeToPlan(user.email)
    showSuccessDialog({
      title: 'Plano cancelado com sucesso',
      onConfirm: () => {},
    })
    const newUser = {...user, plan: undefined, planId: undefined}
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
  }
  catch (error : any){
    showSuccessDialog({
      title: 'Erro ao cancelar plano',
      onConfirm: () => {},
    })
  }finally{
    setIsLoading(false)
  }
  }



  const handleCancelPlan = () => {
    openDialog({
      title: 'Deseja cancelar sua assinatura?',
      onConfirm: () => handleSubmitCancelPlan(),   
    })
  }
  

  return <Box
    sx={{
      height: "100%",
      width: "100%",
      padding: '2rem 1.5rem'
    }}
  >
    {
      isLoading && <Loading/>
    }
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: '1rem'
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: '#380478',
        }}
      >
        Configurações
      </Typography>
    </Box> 
    {
      user.plan && user.plan.id && <Box
        sx={{
          width: '50%',
          '@media (max-width: 760px)': {
            width: '100%',
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '1.5rem',
            color: '#380478',
          }}>
            Dados do seu plano
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              borderRadius: '1rem',
              gap: '3rem',
              backgroundColor: '#EEE8FA',
            }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  width: '100%',
                }}
              >
                  <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: theme => theme.palette.primary.main,
                    }}> Nome </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#380478',
                    }}> {user.plan.name} </Typography>
                  </Box>
                  <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: theme => theme.palette.primary.main,
                    }}> Valor </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#380478',
                    }}> R$ {user.plan.price} </Typography>
                  </Box>
                  <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: theme => theme.palette.primary.main,
                    }}> Moedas </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#380478',
                    }}> {user.plan.coinValue} </Typography>
                  </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  borderLeft: '1px solid #A29DB1',
                  height: '3rem',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: theme => theme.palette.primary.main,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                  onClick={handleCancelPlan}
                  > Cancelar Plano </Typography>
                  </Box>
          </Box>
          
      </Box>
    }
    <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: '1rem',
          marginBottom: '-1.5rem',
          color: theme => theme.palette.primary.main,
          '@media (min-width: 760px)': {
            display: 'none'
          }
        }}>
          Etapa {step + 1}/2
        </Typography>
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          '@media (max-width: 760px)': {
            display: step === 0 ? 'block' : 'none'
          }
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: '#380478',
            marginBottom: '1rem',
            marginTop: '2rem'
          }}>
            Dados pessoais
          </Typography>
          <Grid
            container
            spacing={2}
          >
            <Grid item xs={12}
              md={6}
            >
              <CustomInput
                label='Nome completo*'
                placeholder='Digite seu nome completo'
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                error={formErrors.name}
              />
            </Grid>
            <Grid item xs={12}
              md={6}
            >
              <CustomInput
                label='CPF'
                disabled
                fullWidth
                value={CPFMask(formData.cpf)} 
              />
            </Grid>
            <Grid item xs={12}
              md={6}
            >
              <CustomInput
                label='Telefone*'
                placeholder='Digite seu telefone'
                fullWidth
                value={TELEFONEMask(formData.phone)}
                type='phone'
                onChange={(e) => setFormData({...formData, phone: TELEFONEMask(e.target.value)})}
                error={formErrors.phone}
              />
            </Grid>
            <Grid item xs={12}
              md={6}
            >
              <CustomInput
                label='CEP'
                placeholder='Digite seu CEP'
                fullWidth
                value={CEPMask(formData.cep)}
                type='phone'
                onChange={(e) => setFormData({...formData, cep: CEPMask(e.target.value)})}
                error={formErrors.cep}
              />
            </Grid>

          </Grid>
      </Box>
      <Box
        sx={{
          '@media (max-width: 760px)': {
            display: step === 1 ? 'block' : 'none'
          }
        }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#380478',
              marginBottom: '1rem',
              marginTop: '2rem',
            }}>
            Dados de acesso
          </Typography>
          <Grid
            container
            spacing={2}>
            <Grid item xs={12}
              md={6}
            >
              <CustomInput
                label='E-mail*'
                placeholder='Digite seu e-mail'
                fullWidth
                type='email'
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                error={formErrors.email}
              />
              </Grid>
              <Grid item xs={12}
                md={6}
              >
                <CustomInput
                  label='Senha*'
                  placeholder='Digite sua senha'
                  fullWidth
                  type='password'
                  value={formData?.password ?? '******'}
                  error={
                    formErrors.senha
                  }
                  onChange={(e) => setFormData({...formData, password: e.target.value.startsWith('******') ? e.target.value.split('******')[1]: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}
                md={6}
              >
                <CustomInput
                  label='Nova senha*'
                  placeholder='Digite sua nova senha'
                  fullWidth
                  type='password'
                  value={formData?.newPassword ?? ''}
                  error={
                    formErrors.novaSenha
                  }
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}
                md={6}>
                <CustomInput
                  label='Confirmar senha*'
                  placeholder='Confirme sua nova senha'
                  fullWidth
                  type='password'
                  value={formData?.confirmPassword ?? ''}
                  error={
                    formErrors.confirmarSenha
                  }
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </Grid>
          </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: '2rem',
          '@media (max-width: 760px)': {
            justifyContent: 'center',
            '& *': {
              width: '100% !important',
              '& *':{
                width: '100% !important'
              }
            }
          }
        }}>
        <AppButton
          buttonVariant='primary'
          title='Confirmar'
          disabled={isDisabled || isValueEqual || isLoading}
          sx={{
            width: '200px',
            '@media (max-width: 760px)': {
              width: '100%',
              display: step === 0 ? 'none' : 'block'
            }
          }}
          onClick={() => handleEditUser()}
        />
        <AppButton
          buttonVariant='primary'
          title='Próximo'
          disabled={isDisabled}
          sx={{
             display: 'none',
            '@media (max-width: 760px)': {
              width: '100%',
              display: step === 1 ? 'none' : 'block'
            }
          }}
          onClick={() => setStep(1)}
        />
      </Box>
    </Box>

  </Box>
}