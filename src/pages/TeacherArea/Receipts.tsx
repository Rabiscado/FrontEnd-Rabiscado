import { Box, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import { ReceiptsTable } from './components';
import { useEffect, useState } from 'react';
import { PiStudent } from 'react-icons/pi';
import CodeIcon from '@assets/CodeIcon.svg'
import { FiClock } from 'react-icons/fi'; 
import { ExpandMore, Search, Tune } from '@mui/icons-material';
import { UseMobile } from '@context/mobileContext';

export function ReceiptPage(
  {
    receipts,
    // fetchData
  }
  : {
    receipts: any
    fetchData: () => void
  }
) {
  
  const columns = ["Data", "Tipo", "Consumidor", "Código", "Valor"];
 

  const [dataRows, setDataRows] = useState<Array<{
    data: string,
    tipo: string,
    consumidor: string,
    codigo: string,
    valor: string
  }>>([])

  const [filteredData, setFilteredData] = useState(dataRows);

  const [filters, setFilters] = useState<string>("todas");

  useEffect(() => {
    if(!receipts) return;
    if(!receipts.itens) return;

    const newDataRows = receipts.itens.map((receipt : any) => ({
      data: new Date(receipt.createAt).toLocaleDateString('pt-BR'),
      tipo: receipt.type === 1 ? "Entrada" : "Saída",
      consumidor: receipt.user.name,
      codigo: receipt.id,
      valor: Number(receipt.value ?? receipt.course.value ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }))
    setDataRows(newDataRows);

  }, [receipts])

  // useEffect(() => {
  //   setDataRows([
  //     {
  //       data: new Date(new Date().toISOString()).toLocaleDateString('pt-BR'),
  //       tipo: "Entrada",
  //       consumidor: "João da Costa",
  //       codigo: "XIGSA5489SS",
  //       valor: Number(50).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  //     },
  //     {
  //       data: new Date(new Date().toISOString()).toLocaleDateString('pt-BR'),
  //       tipo: "Saída",
  //       consumidor: "Claudevanio Silva",
  //       codigo: "XIGSA5489SSa",
  //       valor: Number(250).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  //     },
  //     {
  //       data: new Date(new Date().toISOString()).toLocaleDateString('pt-BR'),
  //       tipo: "Entrada",
  //       consumidor: "Neitan da Silva",
  //       codigo: "XIGSA5489SS",
  //       valor: Number(530).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  //     },
  //     {
  //       data: new Date(new Date().toISOString()).toLocaleDateString('pt-BR'),
  //       tipo: "Entrada",
  //       consumidor: "Calabreso Costa",
  //       codigo: "XIGSA5489SS",
  //       valor: Number(510).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  //     },
  //     {
  //       data: new Date(new Date().toISOString()).toLocaleDateString('pt-BR'),
  //       tipo: "Saída",
  //       consumidor: "Samsungo React",
  //       codigo: "XIGSA5489SS",
  //       valor: Number(10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  //     },])
  // }, [])

  useEffect(() => {
    if(filters === "todas") {
      setFilteredData(dataRows);
      return;
    }
    if(filters === "entradas") {
      setFilteredData(dataRows.filter(row => row.tipo === "Entrada"));
      return;
    }
    if(filters === "saidas") {
      setFilteredData(dataRows.filter(row => row.tipo === "Saída"));
      return;
    }
  }, [filters, dataRows])

  const [quantitySeen, setQuantitySeen] = useState(3);

  const [alunoSearch, setAlunoSearch] = useState<string>("");

  const {isMobile} = UseMobile();

  useEffect(() => {
    setAlunoSearch("");
  }, [isMobile])

  useEffect(() => {
    if(alunoSearch === "") {
      setFilteredData(dataRows);
      return;
    }
    setFilteredData(dataRows.filter(row => row.consumidor.toLowerCase().includes(alunoSearch.toLowerCase())));
  }, [alunoSearch, dataRows])

    return (
        <div
          style={{
            marginTop: '2rem',
          }}
        > 
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '100%',
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
            <TextField
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
            />
          </Box>
              <Select
                value={filters}
                onChange={(e) => setFilters(e.target.value as string)}
                IconComponent={()=> <ExpandMore
                  sx={{
                    color: '#380478',
                    fontSize: '2.5rem !important',
                    position: 'absolute',
                    right: 0,
                    pointerEvents: 'none',
                  }}
                />}
                sx={{ 
                  backgroundColor: '#3400740D',
                  color: '#380478',
                  borderRadius: '.5rem',
                  width: '11rem',
                  border: 'none',
                  outline: 'none',
                  minHeight: 0,
                  '@media (max-width: 760px)': {
                    display: 'none',
                  }, 
                  '*':{
                    fontSize: '1.5rem',
                  }
                }}                
                MenuProps={{
                  sx: {
                    '.MuiPaper-root':{
                      backgroundColor: '#F3F0F6',
                      color: '#000',
                    },
                    '*':{
                      fontSize: '1.5rem',
                    }
                  }
                }}
              >
                <MenuItem
                  value="todas"
                >
                    Todas
                </MenuItem>
                <MenuItem
                  value="entradas"
                >
                    Entradas
                </MenuItem>
                <MenuItem
                  value="saidas"
                >
                    Saídas
                </MenuItem>
              </Select>
              <Box
                sx={{
                  '@media (max-width: 760px)': {
                    display: 'none',
                  }
                }}
              >
                <ReceiptsTable columns={columns} rows={filteredData} />
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
                        <Box
                          sx={{
                            padding: "0 .5rem",
                            borderRadius: "3rem",
                            width: "6rem",
                            textAlign: "center",
                            backgroundColor: theme => row.tipo === "Entrada" ? theme.palette.primary.main : theme.palette.secondary.main,
                            color: "#FFFFFF",
                          }}
                        >
                          {
                            row.tipo === "Entrada" ? "Entrada" : "Saída"
                          }
                        </Box>
                        <Typography variant="h6"
                          sx={{
                            color: theme => theme.palette.secondary.main,
                            fontSize: "1rem",
                            display: "flex",
                            gap: ".5rem",
                            alignItems: "center",
                          }}
                        >
                          <PiStudent
                            style={{
                              color: '#A29DB1',
                              fontSize: "1.3rem",
                            }}
                          />
                          {
                            row.consumidor
                          }</Typography>
                          <Typography variant="h6"
                            sx={{
                              color: theme => theme.palette.secondary.main,
                              fontSize: "1rem",
                              display: "flex",
                              gap: ".5rem",
                              alignItems: "center",
                            }}
                          >
                            <img src={CodeIcon}
                              style={{
                                width: "1.3rem",
                                height: "1.3rem",
                              }}
                            />
                            {
                              row.codigo
                            }</Typography>
                            <Typography variant="h6"
                              sx={{
                                color: theme => theme.palette.secondary.main,
                                fontSize: "1rem",
                                display: "flex",
                                gap: ".5rem",
                                alignItems: "center",
                              }}
                            >
                              <FiClock
                                style={{
                                  color: '#A29DB1',
                                  fontSize: "1.2rem",
                                }}
                              />
                              {
                                row.data
                              }</Typography>
                              
                      <Typography variant="h6"
                        sx={{
                          color: theme => theme.palette.primary.main,
                          fontSize: "1.5rem",
                        }}
                      >
                        {
                          row.valor
                        }</Typography>
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