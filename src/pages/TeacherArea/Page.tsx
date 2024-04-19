import { AppButton } from '@components/Button'
import { TabsComponent } from '@components/Tabs/TabsComponent'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { GoDownload } from 'react-icons/go'
import { TeacherDashboard } from './Dashboard'
import { ReceiptPage } from './Receipts'
import { useUser } from '../../hooks/use-user'
import { ExtractService } from '../../services/extract/extractService'
import { UserService } from '../../services/user/userService'
import { ScheduledPaymentsService } from '../../services/plans/plansAdmService'
import { Loading } from '@components/Loading/Loading'
import { IError } from '@Models/Error'
import { useDialog } from '@context/DialogContext/useDialog'


export const TeacherArea: React.FC = () => {

  const [tab, setTab] = useState(0)

  
  const [receipts, setReceipts] = useState<any>()

  const [dashboardData, setDashboardData] = useState<any>()

  const [scheduledPayments, setScheduledPayments] = useState<any>()

  const [isLoading, setIsLoading] = useState(true)

  const {user} = useUser()

  const fetchData = async (obj?: any) => {
    try{
      setIsLoading(true)
      const query = {
        professorId: user?.id,
      pageSize: 1000,
      ...obj
      }
      const data = await ExtractService.Search(query)

      const [dashboardData, scheduledPayments] = await Promise.all([
        UserService.GetDashboardProfessor(),
        ScheduledPaymentsService.SearchByProfessorMail(user?.email)
      ])
 
      setDashboardData(dashboardData)
      setScheduledPayments(scheduledPayments)
      
      setReceipts(data)
    } catch(e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
    
  }

  useEffect(() => {
    fetchData()
  }, [])

  

  const { showSuccessDialog } = useDialog()

  const handleRelatorio = async () => {
    try{
      setIsLoading(true)
      const link = await UserService.GetProfessorMonthlyReceipts() as string
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
          '@media (max-width: 760px)': {
            fontSize: '1.5rem'
          }
        }}
      >
        Area do Professor
      </Typography>
      <Box
        sx={{
          '@media (max-width: 760px)': {
            display: 'none'
          }
        }}
      >
        <AppButton
          buttonVariant='primary'
          title='Relatório de receitas' 
          onClick={handleRelatorio}
          ></AppButton>
      </Box>
    </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TabsComponent
        tabs={[
          { label: "Visão geral", value: 0 },
          { label: "Extrato", value: 1 }
        ]}
        value={tab}
        onChange={(_e, newValue) => setTab(newValue)}
        />
      
      <Typography
        variant="h6"
        sx={{
          color: theme => theme.palette.primary.main,
          cursor: "pointer",
          fontSize: ".875rem",
          width: "fit-content",
          ":hover": {
            textDecoration: "underline",
          },
          display: 'flex',
          gap: '.4rem',
          alignItems: 'center',
          '@media (min-width: 760px)': {
            display: 'none'
          }
        }}
      >
        Relatório de receitas <GoDownload/>
      </Typography>
    </Box>
    {
      tab === 0 && <TeacherDashboard
        dashboardData={dashboardData}
        scheduledPayments={scheduledPayments?.itens && scheduledPayments?.itens} 
      />
    }
    {
      tab === 1 && <ReceiptPage
        receipts={receipts}
        fetchData={fetchData}
      />
    }
  </Box>
}