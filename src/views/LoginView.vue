<template>
  <div class="container d-flex flex-column justify-content-center align-items-center vh-100">
    <div
      class="card p-3 shadow-sm"
      style="width: 100%; max-width: 400px; background-color: #f8f9fa"
    >
      <form @submit.prevent="handleLogin">
        <!-- Email Input -->
        <div class="mb-3">
          <div class="input-group d-flex align-items-center gap-2 border rounded">
            <i class="bi bi-person-fill border-0" style="padding-left: 8px"></i>
            <input
              name="user_name"
              type="email"
              class="form-control border-0"
              placeholder="Email address"
              v-model="user_name"
              @blur="validateEmail"
              required
            />
          </div>
          <small v-if="emailInvalid" class="text-danger mt-2 d-block">
            Email must be less than 20 characters
          </small>
        </div>

        <!-- Password Input -->
        <div class="mb-3">
          <div class="input-group d-flex align-items-center gap-2 border rounded">
            <i class="bi bi-lock-fill border-0" style="padding-left: 8px"></i>
            <input
              name="password"
              type="password"
              class="form-control border-0"
              placeholder="Password"
              v-model="password"
              @blur="validatePassword"
              required
            />
          </div>
          <small v-if="passwordInvalid" class="text-danger mt-2 d-block">
            Password must be between 6 and 20 characters
          </small>
        </div>

        <!-- Login Button -->
        <button type="submit" class="btn btn-primary w-100 mb-3">Login</button>
      </form>
    </div>

    <div
      class="text-center mt-3 border rounded pt-3"
      style="width: 100%; max-width: 400px; background-color: #f8f9fa"
    >
      <p>Don't have an account? <router-link to="/register">Register</router-link></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const user_name = ref<string>("");
    const password = ref<string>("");
    const passwordInvalid = ref<boolean>(false);
    const emailInvalid = ref<boolean>(false);
    const router = useRouter();
    const apiUrl = import.meta.env.VITE_API_URL;

    const validatePassword = () => {
      passwordInvalid.value = password.value.length < 6 || password.value.length > 20;
    };

    const validateEmail = () => {
      emailInvalid.value = user_name.value.length > 20;
    };

    const handleLogin = async () => {
      if (!emailInvalid.value && !passwordInvalid.value) {
        try {
          const response = await axios.post(`${apiUrl}/auth/login`, {
            username: user_name.value,
            password: password.value,
          });
          const token = response.data.data.token;
          localStorage.setItem("token", token);
          router.push("/students");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Login failed:", error.response?.data);
          } else {
            console.error("Unexpected error:", error);
          }
        }
      } else {
        console.log("Validation failed");
      }
    };

    return {
      user_name,
      password,
      handleLogin,
      validatePassword,
      validateEmail,
      passwordInvalid,
      emailInvalid,
    };
  },
});
</script>

<style scoped>
.card {
  border-radius: 10px;
}

.btn-primary {
  background-color: #26a69a;
  border: none;
}

.btn-primary:hover {
  background-color: #1d8c81;
}
</style>
