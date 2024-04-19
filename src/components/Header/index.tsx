import { IconButton, Stack, Typography } from "@mui/material";
import Menu from "../Menu";
import Logo from "@assets/logo-svg.svg";
import Currency from "@assets/currency.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UseMobile } from "@context/mobileContext";
import { useContext } from "react";
import { UserContext } from "@context/UserContext/Index";
import { Menu as MaterialMenu } from "@mui/material";
import { MenuItem } from "@mui/material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";

import React from "react";

export default function Index() {
  const { isMobile } = UseMobile();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  
  const logout = () => {
    handleLogout();
    navigate("/");
  };
  
  const { user, handleLogout } = useContext(UserContext);
  
  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100vw"
      sx={{
        top: 0,
        zIndex: 5,
        position: 'relative',
        padding: "0.75rem 1rem",
        boxSizing: "border-box",
        backgroundColor: "white",
        borderBottom: "1px solid #EEE8FA",
        height: "71px",
      }}
    >
      <Stack flexDirection="row" alignItems="center" gap="10px">
        <Menu />
        <Link to={"/"}>
          <img
            src={Logo}
            style={{
              width: "120px",
            }}
          />
        </Link> 
      </Stack>
      {!isMobile && !user.isAdmin && !user.isProfessor && (
        <Stack
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          <Link
            to={"/"}
          >
            <Typography
              sx={{
                color: isCurrentPath("/") ? "#380478" : "#A29DB1",
                fontWeight: isCurrentPath("/") ? 600 : 400,
                fontSize: "16px",
              }}>
              
              Meus cursos
            </Typography>
          </Link>
          <Link
            to={"/loja"}
          >
            <Typography
              sx={{
                color: isCurrentPath("/loja") ? "#380478" : "#A29DB1",
                fontWeight: isCurrentPath("/loja") ? 600 : 400,
                fontSize: "16px",
              }}
            >
              Loja
            </Typography>
          </Link>
          <Link
            to={"/planos"}
          >
            <Typography
              sx={{
                color: isCurrentPath("/planos") ? "#380478" : "#A29DB1",
                fontWeight: isCurrentPath("/planos") ? 600 : 400,
                fontSize: "16px",
              }}
            >
              Planos
            </Typography>
          </Link>
        </Stack>
      )}
      {!isMobile && user.isProfessor && !user.isAdmin && (
        <Stack
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          <Link
            to={"/"}
            style={{
              color: isCurrentPath("/") ? "#380478" : "#A29DB1",
            }}
          >
            Painel de vendas
          </Link>
          <Link
            to={"/configuracoes"}
            style={{
              color: isCurrentPath("/configuracoes") ? "#380478" : "#A29DB1",
            }}
          >
            Meu perfil
          </Link>
        </Stack>
      )}
      {!isMobile && user.isProfessor && user.isAdmin && (
        <Stack
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          <Link
            to={"/"}
            style={{
              color: isCurrentPath("/") ? "#380478" : "#A29DB1",
            }}
          >
            Painel de vendas
          </Link>
          <Link
            to={"/painel-usuarios"}
            style={{
              color: isCurrentPath("/painel-usuarios") ? "#380478" : "#A29DB1",
            }}
          >
            Escolas e professores
          </Link>
          <Link
            to={"/cursos"}
            style={{
              color: isCurrentPath("/cursos") ? "#380478" : "#A29DB1",
            }}
          >
            Cursos
          </Link>
          <Link
            to={"/planos-adm"}
            style={{
              color: isCurrentPath("/planos-adm") ? "#380478" : "#A29DB1",
            }}
          >
            Planos
          </Link>
        </Stack>
      )}
      
      <Stack flexDirection="column" alignItems="flex-start" gap="4px">
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#380478",
            }}
          >
            {user.name}
          </Typography>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <ExpandMoreIcon
              sx={{
                color: "#F5006A",
                height: "16px",
                width: "16px",
              }}
            />
          </IconButton>
          <MaterialMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => navigate("/configuracoes")}>
              <Stack flexDirection={"row"} gap={".5rem"}>
                <SettingsIcon
                  sx={{
                    color: "#000",
                  }}
                />
                <Typography
                  sx={{
                    color: "#000",
                  }}
                >
                  Configurações
                </Typography>
              </Stack>
            </MenuItem>
            <MenuItem onClick={() => navigate("/ajuda")}>
              <Stack flexDirection={"row"} gap={".5rem"}>
                <HelpOutlineIcon
                  sx={{
                    color: "#000",
                  }}
                />
                <Typography
                  sx={{
                    color: "#000",
                  }}
                >
                  Central de Ajuda
                </Typography>
              </Stack>
            </MenuItem>
            <MenuItem onClick={logout}>
              <Stack flexDirection={"row"} gap={".5rem"}>
                <LogoutIcon
                  sx={{
                    color: "#000",
                  }}
                />
                <Typography
                  sx={{
                    color: "#000",
                  }}
                >
                  Sair
                </Typography>
              </Stack>
            </MenuItem>
          </MaterialMenu>
        </Stack>
        
        {!user.isAdmin && (
          <Stack
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <img src={Currency} style={{ height: "24px" }} />
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: "#F5006A",
              }}
            >
              {user.coin ?? 0}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
