
import { IError } from '@Models/Error' 
import { SalesCard } from '@components/SalesCard/SalesCard'
import { useDialog } from '@context/DialogContext/useDialog'
import { CurrencyExchange, GroupOutlined, PaidOutlined, } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material' 
import { UserService } from '@services/user/userService'
import { PlanDashboard } from 'Models/Plans'
import React  from 'react'
import { GoDownload } from 'react-icons/go' 


export function ADMReceiptDashboard(
  {
    dashboardData,
    setIsLoading
  } : {
    dashboardData: PlanDashboard | undefined,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  }
) {
  
    const {showSuccessDialog} = useDialog()

    const handleDownload = async (type: 'receitas' | 'professor' | 'saldoProfessor') => {
      if(type === 'receitas'){
        try{
          setIsLoading(true)
          const link = await UserService.GetAdmReceipts() as string
          window.open(link, '_blank')
        } catch (error) {
          const err = error as IError
          const message = err.response?.data?.erros[0] ?? 'Erro ao baixar arquivo'
          showSuccessDialog({
            title: message,
            onConfirm: () => {}
          })
        }finally{
          setIsLoading(false)
        }
      }
      if(type === 'professor'){
        try{
          setIsLoading(true)
          const link = await UserService.GetAdmProfessorsPdf() as string
          window.open(link, '_blank')
        } catch (error) {
          const err = error as IError
          const message = err.response?.data?.erros[0] ?? 'Erro ao baixar arquivo'
          showSuccessDialog({
            title: message,
            onConfirm: () => {}
          })
        }finally{
          setIsLoading(false)
        }
      }
      if(type === 'saldoProfessor'){
        try{
          setIsLoading(true)
          const link = await UserService.GetAdmProfessorsReceiptsPdf() as string
          window.open(link, '_blank')
        } catch (error) {
          const err = error as IError
          const message = err.response?.data?.erros[0] ?? 'Erro ao baixar arquivo'
          showSuccessDialog({
            title: message,
            onConfirm: () => {}
          })
        }finally{
          setIsLoading(false)
        }
      }

    } 
 

    return (
      <>     
      
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: '1rem',
      }}
    > 
    <Typography
      sx={{
        color: '#A29DB1',
        '@media (max-width: 760px)': {
          display: 'none'
        }
      }}
    >
      Aqui está o balanço de vendas dos últimos 30 dias
    </Typography>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "2rem",
        '@media (max-width: 760px)': {
          display: 'flex',
          jsutifyContent: 'start',
          gap: '1rem',
          flexWrap: 'wrap'
        }
      }}
    >
      <Typography
          variant="h6"
          sx={{
            color: theme => theme.palette.primary.main,
            cursor: "pointer",
            fontSize: ".875rem",
            width: "fit-content",
            fontWeight: 700,
              textDecoration: "underline",
            display: 'flex',
            gap: '.4rem',
            alignItems: 'center',
          }}
          onClick={() => handleDownload('receitas')}
        >
            <GoDownload/>  Receitas 
        </Typography>
      <Typography
          variant="h6"
          sx={{
            color: theme => theme.palette.primary.main,
            cursor: "pointer",
            fontSize: ".875rem",
            width: "fit-content",
            fontWeight: 700,
              textDecoration: "underline",
            display: 'flex',
            gap: '.4rem',
            alignItems: 'center',
            '@media (max-width: 760px)': {
              width: "70%",
            }
          }}
          onClick={() => handleDownload('professor')}
        >
            <GoDownload/>  Professor/Escolas 
        </Typography>
      <Typography
          variant="h6"
          sx={{
            color: theme => theme.palette.primary.main,
            cursor: "pointer",
            fontSize: ".875rem",
            width: "fit-content",
            fontWeight: 700,
              textDecoration: "underline",
            display: 'flex',
            gap: '.4rem',
            alignItems: 'center',
          }}
          onClick={() => handleDownload('saldoProfessor')}
        >
            <GoDownload/>  Saldo mensal professor 
        </Typography>
    </Box>

    </Box>
        <Grid container spacing={2} sx={{
          marginTop: "1.5rem",
        }}>
          <Grid item xs={12} md={6}>
            <SalesCard.Box>
              <SalesCard.Title>
                <PaidOutlined/>
              </SalesCard.Title>
              <SalesCard.Content>
                <Typography variant="h4">
                  {
                    dashboardData ? Number(dashboardData?.totalReceiptsPerMonth).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ 00,00'
                  }
                </Typography>
              </SalesCard.Content>
              <SalesCard.Footer>
                Receitas no mês
              </SalesCard.Footer>
            </SalesCard.Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <SalesCard.Box>
              <SalesCard.Title>
                <GroupOutlined/>
              </SalesCard.Title>
              <SalesCard.Content>
                <Typography variant="h4">
                  {
                    dashboardData?.subscribes || 0
                  }
                </Typography>
              </SalesCard.Content>
              <SalesCard.Footer>
                Assinantes
              </SalesCard.Footer>
            </SalesCard.Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <SalesCard.Box>
              <SalesCard.Title>
                <CurrencyExchange/>
              </SalesCard.Title>
              <SalesCard.Content>
                <Typography variant="h4">
                  {
                    dashboardData?.reimbursement || 0
                  }
                </Typography>
              </SalesCard.Content>
              <SalesCard.Footer>
                Reembolsos
              </SalesCard.Footer>
            </SalesCard.Box>
          </Grid>
          </Grid>
          <Grid container spacing={2}
            sx={{
              marginTop: ".5rem",
              overflowX: "auto",
              '@media (max-width: 760px)': {
                display: 'none'
              }
            }}
            >
          {
            dashboardData && dashboardData.totalReceiptPlansPerMonth && dashboardData.totalReceiptPlansPerMonth.length> 0 && dashboardData.totalReceiptPlansPerMonth.map((plan, index) => (
              <Grid key={index} item xs={12} md={3}>
                <SalesCard.Box>
                  <SalesCard.Title>
                    <Typography variant="subtitle1">
                      {plan.name}
                    </Typography>
                    <Typography variant="subtitle2"
                      sx={{
                        backgroundColor: '#480798',
                        color: 'white',
                        padding: '0 2rem',
                        borderRadius: '1rem'
                      }}
                    >
                      {plan.subscribes} Inscrições
                    </Typography>
                  </SalesCard.Title>
                  <SalesCard.Content>
                    <Typography variant="h4">
                      {
                        Number(plan.receipts).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                      }
                    </Typography>
                  </SalesCard.Content>
                  <SalesCard.Footer>
                    Receita no mês
                  </SalesCard.Footer>
                </SalesCard.Box>
              </Grid>
            ))
          } 
           
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "2rem",
            marginTop: "2rem",
            paddingBottom: '.5rem',
            overflowX: "auto",
            '@media (min-width: 760px)': {
              display: 'none'
            },
            '&::-webkit-scrollbar': {
              height: "4px",
              width: "3px",
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#F5006A',
              borderRadius: "4px",
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#F4F4F4',
              borderRadius: "4px",
            },
            '& .MuiGrid-item': {
              minWidth: "80%",
            }
          }}
        >
          {
            dashboardData && dashboardData.totalReceiptPlansPerMonth && dashboardData.totalReceiptPlansPerMonth.length> 0 && dashboardData.totalReceiptPlansPerMonth.map((plan, index) => (
              <Grid key={index} item xs={12} md={3}>
                <SalesCard.Box>
                  <SalesCard.Title>
                    <Typography variant="subtitle1">
                      {plan.name}
                    </Typography>
                    <Typography variant="subtitle2"
                      sx={{
                        backgroundColor: '#480798',
                        color: 'white',
                        padding: '0 2rem',
                        borderRadius: '1rem'
                      }}
                    >
                      {Number(plan.subscribes)} Inscrições
                    </Typography>
                  </SalesCard.Title>
                  <SalesCard.Content>
                    <Typography variant="h4">
                      {
                        Number(plan.receipts).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                      }
                    </Typography>
                  </SalesCard.Content>
                  <SalesCard.Footer>
                    Receita no mês
                  </SalesCard.Footer>
                </SalesCard.Box>
              </Grid>
            ))
          }
        </Box>

          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "2rem",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color:'#380478'
              }}
            >
              Upload FAQ
            </Typography>
          </Box>
          
      <Typography
          variant="h6"
          sx={{
            color: theme => theme.palette.primary.main,
            cursor: "pointer",
            fontSize: ".875rem",
            width: "fit-content",
            fontWeight: 700,
              textDecoration: "underline",
            display: 'flex',
            gap: '.4rem',
            alignItems: 'center',
            pt: 2
          }}
        >
            <GoDownload/>  Upload 
        </Typography> */}
          
        </>
    )
}