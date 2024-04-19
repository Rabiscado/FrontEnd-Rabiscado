import { Box, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "@context/UserContext/Index";
import { UseMobile } from "@context/mobileContext";

export default function Index() {
  const [openMenu, setOpenMenu] = useState(false);
  const { handleLogout } = useContext(UserContext);
  const { isMobile } = UseMobile();
  const { user } = useContext(UserContext);

  const toggleDrawer = (
    isOpen: boolean,
    event?: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event?.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpenMenu(isOpen);
  };

  const list = () => (
    <Stack
      sx={{ width: 250, gap: 2, padding: "50px 0 0 20px" }}
      role="presentation"
      onClick={(event) => toggleDrawer(false, event)}
      onKeyDown={(event) => toggleDrawer(false, event)}
    >
      {!user.isAdmin && !user.isProfessor && (
        <>
          <Link to="/">
            <Typography color="black">Minhas Inscrições</Typography>
          </Link>
          <Link to="/loja">
            <Typography color="black">Buscar aulas</Typography>
          </Link>
          <Link to="/planos">
            <Typography color="black">Planos</Typography>
          </Link>
          <Link onClick={() => handleLogout()} to="/">
            <Typography color="black">Sair</Typography>
          </Link>
        </>
      )}
      {user.id && user.isAdmin && user.isProfessor && (
        <>
          <Link to="/">
            <Typography color="black">Painel de vendas</Typography>
          </Link>
          <Link to="/painel-usuarios">
            <Typography color="black"> Escolas e professores</Typography>
          </Link>
          <Link to="/cursos">
            <Typography color="black"> Cursos</Typography>
          </Link>
          <Link onClick={() => handleLogout()} to="/">
            <Typography color="black">Sair</Typography>
          </Link>
        </>
      )}
      {!user.isAdmin && user.isProfessor && (
        <>
          <Link to="/">
            <Typography color="black">Painel de vendas</Typography>
          </Link>
          <Link to="/configuracoes">
            <Typography color="black"> Meu Perfil</Typography>
          </Link>

          <Link onClick={() => handleLogout()} to="/">
            <Typography color="black">Sair</Typography>
          </Link>
        </>
      )}
    </Stack>
  );

  return (
    <div>
      {isMobile && (
        <Box>
          <IconButton onClick={(event) => toggleDrawer(true, event)}>
            <Menu />
          </IconButton>
          <Drawer
            anchor="left"
            open={openMenu}
            onClose={() => toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </Box>
      )}
    </div>
  );
}
