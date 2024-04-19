import {
  Box,
  Stack, 
  Typography,
} from "@mui/material";
import { UseMobile } from "@context/mobileContext";
import { useContext, useEffect, useState } from "react";
import { Course } from "@pages/LookForTeachers/models/Course";
 import { CourseCard } from "@components/CourseCard/CourseCard";
import { UserContext } from "@context/UserContext/Index";
import { TabsComponent } from '@components/Tabs/TabsComponent';
import { Loading } from '@components/Loading/Loading';


interface ICourseSubs extends Course {
  canceled: boolean;
  hide: boolean;
  subscriptionId: number;
}

export default function Index() {
  const [courses, setCourses] = useState<ICourseSubs[]>([]);
  const [canceledCourses, setCanceledCourses] = useState<ICourseSubs[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const { isMobile } = UseMobile();
  const [selectedTab, setSelectedTab] = useState(0);
  const {user} = useContext(UserContext)
 
  const getCourses = async () => {
    setIsLoading(true);
    if(!user.subscriptions) return;
    const coursesResponse = user.subscriptions.map((item : any) => ({...item.course, canceled: item.disabled, hide: item.isHide, subscriptionId: item.id} as unknown as ICourseSubs)) 
    setCourses(coursesResponse.filter(course => !course.canceled))
    const canceled = coursesResponse.filter(course => course.canceled && !course.hide) 
    setCanceledCourses(canceled)
    setIsLoading(false);
  };

  useEffect(() => {
    if(user.id)
      getCourses();
  }, [user]);

  return (
    <Box width="100%" display="flex" 
      sx={{
        padding: '2rem 1rem'
      }}
    >
      {
        isLoading && <Loading />
      }
      <Stack
        width="100%"
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "600",
            fontSize: isMobile ? "24px" : "32px",
            mb: "1rem",
            lineHeight: "32px",
            color: "#380478",
          }}
        >
          Olá, boas-vindas à sua área de cursos
        </Typography>
        <Typography
          sx={{
            fontSize: isMobile ? "16px" : "24px",
            color: "#A29DB1", 
            mb: 2
          }}
        >
          Aqui você tem acesso ao seus cursos em andamento e aos que você
          cancelou
        </Typography>
        <Stack
          sx={{
            justifyContent: "flex-start !important",
            mb: "1rem",
          }}
        >
          <TabsComponent 
            onChange={(_e, newValue) => setSelectedTab(newValue)}
            value={selectedTab}
            tabs={[
              { label: "Meus Cursos", value: 0 },
              { label: "Cancelados", value: 1 }
            ]}
          /> 
        </Stack>
        <Stack
          flexDirection={isMobile ? "column" : "row"}
          flexWrap="wrap"
          gap={2}
          width="100%" 
        >
          {selectedTab === 0 &&
            courses.map((course) => (
              <CourseCard key={course.id} course={course} finished={false} 
                setLoad={setIsLoading}

              />
            ))}
          {selectedTab === 1 &&
            canceledCourses.map((course) => (
              <CourseCard key={course.id} course={course} finished 
                setLoad={setIsLoading}
              />
            ))}
        </Stack>
      </Stack>
    </Box>
  );
}
