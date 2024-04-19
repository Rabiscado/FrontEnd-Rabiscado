interface Course {
  id: number;
  name: string;
  professorEmail: string;
  description: string;
  image: string;
  video: string;
  value: number;
  style: string;
  school: string;
  localization: string;
  disabled: boolean;
  courseForWhos?: CourseForWho[];
  courseLevels?: CourseLevel[];
  levelIds?: number[];
  forWhoIds?: number[];
}

interface CourseForWho {
  id: number;
  courseId: number;
  forWhoId: number;
  course: string;
  forWho: {
    id: number;
    name: string;
    description: string;
    disabled: boolean;
  };
}

interface CourseLevel {
  id: number;
  courseId: number;
  levelId: number;
  course: string;
  level: {
    id: number;
    name: string;
    description: string;
    disabled: boolean;
  };
}

export class PostCourse implements Course {
  id: number;
  name: string;
  professorEmail: string;
  description: string;
  image: string;
  file?: File;
  video: string;
  value: number;
  style: string;
  school: string;
  localization: string;
  subscribe?: number;
  disabled: boolean;
  courseForWhos?: CourseForWho[];
  courseLevels?: CourseLevel[];
  levelIds?: number[];
  forWhoIds?: number[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.professorEmail = '';
    this.description = '';
    this.image = '';
    this.video = '';
    this.value = 0;
    this.style = '';
    this.school = '';
    this.localization = '';
    this.disabled = false;
    this.courseForWhos = [];
    this.courseLevels = [];
    this.levelIds = [];
    this.forWhoIds = [];
  }
}