import { Box, Grid, Typography } from "@mui/material";
import { UseMobile } from "@context/mobileContext";
import { CustomInput, Stepper } from "@components/index";
import { CheckBoxGroup } from "@components/CheckBoxGroup";
import { PostCourse } from "../../../../../Models/Course";
import { useEffect } from "react";

type CourseFormProps = {
  currentStep: number;
  course: PostCourse;
  setCourse: (course: PostCourse) => void;
  erros: {
    name: string;
    professorEmail: string;
    description: string;
    file: string;
    video: string;
    levelIds: string;
    forWhoIds: string;
    value: string;
    localization: string;
    style: string;
    school: string;
  };
};

export const CourseForm = ({
  currentStep,
  course,
  setCourse,
  erros,
}: CourseFormProps) => {
  const { isMobile } = UseMobile();

  async function downloadImageAsFile(uri: string, name: string) {
    const getImageAsBlob = async (uri: string) => {
      return await fetch(uri, {
        mode: "no-cors",
      }).then((response) => response.blob());
    };
    const blob = await getImageAsBlob(uri);
    const file = new File([blob], name, { type: blob.type });
    setCourse({ ...course, file });
  }

  useEffect(() => {
    if (course.image && !course.file) {
      downloadImageAsFile(course.image, course.image.split("/").pop() ?? "");
    }
  }, [course]);

  return (
    <Box display="flex" flexDirection="column" gap=".75rem">
      {isMobile && (
        <Stepper
          steps={[{ value: 1 }, { value: 2 }, { value: 3 }]}
          currentStep={currentStep}
        />
      )}
      <Grid container spacing={1} columns={12}>
        {(!isMobile || currentStep === 1) && (
          <>
            <Grid item xs={12} sm={6} md={6} xl={6}>
              <CustomInput
                labelVariant="secondary"
                label="Nome do curso"
                fullWidth
                placeholder="Nome do curso"
                required
                value={course.name}
                onChange={(e) => setCourse({ ...course, name: e.target.value })}
                error={erros.name}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} xl={6}>
              <CustomInput
                labelVariant="secondary"
                label="E-mail professores"
                fullWidth
                placeholder="e-mail@e-mail.com"
                required
                value={course.professorEmail}
                onChange={(e) =>
                  setCourse({ ...course, professorEmail: e.target.value })
                }
                error={erros.professorEmail}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <CustomInput
                labelVariant="secondary"
                label="Descrição do curso"
                fullWidth
                multiline
                placeholder="Texto da descrição do curso"
                required
                value={course.description}
                onChange={(e) =>
                  setCourse({ ...course, description: e.target.value })
                }
                error={erros.description}
              />
            </Grid>
          </>
        )}
        {(!isMobile || currentStep === 2) && (
          <>
            <Grid item xs={12} sm={4} md={4} xl={4}>
              <CustomInput
                labelVariant="secondary"
                label="Imagem de capa"
                type="file"
                fullWidth
                placeholder="imagem.extensão"
                disabled
                required
                value={course.file}
                onChange={(e) => {
                  if (
                    e.target &&
                    e.target["files"] &&
                    e.target["files"].length > 0
                  ) {
                    setCourse({ ...course, file: e.target["files"][0] });
                  }
                }}
                error={erros.file}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} xl={4}>
              <CustomInput
                labelVariant="secondary"
                label="Vídeo trailer"
                fullWidth
                placeholder="link"
                required
                value={course.video}
                onChange={(e) =>
                  setCourse({ ...course, video: e.target.value })
                }
                error={erros.video}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              xl={4}
              sx={{
                position: "relative",
              }}
            >
              <CheckBoxGroup
                required
                label="Nível do curso"
                labelVariant="secondary"
                values={["Básico", "Intermediário", "Avançado"]}
                value={course.levelIds ?? []}
                onChange={(e) => {
                  if (course.levelIds?.includes(Number(e.target.value))) {
                    setCourse({
                      ...course,
                      levelIds: course.levelIds?.filter(
                        (id) => id !== Number(e.target.value)
                      ),
                    });
                  } else {
                    setCourse({
                      ...course,
                      levelIds: [
                        ...(course.levelIds ?? []),
                        Number(e.target.value),
                      ],
                    });
                  }
                }}
              />
              {erros.levelIds !== "" && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: ".75rem",
                    position: "absolute",
                  }}
                >
                  {erros.levelIds}
                </Typography>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              xl={4}
              sx={{
                position: "relative",
              }}
            >
              <CheckBoxGroup
                required
                label="Para quem é a dança?"
                labelVariant="secondary"
                values={["Casal", "Condutor", "Conduzido"]}
                value={course.forWhoIds ?? []}
                onChange={(e) => {
                  if (course.forWhoIds?.includes(Number(e.target.value))) {
                    setCourse({
                      ...course,
                      forWhoIds: course.forWhoIds?.filter(
                        (id) => id !== Number(e.target.value)
                      ),
                    });
                  } else {
                    setCourse({
                      ...course,
                      forWhoIds: [
                        ...(course.forWhoIds ?? []),
                        Number(e.target.value),
                      ],
                    });
                  }
                }}
                // onChange={(e) => setCourse({...course, courseForWhos: e.target.value})}
              />

              {erros.forWhoIds !== "" && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: ".75rem",
                    position: "absolute",
                  }}
                >
                  {erros.forWhoIds}
                </Typography>
              )}
            </Grid>
          </>
        )}
        {(!isMobile || currentStep === 3) && (
          <>
            <Grid item xs={12} sm={4} md={4} xl={4}>
              <CustomInput
                labelVariant="secondary"
                label="Valor em moedas (Mensal)"
                fullWidth
                type="number"
                placeholder="Valor em moedas"
                required
                value={course.value === 0 ? "" : course.value}
                onChange={(e) =>
                  setCourse({ ...course, value: Number(e.target.value) })
                }
                error={erros.value}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} xl={4}>
              <CustomInput
                labelVariant="secondary"
                label="Localização"
                fullWidth
                placeholder="Ex: Salvador, BA"
                required
                value={course.localization}
                onChange={(e) =>
                  setCourse({ ...course, localization: e.target.value })
                }
                error={erros.localization}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} xl={4}>
              <CustomInput
                labelVariant="secondary"
                label="Estilo"
                fullWidth
                placeholder="Coloque seu estilo"
                required
                value={course.style}
                onChange={(e) =>
                  setCourse({ ...course, style: e.target.value })
                }
                error={erros.style}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={8} xl={8}>
              <CustomInput
                labelVariant="secondary"
                label="Escola"
                fullWidth
                placeholder="Nome escola"
                required
                value={course.school}
                onChange={(e) =>
                  setCourse({ ...course, school: e.target.value })
                }
                error={erros.school}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};
