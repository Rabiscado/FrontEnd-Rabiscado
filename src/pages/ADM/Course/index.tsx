import { Add } from "@mui/icons-material";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { UseMobile } from "@context/mobileContext";
import { AppButton } from "@components/Button";
import { CourseCard } from "./components/courseCard";
import { useModal } from "../../../hooks/use-modal";
import { ModalAddCourse } from "./components";
import { PostCourse } from "../../../Models/Course";
import { CourseCRUDService } from "../../../services/course/courseService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabsComponent } from "@components/Tabs/TabsComponent";
import { Loading } from '@components/Loading/Loading';

export const AdmCoursePage = () => {
  const { isMobile } = UseMobile();
  const [isActive, setIsActive] = useState<boolean>(true);
  const [coursesDataArray, setCoursesDataArray] = useState<PostCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<
    PostCourse | undefined
  >();
  const [isAddCourseModalOpen, openAddCourseModal, closeAddCourseModal] =
    useModal();

  const navigate = useNavigate();

  const getFilteredCourses = () => {
    return coursesDataArray.filter((value) => value.disabled === !isActive);
  };

  const handleActiveCourses = () => {
    setIsActive(!isActive);
  };

  const handleCloseModal = () => {
    setSelectedCourse(undefined);
    closeAddCourseModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await CourseCRUDService.GetAll();
      setCoursesDataArray(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async (data: PostCourse) => {
    if (data.image.split("/").pop() !== data.file?.name) {
      data.image = data.file as any;
    } else {
      data.file = undefined;
    }

    if (data.id !== 0) {
      delete data.courseLevels;
      delete data.courseForWhos;
      const response = await CourseCRUDService.Put(data.id, data);
      setCoursesDataArray(
        coursesDataArray.map((course) => {
          if (course.id === data.id) {
            return response;
          }
          return course;
        })
      );
      if (response) {
        closeAddCourseModal();
      }
      return;
    }

    const response = await CourseCRUDService.Post(data);
    navigate("/add-curso/" + response.id, { replace: true });
    setCoursesDataArray([...coursesDataArray, response]);
    if (response) {
      closeAddCourseModal();
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        height="auto"
        width="100vw"
        padding="1.5rem"
      >
        {isLoading && <Loading />}
        <Stack
          width="100%"
          height="6rem"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            fontSize="2rem"
            fontWeight={600}
            color={(theme) => theme.palette.secondary.main}
          >
            Cursos
          </Typography>
          {isMobile ? (
            <Box
              display="flex"
              alignItems="center"
              fontSize="1rem"
              fontWeight={700}
              color={(theme) => theme.palette.primary.main}
              onClick={() => {
                openAddCourseModal();
              }}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
                textDecoration: "underline #F5006A",
              }}
            >
              <Add /> Adicionar Curso
            </Box>
          ) : (
            <AppButton
              buttonVariant="primary"
              title={"Adicionar Curso"}
              onClick={() => {
                openAddCourseModal();
              }}
            />
          )}
        </Stack>
        <Box
          width="100%"
          height="auto"
          display="flex"
          flexDirection="column"
          gap="1rem"
          alignItems="center"
        >
          <Box
            width="100%"
            height="fit-content"
            display="flex"
            flexDirection="row"
            justifyContent="left"
            gap="1rem"
          >
            <TabsComponent
              tabs={[
                { label: "Ativo", value: 0 },
                { label: "Inativo", value: 1 },
              ]}
              value={isActive ? 0 : 1}
              onChange={() => handleActiveCourses()}
            />
          </Box>
          {coursesDataArray.length > 0 ? (
            <Grid container spacing={2} columns={12}>
              {getFilteredCourses().map((value, index) => {
                return (
                  <Grid key={index} item xs={12} sm={4} md={4} xl={2}>
                    <CourseCard
                      address={value.localization}
                      id={value.id}
                      image={value.image}
                      isActive={!value.disabled}
                      level={
                        value.courseLevels as {
                          id: number;
                          courseId: number;
                          levelId: number;
                          level: {
                            id: number;
                            name: string;
                            description: string;
                            disabled: boolean;
                          };
                        }[]
                      }
                      themes={[value.style]}
                      title={value.name}
                      value={value.value}
                      numberSubscribers={value.subscribe as number}
                      onEdit={() => {
                        setSelectedCourse(value);
                        openAddCourseModal();
                      }}
                      onDesactivate={() => {
                        CourseCRUDService.Delete(value.id);
                        setCoursesDataArray(
                          coursesDataArray.map((course) => {
                            if (course.id === value.id) {
                              return { ...course, disabled: true };
                            }
                            return course;
                          })
                        );
                      }}
                      onRemove={() => {
                        CourseCRUDService.Remove(value.id);
                        setCoursesDataArray(
                          coursesDataArray.filter(
                            (course) => course.id !== value.id
                          )
                        );
                      }}
                      onReactivate={() => {
                        CourseCRUDService.Active(value.id);
                        setCoursesDataArray(
                          coursesDataArray.map((course) => {
                            if (course.id === value.id) {
                              return { ...course, disabled: false };
                            }
                            return course;
                          })
                        );
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Box
              display="flex"
              width="100%"
              height="75vh"
              alignItems="center"
              alignContent="center"
              justifyContent="center"
            >
              <Typography
                fontWeight={400}
                fontStyle="italic"
                fontSize={isMobile ? "0.9rem" : "1.5rem"}
                color={(theme) => theme.palette.text.secondary}
              >
                Você ainda não cadastrou nenhum curso
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <ModalAddCourse
        isOpen={isAddCourseModalOpen}
        onClose={handleCloseModal}
        selectedCourse={selectedCourse}
        onConfirm={handleSubmit}
      />
    </>
  );
};
