 
import { SalesCard } from '@components/SalesCard/SalesCard' 
import { CancelOutlined, GroupOutlined, PaidOutlined, ReceiptOutlined, Search, Tune } from '@mui/icons-material'
import { Box, Grid, InputAdornment, TextField, Typography } from '@mui/material'  
import { useEffect, useState } from 'react'
import { BiWallet } from 'react-icons/bi' 
 
export function TeacherDashboard(
  { 
    dashboardData,
    scheduledPayments
  }
  : { 
    scheduledPayments?: Array<{
      id: number,
      value: number,
      professor: string,
      professorName: string,
      date: string,
      paidOut: boolean,
      userId: number,
      user: {
        id: number,
        name: string,
        cpf: string,
        phone: string,
        cep: string,
        email: string,
        coin: number,
        active: boolean,
        isAdmin: boolean,
        isProfessor: boolean,
        planId: number,
        plan: any,
        subscriptions: any[]
      }
    }> 

    dashboardData?: {
      subscribes: number,
      unsubscribes: number,
      totalReceipt: number,
      toReceive: number,
      received: number,
    }
  }
) {
  
  const [isShowingMore, setIsShowingMore] = useState(false)

  const [saldoSearch, setSaldoSearch] = useState('')

 
  const [filteredList, setFilteredList] = useState<Array<{
    ammount: number,
    date: string,
    observation: string
  }>>([])

  useEffect(() => {
    if(!scheduledPayments) return
    if(!scheduledPayments.length) return

    const newlist = scheduledPayments.map((item: any) => {
      return {
        ammount: item.value,
        date: new Date(item.date).toLocaleDateString('pt-BR'),
        observation: 'Gerar nota fiscal'
      }
    })
    setFilteredList(newlist) 
  }, [scheduledPayments])
  

  useEffect(() => { 
    if(!saldoSearch) return
    if(!scheduledPayments) return
    if(!scheduledPayments.length) return

    const newlist = scheduledPayments.filter((item: any) => {
      return item.value.toString().includes(saldoSearch)
    }).map((item: any) => {
      return {
        ammount: item.value,
        date: new Date(item.date).toLocaleDateString('pt-BR'),
        observation: 'Gerar nota fiscal'
      }
    })
    setFilteredList(newlist)
  }, [saldoSearch])


    return (
      <>     
        <Grid container spacing={2} sx={{
          marginTop: "1.5rem",
        }}>
          <Grid item xs={6}>
            <SalesCard.Box>
              <SalesCard.Title>
                  <GroupOutlined
                    sx={{
                      fontSize: "2rem"
                    }}
                  />
              </SalesCard.Title>
              <SalesCard.Content>
                <Typography variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontSize: '40px'
                  }}
                >
                  {dashboardData?.subscribes}
                </Typography>
              </SalesCard.Content>
              <SalesCard.Footer>
                Inscritos
              </SalesCard.Footer>
            </SalesCard.Box>
          </Grid>
          <Grid item xs={6}>
            <SalesCard.Box>
              <SalesCard.Title>
                <CancelOutlined
                    sx={{
                      fontSize: "2rem"
                    }}/>
              </SalesCard.Title>
              <SalesCard.Content>
                <Typography variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontSize: '40px'
                  }}
                >
                  {
                    dashboardData?.unsubscribes
                  }
                </Typography>
              </SalesCard.Content>
              <SalesCard.Footer>
                Cancelados
              </SalesCard.Footer>
            </SalesCard.Box>
          </Grid>
          </Grid>
          <Grid container spacing={2}
            sx={{
              marginTop: ".5rem",
              '@media (max-width: 760px)': {
                display: 'none'
              }
            }}>
          <Grid item xs={12} md={4}>
            <SalesCard.Box>
              <SalesCard.Title>
                <PaidOutlined
                    sx={{
                      fontSize: "2rem"
                    }}/>
              </SalesCard.Title>
              <SalesCard.Content>
                <Typography variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontSize: '40px'
                  }}
                >
                  {
                    Number(dashboardData?.totalReceipt ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                  }
                </Typography>
              </SalesCard.Content>
              <SalesCard.Footer>
                Faturamento total
              </SalesCard.Footer>
            </SalesCard.Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <SalesCard.Box>
              <SalesCard.Title>
                <ReceiptOutlined
                    sx={{
                      fontSize: "2rem"
                    }}/>
              </SalesCard.Title>
              <SalesCard.Content>
                <Typography variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontSize: '40px'
                  }}
                >
                  {
                    Number(dashboardData?.received ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                  }
                </Typography>
              </SalesCard.Content>
              <SalesCard.Footer>
                Recebidos
              </SalesCard.Footer>
            </SalesCard.Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <SalesCard.Box>
              <SalesCard.Title>
                <BiWallet
                  size={32}
                />
              </SalesCard.Title>
              <SalesCard.Content>
                <Typography variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontSize: '40px'
                  }}
                >
                  {
                    Number(dashboardData?.toReceive ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                  }
                </Typography>
              </SalesCard.Content>
              <SalesCard.Footer>
                Disponível
              </SalesCard.Footer>
            </SalesCard.Box>
          </Grid>
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
          }}
        >
          <Grid 
            sx={{
              width: '100%',
              minWidth: '80%'
            }}
          >
            <SalesCard.Box>
              <SalesCard.Title>
                <PaidOutlined/>
              </SalesCard.Title>
              <SalesCard.Content>
                <Typography variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontSize: '40px'
                  }}
                >
                  {
                    Number(dashboardData?.totalReceipt ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                  }
                </Typography>
              </SalesCard.Content>
              <SalesCard.Footer>
                Faturamento total
              </SalesCard.Footer>
            </SalesCard.Box>
          </Grid>
          <Grid
            sx={{
              width: '100%',
              minWidth: '80%'
            }}>
            <SalesCard.Box>
              <SalesCard.Title>
                <ReceiptOutlined/>
              </SalesCard.Title>
              <SalesCard.Content>
                <Typography variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontSize: '40px'
                  }}
                >
                  {
                    Number(300000).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                  }
                </Typography>
              </SalesCard.Content>
              <SalesCard.Footer>
                Recebidos
              </SalesCard.Footer>
            </SalesCard.Box>
          </Grid>
          <Grid 
            sx={{
              width: '100%',
              minWidth: '80%'
            }}>
            <SalesCard.Box>
              <SalesCard.Title>
                <BiWallet/>
              </SalesCard.Title>
              <SalesCard.Content>
                <Typography variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontSize: '40px'
                  }}
                >
                  {
                    Number(300000).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                  }
                </Typography>
              </SalesCard.Content>
              <SalesCard.Footer>
                Disponível
              </SalesCard.Footer>
            </SalesCard.Box>
          </Grid>

        </Box>

          <Box
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
              Saldo
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
              '@media (min-width: 760px)': {
                display: 'none'
              }
            }}>
            <TextField
              placeholder="Busque por saldo"
              variant="outlined"
              fullWidth
              value={saldoSearch}
              onChange={(event) => setSaldoSearch(event.target.value)}
              InputLabelProps={{
                style: { color: "gray" },
              }}
              sx={{
                backgroundColor: "#EEE8FA",
                '&:hover': {
                  backgroundColor: "#EEE8FA",
                },
                '*':{
                  border: '0px !important',
                  color: '#380478 !important'
                },
                '&::placeholder': {
                  color: '#380478'
                },
                '&':{
                  borderRadius: '.5rem !important'
                },
                mb:2,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search
                      style={{
                        color: '#380478'
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Tune/>
                  </InputAdornment>
                ),
              }}
              inputProps={{
                style: { color: "black" },
              }}
            />
          </Box>
          {
            filteredList.length === 0 && scheduledPayments && <Box>
              <Typography
                variant="h6"
                sx={{
                  color: '#A29DB1',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  marginTop: '2rem'
                }}
              >
                Nenhum saldo disponível
              </Typography>
          </Box>}
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              justifyContent: "space-between",
              '@media (max-width: 760px)': {
                flexDirection: "column",
                maxHeight: !isShowingMore ? "580px" : 'none',
                overflowY: "hidden",
                display: 'none'
              }
            }}
          > 
            {
              filteredList.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "space-between",
                    gap: "1.5rem",
                    padding: "1rem",
                    borderRadius: ".5rem",
                    marginTop: ".5rem",
                    border: '2px solid #A29DB1',
                    maxWidth: "360px",
                  }}
                >
                  <Typography variant="h6"
                    sx={{
                      color: theme => theme.palette.primary.main,
                      fontSize: "1rem",
                    }}
                  >
                    <span
                      style={{
                        color: '#380478'
                      }}
                    >Saldo: </span>
                    {item.ammount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
                  <Typography variant="h6"
                    sx={{
                      fontSize: ".875rem",
                      color: '#A29DB1'
                    }}
                  >{item.date}</Typography>
                  <Typography variant="h6"
                    sx={{
                      fontSize: ".875rem",
                      color: '#A29DB1'
                    }}>
                    <span
                      style={{
                        color: '#380478'
                      }}>Lembrete: </span>
                    {item.observation}</Typography>
                </Box>
            ))
            }
          </Box>
          
          <Box
            sx={{
              gap: "2rem",
              justifyContent: "space-between",
              display: "none",
              '@media (max-width: 760px)': {
                display: "flex",
                flexDirection: "column",
                maxHeight: !isShowingMore ? "580px" : 'none',
                overflowY: "hidden",
              }
            }}
          >
            {
              filteredList.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "space-between",
                    gap: "1.5rem",
                    padding: "1rem",
                    borderRadius: ".5rem",
                    marginTop: ".5rem",
                    border: '2px solid #A29DB1',
                  }}
                >
                  <Typography variant="h6"
                    sx={{
                      color: theme => theme.palette.primary.main,
                      fontSize: "1rem",
                    }}
                  >
                    <span
                      style={{
                        color: '#380478'
                      }}
                    >Saldo: </span>
                    {item.ammount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
                  <Typography variant="h6"
                    sx={{
                      fontSize: ".875rem",
                      color: '#A29DB1'
                    }}
                  >{item.date}</Typography>
                  <Typography variant="h6"
                    sx={{
                      fontSize: ".875rem",
                      color: '#A29DB1'
                    }}>
                    <span
                      style={{
                        color: '#380478'
                      }}>Lembrete: </span>
                    {item.observation}</Typography>
                </Box>
            ))
            }
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              paddingLeft: ".2rem",
              gap: "2rem",
              '@media (min-width: 760px)': {
                display: 'none'
              }
            }}
          >
            {
              filteredList.length > 2 && (
                <Typography
                  onClick={() => setIsShowingMore(!isShowingMore)}
                  variant="h6"
                  sx={{
                    color: theme => theme.palette.primary.main,
                    cursor: "pointer",
                    marginTop: "1rem",
                    fontSize: "1rem",
                    width: "fit-content",
                    ":hover": {
                      textDecoration: "underline",
                    }
                  }}
                >
                  {isShowingMore ? 'Ver menos' : 'Ver mais'}
                </Typography>
              )
            }
          </Box>
        </>
    )
}