export class Course {
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
    subscribe: number;
    courseForWhos: CourseForWho[];
    courseLevels: CourseLevel[];
    modules?: Array<{
        classes: Array<{
            id: number
        }>
    }>

    constructor() {
        this.subscribe = 0
        this.id = 0;
        this.name = "";
        this.professorEmail = "";
        this.description = "";
        this.image = "";
        this.video = "";
        this.value = 0;
        this.style = "";
        this.school = "";
        this.localization = "";
        this.disabled = false;
        this.courseForWhos = [];
        this.courseLevels = [];
    }
}

class CourseForWho {
    id: number;
    courseId: number;
    forWhoId: number;
    forWho: ForWho;

    constructor() {
        this.id = 0;
        this.courseId = 0;
        this.forWhoId = 0;
        this.forWho = new ForWho();
    }
}

export class ForWho {
    id: number;
    name: string;
    description: string;
    disabled: boolean;

    constructor() {
        this.id = 0;
        this.name = "";
        this.description = "";
        this.disabled = false;
    }
}

class CourseLevel {
    id: number;
    courseId: number;
    levelId: number;
    level: Level;

    constructor() {
        this.id = 0;
        this.courseId = 0;
        this.levelId = 0;
        this.level = new Level();
    }
}

class Level {
    id: number;
    name: string;
    description: string;
    disabled: boolean;

    constructor() {
        this.id = 0;
        this.name = "";
        this.description = "";
        this.disabled = false;
    }
}