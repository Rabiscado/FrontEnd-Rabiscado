import { TabsComponent } from '@components/Tabs/TabsComponent'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { ADMReceiptDashboard } from './Dashboard'
import { ADMReceipt } from './Receipts'

import { PlanAdmCRUDService, ScheduledPaymentsService } from '../../../services/plans/plansAdmService'
import { IScheduledPayments, PlanDashboard } from 'Models/Plans'
import { Loading } from '@components/Loading/Loading'
import { IError } from '@Models/Error'
import { useDialog } from '@context/DialogContext/useDialog'

export const AdmReceiptPage: React.FC = () => {

  const [tab, setTab] = useState(0)
  
  const [dashboardData, setDashboardData] = useState<PlanDashboard | undefined>()

  const [receiptData, setReceiptData] = useState<IScheduledPayments[]| undefined>()

  const [isLoading, setIsLoading] = useState(true)

  const {showSuccessDialog} = useDialog()


  useEffect(() => {
    const fetchData = async () => {
      try{
        setIsLoading(true)
        const [data, receiptData] = await Promise.all([
          PlanAdmCRUDService.GetDashboard(),
          ScheduledPaymentsService.Get()
        ]) 
        setDashboardData(data); 
        setReceiptData(receiptData);
      } catch (error) {
        const err = error as IError
        const title = err.response?.data?.erros[0] ?? "Erro ao buscar dados"  
        showSuccessDialog({
          title,
          onConfirm: () => {}
        })
      }finally{
        setIsLoading(false)
      }
    }
    fetchData();
  }, []);

  return <Box
    sx={{
      height: "100%",
      width: "100%",
      padding: '2rem 1.5rem'
    }}
  >
    {
      isLoading && <Loading />
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
        Painel de vendas
      </Typography>
      <Box
        sx={{
          '@media (max-width: 760px)': {
            display: 'none'
          }
        }}
      >
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
          { label: "Vendas", value: 0 },
          { label: "Pagamentos", value: 1 }
        ]}
        value={tab}
        onChange={(_e, newValue) => setTab(newValue)}
        />
      
    </Box>
    {
      tab === 0 && <ADMReceiptDashboard
      dashboardData={dashboardData}
      setIsLoading={setIsLoading}
      />
    }
    {
      tab === 1 && <ADMReceipt
      receiptData={receiptData}
      setIsLoading={setIsLoading}
      />
    }
  </Box>
}