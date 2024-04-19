import { AppButton } from '@components/Button'
import { CustomInput } from '@components/index'
import { useUser } from '../../hooks/use-user'
import { Box, Typography } from '@mui/material'
import { Plan } from '@pages/Plans/Models/PlansModel'
import { PlansService } from '@pages/Plans/Services/PlansService'
import { CARDMask, CEPMask, CPFMask, CVVMask, CartaoNameMask, MonthMask, TELEFONEMask, YearMask } from '@utils/mask/mask'
import { validationFlag } from '@utils/mask/validationFlag'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UserService } from '../../services/user/userService'
import { useDialog } from '@context/DialogContext/useDialog'
import { Loading } from '@components/Loading/Loading'
 
interface CreditCard {
  holderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  ccv: string;
}

interface CreditCardHolderInfo {
  name: string;
  email: string;
  cpfCnpj: string;
  postalCode: string;
  addressNumber: string;
  phone: string;
}

interface SubscribeProps {
  userId: number;
  planId: number;
  creditCard: CreditCard;
  creditCardHolderInfo: CreditCardHolderInfo;
}

export function SubscribePage(){

  const [plan, setPlan] = useState<Plan>()
  const [searchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)


  const navigate = useNavigate()

  const initialData: SubscribeProps = {
    userId: 0,
    planId: 0,
    creditCard: {
      holderName: '',
      number: '',
      expiryMonth: '',
      expiryYear: '',
      ccv: ''
    },
    creditCardHolderInfo: {
      name: '',
      email: '123123',
      cpfCnpj: '',
      postalCode: '',
      addressNumber: '',
      phone: ''
    }
  }

  const [errors, setErrors] = useState({
    creditCard: {
      holderName: '',
      number: '',
      expiryMonth: '',
      expiryYear: '',
      ccv: ''
    },
    creditCardHolderInfo: {
      name: '', 
      cpfCnpj: '',
      postalCode: '',
      addressNumber: '',
      phone: ''
    }
  })

  function ValidateForm(shouldSet?: boolean){
    const newErrors = {
      creditCard: {
        holderName: '',
        number: '',
        expiryMonth: '',
        expiryYear: '',
        ccv: ''
      },
      creditCardHolderInfo: {
        name: '',
        email: '',
        cpfCnpj: '',
        postalCode: '',
        addressNumber: '',
        phone: ''
      }
    }

    if(data.creditCard.holderName.length < 3){
      newErrors.creditCard.holderName = 'Nome do titular inválido'
    }

    if(data.creditCard.number.length < 16 || !validationFlag(data.creditCard.number)){
      newErrors.creditCard.number = 'Número do cartão inválido'
    }

    if(data.creditCard.expiryMonth.length < 2){
      newErrors.creditCard.expiryMonth = 'Mês de expiração inválido'
    }

    if(data.creditCard.expiryYear.length < 4){
      newErrors.creditCard.expiryYear = 'Ano de expiração inválido'
    }

    if(data.creditCard.ccv.length < 3){
      newErrors.creditCard.ccv = 'CCV inválido'
    }

    if(data.creditCardHolderInfo.name.length < 3){
      newErrors.creditCardHolderInfo.name = 'Nome inválido'
    }
 

    if(data.creditCardHolderInfo.cpfCnpj.length < 11){
      newErrors.creditCardHolderInfo.cpfCnpj = 'CPF inválido'
    }

    if(data.creditCardHolderInfo.postalCode.length < 8){
      newErrors.creditCardHolderInfo.postalCode = 'CEP inválido'
    }

    if(data.creditCardHolderInfo.addressNumber.length < 1){
      newErrors.creditCardHolderInfo.addressNumber = 'Número do endereço inválido'
    }

    if(data.creditCardHolderInfo.phone.length < 11){
      newErrors.creditCardHolderInfo.phone = 'Telefone inválido'
    }
    if(shouldSet){
      setErrors(newErrors)
    }
    
    return Object.values(newErrors).every((error) => Object.values(error).every((value) => value === ''))
  }

  const [data, setData] = useState<SubscribeProps>(initialData)

  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => { 
    const isFilled = data.creditCard.holderName.length >  0 && data.creditCard.number.length >  0 && data.creditCard.expiryMonth.length >  0 && data.creditCard.expiryYear.length >  0 && data.creditCard.ccv.length >  0 && data.creditCardHolderInfo.name.length >  0   && data.creditCardHolderInfo.cpfCnpj.length >  0 && data.creditCardHolderInfo.postalCode.length >  0 && data.creditCardHolderInfo.addressNumber.length >  0 && data.creditCardHolderInfo.phone.length >  0;
    if(Object.values(errors).some((error) => Object.values(error).some((value) => value !== ''))){
      ValidateForm(true)
    }
    setIsDisabled(!isFilled);
  }, [
    data.creditCard.holderName.length,
    data.creditCard.number.length,
    data.creditCard.expiryMonth.length,
    data.creditCard.expiryYear.length,
    data.creditCard.ccv.length,
    data.creditCardHolderInfo.name.length,
    data.creditCardHolderInfo.email.length,
    data.creditCardHolderInfo.cpfCnpj.length,
    data.creditCardHolderInfo.postalCode.length,
    data.creditCardHolderInfo.addressNumber.length,
    data.creditCardHolderInfo.phone.length,
    errors,
  ]);

  async function fetchPlan(){ 
    const planId = searchParams.get('planoid')
    if(!planId) return
    const response = await PlansService.GetById(+planId)
    if(response){
      setPlan(response)
    }
  }

  useEffect(()=>{
    fetchPlan()
  },[])

  const {user, setUser} = useUser()
  const {
    showSuccessDialog
  } = useDialog()

  async function submit(){
    if(ValidateForm(true)){
      const planId = searchParams.get('planoid')
      if(!planId) return
      try{
        setIsLoading(true)
        const newData = {
          ...data,
          userId: user.id,
          planId: + planId!,
          creditCard: {
            ...data.creditCard,
            number: data.creditCard.number.replace(/\D/g, '')
          },
          creditCardHolderInfo: {
            ...data.creditCardHolderInfo,
            cpfCnpj: data.creditCardHolderInfo.cpfCnpj.replace(/\D/g, ''),
            postalCode: data.creditCardHolderInfo.postalCode.replace(/\D/g, ''),
            email: user.email,
            phone: data.creditCardHolderInfo.phone.replace(/\D/g, '')
          }
        }
        await UserService.SubscribeToPlan(newData)
        setTimeout(async () => {  
          const newUser = await UserService.Get(+user.id!)
          setUser(newUser)
          localStorage.setItem('user', JSON.stringify(newUser))
          showSuccessDialog({
            title: 'Plano assinado com sucesso',
            onConfirm () {
              navigate('/')
            },
          })
        }, 1000)
    } catch(err: any){ 
      showSuccessDialog({
        title: err.response.data.erros[0] ?? 'Ocorreu um erro',
        onConfirm () {
        },
      })
    }finally{
      setIsLoading(false)
    }

    }
  }



  return (
    <Box
      sx={{ 
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {
        isLoading && <Loading/>
      }
      <Typography
        variant='h1'
        sx={{
          fontSize: "32px",
          fontWeight: "600",
          color: '#380478',
          padding: "1.5rem 1.5rem 0",
        }}>
          Finalizar compra
        </Typography>
      <Box
        sx={{
          padding: "1.5rem",
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          gap: "1rem",
          '@media (max-width: 760px)': {
            flexDirection: "column-reverse",
            pt: 0
          }
        }}
      >
        <Box
          sx={{ 
            width: "100%",
            display: "flex",
            flexDirection: "column", 
          }}
        >
          <Typography
            variant='h2'
            sx={{
              fontSize: "1.5rem",
              fontWeight: "600", 
              color: '#380478',
              pb:2
            }}
          >
            Dados do Cartão
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              width: "100%", 
              '@media (max-width: 450px)': {
                flexWrap: "wrap",
                rowGap: 0
              }
            }}
            >
              <CustomInput
                value={data.creditCard.holderName}
                onChange={(value)=>setData({...data, creditCard: {...data.creditCard, holderName: CartaoNameMask(value.target.value)}, creditCardHolderInfo: {...data.creditCardHolderInfo, name: CartaoNameMask(value.target.value)}})}
                label="Nome do titular"
                placeholder="Nome do titular" 
                BoxStyle={{
                  width: "100%"
                }}
                error={errors.creditCard.holderName}
              />
              <CustomInput
                value={data.creditCard.number}
                onChange={(value)=>setData({...data, creditCard: {...data.creditCard, number: CARDMask(value.target.value)}})}
                label="Número do cartão"
                placeholder="Número do cartão"
                BoxStyle={{
                  width: "100%"
                }}
                error={errors.creditCard.number}
              />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              width: "100%", 
              '@media (max-width: 450px)': {
                flexWrap: "wrap",
                justifyContent: "space-between",
                rowGap: 0
              }
            }}>
              <CustomInput
                value={data.creditCard.expiryMonth}
                onChange={(value)=>  setData({...data, creditCard: {...data.creditCard, expiryMonth: MonthMask(value.target.value)}})}
                label="Mês de expiração"
                placeholder="Mês de expiração"
                BoxStyle={{
                  width: "100%",
                  '@media (max-width: 450px)': {
                    width: '40%'
                  }
                }}
                error={errors.creditCard.expiryMonth}
              />
              <CustomInput
                value={data.creditCard.expiryYear}
                onChange={(value)=>setData({...data, creditCard: {...data.creditCard, expiryYear: YearMask(value.target.value)}})}
                label="Ano de expiração"
                placeholder="Ano de expiração" 
                BoxStyle={{
                  width: "100%",
                  '@media (max-width: 450px)': {
                    width: '50%'
                  }
                }}
                error={errors.creditCard.expiryYear}
              />
              <CustomInput
                value={data.creditCard.ccv}
                onChange={(value)=>setData({...data, creditCard: {...data.creditCard, ccv: CVVMask(value.target.value)}})}
                label="CCV"
                placeholder="CCV"
                BoxStyle={{
                  width: "100%"
                }}
                error={errors.creditCard.ccv}
              />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              width: "100%", 
            }}>
              <CustomInput
                value={data.creditCardHolderInfo.postalCode}
                onChange={(value)=>setData({...data, creditCardHolderInfo: {...data.creditCardHolderInfo, postalCode: CEPMask(value.target.value)}})}
                label="CEP"
                placeholder="CEP"
                BoxStyle={{
                  width: "100%"
                }}
                error={errors.creditCardHolderInfo.postalCode}
              />
              <CustomInput
                value={data.creditCardHolderInfo.addressNumber}
                onChange={(value)=>setData({...data, creditCardHolderInfo: {...data.creditCardHolderInfo, addressNumber: value.target.value}})}
                label="Número do endereço"
                placeholder="Número do endereço"
                BoxStyle={{
                  width: "100%"
                }}
                type='number'
                error={errors.creditCardHolderInfo.addressNumber}
              />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              width: "100%", 
            }}>
              <CustomInput
                value={data.creditCardHolderInfo.cpfCnpj}
                onChange={(value)=>setData({...data, creditCardHolderInfo: {...data.creditCardHolderInfo, cpfCnpj: CPFMask(value.target.value)}})}
                label="CPF"
                placeholder="CPF"
                BoxStyle={{
                  width: "100%"
                }}
                error={errors.creditCardHolderInfo.cpfCnpj}
              />
              <CustomInput
                value={data.creditCardHolderInfo.phone}
                onChange={(value)=>setData({...data, creditCardHolderInfo: {...data.creditCardHolderInfo, phone: TELEFONEMask(value.target.value)}})}
                label="Telefone"
                placeholder="Telefone"
                BoxStyle={{
                  width: "100%"
                }}
                error={errors.creditCardHolderInfo.phone}
              />
              {/* <CustomInput
                value={data.creditCardHolderInfo.email}
                onChange={(value)=>setData({...data, creditCardHolderInfo: {...data.creditCardHolderInfo, email: value.target.value}})}
                label="Email"
                placeholder="Email"
                BoxStyle={{
                  width: "100%"
                }}
                error={errors.creditCardHolderInfo.email}
              /> */}

          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              background: '#EEE8FA',
              padding: "1.5rem",
              borderRadius: '16px', 
              display: "flex",
              width: "100%",
              flexDirection: "column",
              gap: "1rem",
              height: "fit-content",
            }}
          >
            <Typography
              variant='h2'
              sx={{
                fontSize: "1.5rem",
                fontWeight: "600",
                borderBottom: '2px solid #A29DB1',
                color: '#380478',
                pb:2
              }}
            >
              Dados do Plano
            </Typography>
            <Typography
              sx={{ 
                color: '#380478',
                fontWeight: '700'
              }}
            >
              {plan?.name}
            </Typography>
            <Typography
              sx={{ 
                color: '#380478'
              }}
            >
              <strong>Valor:</strong> {plan?.price}/mês 
            </Typography> 
          </Box>
          
          <AppButton
            buttonVariant='primary'
            title='Finalizar compra'
            disabled={isDisabled} 
            onClick={submit}
            sx={{
              width: '200px',
              '@media (max-width: 760px)': {
                width: '100%',
                display:'none'
              }
            }}
          /> 
        </Box>

      </Box>
      <Box
        sx={{
          px: '1.5rem',
          pb: '1.5rem',
        }}
      >
        <AppButton
          buttonVariant='primary'
          title='Finalizar compra'
          disabled={isDisabled} 
          onClick={submit}
          sx={{
            width: '100%',
            '@media (min-width: 760px)': {
              display:'none'
            }
          }}
          />
      </Box>
    </Box>

  )
}