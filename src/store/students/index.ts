import { defineStore } from 'pinia';

export interface Student {
  id: number;
  code: string;
  name: string;
  birthday: string;
  address: string;
  score: number;
}

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [
      { id: 1, code: 'STU001', name: 'Nguyễn Văn B', birthday: '10/11/1989', address: '192 Trương Sơn-Q01', score: 5.6 },
      { id: 2, code: 'STU001', name: 'Nguyễn Văn C', birthday: '10/11/1989', address: '192 Trương Sơn-Q01', score: 5.6 },
      { id: 3, code: 'STU001', name: 'Nguyễn Văn D', birthday: '10/11/1989', address: '192 Trương Sơn-Q01', score: 5.6 },
    ] as Student[],
    currentPage: 1,
    pageSize: 3,
  }),

  getters: {
    paginatedStudents(state) {
      const start = (state.currentPage - 1) * state.pageSize;
      const end = start + state.pageSize;
      return state.students.slice(start, end);
    },
    totalPages(state) {
      return Math.ceil(state.students.length / state.pageSize);
    },
  },

  actions: {
    deleteStudent(id: number) {
      this.students = this.students.filter(student => student.id !== id);
    },
    searchStudents({ code, name, birthday }: { code: string; name: string; birthday: string }) {
      this.students = this.students.filter(student => {
        return (
          (!code || student.code.includes(code)) &&
          (!name || student.name.toLowerCase().includes(name.toLowerCase())) &&
          (!birthday || student.birthday === birthday)
        );
      });
      this.currentPage = 1;
    },
    setPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
});