import  { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { GetPlan } from "../../../Models/Plans";
import { Add } from '@mui/icons-material';


type DrawerProps = {
  plans: GetPlan[];
  selectedPlan: GetPlan;
  handleSelectPlan: (plan: GetPlan) => void;
  handleCreatePlan: () => void;
};

const DrawerMobile = ({ plans, selectedPlan, handleSelectPlan, handleCreatePlan }: DrawerProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const selectAndCloseDrawer = (plan: GetPlan) => {
    handleSelectPlan(plan)
    setIsDrawerOpen(false)
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box
      sx={{
        backgroundColor: "red",
      }}
    >
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          borderRadius: "2px",
          backgroundColor: "#F8F4F4",
          padding: "1rem",
        }}
      >
        <Typography>{selectedPlan.name}</Typography>
        {isDrawerOpen ? <ExpandMoreIcon /> : <ExpandMoreIcon
          sx={{
            transform: "rotate(180deg)",
          }}
        />}
      </IconButton>
      <Drawer
        keepMounted
        anchor="bottom"
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        <List
          sx={{
            height: "90vh",
          }}
        >
          <ListItem>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {plans.find((plan) => plan.id === selectedPlan.id)?.name}
            </Typography>
          </ListItem>
          {isDrawerOpen &&
            plans.map((plan) => (
              <ListItem key={plan.id}>
                <Stack
                  onClick={() => selectAndCloseDrawer(plan)}
                  sx={{
                    width: "100%",
                    backgroundColor:
                      selectedPlan.id == plan.id ? "#833FD7" : "#fff",
                    padding: "1rem",
                    color: selectedPlan.id == plan.id ? "#fff" : "#833FD7",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {plan.name}
                  <IconButton>
                    <DeleteForeverIcon
                      sx={{
                        color: selectedPlan.id == plan.id ? "#fff" : "#A29DB1",
                      }}
                    />
                  </IconButton>
                </Stack>
              </ListItem>
            ))}
            <Typography
                      sx={{
                        color: "#F5006A",
                        fontWeight: "700",
                        textDecoration: "underline",
                        mt: '1rem',
                        p: '1rem',
                        cursor: 'pointer', 
                        width: 'fit-content',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                      onClick={handleCreatePlan}
                    >
                      <Add       
                        sx={{
                          fontSize: '1.5rem'
                        }}             
                      />
                      Adicionar novo plano
                    </Typography>
        </List>
        
      </Drawer>
    </Box>
  );
};

export default DrawerMobile;
