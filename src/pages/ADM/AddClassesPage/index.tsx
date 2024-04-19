import { UseMobile } from "@context/mobileContext";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { AppButton } from "@components/Button";
import { useEffect, useState } from "react";
import { CourseCRUD } from "../AddCoursePage/Models/CourseCRUD";  
import { DeleteOutline } from '@mui/icons-material';
import { CustomInput } from '@components/index';
  
interface IClasses {
  id: number;
  name: string;
  description: string;
  video: string;
  music: string;
  tumbImage?: File;
  tumb?: string;
  gif?: string;
  imagesClass?: File[];
  gifClass?: File | null;
  steps?: string[];
  moduleId?: number;
}

export const ModulesAdmin = (
  { 
    onSave,
    selectedClass,
    setIsLoading
  }: {
    course: CourseCRUD,
    setCourse: React.Dispatch<React.SetStateAction<CourseCRUD>>,
    selectedClass: IClasses | undefined,
    onSave: (classes: IClasses) => void
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  }
) => {
  const { isMobile } = UseMobile();  

  const [classes, setClasses] = useState<IClasses>({
    id: 0,
    name: "",
    description: "",
    video: "",
    music: "",
    moduleId: 0
  })
 

  useEffect(() => {
    setClasses({
      id: 0,
      name: "",
      description: "",
      video: "",
      music: "", 
      gif: undefined,
      moduleId: 0,
    })
    setGif(null);
    setImages([]);

    if(selectedClass){ 
      GetImagesFromClass();
      // setClasses(selectedClass)
      return
    }
  }, [selectedClass])


  function handleSubmit(){
    if(!validateForm()) return;
    onSave({
      ...classes,
      gifClass: gif,
      imagesClass: images.map((image) => image.file)
    })
  }
  
  const [gif, setGif] = useState<File | null>(null);

  const [images, setImages] = useState<Array<{
    file: File,
    url?: string
  }>>([]);

  
  async function downloadImagesAsFile(uri: string, name: string) {
    const getImageAsBlob = async (uri: string) => {
      return await fetch(uri, {
        mode: 'no-cors'
      }).then((response) => response.blob());
    }
    const blob = await getImageAsBlob(uri);
    const file = new File([blob], name, { type: blob.type });
    return file;
  }

  async function GetImagesFromClass() { 
    // debugger;
    setIsLoading(true);
    if (!selectedClass) return;
    const newImages : Array<{
      file: File,
      url: string
    }> = [];
    const newClasses : any = {...selectedClass,
      gifClass: null,
      tumbImage: null,
    };
  
    for (const imageObj of selectedClass.steps || []) {
      const image = (imageObj as any).url;
      const file = await downloadImagesAsFile(image, image.split('/').pop() ?? '');
      newImages.push({
        file,
        url: image
      });
    }
  
    if (selectedClass.gif) {
      const file = await downloadImagesAsFile(selectedClass.gif, selectedClass.gif.split('/').pop() ?? '');
      if(file){
        newClasses.gifClass = file;
        setGif(file);
      } else {
        newClasses.gif = undefined;
        newClasses.gifClass = null;
        setGif(null);
      }
    } else {
      newClasses.gifClass = null;
      setGif(null);
    }

  
    if (selectedClass.tumb) {
      const file = await downloadImagesAsFile(selectedClass.tumb, selectedClass.tumb.split('/').pop() ?? '');
      if(file)
        newClasses.tumbImage = file;
      else
        newClasses.tumbImage = undefined;
    } else {
      newClasses.tumbImage = undefined;
    }

    setClasses(newClasses);
  
    setImages([...newImages]);
    setIsLoading(false);
  } 

  const [erros, setErros] = useState({
    name: "",
    video: "",
    music: "",
    tumbImage: "",
    gif: "",
    images: "",
  })

  const validateForm = () => { 
    const newErros = {
      name: "",
      video: "",
      music: "",
      tumbImage: "",
      gif: "",
      images: "",
    }
    if(classes.name.length < 2){
      newErros.name = "Nome da aula deve ter no mínimo 2 caracteres"
    }
    if(classes.video.length < 2){
      newErros.video = "Link do vídeo é obrigatório"
    }
    if(!isStringAURl(classes.video)){
      newErros.video = "Link inválido"
    }
    if(classes.music.length < 2){
      newErros.music = "Nome da música é obrigatório"
    }
    if(!classes.tumbImage){
      newErros.tumbImage = "Imagem de capa é obrigatória"
    }
    if(!classes.gif && !gif){
      newErros.gif = "Gif é obrigatório"
    }
    if(images.length < 1){
      newErros.images = "Adicione pelo menos uma imagem"
    }
    setErros(newErros);
    return Object.values(newErros).every((value) => value === "");
  }

  useEffect(() => {
    if(Object.values(erros).every((value) => value === "")) return; 
    validateForm();
  }, [classes, images, gif])

  const isStringAURl = (str: string) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
    );
    return !!pattern.test(str);
  }


  
  return (
    <>
      {/* <Header /> */}
      
      <Box
        sx={{
          padding: "1rem", 
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          '@media (max-width: 760px)': {
            pb:12
          }
        }}
      >
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <Box
            sx={{ width: isMobile ? "100%" : "70%", position: 'relative' }}>

          <TextField
            sx={{ width: "100%" }}
            placeholder="Escreva aqui o nome da aula"
            variant="standard"
            InputProps={{
              sx: {
                fontSize: isMobile ? "20px" : "40px",
                color: "#380478",
                fontWeight: "600",
              },
            }}
            value={classes.name}
            onChange={(e) => setClasses({...classes, name: e.target.value})}
            />
            {
              erros.name !== "" && <Typography
                sx={{
                  color: "red",
                  fontSize: ".75rem",
                  position: "absolute",
                  bottom: "-1.5rem",
                }}
              >
                {erros.name}
              </Typography>
            }
          </Box>
          {!isMobile && (
            <Stack sx={{ width: "20%" }}>
              <AppButton title="Salvar" buttonVariant="primary" 
                onClick={handleSubmit}
              />
            </Stack>
          )}
        </Stack>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#A29DB1",
          }}
        >
          Defina as informações da sua aula
        </Typography>

        <Stack 
          sx={{
            width: "100%",
            gap: ".5rem",
          }}
        > 
          <CustomInput
            label='Link Panda Vídeos (URL)*'
            labelVariant='secondary'
            value={classes.video}
            onChange={(e) => setClasses({...classes, video: e.target.value})}
            error={erros.video}
          /> 
          {
            classes.video && isStringAURl(classes.video) && 
            <Box
              width={"100%"}
              height={isMobile ? "300px" : "600px"} 
            >
              <iframe
                id="video-player"
                src={
                  classes.video
                }
                style={{ border: 0, width: "100%", height: isMobile ? "290px" : "580px",
                borderRadius: "20px"
              }}
              ></iframe>
            </Box>
          }
  
          <Stack
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "1rem", 
            }}
          > 
            <Box
              sx={{
                width: '100%',
              }}
            >
              <CustomInput
                label='Nome da música'
                labelVariant='secondary' 
                required
                value={classes.music}
                onChange={(e) => setClasses({...classes, music: e.target.value})}
                error={erros.music}
                />
            </Box>
            {/* <TextField
              sx={{ width: isMobile ? "100%" : "50%" }}
              placeholder="Inserir nome da música"
              value={classes.music}
              onChange={(e) => setClasses({...classes, music: e.target.value})}
            />  */}
            <Box
                sx={{ width: '100%',
                  position: "relative",
                }}>
                {/* <input
                  type="file"
                  id="thumbImage"
                  style={{ visibility: "hidden",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  zIndex: 5,
                }}
                  onChange={(e) => {
                    if (e.target.files) {
                    //   const file = e.target.files[0];
                    //   const reader = new FileReader();
                    //   reader.onloadend = () => {
                    //     setClasses({...classes, thumb: reader.result as string})
                    //   };
                    //   reader.readAsDataURL(file);
                    // }
                    setClasses({...classes, tumbImage: e.target.files[0]})
                    }
                  }}
                /> */}
                <CustomInput
                  label='Imagem'
                  type='file'
                  labelVariant='secondary'
                  value={classes.tumbImage}
                  disabled
                  required
                  onChange={(e) => {
                    if (e.target.files) {
                      setClasses({...classes, tumbImage: e.target.files[0]})
                    }
                  }}
                  error={erros.tumbImage}
                /> 
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#380478",
            }}
          >
            GIF
          </Typography>
          <Box
            sx={{
              width: "220px",
              height: "220px",
              border: gif ? 'none' : "1px dashed #F5006A",
              borderRadius: ".5rem",
              placeItems: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            {
              erros.gif !== '' && <Typography
                sx={{
                  color: "red",
                  fontSize: ".75rem",
                  position: "absolute",
                  top: "0",
                }}
              >
                {erros.gif}
              </Typography>
            }
           {
           (gif || classes.gif) ? <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
           >
              
              <input
                type="file"
                id="gif"
                accept='image/*'
                style={{
                  visibility: "hidden",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  zIndex: 5,
                }}
                onChange={(e) => {
                  if (e.target.files) {
                    setGif(e.target.files[0]);
                    setClasses({...classes, gif: undefined});
                  }
                }}/>
              <IconButton
                sx={{
                  position: "absolute", 
                  width: "30px",
                  height: "30px",
                  right: 0,
                  zIndex: 1,
                  backgroundColor: '#000000B2',
                  borderRadius: ".25rem",
                }}
                onClick={() => {
                  const input = document.getElementById("gif");
                  if (input) {
                    input.click();
                  }
                }}>
                <FileUploadOutlinedIcon
                  sx={{
                    width: "20px",
                    height: "20px",
                    color: "#fff",
                  }}/>
                </IconButton>
             <img src={classes.gif ? classes.gif : URL.createObjectURL((gif!))} alt="gif" style={{width: "100%", height: "100%"}}/>
             </Box> : <IconButton
              sx={{
                position: "relative",
              }}
              onClick={() => {
                const input = document.getElementById("gif");
                if (input) {
                  input.click();
                }
              }}
            >
              <input
                type="file"
                id="gif"
                accept='image/*'
                style={{
                  visibility: "hidden",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  zIndex: 5,
                }}
                onChange={(e) => {
                  if (e.target.files) {
                    setGif(e.target.files[0]);
                  }
                }}/>
              <FileUploadOutlinedIcon
                sx={{
                  color: "#F5006A",
                  width: "80px",
                  height: "80px",
                }}
              />
            </IconButton>
            }
          </Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#380478",
            }}
          >
            Imagens
          </Typography>


          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >

            <Box
              sx={{
                width: "220px",
                height: "220px",
                border: "1px dashed #F5006A",
                placeItems: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {
                erros.images !== '' && <Typography
                  sx={{
                    color: "red",
                    fontSize: ".75rem",
                    position: "absolute",
                    top: "0",
                  }}
                >
                  {erros.images}
                </Typography>
              }
              <IconButton
                sx={{
                  position: "relative",
                }}
                onClick={() => {
                  const input = document.getElementById("images");
                  if (input) {
                    input.click();
                  }
                }}
              >
                <input
                  type="file"
                  id="images"
                  accept='image/*'
                  style={{
                    visibility: "hidden",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    zIndex: 5,
                  }}
                  onChange={(e) => {
                    if (e.target.files) {
                      setImages([...images,{file: e.target.files[0]}]);
                    }
                  }}/>

                <FileUploadOutlinedIcon
                  sx={{
                    color: "#F5006A",
                    width: "80px",
                    height: "80px",
                  }}
                />
              </IconButton>
            </Box>
            {
              images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "220px",
                    height: "220px", 
                    placeItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <IconButton
                      sx={{
                        position: "absolute",
                        width: "30px",
                        height: "30px",
                        right: 0,
                        zIndex: 1,
                        backgroundColor: '#000000B2',
                        borderRadius: ".25rem",
                      }}
                      onClick={() => {
                        setImages(images.filter((_, i) => i !== index));
                      }}>
                        <DeleteOutline
                          sx={{
                            width: "20px",
                            height: "20px",
                            color: "#fff",
                          }}/>
                      </IconButton>
                    <img
                      src={image.url ? image.url : URL.createObjectURL(image.file)}
                      alt="gif"
                      style={{ width: "100%", height: "100%",
                          borderRadius: ".5rem",
                    }}
                    />
                  </Box>
                </Box>
              ))
            
            }
          </Box>

        </Stack>
        {isMobile && <AppButton title="Salvar" buttonVariant="primary"
                onClick={handleSubmit}
        />} 

      </Box>
    </>
  );
};
