<template>
    <div class="p-4">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-5">
        <div>
          <img src="@/assets/imgs/gmo.png" alt="Logo" style="width: 120px;" />
        </div>
        <div>
          <span class="mr-3">Welcome, Nguyễn Văn A</span>
          <Button label="Logout" class="p-button-text" @click="logout" />
        </div>
      </div>
  
      <!-- Form Title -->
      <h2 class="text-center mb-4">STUDENT</h2>
  
      <!-- Student Form Component -->
      <StudentForm/>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import StudentForm from '@/components/StudentForm.vue';
  import Button from 'primevue/button';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    components: {
      StudentForm,
      Button,
    },
    setup() {
      const router = useRouter();
      const logout = () => {
        router.push('/'); // Redirect to login page
      };
  
      return {
        logout,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  </style>
  