import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { UseMobile } from "@context/mobileContext";
import { ArrowBackIos, ArrowForwardIos, ExpandMore, Search, Tune } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { Video } from "./models/Video";
import { TeacherDetailService } from "./services/teacherDetailsService";
import LocationSVG from "@assets/location.svg";
import Currency from "@assets/currency.svg";
import Slider from "react-styled-carousel";

import { AppButton } from "@components/Button";
import { CourseSubscriptionsService } from "./services/CourseSubscriptionsService";
import { UserContext } from "@context/UserContext/Index";
import { Tags } from '@components/Tags';
import { CourseCRUD } from '@pages/ADM/AddCoursePage/Models/CourseCRUD';
import { CourseCRUDService } from '@services/course/courseService';
import { useDialog } from '@context/DialogContext/useDialog';
import { UserService } from '@services/user/userService';
import { IError } from '@Models/Error';
import { Loading } from '@components/Loading/Loading';

const responsive = [
  { breakPoint: 1920, cardsToShow: 7 }, // this will be applied if screen size is greater than 1280px. cardsToShow will become 4.
  { breakPoint: 1280, cardsToShow: 5 }, // this will be applied if screen size is greater than 1280px. cardsToShow will become 4.
  { breakPoint: 1060, cardsToShow: 4 }, 
  { breakPoint: 768, cardsToShow: 3 },
  { breakPoint: 0, cardsToShow: 2 },
];

interface LocalCourse extends CourseCRUD {
  video: string;
  courseLevels: {level: {name: string}}[];
  courseForWhos: {forWho: {name: string}}[];
  modules: Array<{
     id: number; // Assuming 'id' is required
     name: string; // Assuming 'name' is required
     courseId: number; // Assuming 'courseId' is required
     classes: Array<{
       id: number;
       name: string;
       description: string;
       video: string;
       tumb: string;
       music: string;
     }>;
  }>;
 }

export default function Index() {
  const [_video, setVideo] = useState<Video>(new Video());
  const [_, setOpenModalStep] = useState<boolean>(false);
  const { user, updateUser } = useContext(UserContext);

  const location = useLocation();
  const { state } = location as { state: { course: LocalCourse } };
  const [course, setCourse] = useState<LocalCourse>(state.course);

  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();

  const [filteredClass, setFilteredClass] = useState<LocalCourse["modules"] | null>(null);

  const [classSearch, setClassSearch] = useState("");

  const fetchCourse = useCallback(async () => {
    const response = await CourseCRUDService.Get(Number(params.id));
    if (response) {
       setCourse(response);
    }
   }, [params.id]); // Add dependencies here
   
   useEffect(() => {
    if (params) {
       fetchCourse();    
    }
   }, [fetchCourse, params]);

  const { isMobile } = UseMobile();

  const getVideo = async () => {
    const videoResponse: Video[] = await TeacherDetailService.Get();
    setVideo(videoResponse[0]);
  };

  const {showSuccessDialog, openDialog} = useDialog();

  const navigate = useNavigate()

  const [seeMore, setSeeMore] = useState(false);

  const handleUserCourseSubscribe = async () => {
    try{
      setIsLoading(true);
      const response = await CourseSubscriptionsService.Subscribe( 
        course.id
      );
      if (response) {
        updateUser(response)
        showSuccessDialog({
          title: 'Inscrição realizada com sucesso',
          onConfirm: () => {
            navigate('/')
          }
        })
      }
    } catch (error) {
      const erro = error as IError 
      const message = erro.response?.data?.erros[0] ?? 'Erro ao realizar inscrição'
      showSuccessDialog({
        title: message, 
        onConfirm: () => {
        }
      })
    }finally{
      setIsLoading(false);
    }

  };

  const handleDialogSubscribe = () => {
    openDialog({
      title: 'Deseja se inscrever no curso?', 
      onConfirm: () => { 
        handleUserCourseSubscribe()
      }
    })
  }

  const handleUserCourseUnsubscribe = async () => {
    try{
    setIsLoading(true);
    const response = await UserService.CourseUnsubscribe(
      {
        courseId: course.id, 
      }
    );
    updateUser(response)
    if (response) {
      showSuccessDialog({
        title: 'Inscrição cancelada com sucesso',
        onConfirm: () => {
          navigate('/')
        }
      })
    }
  } catch (error) {
    const erro = error as IError
    const message = erro.response?.data?.erros[0] ?? 'Erro ao cancelar inscrição'
    openDialog({
      title: message, 
      onConfirm: () => { 
      }
    })
  }finally{
    setIsLoading(false);
  }
  }

  const openUnsubscribe = () => {
    openDialog({
      title: 'Cancelar inscrição?', 
      onConfirm: () => { 
        handleUserCourseUnsubscribe()
      }
    })
  }

  useEffect(() => {
    getVideo();
  }, []);

  useEffect(() => {
    if (classSearch) {
      const modulesWithFilteredClasses = course.modules.map((module) => {
        const classes = module.classes.filter((classe) =>
          classe.name.toLowerCase().includes(classSearch.toLowerCase())
        );
        return { ...module, classes };
      });
      const filteredModules = modulesWithFilteredClasses.filter(
        (module) => module.classes.length > 0
      );
      setFilteredClass(filteredModules);
    }
  }, [classSearch]);

  return (
    <Box width="100%" display="flex" justifyContent="center"
      sx={{
        padding: "2rem 1.5rem",
      }}
    >
      {
        isLoading && <Loading/>
      }
      <Stack width="100%"  >
        <Stack
          flexDirection={isMobile ? "column" : "row"}
          gap={isMobile ? 1 : 5}
          height={isMobile ? "auto" : "450px"}
        >
          <Box
            sx={{
              width: "100%",
              '@media (max-width: 768px)': {
                display:'none'
              }
            }}
          >
            <iframe
              src={course.video}
              style={{ border: 0, width: "100%", height: "100%", 
              borderRadius: ".5rem"
            }}
            ></iframe>
          </Box>
          <Stack
            sx={{ width: '100%' }}
            justifyContent="space-between"
            alignItems={isMobile ? "center" : "start"}
            gap={isMobile ? 2 : ""}
          >
            <Stack
                width={"100%"}
                gap={'2rem'}
            >
              <Stack
                gap={'1rem'}
              >
                <Typography
                  variant={isMobile ? "h4" : "h2"}
                  sx={{
                    color: "#F5006A",
                    fontSize: "24px",
                    fontWeight: "600",
                  }}
                >
                  {course.name}
                </Typography>
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
                    sx={{ color: "#A29DB1", fontSize: "1rem", m: "0" }}
                  >
                    {course.localization}
                  </Typography>
                </Stack>
                <Stack
                  flexDirection="row" 
                  gap="10px"
                  flexWrap="wrap"
                  justifyContent="start" 
                >
                  <Tags tag={
                    course.style
                  } />
                  {
                    course.courseLevels && course.courseLevels.map((tag: {level: {name: string}}) => (
                      <Tags tag={tag.level.name} key={tag.level.name} />
                    ))
                  }
                  {
                    course.courseForWhos && course.courseForWhos.map((tag: {forWho: {name: string}}) => (
                      <Tags tag={tag.forWho.name} key={tag.forWho.name} />
                    ))
                  }

                  {/* {course.tags.map((tag: string) => (
                    <Tags tag={tag} key={teacher.id} />
                  ))} */}
                </Stack>
                
          <Box
            sx={{
              width: "100%", 
              minHeight: "300px",
              '@media (min-width: 768px)': {
                display:'none'
              }
            }}
          >
            <iframe
              src={course.video}
              style={{ border: 0, width: "100%", height: "100%", 
              borderRadius: ".5rem"
            }}
            ></iframe>
          </Box>
              </Stack>
              <Stack
                gap={'.5rem'}
              >
              <Typography sx={{ fontWeight: "700", 
                color: "#380478"
            }}>Sobre</Typography>
              <Typography 
                variant="h6"
                sx={{ fontWeight: "400", fontSize: "16px", color: "#A29DB1" }}
              >
                {course.description}
              </Typography>
              </Stack>
            </Stack>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Stack
                sx={{ display: "flex", flexDirection: "row", gap: ".375rem" }}
              >
                <img src={Currency} />
                <Typography
                  sx={{
                    fontSize: "40px",
                    fontWeight: "600",
                    color: "#F5006A",
                  }}
                >
                  {course.value}
                </Typography>
              </Stack>
              {
                user && user.subscriptions && user.subscriptions.find((sub:any) => (sub.courseId === course.id && !sub.disabled)) ? <>
                  <Stack>
                    <Select
                      value="Inscrito"
                      sx={{
                        width: "100%",
                        minWidth: "10rem",
                        height: "3rem",
                        backgroundColor: "#fff", 
                        fontSize: "1rem",
                        fontWeight: "600",
                        borderRadius: ".5rem",
                        color: theme => theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: "#fff",
                        },
                        '&:focus': {
                          backgroundColor: "#fff",
                        }
                      }}
                      IconComponent={
                        () => <ExpandMore
                          sx={{
                            color: "#F5006A",
                          }}
                        /> 
                      }
                    >
                      <MenuItem value="Inscrito">Inscrito</MenuItem>
                      <MenuItem value="Cancelar">
                        <Typography
                          sx={{
                            color: "#F5006A",
                            fontSize: "1rem",
                            fontWeight: "600",
                            textDecoration: "underline",
                          }}
                          onClick={openUnsubscribe}
                          >
                          Cancelar inscrição
                          </Typography>
                      </MenuItem>
                    </Select>
                  </Stack>
                </> : <Stack >
                <AppButton
                  disabled={user.coin < course.value}
                  title="Inscreva-se"
                  buttonVariant="primary"
                  onClick={handleDialogSubscribe}
                  sx={{
                    '@media (max-width: 768px)': {
                      fontSize: '1rem'
                    }
                  }}
                />
              </Stack>}
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={{ placeItems: "center" }}>
         
        <TextField
            placeholder="Qual passo quer aprender?"
            value={classSearch}
            onChange={(e) => setClassSearch(e.target.value)}
            sx={{ 
              backgroundColor: "#EEE8FA",
              width: "50%",
              mt: "2rem",
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
              '@media (max-width: 768px)': {
                width: "100%",
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search
                    sx={{
                      color: "#833FD7",
                    }}
                  />
                </InputAdornment>
              ), 
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    id="basic-button" 
                    aria-haspopup="true" 
                  >
                    <Tune
                      sx={{
                        color: "#F5006A",
                      }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        {
          classSearch.length > 0 && filteredClass && filteredClass.length === 0 ? (
            <Typography
              sx={{
                color: "#A29DB1",
                fontSize: "24px",
                fontWeight: "700",
                textAlign: "center",
                mt: 2
              }}
            >
              Nenhum resultado encontrado
            </Typography>
          ) : <></>
        }
        {
          (course.modules) && (classSearch.length === 0 ? course.modules : (filteredClass ?? [])).map((module, index) => (
            (!seeMore && classSearch.length === 0) && index > 0 ? null : <>
            <Typography
              sx={{
                padding: "20px",
                color: "#380478",
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              {module.name}
            </Typography>
            <Box
              sx={{
                '@media (max-width: 768px)': {
                  display: "none"
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
                      '@media (max-width: 768px)': {
                        display: "none",
                      }
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
                      '@media (max-width: 768px)': {
                        display: "none",
                      }
                    }}
                  >
                    <ArrowForwardIos />
                  </Box>
                }
              >    
                {
                  module.classes.map((classe) => (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                    <Box 
                      sx={{ 
                        borderRadius: "8px",
                        width: "219px",
                        height: "219px",
                        '@media (max-width: 768px)': {
                          width: '170px',
                          height: '170px',
                        }
                    
                  }}
                      onClick={() => {
                        setOpenModalStep(true);
                      }}
                    >
                      <img src={classe.tumb} 
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "fill",
                          borderRadius: "8px",
                        }}
                      />
                    </Box>
                    </Box>
                  ))
                }
                {/* <Box
                  height="219px"
                  width="219px"
                  sx={{ border: "2px solid #3400744D", borderRadius: "8px" }}
                  onClick={() => {
                    setOpenModalStep(true);
                  }}
                ></Box>  */}
              </Slider>
            </Box>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row", 
                gap: "1rem",
                overflowX: "scroll",
                overflowY: "hidden",
                width: "100%",
                '@media (min-width: 768px)': {
                  display: "none"
                }
              }}>
              {
                module.classes.map((classe) => (
                  <Box 
                    sx={{ 
                      borderRadius: "8px",
                      width: "219px",
                      height: "219px",
                      '@media (max-width: 768px)': {
                        width: '170px',
                        height: '170px',
                        minWidth: '170px',
                      }
                  }}
                    onClick={() => {
                      setOpenModalStep(true);
                    }}
                  >
                    <img src={classe.tumb} 
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                        borderRadius: "8px",
                      }}
                    />
                  </Box>
                ))
              }
              </Stack>

            </>
          ))
        }
        {
          classSearch.length === 0 && course.modules.length > 1 && <Typography
          sx={{
            color: theme => theme.palette.primary.main, 
            fontWeight: "600",
            textDecoration: "underline",
            cursor: "pointer",
            mt: "1rem",
          }}
          onClick={() => setSeeMore(!seeMore)}
        >
          {seeMore ? "Ver menos" : "Ver mais"} 
        </Typography>}
      </Stack>
    </Box>
  );
}
