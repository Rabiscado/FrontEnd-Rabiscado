import { Search, Tune } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Card,
  CardContent, 
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { UseMobile } from "@context/mobileContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Teacher } from "./models/Teacher";
import { TeacherService } from "./services/lookForTeachersService";
import LocationSVG from "@assets/location.svg";
import LevelSVG from "@assets/level.svg";
import Currency from "@assets/currency.svg";
import { AppButton } from "@components/Button";
import { Tags } from "@components/Tags";
import { Course, ForWho } from "./models/Course";
import { CourseService } from "@pages/Course/services/courseService";
import { ForWhoService } from "./services/ForWhoService";
import { Loading } from '@components/Loading/Loading';



export default function Index() {
  const [_, setTeachers] = useState<Teacher[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filters, setFilters] = useState({
    Level: "",
    Localization: "",
    ForWho: "",
    School: "",
    Style: "",
    Step: "",
    name: ""
  });


  const [forWho, setForWho] = useState<ForWho[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([""]);
  const [schools, setSchools] = useState([""]);
  const [styles, setStyles] = useState([""]);

  const [isLoading, setIsLoading] = useState(false);

  const { isMobile } = UseMobile();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getTeachers = async () => {
    const teacherResponse = await TeacherService.Get();
    setTeachers(teacherResponse);
  };

  const getCourses = async () => {
    const response = await CourseService.GetAll();
    if (response) {
      setCourses(response);
    }
  };
  const getForWho = async () => {
    const response = await ForWhoService.GetAll();
    if (response) {
      setForWho(response);
    }
  };
  // const getSteps = async () => {
  //   const response = await StepsService.GetAll();
  //   if (response) {
  //     setSteps(response);
  //   }
  // };

  const getLocalizations = () => {
    courses.map((course) => {
      if (!locations.find((location) => location === course.localization))
        setLocations([...locations, course.localization]);
    });
  };
  const getSchools = () => {
    courses.map((course) => {
      if (!schools.find((school) => school === course.school))
        setSchools([...schools, course.school]);
    });
  };
  const getStyles = () => {
    courses.map((course) => {
      if (!styles.find((style) => style === course.style))
        setStyles([...schools, course.style]);
    });  };

  useEffect(() => {
    getTeachers();
    getCourses();
  }, []);

  useEffect(() => {
    getForWho();
    getLocalizations();
    getSchools();
    getStyles();
  }, [courses]);

  const goToTeacherDetail = (course: Course) => {
    navigate("/detalhes-professor/" + course.id, { state: { course } });
  };

  const handleFilter = (field: string, filter: string) => {
    setFilters({ ...filters, [field]: filter });
  };

  const filterCourses = async () => {
    setIsLoading(true);
    const response = await CourseService.Filter(filters);
    if (response) {
      setCourses(response);
    }
    setIsLoading(false);
  };

  const handleFilterLevel = (level: string) => {
    handleFilter("Level", level);
    setSelectedLevel(level);
  };

  useEffect(() => {
    filterCourses();
  }, [filters]);

  const [timeoutId, setTimeoutId] = useState<any>(null);
  // Função de debounce
  const debounce = (func : any, delay : any) => { 
    return function(...args) {
      clearTimeout(timeoutId);
      setTimeoutId(setTimeout(() => func(...args), delay));
    };
  };

  // Função de busca (simulada)
  const searchApi = term => {
    setFilters({ ...filters, name: term });
    // Aqui você chamaria a API com o termo de busca
  };

  // Função de busca debounceada
  const debouncedSearchApi = debounce(searchApi, 500); // 300ms de atraso

  // Função de busca debounceada 
  const handleSearchChange = event => {
    const { value } = event.target;
    setSearch(value);
    debouncedSearchApi(value);
  };
 

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Stack  width={"100%"}
        sx={{
          padding: "32px 16px",
          '@media (max-width: 47.5rem)': {
            alignItems: "center",
          }
        }}
      >
        
        {
            isLoading && <Loading />
          }
        <Stack sx={{ width: "100%", placeItems: "center" }}>
          <TextField
            value={search}
            onChange={handleSearchChange} 
            placeholder="Busque aqui a sua dança"
            sx={{ 
              width: "60%", 
              backgroundColor: "#EEE8FA",
              '&:hover': {
                backgroundColor: "#EEE8FA",
              },
              '*':{
                border: '0rem !important',
                color: '#380478 !important'
              },
              '&::placeholder': {
                color: '#380478'
              },
              '&':{
                borderRadius: '8px !important'
              },
              '@media (max-width: 48rem)': {
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
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
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
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{  
              '& .MuiMenuItem-root': {
                backgroundColor: 'transparent !important',
              },
              '& .MuiMenuItem-root:hover': {
                backgroundColor: 'transparent',
                cursor: 'normal'
              },
              '.MuiMenuItem-root ': {
                cursor: 'auto'
              },
              '.MuiInputBase-root':{
                maxHeight: '2.5rem',
                paddingTop: '0 !important',
                borderRadius: '.5rem',
              }
            }}
          >
            <MenuItem disableTouchRipple disableRipple>
              <Box
                sx={{
                  width: "50rem",
                  gap: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack>
                  <Typography
                    sx={{ 
                      fontWeight: "600",
                      color: "#380478",
                    }}
                  >Nível</Typography>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "16px",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Stack sx={{ width: "33%" }}>
                      <AppButton
                        title="Básico"
                        buttonVariant={
                          selectedLevel === "Initial" ? "primary" : "secondary"
                        }
                        sx={{
                          fontSize: "16px",
                          height: "3rem",
                        }}
                        onClick={() => handleFilterLevel("Initial")}
                      />
                    </Stack>
                    <Stack sx={{ width: "33%" }}>
                      <AppButton
                        title="Intermediário"
                        buttonVariant={
                          selectedLevel === "Intermediate"
                            ? "primary"
                            : "secondary"
                        }
                        sx={{
                          fontSize: "16px",
                          height: "3rem",
                        }}
                        onClick={() => handleFilterLevel("Intermediate")}
                      />
                    </Stack>
                    <Stack sx={{ width: "33%" }}>
                      <AppButton
                        title="Avançado"
                        buttonVariant={
                          selectedLevel === "Advanced" ? "primary" : "secondary"
                        }
                        sx={{
                          fontSize: "16px",
                          height: "3rem",
                        }}
                        onClick={() => handleFilterLevel("Advanced")}
                      />
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack sx={{ width: "66%" }}>
                    
                  <Typography
                    sx={{ 
                      fontWeight: "600",
                      color: "#380478",
                    }}
                  >Localização</Typography>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={locations}
                      value={filters.Localization}
                      onChange={(_event, value) =>
                        handleFilter("Localization", value!)
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                  <Stack sx={{ width: "32%" }}>
                    
                  <Typography
                    sx={{ 
                      fontWeight: "600",
                      color: "#380478",
                    }}
                  >Para quem dançar</Typography>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      value={filters.ForWho === "Led" ? "Conduzido" : filters.ForWho === "Couple" ? "Casal" : "Condutor"
                      }
                      options={forWho.map((forWho) => forWho.name)}
                      onChange={(_event, value) =>
                        handleFilter("ForWho", value!)
                      }
                      
                      renderInput={(params) => <TextField {...params}
                      />}
                    />
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "16px",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Stack sx={{ width: "30%" }}>
                     
                  <Typography
                    sx={{ 
                      fontWeight: "600",
                      color: "#380478",
                    }}
                  >Escola</Typography>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      value={filters.School}
                      options={schools}
                      onChange={(_event, value) =>
                        handleFilter("School", value!)
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                  <Stack sx={{ width: "30%" }}>
                     
                  <Typography
                    sx={{ 
                      fontWeight: "600",
                      color: "#380478",
                    }}
                  >Estilo</Typography>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      value={filters.Style}
                      options={styles}
                      onChange={(_event, value) => handleFilter("Style", value!)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>

                  <Stack sx={{ width: "30%" }}>
                     
                  <Typography
                    sx={{ 
                      fontWeight: "600",
                      color: "#380478",
                    }}
                  >Passo</Typography>
                    <Autocomplete
                      disablePortal
                      value={filters.Step}
                      id="combo-box-demo"
                      onChange={(_event, value) => handleFilter("Step", value!)}
                      options={["Tango", "Forró"]}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </Stack>
              </Box>
            </MenuItem>
          </Menu>
        </Stack>
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "600",
            my: "24px",
            width: "100%",
            color: "#380478",
            display: "flex",
            gap: "32px",
          }}
        >
          Nossos cursos
         {
          Object.values(filters).some(filter => filter !== "") && <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "400",
              color: theme => theme.palette.primary.main,
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              setSearch("");
              setSelectedLevel("");
              setFilters({
                Level: "",
                Localization: "",
                ForWho: "",
                School: "",
                Style: "",
                Step: "",
                name: ""
              });
            }}
          >
            Limpar filtros
        </Typography>} 
        </Typography>
        <Stack
          flexDirection={isMobile ? "column" : "row"}
          gap={3}
          flexWrap="wrap"
          mb={3}
          minHeight={300}
          position= "relative"
        >
          
          {
            !isLoading && courses.length === 0 && <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "600",
                my: "24px",
                width: "100%",
                color: "#A29DB1",
                textAlign: "center"
              }}
            >Nenhum curso encontrado</Typography>
          }
          {!isLoading && courses.map((course) => (
            <Card
              key={course.id}
              sx={{
                width: 345,
                height: 600,
                boxShadow: "0",
                borderRadius: "1.25rem", 
                p: 0,
                border: ".0625rem solid #EEE8FA",
                '@media (max-width: 47.5rem)': {
                  width: "80vw",
                }
              }}
            >
            <img
              src={course.image}
              style={{
                width: "100%",
                height: "15rem",
                objectFit: "fill",
                borderRadius:  ".5rem .5rem 0 0",
              }}/>
              
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  height: "100%",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.25rem",
                    color: "#380478",
                    mb: "-3.2px",
                  }}
                >
                  {course.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="caption"
                  component="div"
                  sx={{ color: "#A29DB1", fontSize: "16px", mb: 2 }}
                >
                  {course.subscribe} inscritos
                </Typography>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    gap: "8px",
                  }}
                >
                  <img src={LocationSVG} />
                  <Typography
                    gutterBottom
                    variant="caption"
                    component="div"
                    sx={{ color: "#A29DB1", fontSize: "16px", m: "0" }}
                  >
                    {course.localization}
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    gap: "8px",
                    mt: "16px",
                  }}
                >
                  <img src={LevelSVG} />
                  <Typography
                    gutterBottom
                    variant="caption"
                    component="div"
                    sx={{ color: "#A29DB1", fontSize: "16px", m: "0" }}
                  >
                    Nível: {course.courseLevels[0].level.name}
                  </Typography>
                </Stack>
                <Stack
                  flexDirection="row"
                  gap=".625rem"
                  alignContent="center"
                  flexWrap="wrap"
                  justifyContent="center"
                  sx={{
                    height: "6.5rem",
                  }}
                >
                  {course.courseForWhos.map((tag) => (
                    <Tags key={course.id} tag={tag.forWho.name} />
                  ))}
                </Stack>
                <Stack
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    borderTop: ".0625rem solid #EEE8FA",
                    paddingY: "16px",
                    mt: "16px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack 
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <img src={Currency}  
                    />
                    <Typography
                      variant="h6"
                      color="secondary"
                      sx={{
                        fontSize: "1.125rem",
                        fontWeight: "#F5006A",
                        color: "#F5006A",
                      }}
                    >
                      {course.value}
                    </Typography>
                  </Stack>
                  <Stack width={"50%"}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <AppButton
                      title="Veja mais"
                      buttonVariant="secondary"
                      sx={{
                        maxHeight: "3.125rem",
                        fontSize: '16px',
                        maxWidth: "9.375rem",
                      }}
                      onClick={() => {
                        goToTeacherDetail(course);
                      }}
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
