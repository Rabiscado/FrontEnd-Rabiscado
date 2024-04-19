import { PostCourse } from '../../Models/Course'
import { api } from '../api'


const endpoint = '/v1/courses'

const handlePostCourseToMultipartFormData = (data: PostCourse) => {
  const formData = new FormData()
  Object.keys(data).forEach((key) => {
    if (key === 'file') {
      formData.append(key, data.file as File)
    } else if (key === 'forWhoIds') {
      data.forWhoIds?.forEach((courseForWho) => {
        formData.append('forWhoIds', JSON.stringify(courseForWho))
      })
    } else if (key === 'levelIds') {
      data.levelIds?.forEach((courseLevel) => {
        formData.append('levelIds', JSON.stringify(courseLevel))
      })
    } else {
      formData.append(key, data[key])
    }
  })
  return formData
}

export const CourseCRUDService = {
  Post: async (course: PostCourse) => {
    const obj = handlePostCourseToMultipartFormData(course)
    const response = await api.post(endpoint, obj)
    return response.data
  },
  Get: async (courseId: number) => {
    const response = await api.get(`${endpoint}/${courseId}`)
    return response.data
  },
  Put: async (courseId: number, course: PostCourse) => {
    const newCourse: any = {
      ...course,
      tumb: course.file || course.image
    }
    const obj = handlePostCourseToMultipartFormData(newCourse)
    const response = await api.put(`${endpoint}/${courseId}`, obj)
    return response.data
  },
  Delete: async (courseId: number) => {
    const response = await api.delete(`${endpoint}/${courseId}`)
    return response.data
  },
  Remove: async (courseId: number) => {
    const response = await api.delete(`${endpoint}/delete/${courseId}`)
    return response.data
  },
  Active: async (courseId: number) => {
    const response = await api.patch(`${endpoint}/${courseId}`)
    return response.data
  },
  GetAll: async () => {
    const response = await api.get(endpoint)
    return response.data
  }
}

const endpointModules = '/v1/modules'

interface Module {
  id: number;
  name: string;
  courseId: number;
}

export const ModulesService = {
  Post: async (module: Module) => {
    const response = await api.post(endpointModules, module)
    return response.data
  },
  Get: async (moduleId: number) => {
    const response = await api.get(`${endpointModules}/${moduleId}`)
    return response.data
  },
  Put: async (moduleId: number, module: Module) => {
    const response = await api.put(`${endpointModules}/${moduleId}`, module)
    return response.data
  },
  Delete: async (moduleId: number) => {
    const response = await api.delete(`${endpointModules}/${moduleId}`)
    return response.data
  },
  GetAll: async () => {
    const response = await api.get(endpointModules)
    return response.data
  }
}

const classesEndpoint = '/v1/classes'

interface Classes {
  id: number;
  name: string;
  description: string;
  video: string;
  music: string;
  thumbImage?: File;
  gifClass?: File;
  imagesClass: File[];
  moduleId?: number;
  steps?: Steps[];
}


const handlePostClassesToMultipartFormData = (data: Classes) => {
  delete data.steps
  const formData = new FormData()
  Object.keys(data).map((key) => {
    if (key === 'thumbImage' || key === 'gifClass' || key === 'imagesClass') {
      if (key === 'imagesClass') {
        data.imagesClass.forEach((image) => {
          formData.append('imagesClass', image)
        })
        return
      }
      formData.append(key, data[key] as File)
      return
    }
    formData.append(key, data[key])
  })
  return formData
}

export const ClassesService = {
  Post: async (classes: Classes) => {
    const obj = handlePostClassesToMultipartFormData(classes)
    const response = await api.post(classesEndpoint, obj)
    return response.data
  },
  Get: async (classesId: number) => {
    const response = await api.get(`${classesEndpoint}/${classesId}`)
    return response.data
  },
  Put: async (classesId: number, classes: Classes) => {
    const obj = handlePostClassesToMultipartFormData(classes)
    const response = await api.put(`${classesEndpoint}/${classesId}`, obj)
    return response.data
  },
  Delete: async (classesId: number) => {
    const response = await api.delete(`${classesEndpoint}/${classesId}`)
    return response.data
  },
  GetAll: async () => {
    const response = await api.get(classesEndpoint)
    return response.data
  }
}

const stepsEndpoint = '/v1/steps'

interface Steps {
  id?: number;
  name: string;
  url: string;
  classId: number;
}

export const StepsService = {
  Post: async (steps: Steps) => {
    const response = await api.post(stepsEndpoint, steps)
    return response.data
  },
  Get: async (stepsId: number) => {
    const response = await api.get(`${stepsEndpoint}/${stepsId}`)
    return response.data
  },
  Put: async (stepsId: number, steps: Steps) => {
    const response = await api.put(`${stepsEndpoint}/${stepsId}`, steps)
    return response.data
  },
  Delete: async (stepsId: number) => {
    const response = await api.delete(`${stepsEndpoint}/${stepsId}`)
    return response.data
  },
  GetAll: async () => {
    const response = await api.get(stepsEndpoint)
    return response.data
  }
}
