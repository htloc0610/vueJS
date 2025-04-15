<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-sm" style="width: 100%; max-width: 400px">
      <h3 class="mb-4">Register</h3>

      <form @submit.prevent="onSubmit">
        <!-- Email Input -->
        <div class="mb-3">
          <div class="input-group">
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              v-model="localEmail"
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
              v-model="localPassword"
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
          <small v-if="passwordMismatch" class="text-danger">Passwords do not match</small>
        </div>

        <!-- Buttons -->
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

export default defineComponent({
  name: "RegisterForm",
  props: {
    email: String,
    password: String,
    showBackButton: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["register"],
  setup(props, { emit }) {
    const localEmail = ref(props.email || "");
    const localPassword = ref(props.password || "");
    const confirmPassword = ref("");
    const emailInvalid = ref(false);
    const passwordInvalid = ref(false);

    const passwordMismatch = computed(() => {
      return localPassword.value !== confirmPassword.value && confirmPassword.value !== "";
    });

    const validateEmail = () => {
      emailInvalid.value = localEmail.value.length > 20;
    };

    const validatePassword = () => {
      passwordInvalid.value = localPassword.value.length < 6 || localPassword.value.length > 20;
    };

    const validatePasswordMatch = () => {
      return passwordMismatch.value;
    };

    const onSubmit = () => {
      validateEmail();
      validatePassword();

      if (!emailInvalid.value && !passwordInvalid.value && !passwordMismatch.value) {
        emit("register", { email: localEmail.value, password: localPassword.value });
      }
    };

    return {
      localEmail,
      localPassword,
      confirmPassword,
      emailInvalid,
      passwordInvalid,
      passwordMismatch,
      validateEmail,
      validatePassword,
      validatePasswordMatch,
      onSubmit,
    };
  },
});
</script>

<style scoped>
.card {
  border-radius: 10px;
}

.btn-custom {
  border-radius: 6px;
}
</style>
