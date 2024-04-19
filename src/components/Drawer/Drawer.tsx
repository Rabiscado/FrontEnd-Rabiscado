import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer'; 
import { KeyboardArrowUp } from '@mui/icons-material';

const drawerBleeding = 65;

interface Props {
  window?: () => Window;
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const SwipeableEdgeDrawer: React.FC<Props> = (props) => {
  const { title, children, open, onClose, onOpen } = props;

  const toggleDrawer = (newOpen: boolean) => () => { 
    if (newOpen) {
      onOpen();
    } else {
      onClose();
    }
  };
  

  return (
    <SwipeableDrawer 
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={true}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '.MuiPaper-root': {
          height: open ? '80%' : `calc(50% - ${drawerBleeding}px)`,
          overflow: 'visible',
          background: '#fff'
        },
        '': {
          background: '#fff'
        },
        '@media (min-width: 768px)': {
          display: 'none',
        }
      }}
    >
      <Box
          sx={{
            position: 'absolute',
            top: open ? -drawerBleeding + 42 : -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            backgroundColor: !open ? '#F8F4F4' : '#fff',
            zIndex: 1,
            cursor: 'pointer',
          }} 
        >
          <Typography
            onClick={() => { 
              toggleDrawer(false)
            }}
          sx={{ p: 2, color: theme=> theme.palette.secondary.main, display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', cursor: 'pointer', fontWeight: 600}}
          >{title}
            <KeyboardArrowUp onClick={toggleDrawer(false)} 
              sx={{ cursor: 'pointer', color: theme=> theme.palette.secondary.main, fontSize: '2rem', transition: 'transform 0.3s ease-in-out', 
              rotate: open ? '180deg' : '0deg'
            }}
            />
          </Typography>
        </Box>
      <Box sx={{ padding: '16px 0', height: '100%', overflowY: 'auto' }}
        onClick={
          e => e.stopPropagation()
        }
      >
        {children}
      </Box>
    </SwipeableDrawer>
  );
}

export default SwipeableEdgeDrawer;
