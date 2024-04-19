import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'; 
import { Box, Checkbox, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { UserService } from '../../../services/user/userService';
import { User } from 'Models/User';
import { useUser } from '../../../hooks/use-user';
import { Loading } from '@components/Loading/Loading';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '&: first-child': {
      borderTopLeftRadius: '.5rem',
      borderBottomLeftRadius: '.5rem',
    },
    '&: last-child': {
      borderTopRightRadius: '.5rem',
      borderBottomRightRadius: '.5rem',
    },
    fontSize: '1.25rem',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '1.25rem',
    width: '250px',
    color: '#380478 !important',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  'td, th': {
    border: 0,
    borderBottom: `2px solid #EBEBEB`,
  },
  td: {
    color: theme.palette.text.secondary,
    padding: '1.4rem 1rem',
  },
}));

export function UsersTable() {
  const columns = ["Nome", "Código", "Professor", "Administrador", "E-mail"];
 
 
  const BaseRows = []

  const [rows, setRows] = useState<Array<{
    id: number,
    name: string,
    code: string,
    teacher: boolean,
    admin: boolean,
    email: string
  }>>(BaseRows)

  function turnAdmin(id: number) {
    const newRows = rows.map(row => {
      if(row.id === id) {
        return {
          ...row,
          admin: !row.admin
        }
      }
      return row;
    })
    setRows(newRows)
    UserService.ToggleAdmin(id)
  }
  
  function turnTeacher(id: number) {
    const newRows = rows.map(row => {
      if(row.id === id) {
        return {
          ...row,
          teacher: !row.teacher
        }
      }
      return row;
    })
    setRows(newRows)
    UserService.ToggleProfessor(id)
  }

  async function fetchUsers() { 
    setIsLoading(true)
    const users = await UserService.GetAll() as User[]

    const newRows = users.filter(i => i.id !== user?.id).map(user => {
      return {
        id: user.id,
        name: user.name,
        code: user.id,
        teacher: user.isProfessor,
        admin: user.isAdmin,
        email: user.email
      }
    }) as any 

    setRows(newRows)
    setIsLoading(false)

  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const {user} = useUser()

  const [isLoading, setIsLoading] = useState(true)

  

  return (
    <Box>
      {isLoading && <Loading/>}
      <TableContainer  
        sx={{
          '@media (max-width: 760px)': {
            display: 'none', 
          }
        }}
      >
        <Table sx={{ minWidth: 700,
          border: 0,
        }} aria-label="customized table">
          <TableHead>
            <TableRow
              sx={{            
                'td, th': {
                  border: 0,
                },
              }}
            >
              {columns.map((column) => (
                <StyledTableCell
                  align="center"
                >{column}</StyledTableCell>
              ))}
              
              {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell>
              <StyledTableCell align="right">Calories</StyledTableCell>
              <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              border: 0,
            }}
          >
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                {
                  Object.keys(row).map((key: string) => {
                    if(key === "id") return null;
                    if(key === "teacher" || key === "admin") {
                      return <StyledTableCell align="center"
                      component={'td'}
                      onChange={() => {
                        if(key === "teacher") {
                          turnTeacher(row.id)
                          return
                        }
                        turnAdmin(row.id)
                        
                      }}
                    >
                      <Checkbox checked={row[key]} sx={{
                    }} /></StyledTableCell>
                    }
                    return <StyledTableCell align="center"
                      component={'td'}
                    >{row[key as keyof typeof row]}</StyledTableCell>
                  })
                }
                {/* <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          flexDirection: "column",
          '@media (min-width: 760px)': {
            display: 'none'
          }
        }}
      >
        {
          rows.map((row) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: ".5rem",
                width: "100%",
                padding: "1rem",
                flexDirection: "column",
                border: "2px solid #EBEBEB",
                borderRadius: ".5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: '#380478',
                    fontWeight: 600,
                    fontSize: '1.25rem'
                  }}
                >{row.name}</Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#380478',
                    fontWeight: 400,
                    fontSize: '.875rem'
                  }}
                >{row.code}</Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  color: '#380478',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >{row.email}</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  width: "100%",
                  mt: 2
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#833FD7',
                      fontWeight: 400,
                      fontSize: '1rem'
                    }}
                  >Professor</Typography>
                  <Checkbox checked={row.teacher}
                    onChange={()=> turnTeacher(row.id)}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                    width: "100%"
                  }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#833FD7',
                      fontWeight: 400,
                      fontSize: '1rem'
                    }}
                  >Administrador</Typography>
                  <Checkbox checked={row.admin}
                    onChange={()=> turnAdmin(row.id)}
                  />
                </Box>
              </Box>
            </Box>
          ))
        }

      </Box>
    </Box>

  );
}
