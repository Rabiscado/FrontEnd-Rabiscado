import {
  Card,
  CardContent,
  CardHeader, 
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import LocationSVG from "@assets/location.svg";
import LevelSVG from "@assets/level.svg";
import { Tags } from "@components/Tags";
import { Teacher } from "@pages/LookForTeachers/models/Teacher";
import { useNavigate } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";

import LinearProgressBar from "@pages/MySubscriptions/components/LinearProgressBar";
import { useContext, useState } from "react";
import { AppDialog } from "@components/Dialog/Dialog";
import { AlertModal } from "@components/AlertModal";
import { UseMobile } from "@context/mobileContext";
import { Course } from "@pages/LookForTeachers/models/Course";
import { UserContext } from "@context/UserContext/Index";
import { UserService } from '../../services/user/userService';
import { IError } from '@Models/Error';
import { useDialog } from '@context/DialogContext/useDialog';

type CourseProps = {
  course: Course
  finished: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CourseCard = ({ course, finished, setLoad }: CourseProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isMobile } = UseMobile();
  const {user, updateUser} = useContext(UserContext)

  const goToTeacherDetail = (teacher: Teacher) => {
    navigate("/detalhes-professor/" + course.id, { state: { teacher: teacher } });
  };

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const { 
    showSuccessDialog,
  } = useDialog()

  const handleConfirm = async () => {
    if(finished){
      const { subscriptionId } = course as any
      if(!subscriptionId) return
      handleClose()
      try{
        setLoad(true);
        const response = await UserService.HideSubscription(subscriptionId)
        if(response){
          updateUser(response)
        }
        showSuccessDialog({
          title: "Curso removido com sucesso",
          onConfirm: () => {}
        })
      } catch (error: unknown) {
        const errorResponse = error as IError
        const message = errorResponse.response?.data?.erros[0] || "Erro ao remover curso"
        showSuccessDialog({
          title: message,
          onConfirm: () => {}
        })
      } finally {
        setLoad(false);
      }
      return
    }
    try{
      setLoad(true);
      setIsDialogOpen(false);
      const response = await UserService.CourseUnsubscribe({ courseId: course.id});
      if(response){
        updateUser(response)
      }
      
      showSuccessDialog({
        title: finished ? "Curso removido com sucesso" : "Inscrição cancelada com sucesso!",
        onConfirm: () => {}
      })
      
    } catch (error: unknown) {
      const errorResponse = error as IError
      const message = errorResponse.response?.data?.erros[0] || "Erro ao cancelar inscrição"
      showSuccessDialog({
        title: message,
        onConfirm: () => {}
      })
    }finally{
      setLoad(false);
    }
  };

  const handleProgressBar = () : {
    progress: number,
    totalClasses: number,
    watchedClasses: number
  } => {
    if(!course.modules) return {
      progress: 0,
      totalClasses: 0,
      watchedClasses: 0
    }

    const totalClasses = course.modules.reduce((acc, module) => {
      return acc + module.classes.length
    }, 0)

    const watchedClasses = user.userClasses?.filter(uc => uc.watched && course.modules?.find(m => m.classes.find(c => c.id === uc.classId)))

    if(!watchedClasses) return {
      progress: 0,
      totalClasses,
      watchedClasses: 0
    }

    const progress = (watchedClasses.length / totalClasses) * 100

    return {
      progress,
      totalClasses,
      watchedClasses: watchedClasses.length
    }



  }

  return (
    <Card
      onClick={()=> 
        !finished && navigate("/curso/" + course.id)}
      key={course.id}
      sx={{
        width: isMobile ? "auto" : 345,
        height: isMobile ? "auto" : 600,
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        border: '1px solid #EEE8FA',
        boxShadow: 0,  
        position: "relative",
        borderRadius: "20px",
        '@media (max-width: 768px)': {
          alignItems: "center",
          padding: "0.1rem 1rem",
          border: 'none',
        },
        '&:hover': {
          cursor: "pointer",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          '.MuiTypography-h5' : {
            fontWeight: "600",
          }
        
        }

      }}
    >
      {!isMobile && (
        <CardHeader
          sx={{
            position: "absolute",
            right: "0",
          }}
          action={
            <>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{
                }}
              >
                <MoreVert 
                  sx={{
                    color: '#fff'
                  }}
                />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: "20ch",
                  },
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <MenuItem
                  key={1}
                  onClick={handleOpenDialog}
                  sx={{
                    color: "#FF0000",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  {finished ? "Remover da lista" : "Cancelar inscrição"}
                </MenuItem>
              </Menu>
              <div
                onClick={(e) => e.stopPropagation()}
              >
                <AppDialog
                  isOpen={isDialogOpen}
                  onClose={handleClose}
                  onConfirm={handleConfirm}
                  title={
                    finished
                      ? "Deseja remover esse curso da sua lista?"
                      : "Deseja cancelar sua inscrição?"
                  }
                />
                <AlertModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title={
                    finished
                      ? "Curso removido com sucesso"
                      : "Inscrição cancelada com sucesso!"
                  }
                />
              </div>
            </>
          }
        />
      )}

      {/* <CardMedia
        sx={{
          height: isMobile ? "84px" : 240,
          minWidth: isMobile ? "84px" : "auto",
          borderRadius: "8px",
          objectFit: "fill",
          '@media (min-width: 768px)': {
            height: "40px",
            width: "60px",
          }
        }}
        image={course.image}
      /> */}
      <img
        src={course.image}
        style={{
          width: isMobile ? "90px" : "100%",
          height: isMobile ? "90px" : "240px",
          objectFit: "fill",
          borderRadius: isMobile ? '8px' :"8px 8px 0 0",
        }}/>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          height: "100%",
          flex: "1",
          padding: isMobile ? "0" : "1rem",
          marginLeft:".5rem"
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontWeight: "600",
            fontSize: "20px",
            color: theme => theme.palette.secondary.main,
          }}
        >
          {course.name}
        </Typography>
        {!isMobile && (
          <Typography
            gutterBottom
            variant="caption"
            component="div"
            sx={{ color: "#A29DB1", fontSize: "1rem" }}
          >
            {course.subscribe} inscritos
          </Typography>
        )}

        <Stack
          display={"flex"}
          flexDirection={isMobile ? "row" : "column"}
          gap={isMobile ? ".5rem" : "0"}
          mt={isMobile ? "0" : "1rem"}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              gap: ".5rem",
            }}
          >
            <img src={LocationSVG} />
            <Typography
              gutterBottom
              variant="caption"
              component="div"
              sx={{
                color: "#A29DB1",
                fontSize: isMobile ? "12px" : "1rem",
                m: "0",
              }}
            >
              {course.localization}
            </Typography>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              gap: ".5rem",
              mt: isMobile ? "0" : "1rem",
            }}
          >
            <img src={LevelSVG} />
            <Typography
              gutterBottom
              variant="caption"
              component="div"
              sx={{
                color: "#A29DB1",
                fontSize: isMobile ? "12px" : "1rem",
                m: "0",
              }}
            >
              Nível: {course.courseLevels[0].level.name}
            </Typography>
          </Stack>
        </Stack>
        {!isMobile && (
          <Stack
            flexDirection="row"
            mt={2}
            gap="10px"
            alignContent="center"
            flexWrap="wrap"
            justifyContent="center" 
          >
            {course.courseLevels.map((tag) => (
              <Tags key={course.id} tag={tag.level.name} />
            ))}
          </Stack>
        )}
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            mt: isMobile ? "0" : "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack
            width={"100%"}
            sx={{ textAlign: isMobile ? "left" : "center", pt:"1rem",
            '@media (min-width: 768px)': {
              borderTop: "1px solid #EEE8FA",
            }
          }}
          >
            {finished && (
              <Typography
                onClick={() => goToTeacherDetail(course)}
                sx={{
                  color: "#F5006A",
                  textDecoration: "underline",
                }}
              >
                Ver página do curso
              </Typography>
            )}
            {!finished && (
              <Stack
                sx={{ width: "100%", textAlign: 'left',}}
              >
                <Typography
                  sx={{
                    color: theme => theme.palette.secondary.main,
                    fontWeight: 500,
                    pb: "4px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                  }}
                >Progresso
                  <Typography
                    sx={{
                      color: "#380478",
                      fontWeight: 500,
                      fontSize: "12px",
                    }}>
                    {handleProgressBar().watchedClasses}/{handleProgressBar().totalClasses} 
                    </Typography>
                </Typography>
                <LinearProgressBar 
                  value={handleProgressBar().progress}
                />
              </Stack>
            )}
          </Stack>
        </Stack>
      </CardContent>
      {isMobile && (
        <CardHeader
          sx={{ 
            padding: "0",
            height: "100%",
          }}
          action={
            <>
              <div
                style={{
                  height: "100%",
                }}
              >
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVert  />
                </IconButton>
              </div>

              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: "20ch",
                  },
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <MenuItem
                  key={1}
                  onClick={handleOpenDialog}
                  sx={{
                    color: "#FF0000",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  {finished ? "Remover da lista" : "Cancelar inscrição"}
                </MenuItem>
              </Menu>
              <div
                onClick={(e) => e.stopPropagation()}
              >
                <AppDialog
                  isOpen={isDialogOpen}
                  onClose={handleClose}
                  onConfirm={handleConfirm}
                  title={
                    finished
                      ? "Deseja remover esse curso da sua lista?"
                      : "Deseja cancelar sua inscrição?"
                  }
                />
                <AlertModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title={
                    finished
                      ? "Curso removido com sucesso"
                      : "Inscrição cancelada com sucesso!"
                  }
                />
              </div>
            </>
          }
        />
      )}
    </Card>
  );
};
