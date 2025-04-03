<template>
    <div class="p-4">
      <!-- Header -->
      <div class="flex justify-content-between align-items-center mb-4">
        <div>
          <!-- <img src="@/assets/logo.png" alt="Logo" style="width: 50px;" /> -->
        </div>
        <div>
          <span class="mr-3">Welcome, Nguyễn Văn A</span>
          <Button label="Logout" class="p-button-text" @click="logout" />
        </div>
      </div>
  
      <!-- Search Form -->
      <div class="grid mb-4">
        <div class="col-12 md:col-4">
          <label class="block mb-2">Student Code:</label>
          <InputText v-model="searchCode" class="w-full" />
        </div>
        <div class="col-12 md:col-4">
          <label class="block mb-2">Student Name:</label>
          <InputText v-model="searchName" class="w-full" />
        </div>
        <div class="col-12 md:col-4">
          <label class="block mb-2">Birthday:</label>
          <Calendar v-model="searchBirthday" dateFormat="dd/mm/yy" class="w-full" />
        </div>
      </div>
      <div class="text-right">
        <Button label="Search" icon="pi pi-search" @click="handleSearch" />
      </div>
  
      <!-- Table -->
      <DataTable :value="paginatedStudents" class="p-datatable-sm mt-4" responsiveLayout="scroll">
        <Column field="id" header="No">
          <template #body="{ index }">
            {{ (currentPage - 1) * pageSize + index + 1 }}
          </template>
        </Column>
        <Column field="code" header="Code" />
        <Column field="name" header="Name" />
        <Column field="birthday" header="Birthday" />
        <Column field="address" header="Address" />
        <Column field="score" header="Score" />
        <Column header="Edit">
          <template #body="{ data }">
            <Button label="Edit" class="p-button-text p-button-sm mr-2" @click="editStudent(data)" />
            <Button label="Delete" class="p-button-text p-button-sm p-button-danger" @click="deleteStudent(data.id)" />
          </template>
        </Column>
      </DataTable>
  
      <!-- Pagination -->
      <Paginator
        :rows="pageSize"
        :totalRecords="students.length"
        :rowsPerPageOptions="[3, 5, 10]"
        @page="onPageChange"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { useStudentStore } from '@/store'; // Đường dẫn vẫn hoạt động nhờ export trong src/store/index.ts
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import InputText from 'primevue/inputtext';
  import Calendar from 'primevue/calendar';
  import Button from 'primevue/button';
  import Paginator from 'primevue/paginator';
  
  export default defineComponent({
    components: {
      DataTable,
      Column,
      InputText,
      Calendar,
      Button,
      Paginator,
    },
    setup() {
      const studentStore = useStudentStore();
  
      // Search fields
      const searchCode = ref('');
      const searchName = ref('');
      const searchBirthday = ref<Date | null>(null);
  
      // Computed properties from store
      const paginatedStudents = computed(() => studentStore.paginatedStudents);
      const currentPage = computed(() => studentStore.currentPage);
      const totalPages = computed(() => studentStore.totalPages);
      const pageSize = computed(() => studentStore.pageSize);
      const students = computed(() => studentStore.students);
  
      // Methods
      const handleSearch = () => {
        const birthday = searchBirthday.value
          ? searchBirthday.value.toLocaleDateString('en-GB').split('/').join('/')
          : '';
        studentStore.searchStudents({
          code: searchCode.value,
          name: searchName.value,
          birthday,
        });
      };
  
      const deleteStudent = (id: number) => {
        if (confirm('Are you sure you want to delete this student?')) {
          studentStore.deleteStudent(id);
        }
      };
  
      const editStudent = (student: any) => {
        // Chức năng chỉnh sửa (có thể mở một dialog để chỉnh sửa)
        console.log('Edit student:', student);
      };
  
      const onPageChange = (event: any) => {
        studentStore.setPage(event.page + 1);
      };
  
      const logout = () => {
        // Logic đăng xuất
        console.log('Logout clicked');
      };
  
      return {
        searchCode,
        searchName,
        searchBirthday,
        paginatedStudents,
        currentPage,
        totalPages,
        pageSize,
        students,
        handleSearch,
        deleteStudent,
        editStudent,
        onPageChange,
        logout,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Optional: Add custom styles if needed */
  </style>