interface Plan {
  name: string;
  description: string;
  price: number;
  coinValue: number;
}

interface PlanResponse extends Plan {
  id: number;
  disabled: boolean;
}

export class PostPlan implements Plan {
  name: string;
  coinValue: number;
  description: string;
  price: number;

  constructor() {
    this.name = "";
    this.coinValue = 0;
    this.description = "";
    this.price = 0;
  }
}

export class GetPlan implements PlanResponse {
  id: number;
  name: string;
  coinValue: number;
  description: string;
  price: number;
  disabled: boolean;

  constructor() {
    this.id = 0;
    this.name = "";
    this.coinValue = 0;
    this.description = "";
    this.price = 0;
    this.disabled = false;
  }
}

export class PutPlan implements Omit<PlanResponse, "disabled"> {
  id: number;
  name: string;
  coinValue: number;
  description: string;
  price: number;

  constructor() {
    this.id = 0;
    this.name = "";
    this.coinValue = 0;
    this.description = "";
    this.price = 0;
  }
}


export interface PlanDashboard {
  totalReceiptPlansPerMonth: {
    id: number;
    name: string;
    subscribes: number;
    receipts: number;
  }[];
  subscribes: number;
  totalReceiptsPerMonth: number;
  reimbursement: number;
}
export interface IScheduledPayments {
  id: number;
  value: number;
  professor: string;
  date: string;
  paidOut: boolean;
  userId: number;
  user: {
    id: number;
    name: string;
    cpf: string;
    phone: string;
    cep: string;
    email: string;
    coin: number;
    active: boolean;
    isAdmin: boolean;
    isProfessor: boolean;
    planId: number;
    plan: {
      id: number;
      name: string;
      description: string;
      price: number;
      coinValue: number;
      disabled: boolean;
    };
    subscriptions: {
      id: number;
      userId: number;
      courseId: number;
      user: string;
      course: {
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
        courseForWhos: {
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
        }[];
        courseLevels: {
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
        }[];
        modules: {
          id: number;
          name: string;
          description: string;
          disabled: boolean;
          courseId: number;
          classes: {
            id: number;
            name: string;
            descripton: string;
            video: string;
            music: string;
            tumb: string;
            gif: string;
            moduleId: number;
            steps: {
              id: number;
              url: string;
              classId: number;
            }[];
          }[];
        }[];
      };
    }[];
  };

}