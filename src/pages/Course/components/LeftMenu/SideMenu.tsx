import { Accordion, AccordionDetails, AccordionSummary, Box, Tooltip, Typography } from '@mui/material'
import { CourseCRUD, IClasses } from '../../../ADM/AddCoursePage/Models/CourseCRUD' 
import {  ExpandMore,   } from '@mui/icons-material' 
import { Drawer } from '@components/index' 
import { useEffect } from 'react'
import Check from '@assets/CheckBoxCircle.svg'

export function SideMenu(
  {
    course, 
    isDrawerOpen,
    setIsDrawerOpen, 
    selectedClass,
    setSelectedClass,
    isConcluded,
    concludedClassesLengthByModuleId
  } : {
    course: CourseCRUD,
    setCourse: React.Dispatch<React.SetStateAction<CourseCRUD>>, 
    isDrawerOpen: boolean,
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    selectedClass?: IClasses
    setSelectedClass: React.Dispatch<React.SetStateAction<IClasses | undefined>>
    isConcluded: (arg?: number) =>  boolean
    concludedClassesLengthByModuleId
  }
){
  

  useEffect(() => {
    setIsDrawerOpen(false)
  }, [selectedClass])
 

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
                display: 'none',
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
                pl: '1rem',
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
                      
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "40%",
                            gap: '.5rem',
                            pr: '.5rem',
                            fontWeight: 600,
                            color: '#380478',
                          }} 
                        > 
                          {
                            `${concludedClassesLengthByModuleId(module?.id)}/${module.classes.length}`
                          }
                          </Typography>
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
                              alignItems: "center",
                              gap: "1rem",
                              width: "100%",
                              height: "100%",
                              padding: "1rem 1.5rem", 
                              backgroundColor: selectedClass?.id === classe?.id ? '#833FD7' : '#00000000',
                              cursor: 'pointer', 
                            }}
                            onClick={() => { 
                                setSelectedClass(classe)
                                // setSelectedModule(module)
                            }}
                          > 
                            {
                              !isConcluded(classe?.id) ? <Box
                              sx={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: '#fff',
                                border: '2px solid #833FD7',
                              }}
                            />
                            :
                            <img
                              src={Check}
                              alt="Aula concluída"
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%', 
                              }}
                            />}
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
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))
            }
          </Box>
             
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
                    color: '#380478',
                    marginBottom: '2rem',
                    paddingLeft: '1rem',
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
                        },
                        padding: 0
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
                            padding: "1rem 0",
                            flexDirection: "column",
                          }}
                        >
                          {
                            module.classes && module.classes.length > 0 && module.classes.map((classe) => (
                              <Box
                                sx={{
                                  display: "flex", 
                                  alignItems: "center",
                                  gap: "1rem",
                                  width: "100%",
                                  height: "100%",
                                  padding: "1rem", 
                                  backgroundColor: selectedClass?.id === classe?.id ? '#833FD7' : '#00000000',
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  if(setSelectedClass)
                                    setSelectedClass(classe)
                                }}
                              >
                              {
                                !isConcluded(classe?.id) ?  <Box
                                sx={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%',
                                  backgroundColor: '#fff',
                                  border: '2px solid #833FD7',
                                }}
                              />
                              :
                              <img
                                src={Check}
                                alt="Aula concluída"
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%', 
                                }}
                              />}
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
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))
                }
              </Box> 
              </Box>
            </Drawer>
          </Box>
        </>
  )
}