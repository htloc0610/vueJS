<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-sm" style="width: 100%; max-width: 400px; min-height: 400px">
      <h3 class="mb-3 mt-3">Register</h3>
      <form @submit.prevent="handleRegister">
        <!-- Email Input -->
        <div class="mb-3">
          <div class="input-group">
            <input
              name="user_name"
              type="email"
              class="form-control"
              placeholder="Email"
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
          <div class="input-group">
            <input
              type="password"
              class="form-control"
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

        <!-- Confirm Password Input -->
        <div class="mb-3">
          <div class="input-group">
            <input
              type="password"
              class="form-control"
              placeholder="Confirm Password"
              v-model="confirmPassword"
              @blur="validatePasswordMatch"
              required
            />
          </div>
          <small v-if="passwordMismatch" class="text-danger"> Passwords do not match </small>
        </div>

        <!-- Register Button -->
        <div class="d-flex justify-content-between mt-4">
          <router-link to="/" class="w-50 me-2">
            <button type="button" class="btn btn-primary btn-custom w-100">Back to Login</button>
          </router-link>
          <button type="submit" class="btn btn-secondary btn-custom w-50">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "RegisterForm",
  setup() {
    const user_name = ref<string>("");
    const password = ref<string>("");
    const confirmPassword = ref<string>("");
    const emailInvalid = ref<boolean>(false);
    const passwordInvalid = ref<boolean>(false);
    const router = useRouter();

    const passwordMismatch = computed(() => {
      return password.value !== confirmPassword.value && confirmPassword.value !== "";
    });

    const validateEmail = () => {
      return (emailInvalid.value = user_name.value.length > 20);
    };

    const validatePassword = () => {
      return (passwordInvalid.value = password.value.length < 6 || password.value.length > 20);
    };

    const validatePasswordMatch = () => {
      return (passwordInvalid.value = password.value.length < 6 || password.value.length > 20);
    };

    const handleRegister = () => {
      validateEmail();
      if (passwordMismatch.value) {
        console.log("Passwords do not match");
        return;
      }

      if (emailInvalid.value) {
        return;
      }

      const userStore = useUserStore();

      userStore
        .register(user_name.value, password.value)
        .then(() => {
          console.log("User registered successfully");
          router.push("/login");
        })
        .catch((error) => {
          console.error("Registration failed:", error.response?.data);
          if (error.response?.data.code === 409) {
            alert(error.response?.data.message);
          }
        });
    };

    return {
      user_name,
      password,
      confirmPassword,
      passwordMismatch,
      emailInvalid,
      passwordInvalid,
      validateEmail,
      validatePassword,
      validatePasswordMatch,
      handleRegister,
    };
  },
});
</script>

<style scoped>
.card {
  border-radius: 10px;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
