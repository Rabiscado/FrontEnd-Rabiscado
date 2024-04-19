import { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import theme from "./theme/theme";

import Header from "@components/Header";
import Login from "@pages/Login";
import SignUp from "@pages/Login/SignUp";
import ForgotPassword from "@pages/Login/ForgotPassword";
import LookForTeachers from "@pages/LookForTeachers";
import TeacherDetails from "@pages/TeacherDetails";
import MySubscriptions from "@pages/MySubscriptions";
import Course from "@pages/Course";
import { UserContext } from "@context/UserContext/Index";
import { ThemeProvider } from "@emotion/react";
import { TeacherArea } from "@pages/TeacherArea/Page";
import { SettingsPage } from "@pages/Settings/SettingsPage";
import { Planos } from "@pages/Plans";
import { DialogProvider } from "@context/DialogContext/DialogContext.tsx";
import { AdmReceiptPage } from "@pages/ADM/ReceiptsPanel/Page";
import { AdmUsersPage } from "@pages/ADM/UsersPanel/Page";
import { PlansAdmin } from "@pages/PlansAdmin";

import { AddCoursePage } from "@pages/ADM/AddCoursePage"; 
import { HelpCenter } from "@pages/HelpCenter";
import { AdmCoursePage } from '@pages/ADM/Course';
import { SubscribePage } from '@pages/Subscribe/Subscribe';

function App() {
  const { user } = useContext(UserContext);

  return (
    <ThemeProvider theme={theme}>
      <DialogProvider>
        <Router>
          <div>
            {user.id && <Header />}
            <Routes>
              {!user.id && (
                <>
                  <Route index path="/" element={<Login />} />
                  <Route path="/cadastro" element={<SignUp />} />
                  <Route path="/esqueci-senha" element={<ForgotPassword />} />
                </>
              )}
              {user.id && !user.isAdmin && !user.isProfessor && (
                <>
                  <Route path="/" element={<MySubscriptions />} />
                  <Route path="/curso/:id" element={<Course />} />
                  <Route path="/planos" element={<Planos />} />
                  <Route path="/loja" element={<LookForTeachers />} />
                  <Route
                    path="/detalhes-professor/:id"
                    element={<TeacherDetails />}
                  />


                  <Route path="/area-professor" element={<TeacherArea />} />
                </>
              )}
              {user.id && user.isProfessor && !user.isAdmin && (
                <> 

                  <Route path="/" element={<TeacherArea />} />
                </>
              )}

              {user.id && user.isAdmin && (
                <>
                  <Route path="/planos-adm" element={<PlansAdmin />} />
                  <Route path="/" element={<AdmReceiptPage />} />
                  <Route path="/painel-usuarios" element={<AdmUsersPage />} />
                  <Route path="/add-curso/:id" element={<AddCoursePage />} />
                  <Route path="/cursos" element={<AdmCoursePage />} />
                  {/* <Route path="/add-modulos" element={<ModulesAdmin />} /> */}
                </>
              )}
              {
                user.id && <>
                 <Route path="/configuracoes" element={<SettingsPage />} />
                 <Route path="/ajuda" element={<HelpCenter />} />
                </>
              }
              
              <Route path="/inscrever" element={<SubscribePage />} />
            </Routes>
          </div>
        </Router>
      </DialogProvider>
    </ThemeProvider>
  );
}

export default App;
