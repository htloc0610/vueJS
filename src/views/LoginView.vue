<template>
  <!-- Import LoginForm component -->
  <LoginForm :user_name="user_name" :password="password" @login="handleLogin" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import LoginForm from "@/components/LoginForm.vue";
import { useUserStore } from "@/store/index";
import axios from "axios";

export default defineComponent({
  name: "LoginView",
  components: {
    LoginForm,
  },
  setup() {
    const user_name = ref<string>(""); // Truyền vào LoginForm
    const password = ref<string>(""); // Truyền vào LoginForm
    const router = useRouter();
    const userStore = useUserStore();

    // Hàm xử lý sự kiện login nhận từ LoginForm
    const handleLogin = async (user_name: string, password: string) => {
      try {
        await userStore.login(user_name, password);
        alert(`Login successful!`);
        router.push("/students");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(`Login failed: ${error.response?.data?.message || "Unknown error"}`);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    return {
      user_name,
      password,
      handleLogin,
    };
  },
});
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
