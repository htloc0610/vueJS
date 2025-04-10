import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";

export interface Student {
  studentId: number;
  studentCode: string;
  studentName: string;
  dateOfBirth: string;
  studentAddress: string;
  averageScore: number;
}

export interface RawStudent {
  studentId: number;
  studentCode: string;
  studentName: string;
  studentInfo: {
    infoId?: number;
    address: string;
    averageScore: number;
    dateOfBirth: string;
  };
}

export const useStudentStore = defineStore("student", {
  state: () => ({
    students: [] as Student[],
    filteredStudents: [] as Student[],
    currentPage: 1,
    pageSize: 5,
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    paginatedStudents(state): Student[] {
      const start = (state.currentPage - 1) * state.pageSize;
      return state.filteredStudents.slice(start, start + state.pageSize);
    },
    totalPages(state): number {
      return Math.ceil(state.filteredStudents.length / state.pageSize);
    },
  },

  actions: {
    async fetchStudents() {
      this.isLoading = true;
      this.error = null;
      try {
        const res = await axiosInstance.get("/students");
        const mapped = res.data.data.map((item: RawStudent) => mapStudentData(item));
        this.students = mapped;
        this.filteredStudents = mapped;
      } catch (err) {
        this.error = "Failed to fetch students";
      } finally {
        this.isLoading = false;
      }
    },

    async deleteStudent(id: number) {
      try {
        await axiosInstance.delete(`/students/${id}`);
        this.students = this.students.filter((student) => student.studentId !== id);
        this.filteredStudents = this.filteredStudents.filter((student) => student.studentId !== id);
      } catch (err) {
        this.error = "Failed to delete student";
      }
    },

    async addStudent(newStudent: RawStudent) {
      try {
        const res = await axiosInstance.post("/students", newStudent);
        const mapped = mapStudentData(res.data.data);
        this.students.push(mapped);
        this.filteredStudents.push(mapped);
      } catch (err) {
        this.error = "Failed to add student";
      }
    },

    async updateStudent(updated: RawStudent) {
      try {
        const res = await axiosInstance.put(`/students/${updated.studentId}`, updated);
        const updatedData = mapStudentData(res.data.data);

        // update trong students
        const index = this.students.findIndex((student) => student.studentId === updated.studentId);
        if (index !== -1) {
          this.students[index] = updatedData;
        }

        // update trong filteredStudents
        const filteredIndex = this.filteredStudents.findIndex(
          (student) => student.studentId === updated.studentId
        );
        if (filteredIndex !== -1) {
          this.filteredStudents[filteredIndex] = updatedData;
        }
      } catch (err) {
        this.error = "Failed to update student";
      }
    },

    searchStudents({ code, name, birthday }: { code: string; name: string; birthday: string }) {
      if (!code && !name && !birthday) {
        this.filteredStudents = [...this.students];
      } else {
        this.filteredStudents = this.students.filter((student) => {
          return (
            (!code || student.studentCode.includes(code)) &&
            (!name || student.studentName.toLowerCase().includes(name.toLowerCase())) &&
            (!birthday || student.dateOfBirth === birthday)
          );
        });
      }
      this.currentPage = 1;
    },

    resetSearch() {
      this.filteredStudents = [...this.students];
      this.currentPage = 1;
    },

    async getStudentById(id: number): Promise<Student | null> {
      this.isLoading = true;
      this.error = null;
      try {
        const res = await axiosInstance.get(`/students/${id}`);
        return mapStudentData(res.data.data);
      } catch (err) {
        this.error = "Failed to fetch student by ID";
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    setPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
});

function formatDateToDDMMYYYY(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB"); // "dd/MM/yyyy"
}

export function mapStudentData(rawData: RawStudent): Student {
  return {
    studentId: rawData.studentId,
    studentCode: rawData.studentCode,
    studentName: rawData.studentName,
    dateOfBirth: formatDateToDDMMYYYY(rawData.studentInfo.dateOfBirth),
    studentAddress: rawData.studentInfo.address,
    averageScore: rawData.studentInfo.averageScore,
  };
}
