import { defineStore } from "pinia";
import axios from "@/api/axios";
const apiUrl = import.meta.env.VITE_API_URL;

interface UserState {
  username: string;
  token: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    username: "",
    token: localStorage.getItem("token"),
  }),

  actions: {
    async login(username: string, password: string) {
      try {
        const res = await axios.post(`${apiUrl}/auth/login`, { username, password });
        console.log("Login successful:", res.data);
        const token = res.data.data.token;
        this.token = token;
        localStorage.setItem("token", token);
        await this.getUserInfo();
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },

    async getUserInfo() {
      try {
        const res = await axios.get(`${apiUrl}/users/infor`);
        this.username = res.data.data.username;
      } catch (error) {
        console.error("Error fetching user information:", error);
        throw error;
      }
    },

    async register(username: string, password: string) {
      try {
        const res = await axios.post(`${apiUrl}/auth/register`, { username, password });
        console.log("Registration successful:", res.data.message);
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      }
    },

    logout() {
      this.username = "";
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
