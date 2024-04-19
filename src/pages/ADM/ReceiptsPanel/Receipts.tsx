import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseMobile } from '@context/mobileContext';
import { useDialog } from '@context/DialogContext/useDialog';

import { IScheduledPayments } from 'Models/Plans'
import { ScheduledPaymentsService } from '../../../services/plans/plansAdmService';

export function ADMReceipt({
  receiptData, 
} : {
  receiptData: IScheduledPayments[] | undefined
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

) { 
  const [dataRows, setDataRows] = useState<Array<{
    id: number,
    value: number,
    date: string,
    title: string,
    situation: 0 | 1,
  }>>([])

  const [filteredData, setFilteredData] = useState(dataRows);

  // const [filters, setFilters] = useState<string>("todas");

  useEffect(() => {
    if(!receiptData) return;

    setDataRows(receiptData?.map((row) => {
      return {
        id: row.id,
        value: row.value,
        date: new Date(row.date).toLocaleDateString('pt-Br'),
        title: row.professor,
        situation: row.paidOut ? 1 : 0
      }
    }))
    // setDataRows([
    //   {
    //     value: 100,
    //     date: new Date('2021-10-10').toLocaleDateString(),
    //     title: 'Nome do professor/escola',
    //     id: 1,
    //     situation: 0
    //   },
    //   {
    //     value: 100,
    //     date: new Date('2021-10-10').toLocaleDateString(),
    //     title: 'Nome do professor/escola',
    //     situation: 1,
    //     id: 2
    //   }, 
    //   ])
  }, [])

  // useEffect(() => {
  //   if(filters === "todas") {
  //     setFilteredData(dataRows);
  //     return;
  //   }
  //   if(filters === "entradas") {
  //     setFilteredData(dataRows.filter(row => row.tipo === "Entrada"));
  //     return;
  //   }
  //   if(filters === "saidas") {
  //     setFilteredData(dataRows.filter(row => row.tipo === "Saída"));
  //     return;
  //   }
  // }, [filters, dataRows])

  const [quantitySeen, setQuantitySeen] = useState(3);

  const [alunoSearch, setAlunoSearch] = useState<string>("");

  const {isMobile} = UseMobile();

  const {openDialog} = useDialog();

  useEffect(() => {
    setAlunoSearch("");
  }, [isMobile])

  useEffect(() => {
    if(alunoSearch === "") {
      setFilteredData(dataRows);
      return;
    }
  }, [alunoSearch, dataRows])

  function payItem(index : number){
    const updatedData = filteredData.map((row, i) => {
      if(i === index) {
        return {
          ...row,
          situation: 1
        }
      }
      return row;
    }) as unknown as typeof filteredData;
    setFilteredData(updatedData);
    ScheduledPaymentsService.Pay(filteredData[index].id);
  }

    return (
        <div
          style={{
          }}
        > 
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '100%',
                '@media (min-width: 760px)': {
                  marginTop: '1rem',
                }
              }}
            >
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
            {/* <TextField
              placeholder="Busque por aluno"
              variant="outlined"
              fullWidth
              value={alunoSearch}
              onChange={(event) => setAlunoSearch(event.target.value)}
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
            /> */}
          </Box>
              <Box
                sx={{
                  
                  display: "grid",
                  // minMax using 340px as min and 1fr as max to set the number of columns
                  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                  columnGap: "1rem",
                  rowGap: "1.5rem",
                  '@media (max-width: 760px)': {
                    display: 'none',
                  },
                }}
              > 
              
              {
                  filteredData.map((row, index) => row.situation === 1 ? <></> : (
                    
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
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    sx={{
                      color: theme => theme.palette.secondary.main,
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: 600,
                    }}
                  >
                    {
                      row.title
                    }
                  </Typography>
                
                  <Typography
                      variant="subtitle1"
                      sx={{
                        color: '#380478',
                        fontWeight: 600,
                        display: "flex",
                        gap: ".3rem",
                        alignItems: "center",
                      }}
                    >
                      Saldo: <Typography
                        variant="subtitle1"
                        sx={{
                          color: theme => theme.palette.primary.main,
                          fontWeight: 600,
                        }}>
                        {row.value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                        </Typography>
                    </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: '#A29DB1',
                      fontSize: '.75rem'
                    }}
                  >
                    {row.date}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: theme => theme.palette.primary.main,
                      textDecoration: "underline",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                    onClick={
                      () => {
                        console.log('oi')
                        openDialog({
                            title: "Confirmar pagamento?",
                            onConfirm: () => payItem(index),
                        })
                      }
                    }
                  >
                    {"Pago"}
                  </Typography>
                </Box>
              </Box>
                  ))
                }
              </Box>
              <Box
                sx={{
                  '@media (min-width: 760px)': {
                    display: 'none',
                  }
                }}
              >
                {
                  filteredData.map((row, index) => quantitySeen < index + 1 ? <></> : (
                    
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
                <Typography
                  variant='subtitle1'
                  sx={{
                    color: theme => theme.palette.secondary.main,
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 600,
                  }}
                >
                  {
                    row.title
                  }
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: '#A29DB1',
                    }}
                  >
                    {row.date}
                  </Typography>
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: '#380478',
                      fontWeight: 600,
                      display: "flex",
                      gap: ".3rem",
                      alignItems: "center",
                    }}
                  >
                    Saldo: <Typography
                      variant="subtitle1"
                      sx={{
                        color: theme => theme.palette.primary.main,
                      }}>
                      {row.value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                      </Typography>
                  </Typography>
                  
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: theme => theme.palette.primary.main,
                      textDecoration: "underline",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                    onClick={
                      () => {
                        console.log('oi')
                        openDialog({
                            title: "Confirmar pagamento?",
                            onConfirm: () => payItem(index),
                        })
                      }
                    }
                  >
                    {"Pago"}
                  </Typography>
                </Box>
              </Box>
                  ))
                }
                
                {
                  filteredData.length > quantitySeen && <Typography
                  onClick={() => setQuantitySeen(quantitySeen + 3)}
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
                  Ver mais
                </Typography>}
              </Box>
            </Box>
        </div>
    )
}