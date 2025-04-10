<template>
    <div class="p-4">
      <h2 class="text-center mb-4">STUDENT</h2>
      <StudentForm/>
    </div>
</template>
  
<script lang="ts">
  import { defineComponent } from 'vue';
  import Header from '../components/Header.vue';
  import StudentForm from '@/components/StudentForm.vue';
  import Button from 'primevue/button';

  export default defineComponent({
    components: {
      StudentForm,
      Button,
      Header
    },
  });
</script>
  
<style scoped>
  /* Custom styles if needed */
</style>
  