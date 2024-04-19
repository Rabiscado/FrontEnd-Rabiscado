import { Accordion, AccordionDetails, AccordionSummary, Box, Tooltip, Typography } from '@mui/material'
import { CourseCRUD, IClasses } from '../../Models/CourseCRUD'
import { Add, DeleteOutline, EditOutlined, ExpandMore, KeyboardArrowLeft } from '@mui/icons-material' 
import { Drawer } from '@components/index' 
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function SideMenu(
  {
    course,
    openNewModuleModal,
    isDrawerOpen,
    setIsDrawerOpen,
    selectedModule,
    setSelectedModule,
    handleDeleteModule,
    handleDeleteClass,
    selectedClass,
    setSelectedClass    
  } : {
    course: CourseCRUD,
    setCourse: React.Dispatch<React.SetStateAction<CourseCRUD>>,
    openNewModuleModal: () => void,
    isDrawerOpen: boolean,
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedModule: CourseCRUD['modules'][0] | undefined,
    setSelectedModule: React.Dispatch<React.SetStateAction<CourseCRUD['modules'][0] | undefined>>,
    handleDeleteModule: (moduleId: number) => void,
    handleDeleteClass: (classId: number) => void,
    selectedClass?: IClasses
    setSelectedClass: React.Dispatch<React.SetStateAction<IClasses | undefined>>
  }
){
  

  useEffect(() => {
    setIsDrawerOpen(false)
  }, [selectedModule, selectedClass])
 

  return (
    
        <>
          <Box
            sx={{
              width: '20%',
              padding: '1.5rem 0',
              borderRight: '2px solid #EBEBEB',
              minWidth: '20rem',
              '@media (max-width: 768px)': {
                width: '100%',
                display: selectedModule ? 'none' : 'block',
              }
            }}
          >
            <Typography 
              variant="h4"
              sx={{
                fontWeight: 600,
                color: '#380478',
                marginBottom: '2rem',
                paddingLeft: '.5rem',
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                gap: '.5rem',
                fontSize: '2rem',
                '@media (max-width: 1250px)': {
                  fontSize: '1.5rem'
                }
              }}>
                <Link to={'/cursos'}>
                  <KeyboardArrowLeft
                    sx={{
                      color: '#380478',
                      cursor: 'pointer',
                      alignSelf: 'flex-end',
                      mt:2
                    }}
                    />
                </Link>
                {
                  course.name
                }
            </Typography>
          <Box
            sx={{
              marginBottom: '2rem',
            }}
          >
            {
              course.modules.map((module : any) => (
                <Accordion
                  sx={{
                    width: '100%',
                    marginBottom: '1rem',
                    boxShadow: 0,
                    borderBottom: '1px solid #EBEBEB',
                    ':before': {
                      backgroundColor: '#ffffff00 !important'
                    }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{color: theme => theme.palette.primary.main}} />}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%"
                      }}
                    >
                      <Tooltip
                        title={module.name.length > 15 ? module.name : ''}
                        placement="top" 
                      >
                      <Typography 
                        variant="h5"
                        sx={{
                          color: '#380478',
                          fontWeight: 600,
                          fontSize: '1rem',
                          width: '100%',
                          maxWidth: '200px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        >{module.name}</Typography>

                      </Tooltip>
                      
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "40%",
                            gap: '.5rem',
                            pr: '.5rem',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <EditOutlined
                            sx={{
                              color: theme => theme.palette.secondary.main,
                              cursor: "pointer",
                              fontSize: "1.5rem",
                            }}
                            onClick={() => {
                              setSelectedModule(module)
                              openNewModuleModal()
                            }}
                          />
                          <DeleteOutline
                            sx={{
                              color: theme => theme.palette.secondary.main,
                              cursor: "pointer",
                              fontSize: "1.5rem",
                            }}
                            onClick={() => {
                              handleDeleteModule(module.id)
                            }}
                          />
                          </Box>
                    </Box>

                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      px: 0
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem",
                        width: "100%", 
                        flexDirection: "column",
                      }}
                    >
                      {
                        module.classes && module.classes.length > 0 && module.classes.map((classe : any) => (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: "1rem",
                              width: "100%",
                              height: "100%",
                              padding: "1rem 1.5rem", 
                              backgroundColor: selectedClass?.id === classe?.id ? '#833FD7' : '#00000000',
                              cursor: 'pointer', 
                            }}
                            onClick={() => {
                              if(setSelectedClass)
                                setSelectedClass(classe)
                                setSelectedModule(module)
                            }}
                          >
                            <Typography
                              variant="h5"
                              sx={{
                                color: selectedClass?.id === classe?.id ? '#fff' : '#833FD7',
                                fontWeight: selectedClass?.id === classe?.id ? 600 : 400,
                                fontSize: '1rem'
                              }}
                            >
                              {classe.name}
                            </Typography>      
                            <DeleteOutline
                              sx={{ 
                                color: selectedClass?.id === classe?.id ? '#fff' : '#833FD7',
                                cursor: "pointer",
                                fontSize: "1.5rem",
                              }}
                              onClick={(e) => {
                                e.stopPropagation()
                                 handleDeleteClass(classe.id)
                              }}
                            />
                          </Box>
                        ))
                      }
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          width: "100%",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: theme => theme.palette.primary.main,
                            cursor: "pointer",
                            fontSize: ".875rem",
                            width: "fit-content",
                            fontWeight: 700,
                            ":hover": {
                              textDecoration: "underline",
                            },
                            display: 'flex',
                            gap: '.4rem',
                            alignItems: 'center',
                            marginTop: '1rem',
                            px:4
                          }}
                          onClick={() => {
                            setSelectedClass(undefined)
                            setSelectedModule(module)
                          }}
                        >
                            <Add
                              sx={{
                                fontSize: '1rem',
                              }}
                            />  Adicionar nova aula 
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))
            }
          </Box>
            
        <Typography
            variant="h6"
            sx={{
              color: theme => theme.palette.primary.main,
              cursor: "pointer",
              fontSize: ".875rem",
              width: "fit-content",
              fontWeight: 700,
              ":hover": {
                textDecoration: "underline",
              },
              display: 'flex',
              gap: '.4rem',
              alignItems: 'center',
              pl: 2
            }}
            onClick={() => {
              setSelectedModule(undefined)
              openNewModuleModal()
            }}
          >
              <Add
                sx={{
                  fontSize: '1rem'
                }}
              />  Adicionar novo módulo 
          </Typography>
          </Box>
          
          <Box
            onClick={
              () => {
                setIsDrawerOpen(!isDrawerOpen)
              }
            }
            sx={{
              position: 'fixed',
              bottom: '1rem',
              right: '1rem',
              color: '#fff',
              padding: '1rem',
              borderRadius: '50%',
              cursor: 'pointer',
              boxShadow: '0px 0px 10px 0px #00000033',
              transition: 'transform 0.3s ease-in-out',
              ":hover": {
                transform: 'scale(1.1)'
              },
              width: '100%',
              height: '40px',
              zIndex: 100,
              '@media (min-width: 768px)': {
                display: 'none',
              }
            
            }}
          >
            <Drawer
              title='Módulos'
              open={isDrawerOpen}
              onClose={
                () => {
                  setIsDrawerOpen(false)
                }
              }
              onOpen={
                () => {
                  setIsDrawerOpen(true)
                }
              } 
              >
              <Box
                sx={{
                  width: '100%',
                  padding: '1.5rem 0', 
                  minWidth: '20rem',
                  '@media (max-width: 768px)': {
                    width: '100%',
                  }
                }}
              >
                <Typography 
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    fontStyle: 'italic',
                    color: '#380478',
                    marginBottom: '2rem',
                    '@media (max-width: 1250px)': {
                      fontSize: '1.5rem'
                    }
                  }}>
                    {
                      course.name
                    }
                </Typography>
              <Box
                sx={{
                  marginBottom: '2rem',
                }}
              >
                {
                  course.modules.map((module : any) => (
                    <Accordion
                      sx={{
                        width: '100%',
                        marginBottom: '1rem',
                        boxShadow: 0,
                        borderBottom: '1px solid #EBEBEB',
                        ':before': {
                          backgroundColor: '#ffffff00 !important'
                        }
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMore sx={{color: theme => theme.palette.primary.main}} />}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%"
                          }}
                        >
                          <Tooltip
                            title={module.name.length > 15 ? module.name : ''}
                            placement="top" 
                          >
                          <Typography
                            variant="h5"
                            sx={{
                              color: '#380478',
                              fontWeight: 600,
                              fontSize: '1rem',
                              width: '100%',
                              maxWidth: '200px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                            >{module.name}</Typography>
      
                          </Tooltip>
                          
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                width: "40%",
                                gap: '.5rem',
                                pr: '.5rem',
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <EditOutlined
                                sx={{
                                  color: theme => theme.palette.secondary.main,
                                  cursor: "pointer",
                                  fontSize: "1.5rem",
                                }}
                                onClick={() => {
                                  setSelectedModule(module)
                                  openNewModuleModal()
                                }}
                              />
                              <DeleteOutline
                                sx={{
                                  color: theme => theme.palette.secondary.main,
                                  cursor: "pointer",
                                  fontSize: "1.5rem",
                                }}
                                onClick={() => {
                                  handleDeleteModule(module.id)
                                }}
                              />
                              </Box>
                        </Box>
      
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "1rem",
                            width: "100%",
                            padding: "1rem",
                            flexDirection: "column",
                          }}
                        >
                          {
                            module.classes && module.classes.length > 0 && module.classes.map((classe) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  gap: "1rem",
                                  width: "100%",
                                  height: "100%",
                                  padding: "1rem", 
                                  backgroundColor: '#833FD7'
                                }}
                                onClick={() => {
                                  if(setSelectedClass)
                                    setSelectedClass(classe)
                                }}
                              >
                                <Typography
                                  variant="h5"
                                  sx={{
                                    color: '#fff',
                                    fontWeight: 600,
                                    fontSize: '1rem'
                                  }}
                                >
                                  {classe.name}
                                </Typography>
                                <DeleteOutline
                                  sx={{
                                    color: '#fff',
                                    cursor: "pointer",
                                    fontSize: "1.5rem",
                                  }}
                                  onClick={() => {
                                    handleDeleteClass(classe.id)
                                  }}
                                />
                              </Box>
                            ))
                          }
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              width: "100%",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: theme => theme.palette.primary.main,
                                cursor: "pointer",
                                fontSize: ".875rem",
                                width: "fit-content",
                                fontWeight: 700,
                                ":hover": {
                                  textDecoration: "underline",
                                },
                                display: 'flex',
                                gap: '.4rem',
                                alignItems: 'center',
                                marginTop: '1rem'
                              }}
                              onClick={() => {
                                setSelectedClass(undefined)
                                setSelectedModule(module)
                              }}
                            >
                                <Add
                                  sx={{
                                    fontSize: '1rem'
                                  }}
                                />  Adicionar nova aula 
                            </Typography>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))
                }
              </Box>
                
            <Typography
                variant="h6"
                sx={{
                  color: theme => theme.palette.primary.main,
                  cursor: "pointer",
                  fontSize: ".875rem",
                  width: "fit-content",
                  fontWeight: 700,
                  ":hover": {
                    textDecoration: "underline",
                  },
                  display: 'flex',
                  gap: '.4rem',
                  alignItems: 'center',
                }}
                onClick={() => {
                  setSelectedModule(undefined)
                  openNewModuleModal()
                }}
              >
                  <Add
                    sx={{
                      fontSize: '1rem'
                    }}
                  />  Adicionar novo módulo 
              </Typography>
              </Box>
            </Drawer>
          </Box>
        </>
  )
}