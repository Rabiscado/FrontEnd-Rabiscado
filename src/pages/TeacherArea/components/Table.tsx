import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'; 

interface CustomizedTableProps {
  columns: string[];
  rows: { [key: string]: number | string }[];
}

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
  }
}));

export function ReceiptsTable({ rows, columns }: CustomizedTableProps) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                align="left"
              >{column}</StyledTableCell>
            ))}
            
            {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              {
                Object.keys(row).map((key) => (
                  <StyledTableCell align="left"
                    component={'td'}
                  >{row[key]}</StyledTableCell>
                ))
              }
              {/* <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
