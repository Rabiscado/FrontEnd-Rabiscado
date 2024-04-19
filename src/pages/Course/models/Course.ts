export class Course {
  id?: number;
  createdByUserId: number;
  title: string;
  description: string;
  price: number;
  createdAt: string;
  courseSections: CourseSection[];

  constructor() {
    this.createdByUserId = 0;
    this.title = "";
    this.description = "";
    this.price = 0;
    this.createdAt = "";
    this.courseSections = [];
  }
}

export class CourseSection {
  id: number;
  courseId: number;
  title: string;
  videos: VideoNameAndId[]

  constructor() {
    this.id = 0;
    this.courseId = 0;
    this.title = "";
    this.videos = []
  }
}

class VideoNameAndId {
  id: number;
  name: string;

  constructor() {
    this.id = 0;
    this.name = "";
  }
}
