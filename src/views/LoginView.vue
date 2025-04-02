<template>
    <div class="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div class="card p-3 shadow-sm" style="width: 100%; max-width: 400px; background-color: #f8f9fa;">
        <form @submit.prevent="handleLogin">
          <!-- Email Input -->
          <div class="mb-3">
            <div class="input-group d-flex align-items-center gap-2 border rounded">
                <i class="bi bi-person-fill border-0" style="padding-left: 8px;"></i>
              <input
                type="email"
                class="form-control border-0"
                placeholder="Email address"
                v-model="email"
                required
              />
            </div>
          </div>
  
          <!-- Password Input -->
          <div class="mb-3">
            <div class="input-group d-flex align-items-center gap-2 border rounded">
              <i class="bi bi-lock-fill border-0" style="padding-left: 8px;"></i>
              <input
                type="password"
                class="form-control border-0"
                placeholder="Password"
                v-model="password"
                required
              />
            </div>
          </div>
  
          <!-- Login Button -->
          <button type="submit" class="btn btn-primary w-100 mb-3">Login</button>
        </form>
      </div>

      <div class="text-center mt-3 border rounded pt-3" style="width: 100%; max-width: 400px; background-color: #f8f9fa;">
        <p>Don't have an account? <router-link to="/register">Register</router-link></p>
      </div>
    </div>

</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const email = ref<string>('');
    const password = ref<string>('');

    const handleLogin = () => {
      // Solve login
      console.log('Email:', email.value);
      console.log('Password:', password.value);
      // Call api
    };

    return {
      email,
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

.btn-primary {
  background-color: #26a69a;
  border: none;
}

.btn-primary:hover {
  background-color: #1d8c81;
}
</style>