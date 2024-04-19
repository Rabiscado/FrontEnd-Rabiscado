
export interface IClasses {
  id: number;
  name: string;
  description: string;
  video: string;
  music: string;
  thumb?: string;
  gif?: string;
  moduleId?: number;
  steps?: Steps[];
}

export interface Steps {
  id?: number;
  name: string;
  url: string;
  classId: number;
}

interface IModules {
  id: number;
  name: string;
  courseId: number;
}


interface ICourseCRUD {
  id: number;
  name: string;
  teacherEmail: string;
  description: string;
  image: string[];
  price: number;
  value: number;
  style: string;
  school: string[];
  teacherID: number;
  localization: string;
  modules: IModules[];
}


export class CourseCRUD implements ICourseCRUD {
  id: number;
  name: string;
  teacherEmail: string;
  description: string;
  image: string[];
  price: number;
  value: number;
  style: string;
  video?: string;
  school: string[];
  teacherID: number;
  localization: string;
  modules: IModules[];
  classes: IClasses[];
  steps: Steps[];

  constructor() {
    this.id = 0;
    this.name = "Novo Curso";
    this.teacherEmail = "";
    this.description = "";
    this.image = [];
    this.price = 0;
    this.value = 0;
    this.style = "";
    this.school = [];
    this.teacherID = 0;
    this.localization = "";
    this.modules = [];
    this.classes = [];
    this.steps = [];
  }
}