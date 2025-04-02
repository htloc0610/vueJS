<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4 shadow-sm" style="width: 100%; max-width: 400px; min-height: 400px;">
        <h3 class="mb-3 mt-3">Register</h3>
        <form @submit.prevent="handleRegister">
          <!-- Email Input -->
          <div class="mb-3">
            <div class="input-group">
              <input
                type="email"
                class="form-control"
                placeholder="Email"
                v-model="email"
                required
              />
            </div>
          </div>
  
          <!-- Password Input -->
          <div class="mb-3">
            <div class="input-group">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="password"
                required
              />
            </div>
          </div>
  
          <!-- Confirm Password Input -->
          <div class="mb-3">
            <div class="input-group">
              <input
                type="password"
                class="form-control"
                placeholder="Confirm Password"
                v-model="confirmPassword"
                required
              />
            </div>
            <small v-if="passwordMismatch" class="text-danger">
              Passwords do not match
            </small>
          </div>
  
          <!-- Register Button -->
          <button type="submit" class="btn btn-secondary mb-3 float-end" style="padding: 8px 30px;">Register</button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  
  export default defineComponent({
    name: 'RegisterForm',
    setup() {
      const email = ref<string>('');
      const password = ref<string>('');
      const confirmPassword = ref<string>('');

      const passwordMismatch = computed(() => {
        return password.value !== confirmPassword.value && confirmPassword.value !== '';
      });
  
      const handleRegister = () => {
        if (passwordMismatch.value) {
          console.log('Passwords do not match');
          return;
        }
  
        console.log('Email:', email.value);
        console.log('Password:', password.value);
        console.log('Confirm Password:', confirmPassword.value);
      };
  
      return {
        email,
        password,
        confirmPassword,
        passwordMismatch,
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