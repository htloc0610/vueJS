import { defineStore } from "pinia";
import axios from "@/api/axios";

interface UserState {
  username: string;
  accessToken: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    username: "",
    accessToken: localStorage.getItem("token"),
  }),

  actions: {
    async login(username: string, password: string) {
      try {
        const res = await axios.post("/auth/login", { username, password });
        const token = res.data.data.accessToken;
        this.accessToken = token;
        localStorage.setItem("token", token);

        await this.getUserInfo();
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },

    async getUserInfo() {
      try {
        const res = await axios.get("/users/infor");
        this.username = res.data.data.username;
      } catch (error) {
        console.error("Error fetching user information:", error);
        throw error;
      }
    },

    logout() {
      this.username = "";
      this.accessToken = null;
      localStorage.removeItem("token");
    },
  },
});
