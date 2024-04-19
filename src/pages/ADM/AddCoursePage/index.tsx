import { Box,  Typography } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CourseCRUD, IClasses } from './Models/CourseCRUD';
import { useModal } from '../../../hooks';
import { AddModuleModal } from './components/Modal/AddModuleModal';  
import { SideMenu } from './components/LeftMenu/SideMenu';
import { useParams } from 'react-router-dom';
import { ModulesService, ClassesService, CourseCRUDService } from '../../../services/course/courseService';
import { ModulesAdmin } from '../AddClassesPage';
import { useDialog } from '@context/DialogContext/useDialog'; 
import { IError } from '@Models/Error';
import { Loading } from '@components/Loading/Loading';

interface Module {
  id: number;
  name: string;
  courseId: number;
}

export const AddCoursePage: React.FC = () => {
  
  const [course, setCourse] = useState<CourseCRUD>(new CourseCRUD())

  const {id} = useParams<{id: string}>()

  const [isNewModuleModalOpen, openNewModuleModal, closeNewModuleModal] = useModal();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [selectedModule, setSelectedModule] = useState<Module | undefined>(undefined)

  const [selectedClass, setSelectedClass] = useState<IClasses | undefined>(undefined)

  const [isLoading, setIsLoading] = useState(false)

  const { openDialog, showSuccessDialog } = useDialog() 

  async function handleSaveClass(data : any){ 
    try{ 
    if(!id) return
    if(!selectedModule) return
    setIsLoading(true)
    data.moduleId = selectedModule.id
    data.descripton = data.name 

    if(data.id === 0){
      const response = await ClassesService.Post(data)
      setCourse({
        ...course,
        modules: course.modules.map((module: any) => {
          if(module.id === selectedModule.id){
            return {
              ...module,
              classes: [
                ...module.classes,
                response
              ]
            }
          }
          return module
        })
      })
      setSelectedClass(undefined)
      setSelectedModule(undefined)
      showSuccessDialog({
        title: "Aula cadastrada com sucesso",
        onConfirm: () => {}
      })
      return
    }
    const response = await ClassesService.Put(data.id, data)
    setCourse({
      ...course,
      modules: course.modules.map((module: any) => { 
        if(module.id === selectedModule.id){
          return {
            ...module,
            classes: module.classes.map((classe : any) => {
              if(classe.id === data.id){
                return response
              }
              return classe
            })
          }
        }
        return module
      })
    })
    setSelectedClass(undefined)
    setSelectedModule(undefined)
    showSuccessDialog({
      title: "Aula atualizada com sucesso",
      onConfirm: () => {}
    })
  }
  catch(error){
    const err = error as IError
    const title = err.response?.data?.erros[0] ?? "Erro ao salvar aula"
    showSuccessDialog({
      title,
      onConfirm: () => {}
    })
    
  } finally{
    setIsLoading(false)
  }

  }

  const handleDeleteModule = async (moduleId: number) => {
    try{
      setIsLoading(true)
      if(!id) return
      openDialog({
      title: "Excluir Módulo?",
      onConfirm: () => {
        ModulesService.Delete(moduleId)
        setCourse({
          ...course,
          modules: course.modules.filter((module) => module.id !== moduleId)
        })
        setSelectedModule(undefined)
        setSelectedClass(undefined)
        showSuccessDialog({ 
          title: "Módulo excluído com sucesso",
          onConfirm: () => {}
        })
      }
    })
    } catch(error){
      const err = error as IError
      const title = err.response?.data?.erros[0] ?? "Erro ao excluir módulo"
      showSuccessDialog({
        title,
        onConfirm: () => {}
      })
    } finally{
      setIsLoading(false)
    }

  }

  const handleDeleteClass = async (classId: number) => {
    try{
      setIsLoading(true)
      if(!id) return
      openDialog({
        title: "Excluir Aula?",
        onConfirm: () => {
          ClassesService.Delete(classId)
          setCourse({
            ...course,
            modules: course.modules.map((module : any) => {
              return {
                ...module,
                classes: module.classes.filter((classe) => classe.id !== classId)
              }
            })
          })
          setSelectedModule(undefined)
          setSelectedClass(undefined)
          showSuccessDialog({
            title: "Aula excluída com sucesso",
            onConfirm: () => {}
          })
        }
      })
    } catch(error){
      const err = error as IError
      const title = err.response?.data?.erros[0] ?? "Erro ao excluir aula"
      showSuccessDialog({
        title,
        onConfirm: () => {}
      })
    } finally{
      setIsLoading(false)
    }
  }
  
  

  async function handleSaveModule(name: string){
    try{
      setIsLoading(true)
      if(!id) return
      if(selectedModule){
        const module = {
          id: selectedModule.id,
          name,
          description: name,
          courseId: parseInt(id),
        }
        await ModulesService.Put(selectedModule.id, module)
        setCourse({
          ...course,
          modules: course.modules.map((module) => {
            if(module.id === selectedModule.id){
              return {
                ...module,
                name
              }
            }
            return module
          })
        })
        showSuccessDialog({
          title: "Módulo atualizado com sucesso",
          onConfirm: () => {}
        })
        return
      }
      const module = {
        name,
        description: name,
        courseId: parseInt(id)
      } as unknown as Module
      const response = await ModulesService.Post(module)
      setCourse({
        ...course,
        modules: [
          ...course.modules,
          {
            id: response.id,
            name, 
            courseId: parseInt(id), 
          }
        ]
      })
      showSuccessDialog({
        title: "Módulo cadastrado com sucesso",
        onConfirm: () => {}
      })
    } catch(error){
      const err = error as IError
      const title = err.response?.data?.erros[0] ?? "Erro ao salvar módulo"
      showSuccessDialog({
        title,
        onConfirm: () => {}
      })
    }
    finally{
      setIsLoading(false)
    }
  }

  async function getCourse(){
    if(!id) return
    try{
      setIsLoading(true)
      const response = await CourseCRUDService.Get(parseInt(id))
      // setCourse(response)
      
      const {modules} = response
      
    setCourse({
      ...response,
      modules: modules.map((module) => {
        return {
          ...module,
          classes: module.classes.map((classe) => {
            return {
              ...classe,
              moduleId: module.id
            }
          })
        }
      }).filter((module) => !module.disabled)
    })
    
    console.log(response)
  } catch(error){
    const err = error as IError
    const title = err.response?.data?.erros[0] ?? "Erro ao buscar curso"
    showSuccessDialog({
      title,
      onConfirm: () => {}
    })
  } finally{
    setIsLoading(false)
  }
 
  }

  useEffect(() => {
    getCourse()
  }, [id])
 
  
 
  return (
    <>
      <Box
        sx={{
          height: "100%",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          '@media (max-width: 768px)': {
            flexDirection: "column",
            height: "100vh",
          },
        }}
      >
        <SideMenu
          course={course}
          setCourse={setCourse}
          setSelectedModule={setSelectedModule}
          setIsDrawerOpen={setIsDrawerOpen}
          isDrawerOpen={isDrawerOpen}
          openNewModuleModal={openNewModuleModal}
          selectedModule={selectedModule}
          handleDeleteModule={handleDeleteModule}
          handleDeleteClass={handleDeleteClass}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />

        <Box
          sx={{
            width: '100%', 
            paddingTop: '1.5rem',
            paddingX: '1rem',
            '@media (max-width: 760px)': { 
              height: '100%',
            }
          }}>
            {
              isLoading && <Loading />
            }
            {
              !selectedModule && <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  '@media (max-width: 760px)': {
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 400,
                    color: '##A29DB1',
                    '@media (max-width: 760px)': {
                      fontSize: '1.5rem'
                    }
                  }}
                >
                  Selecione um módulo para adicionar aulas
                </Typography>
              </Box>
            }
            {
              (selectedModule) && <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  width: "100%",
                }}
              >
                <ModulesAdmin
                    course={course}
                    setCourse={setCourse as Dispatch<SetStateAction<CourseCRUD>>}
                    onSave={handleSaveClass}
                    selectedClass={selectedClass as any}
                    setIsLoading={setIsLoading}
                />
              </Box>
            }
        </Box>
      </Box>
      <AddModuleModal
        isOpen={isNewModuleModalOpen}
        onClose={closeNewModuleModal}
        currentModule={selectedModule}
        onConfirm={(name: string) => {
          handleSaveModule(name)
        }
      }
      />
    </>
  )
}