import axios, { AxiosInstance, AxiosError } from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BACKEND_URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add any auth tokens here if needed in the future
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Handle errors globally
        if (error.response) {
          console.error(
            "API Error:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          console.error("Network Error:", error.message);
        } else {
          console.error("Error:", error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  // Health checks
  async checkHealth() {
    const response = await this.client.get("/health");
    return response.data;
  }

  async checkOdHealth() {
    const response = await this.client.get("/od/health");
    return response.data;
  }

  async checkGhlHealth() {
    const response = await this.client.get("/od/ghl-health");
    return response.data;
  }

  // Stats
  async getStats() {
    const response = await this.client.get("/od/stats");
    return response.data;
  }

  async getSyncHistory(limit?: number) {
    const response = await this.client.get("/od/stats/sync-history", {
      params: { limit },
    });
    return response.data;
  }

  async getTrafficEvents(limit?: number) {
    const response = await this.client.get("/od/stats/traffic", {
      params: { limit },
    });
    return response.data;
  }

  async getActivityTimeline(limit?: number) {
    const response = await this.client.get("/od/stats/timeline", {
      params: { limit },
    });
    return response.data;
  }

  // Patients
  async getAllPatients(params?: Record<string, any>) {
    const response = await this.client.get("/od/patients", { params });
    return response.data;
  }

  async getPatientById(patNum: string) {
    const response = await this.client.get(`/od/patients/${patNum}`);
    return response.data;
  }

  async syncPatient(patNum: string) {
    const response = await this.client.post(`/od/sync/patient/${patNum}`);
    return response.data;
  }

  async syncAllPatients() {
    const response = await this.client.post("/od/sync/all-patients");
    return response.data;
  }

  // Appointments
  async getAllAppointments(params?: Record<string, any>) {
    const response = await this.client.get("/od/appointments", { params });
    return response.data;
  }

  async getRecentAppointments() {
    const response = await this.client.get("/od/appointments/recent");
    return response.data;
  }

  async syncAppointment(aptNum: string) {
    const response = await this.client.post(`/od/sync/appointment/${aptNum}`);
    return response.data;
  }

  async syncAllAppointments() {
    const response = await this.client.post("/od/sync/all-appointments");
    return response.data;
  }

  // Other resources
  async getProviders(params?: Record<string, any>) {
    const response = await this.client.get("/od/providers", { params });
    return response.data;
  }

  async getClinics(params?: Record<string, any>) {
    const response = await this.client.get("/od/clinics", { params });
    return response.data;
  }

  async getPayments(params?: Record<string, any>) {
    const response = await this.client.get("/od/payments", { params });
    return response.data;
  }

  async getProcedures(params?: Record<string, any>) {
    const response = await this.client.get("/od/procedures", { params });
    return response.data;
  }

  async getCommlogs(params?: Record<string, any>) {
    const response = await this.client.get("/od/commlogs", { params });
    return response.data;
  }

  async getTasks(params?: Record<string, any>) {
    const response = await this.client.get("/od/tasks", { params });
    return response.data;
  }

  async getPreferences(params?: Record<string, any>) {
    const response = await this.client.get("/od/preferences", { params });
    return response.data;
  }

  // Available endpoints discovery
  async getAvailableEndpoints() {
    const response = await this.client.get("/od/");
    return response.data;
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
