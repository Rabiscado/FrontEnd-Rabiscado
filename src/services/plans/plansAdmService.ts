import { GetPlan, IScheduledPayments, PlanDashboard, PostPlan, PutPlan } from "Models/Plans";
import { api } from "../api";


const endpoint = "/v1/plans";

export const PlanAdmCRUDService = {
  Post: async (plan: PostPlan): Promise<any> => {
    const response = await api.post(endpoint, plan);
    return response.data;
  },
  Put: async (plan: PutPlan): Promise<any> => {
    const response = await api.put(`${endpoint}/${plan.id}`, plan);
    return response.data;
  },
  GetAll: async (): Promise<GetPlan[]> => {
    const response = await api.get(endpoint);
    return response.data;
  },
  GetDashboard: async (): Promise<PlanDashboard> => {
    const response = await api.get(`/v1/users/dashboard-admin`);
    return response.data;
  }
};

const scheduledPaymentsEndpoint = "/v1/scheduledpayments";

export const ScheduledPaymentsService = {
  Get: async (): Promise<IScheduledPayments[]> => {
    const response = await api.get(scheduledPaymentsEndpoint);
    return response.data;
  },
  Pay: async (id: number): Promise<void> => {
    const response = await api.patch(`${scheduledPaymentsEndpoint}/mark-paid/${id}`);
    return response.data;
  },
  Unpay: async (id: number): Promise<void> => {
    const response = await api.patch(`${scheduledPaymentsEndpoint}/mark-unpaid/${id}`);
    return response.data;
  },
  SearchByProfessorMail: async (query: string): Promise<IScheduledPayments[]> => {
    const response = await api.get(scheduledPaymentsEndpoint + '/search?PaidOut=true&OrderBy=date&PageSize=10&professor=' + `${query}`);
    return response.data;
  }
};

