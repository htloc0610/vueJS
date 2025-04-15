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
              name="email"
              type="email"
              class="form-control border-0"
              placeholder="Email address"
              v-model="email"
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
              name="userPassword"
              type="password"
              class="form-control border-0"
              placeholder="Password"
              v-model="userPassword"
              @blur="validatePassword"
              required
            />
          </div>
          <small v-if="passwordInvalid" class="text-danger mt-2 d-block">
            Password must be between 6 and 15 characters
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
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "LoginForm",
  props: {
    user_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const email = ref(props.user_name); // Đổi tên biến thành email
    const userPassword = ref(props.password); // Đổi tên biến thành userPassword
    const passwordInvalid = ref<boolean>(false);
    const emailInvalid = ref<boolean>(false);

    // Kiểm tra tính hợp lệ của email
    const validateEmail = () => {
      emailInvalid.value = email.value.length > 20;
    };

    // Kiểm tra tính hợp lệ của mật khẩu
    const validatePassword = () => {
      passwordInvalid.value = userPassword.value.length < 6 || userPassword.value.length > 15;
    };

    // Khi các prop thay đổi, cập nhật lại giá trị trong component
    watch(
      () => props.user_name,
      (newValue) => {
        email.value = newValue;
      }
    );

    watch(
      () => props.password,
      (newValue) => {
        userPassword.value = newValue;
      }
    );

    // Xử lý sự kiện login
    const handleLogin = async () => {
      // Kiểm tra tính hợp lệ trước khi emit sự kiện
      if (!emailInvalid.value && !passwordInvalid.value) {
        emit("login", email.value, userPassword.value);
      } else {
        console.log("Validation failed");
      }
    };

    return {
      email,
      userPassword,
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
