import { Box, Typography } from '@mui/material'
import {UsersTable} from './UsersTable'

export const AdmUsersPage: React.FC = () => {
  
  return <Box
    sx={{
      height: "100%",
      width: "100%",
      padding: '2rem 1.5rem'
    }}
  >
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
        Usuários
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
    >
      <UsersTable
      />
    </Box>
  </Box>
}