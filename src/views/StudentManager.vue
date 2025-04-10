<template>
  <div class="p-4">
    <!-- Search Form -->
    <div class="d-flex flex-column align-items-center justify-content-center">
      <div
        class="d-flex flex-row align-items-center justify-content-center gap-2 mb-2"
        style="width: 400px; margin-left: -15%"
      >
        <label class="block mb-2" style="width: 30%">Student Code:</label>
        <InputText v-model="searchCode" class="w-full" style="width: 70%" />
      </div>
      <div
        class="d-flex flex-row align-items-center justify-content-center gap-2 mb-2 position-relative"
        style="width: 400px; margin-left: -15%"
      >
        <label class="block mb-2" style="width: 30%">Student Name:</label>
        <InputText v-model="searchName" class="w-full" style="width: 70%" />
        <Button
          label="Search"
          icon="pi pi-search"
          @click="handleSearch"
          style="width: 33%; position: absolute; right: -40%"
        />
      </div>
      <div
        class="d-flex flex-row align-items-center justify-content-center gap-2 mb-2 position-relative"
        style="width: 400px; margin-left: -15%"
      >
        <label class="block mb-2" style="width: 30%">Birthday:</label>
        <DayPicker
          v-model="searchBirthday"
          dateFormat="dd/mm/yy"
          class="w-full"
          style="width: 70%"
        />
        <Button
          label="Add"
          icon="pi pi-plus"
          @click="$router.push('/add-student')"
          style="width: 33%; position: absolute; right: -40%"
        />
      </div>
    </div>

    <!-- Table -->
    <DataTable :value="paginatedStudents" class="p-datatable-sm mt-4" responsiveLayout="scroll">
      <Column sortable field="id" header="No">
        <template #body="{ index }">
          {{ (currentPage - 1) * pageSize + index + 1 }}
        </template>
      </Column>
      <Column sortable field="studentCode" header="Code" />
      <Column sortable field="studentName" header="Name" />
      <Column sortable field="dateOfBirth" header="Birthday" />
      <Column sortable field="studentAddress" header="Address" />
      <Column sortable field="averageScore" header="Score" />
      <Column header="Edit">
        <template #body="{ data }">
          <Button
            label="Edit"
            class="p-button-text p-button-sm mr-2"
            @click="editStudent(data.studentId)"
          />
          <Button
            label="Delete"
            class="p-button-text p-button-sm p-button-danger"
            @click="deleteStudent(data.studentId)"
          />
        </template>
      </Column>
    </DataTable>

    <!-- Pagination -->
    <Paginator
      :rows="pageSize"
      :totalRecords="students.length"
      @page="onPageChange"
      template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStudentStore } from "@/store"; // Đường dẫn vẫn hoạt động nhờ export trong src/store/index.ts
import { useRouter } from "vue-router";

import Header from "../components/Header.vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import DayPicker from "primevue/calendar";
import Button from "primevue/button";
import Paginator from "primevue/paginator";

export default defineComponent({
  components: {
    DataTable,
    Column,
    InputText,
    DayPicker,
    Button,
    Paginator,
    Header,
  },
  mounted() {
    const studentStore = useStudentStore();
    studentStore.fetchStudents();
  },
  setup() {
    const studentStore = useStudentStore();
    const router = useRouter();

    // Search fields
    const searchCode = ref("");
    const searchName = ref("");
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
        ? searchBirthday.value.toLocaleDateString("en-GB").split("/").join("/")
        : "";
      studentStore.searchStudents({
        code: searchCode.value,
        name: searchName.value,
        birthday,
      });
    };

    const deleteStudent = (id: number) => {
      if (confirm("Are you sure you want to delete this student?")) {
        studentStore.deleteStudent(id);
      }
    };

    const editStudent = (studentID: number) => {
      // Navigate to the edit student page with the student's ID
      router.push(`/edit-student/${studentID}`);
    };

    const onPageChange = (event: any) => {
      studentStore.setPage(event.page + 1);
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
    };
  },
});
</script>

<style scoped></style>
