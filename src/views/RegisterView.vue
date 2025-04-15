<template>
  <RegisterForm :email="email" :password="password" @register="handleRegister" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
import RegisterForm from "@/components/RegisterForm.vue";

export default defineComponent({
  name: "RegisterView",
  components: { RegisterForm },
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const userStore = useUserStore();

    const handleRegister = async (data: { email: string; password: string }) => {
      try {
        await userStore.register(data.email, data.password);
        await userStore.login(data.email, data.password);
        router.push("/students");
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          (error as { response?: { data?: { code?: number; message?: string } } }).response?.data
            ?.code === 409
        ) {
          const errorResponse = error as {
            response?: { data?: { code?: number; message?: string } };
          };
          alert(errorResponse.response?.data?.message);
        } else {
          console.error("Registration failed:", error);
        }
      }
    };

    return { email, password, handleRegister };
  },
});
</script>
