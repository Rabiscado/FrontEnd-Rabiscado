import { User } from '../../Models/User'
import { api } from '../api'


const endpoint = '/v1/users'

type CourseSubscribeProps = {
  courseId: number
}


export const UserService = {
  Post: async (user: User) => {
    const response = await api.post(endpoint, user)
    return response.data
  },
  Get: async (userId: number) => {
    const response = await api.get(`${endpoint}/${userId}`)
    return response.data
  },
  Put: async (userId: number, user: User) => {
    const response = await api.put(`${endpoint}/${userId}`, user)
    return response.data
  },
  Delete: async (userId: number) => {
    const response = await api.delete(`${endpoint}/${userId}`)
    return response.data
  },
  GetAll: async () => {
    const response = await api.get(endpoint)
    return response.data
  },
  SubscribeToPlan (data?: any) {
    const response = api.post(`${endpoint}/plan-subscribe`, data)
    return response
  },
  UnsubscribeToPlan (email: string) {
    const response = api.delete(`${endpoint}/plan-unsubscribe?email=${email}`,)
    return response
  },
  ToggleAdmin: async (userId: number) => {
    const response = await api.patch(`${endpoint}/toogle-admin/${userId}`)
    return response.data
  },
  ToggleProfessor: async (userId: number) => {
    const response = await api.patch(`${endpoint}/toogle-instructor/${userId}`)
    return response.data
  },
  GetDashboardProfessor: async () => {
    const response = await api.get(`${endpoint}/dashboard-professor`)
    return response.data
  },
  CourseSubscribe: async (data: CourseSubscribeProps) => {
    const response = await api.post(`${endpoint}/course-subscribe`, data)
    return response.data
  },
  CourseUnsubscribe: async (data: CourseSubscribeProps) => {
    const response = await api.delete(`${endpoint}/course-unsubscribe`, {
      data
    })
    return response.data
  },
  HideSubscription: async (subscriptionId: number) => {
    const response = await api.patch(`${endpoint}/hide-subscription/${subscriptionId}`)
    return response.data
  },
  GetAdmReceipts: async () => {
    const response = await api.get(`${endpoint}/receipts-pdf`)
    return response.data
  },
  GetAdmProfessorsPdf: async () => {
    const response = await api.get(`${endpoint}/professors-pdf`)
    return response.data
  },
  GetAdmProfessorsReceiptsPdf: async () => {
    const response = await api.get(`${endpoint}/professors-receipt-pdf`)
    return response.data
  },
  GetProfessorMonthlyReceipts: async () => {
    const response = await api.get(`${endpoint}/professors-monthly-receipt-pdf`)
    return response.data
  },
  ConcludeClass: async (classId: number) => {
    const response = await api.patch(`${endpoint}/mark-as-watched/${classId}`)
    return response.data
  },
  UnConcludeClass: async (classId: number) => {
    const response = await api.patch(`${endpoint}/mark-as-unwatched/${classId}`)
    return response.data
  },


}

const authEndpoint = '/v1/auth'

interface IChangePassword {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const AuthService = {
  changePassword: async (ChangePassword: IChangePassword) => {
    const response = await api.post(`${authEndpoint}/change-password`, ChangePassword)
    return response.data
  }
}