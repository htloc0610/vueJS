<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <!-- Student ID -->
    <div v-if="isEditMode" class="d-flex flex-row align-items-center justify-content-center gap-2 mb-2" style="width: 400px;">
      <label class="block mb-2" style="width: 30%;">Student ID:</label>
      <InputNumber v-model="formData.id" class="w-full" style="width: 70%;" :disabled="true" />
    </div>

    <!-- Student Code -->
    <div class="d-flex flex-row align-items-center justify-content-center gap-2 mb-2 position-relative" style="width: 400px;">
      <label class="block mb-2" style="width: 30%;">Student Code:</label>
      <div class="d-flex flex-row align-items-center gap-2 w-full" style="width: 70%;">
        <InputText v-model="formData.code" class="w-full" style="width: 100%;" :disabled="true" />
      </div>
      <Button label="Generate Code" @click="generateCode" class="position-absolute" style="right: -40%;" :hidden="isEditMode" />
    </div>

    <!-- Student Name -->
    <div class="d-flex flex-row align-items-center justify-content-center gap-2 mb-2" style="width: 400px;">
      <label class="block mb-2" style="width: 30%;">Student Name:</label>
      <InputText v-model="formData.name" class="w-full" style="width: 70%;" />
    </div>

    <!-- Birthday -->
    <div class="d-flex flex-row align-items-center justify-content-center gap-2 mb-2" style="width: 400px;">
      <label class="block mb-2" style="width: 30%;">Birthday:</label>
      <DayPicker v-model="formData.birthday" dateFormat="dd/mm/yy" class="w-full" style="width: 70%;" />
    </div>

    <!-- Address -->
    <div class="d-flex flex-row align-items-center justify-content-center gap-2 mb-2" style="width: 400px;">
      <label class="block mb-2" style="width: 30%;">Address:</label>
      <InputText v-model="formData.address" class="w-full" style="width: 70%;" />
    </div>

    <!-- Average Score -->
    <div class="d-flex flex-row align-items-center justify-content-center gap-2 mb-2" style="width: 400px;">
      <label class="block mb-2" style="width: 30%;">Average Score:</label>
      <InputNumber v-model="formData.score" type="number" class="w-full" style="width: 70%;" />
    </div>

    <!-- Buttons -->
    <div class="d-flex flex-row align-items-center justify-content-center gap-2 mb-2" style="width: 400px;">
      <Button label="Back" class="p-button-secondary" @click="goBack" style="width: 30%;" />
      <Button label="Save" class="p-button-primary" @click="saveStudent" style="width: 30%;" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import DayPicker from 'primevue/calendar';
import Button from 'primevue/button';
import { useStudentStore } from '@/store/students/students';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: {
    InputText,
    InputNumber,
    DayPicker,
    Button,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const studentStore = useStudentStore();

    const formData = reactive({
      id: 0,
      code: '',
      name: '',
      birthday: null as Date | null,
      address: '',
      score: null as number | null,
    });

    const isEditMode = !!route.params.id;

    onMounted( async () => {
      if (isEditMode) {
        const student = await studentStore.getStudentById(parseInt(route.params.id as string));
        if (student) {  
          formData.id = student.studentId;
          formData.code = student.studentCode;
          formData.name = student.studentName;
          formData.address = student.studentAddress;
          formData.score = student.averageScore;
          formData.birthday = new Date(student.dateOfBirth.split('/').reverse().join('-'));
        }
      } else {
        generateCode();
      }
    });

    const generateCode = () => {
      formData.code = `STU${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    };

    const saveStudent = async () => {
      if (!formData.name || !formData.address || !formData.score || !formData.birthday) {
        alert('Please fill in all required fields.');
        return;
      }

      const studentPayload = {
        studentId: formData.id,
        studentCode: formData.code,
        studentName: formData.name,
        studentInfo: {
          address: formData.address,
          averageScore: formData.score,
          dateOfBirth: formData.birthday.toISOString(),
        },
      };

      if (isEditMode) {
        await studentStore.updateStudent(studentPayload);
      } else {
        await studentStore.addStudent(studentPayload);
      }
      router.push('/students');
    };

    const goBack = () => {
      router.push('/students');
    };

    return {
      formData,
      isEditMode,
      generateCode,
      saveStudent,
      goBack,
    };
  },
});
</script>

<style scoped>
/* Custom styles if needed */
</style>
