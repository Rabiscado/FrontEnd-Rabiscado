import {
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { UseMobile } from "@context/mobileContext";
import { ArrowBackIos, ArrowForwardIos, KeyboardArrowLeft, MusicNote } from "@mui/icons-material";
import { useEffect, useState } from "react"; 
import { CourseService } from "./services/courseService"; 
import ModalSteps from "./components/ModalSteps";
import Slider from "react-styled-carousel";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppButton } from "@components/Button"; 
import { CourseCRUD, IClasses } from '@pages/ADM/AddCoursePage/Models/CourseCRUD';
import { useParams } from 'react-router-dom';
import { SideMenu } from './components/LeftMenu/SideMenu';
import { Link } from 'react-router-dom';
import { useDialog } from '@context/DialogContext/useDialog';
import { UserService } from '@services/user/userService';
import { useUser } from '@hooks/use-user';
import { IError } from '@Models/Error';
import { Loading } from '@components/Loading/Loading';

export default function Index() { 
  const [CourseSec, setCourseSec] = useState<CourseCRUD>(new CourseCRUD());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<IClasses | undefined>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [openModalStep, setOpenModalStep] = useState<boolean>(false);
  const [modalStepSrc, setModalStepSrc] = useState<string>("");  

  const { isMobile } = UseMobile();

  const params = useParams()

  const {user,  updateUser} = useUser()


  const getCourse = async () => {
    setIsLoading(true);
    const courseResponse = await CourseService.Get(+params.id!);
    setCourseSec(courseResponse);
    setIsLoading(false); 
  };
 ;
 

  useEffect(() => {
    if(params.id)
      getCourse();
  }, [params.id]);
 
 

 
 

  const responsive = [ 
    { breakPoint: 1580, cardsToShow: 4 }, // this will be applied if screen size is greater than 1280px. cardsToShow will become 4. 
    {breakPoint: 1300,cardsToShow: 3,},
    { breakPoint: 1080, cardsToShow: 2 },
    { breakPoint: 768, cardsToShow: 1 },
    { breakPoint: 0, cardsToShow: 2 },
  ];

  const {openDialog, showSuccessDialog} = useDialog()

  const concludeClass = async () => {  
    try{
      debugger;
      await UserService.ConcludeClass(selectedClass!.id!);
      if(user.userClasses){
        const index = user.userClasses.findIndex((uc) => uc.classId === selectedClass!.id)
        user.userClasses[index].watched = true
        updateUser({...user})
      }
       
      showSuccessDialog({
        title: 'Aula concluída',
        onConfirm: () => { 
          CourseSec.modules?.forEach((module : any, moduleIndex) => {
            module.classes.forEach((classe : any, classIndex) => {
              if (classe.id === selectedClass!.id) {
                const isLastClass = classIndex === module.classes.length - 1;
                if (isLastClass && moduleIndex < CourseSec.modules.length - 1) {
                  const nextModule : any = CourseSec.modules[moduleIndex + 1];
                  if (nextModule.classes.length > 0) {
                    setSelectedClass(nextModule.classes[0]);
                  } else {
                    setSelectedClass(undefined);
                  }
                } else if (!isLastClass) {
                  setSelectedClass(module.classes[classIndex + 1]);
                }
              }
            });
          });
  
        }
      }) 
      
    } catch (error) {
      const err = error as IError
      const title = err.response?.data?.erros ? err.response?.data?.erros[0] : err?.message ?? "Erro ao concluir aula"
      console.log(title)
        showSuccessDialog({
          title,
          onConfirm: () => {}
        })
    }
  }

  const handleConcludeClass = () => {
    openDialog({
      title: 'Concluir aula', 
      onConfirm: () => concludeClass()
    })
  }

  const isConcluded = (classId?: number) => {
    if(user.userClasses && classId){
      const userClass = user.userClasses.find((uc) => uc.classId === classId)
      if(userClass)
        return userClass.watched 
    }
    return false
  }

  const concludedClassesLengthByModuleId = (moduleId: number) => {
    if(user.userClasses){
      const moduleClasses = (CourseSec.modules?.find((module) => module.id === moduleId) as any)?.classes
      if(moduleClasses){
        const concludedClasses = moduleClasses.filter((classe) => {
          const userClass = user.userClasses!.find((uc) => uc.classId === classe.id)
          if(userClass)
            return userClass.watched
          return false
        }
        )
        return concludedClasses.length
      }
    }
    return 0
  }

  

  return (
    <>
      {/* <AppDialog isOpen={isDialogOpen} onClose={()=> setIsDialogOpen(false)} title="Concluir aula?" onConfirm={handleConcludeClass}/> */}
      <Box 
        display="flex"
        justifyContent="center" 
        height="100%"
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          boxSizing: "border-box ",
        }}
      >
      {
        isLoading && <Loading/>
      }
        <Stack
          width={isMobile ? "100%" : "100%"}
          flexDirection={isMobile ? "column" : "row"}
          height="100%"
          sx={{
            boxSizing:"border-box",
            minHeight: "80vh",
          }}
        >
          {/* {!isMobile && (
            <LeftMenu videoId={videoId} course={course} setSelectedSection={setSelectedSection} setVideoId={setVideoId}  watchedVideos={watchedVideosMock}/>
          )}  */}
          <SideMenu
            course={CourseSec}
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
            setCourse={setCourseSec}
            concludedClassesLengthByModuleId={concludedClassesLengthByModuleId}
            isConcluded={isConcluded}
          />
            
    {selectedClass &&  (
          <Stack
            marginLeft={isMobile ? "0" : "1rem"}
            alignItems={isMobile ? "left" : "left"}
            width={isMobile ? "100%" : "85%"}
            gap={3}
          >
            {
              !isMobile && (
                <Link
                  to={`/`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "black",
                    gap: "0.5rem",
                    padding: "0 1rem",
                    marginTop: "2rem",
                    width: "fit-content",
                  }}
                >
                    <KeyboardArrowLeft
                    sx={{
                      color: theme => theme.palette.primary.main,
                      fontSize: "1.3rem"
                    }}/>
                  <Typography
                    sx={{
                      color: theme => theme.palette.primary.main,
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                    >
                    Voltar
                    </Typography>
                </Link>
              ) 
            }
            <Stack sx={{ display:"flex", flexDirection:"row", alignItems: 'center', paddingX: '1rem',
          '@media (max-width: 768px)': {
            pt: '1rem'
          }
          }}>
              {isMobile && (
                <Link
                  to={`/`}
                >
                  <IconButton
                  >
                    <ArrowBackIcon sx={{color:theme => theme.palette.secondary.main                  }}/>
                  </IconButton>
                </Link>
              )}
            <Typography
              variant={isMobile ? "h5" : "h4"}
              sx={{
                textAlign: isMobile ? "left" : "left",
                fontWeight:"600",
                color: theme => theme.palette.secondary.main
              }}
            >
              {
                selectedClass.name
              }
            </Typography>
            </Stack>
            <Box
              width={isMobile ? "100%" : "100%"}
              height={isMobile ? "300px" : "600px"}
              borderRadius="30px"
              paddingX={'1rem'}
            >
              <iframe
                id="video-player"
                src={
                  selectedClass.video
                }
                style={{ border: 0, width: "100%", height: "95%",
                borderRadius: "20px"
              }}
              ></iframe>
            </Box>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                paddingX: "1rem",
              }}
            >
              <Typography
                sx={{
                  color: "#A29DB1", 
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "start",
                  height: "100%",
                }}
                >
                  <MusicNote
                    sx={{
                      color: theme => theme.palette.primary.main,
                      marginRight: "0.5rem",
                    }}
                  />
                {
                  selectedClass.music
                }
              </Typography>
              <AppButton
              disabled={isConcluded(selectedClass.id)}
              title={isConcluded(selectedClass.id) ? "Aula Concluída" : "Concluir aula"} buttonVariant="primary" onClick={handleConcludeClass} />
            </Stack> 
              <>
                <Stack
                  sx={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    '@media (max-width: 768px)': {
                      flexDirection: "column",
                    }
                  }}
                >
                  <Box 
                    sx={{  
                      cursor: "pointer",
                      width: "30%",
                      maxWidth: "250px",
                      borderRadius: "20px",
                      '@media (max-width: 768px)': {
                        width: "100%",
                        maxWidth: "100%",
                        marginBottom: "1rem",
                        minHeight: "300px",
                        p: '1.5rem',
                        justifyContent: "center",
                        display: "flex",
                        '& > img': {
                          width: "100% !important",
                          height: "100% !important",
                          borderRadius: "20px !important",
                        }
                      }
                    }}
                    onClick={() => {
                      setOpenModalStep(true);
                      setModalStepSrc(selectedClass.gif!)
                    }} 
                  >
                    <img 
                      src={
                        selectedClass.gif
                      }
                      style={{
                        width: "13.75rem",
                        height: "13.75rem",
                        borderRadius: "20px",
                      }}
                    />
                  </Box>
                  <Stack width="95%"
                    sx={{
                      '@media (max-width: 768px)': {
                        display: 'none'
                      }
                    }}
                  >
                    <Slider
                      responsive={responsive}
                      infinite={false}
                      autoSlide={false}
                      showDots={false}
                      LeftArrow={
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "0",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          <ArrowBackIos />
                        </Box>
                      }
                      RightArrow={
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            right: "0",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          <ArrowForwardIos />
                        </Box>
                      }
                    > 
                      {
                        selectedClass.steps && selectedClass.steps.map((step, index) => (
                          <Box
                            key={index}
                            borderRadius="20px"
                            sx={{
                              width: '100%',
                              display: "flex",
                              justifyContent: "center", 
                              cursor: "pointer",
                             }}
                            onClick={() => {
                              setOpenModalStep(true);
                              setModalStepSrc(step.url)
                            }}
                          >
                            <img 
                              src={
                                step.url
                              }
                              style={{
                                width: "80%",
                                minWidth: "15.75rem",
                                height: "15.75rem",
                                borderRadius: "20px",
                              }}
                            />
                          </Box>
                        ))
                      }
 
                    </Slider>
                  </Stack>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "20rem",
                      width: "100%",
                      minHeight: "400px",
                      overflowX: "auto",
                      pl: "1.5rem",
                      '@media (min-width: 768px)': {
                        display: 'none',
                      }
                    }}
                    >
                      {
                        selectedClass.steps && selectedClass.steps.map((step, index) => (
                          <Box
                            key={index}  
                            sx={{
                              width: "17.5rem",
                              height: "17.5rem",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setOpenModalStep(true);
                              setModalStepSrc(step.url)
                            }}
                          >
                          <img 
                            src={
                              step.url
                            }
                            style={{
                              width: "17.5rem",
                              height: "17.5rem",
                              borderRadius: ".25rem",
                              objectFit: "fill", 
                            }}
                          />
                          </Box>
                        ))
                      }
                    </Stack>
                </Stack>
                <Stack
                  flexDirection="row"
                  justifyContent="space-between"
                  mb={3}
                  sx={{ width: "90%" }}
                ></Stack>
              </>  
          </Stack>
        )}
 
        </Stack>

        {openModalStep && (
          <ModalSteps
            handleClose={() => setOpenModalStep(false)}
            open={openModalStep}
            src={modalStepSrc}
          />
        )}
      </Box>
    </>
  );
}
