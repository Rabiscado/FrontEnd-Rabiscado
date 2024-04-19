export class User {
    id?: string
    name: string
    email: string
    cpf: string
    coin: number
    phone: string
    password: string
    userTypeId: number
    createdAt: string
    isAdmin: boolean
    isProfessor: boolean
    planId?: number
    plan?: {
        id: number
        name: string
        price: number
        description: string
        coinValue: number
        disabled: false
    }
    subscriptions?: Array<{
        course: {
            id: number
            name: string
            description: string
            price: number
            createdAt: string
            disabled: boolean
            professorEmail: string
            image: string
        }
        courseId: number
        id: number
        userId: number
    }>
    userClasses?: Array<{
        userId: number
        classId: number
        watched: boolean
        disabled: boolean
    }>


    constructor() {
        this.name = ""
        this.email = ""
        this.coin = 0
        this.cpf = ""
        this.phone = ""
        this.password = ""
        this.userTypeId = 3
        this.createdAt = ""
        this.isAdmin = false;
        this.isProfessor = false;
    }
}