import { filter } from '@primeuix/themes/aura/datatable';
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
      { id: 1, code: 'STU001', name: 'Nguyễn Văn A', birthday: '10/11/1989', address: '192 Trương Sơn-Q01', score: 5.6 },
      { id: 2, code: 'STU002', name: 'Nguyễn Văn B', birthday: '12/05/1990', address: '123 Lê Lợi-Q03', score: 7.8 },
      { id: 3, code: 'STU003', name: 'Nguyễn Văn C', birthday: '15/08/1991', address: '456 Nguyễn Huệ-Q05', score: 6.5 },
      { id: 4, code: 'STU004', name: 'Nguyễn Văn D', birthday: '20/09/1992', address: '789 Trần Hưng Đạo-Q07', score: 8.0 },
      { id: 5, code: 'STU005', name: 'Nguyễn Văn E', birthday: '25/12/1993', address: '321 Hai Bà Trưng-Q09', score: 9.1 },
      { id: 6, code: 'STU006', name: 'Nguyễn Văn F', birthday: '01/01/1994', address: '654 Phạm Văn Đồng-Q02', score: 4.3 },
      { id: 7, code: 'STU007', name: 'Nguyễn Văn G', birthday: '05/03/1995', address: '987 Võ Văn Kiệt-Q04', score: 7.0 },
      { id: 8, code: 'STU008', name: 'Nguyễn Văn H', birthday: '10/07/1996', address: '159 Điện Biên Phủ-Q06', score: 6.8 },
      { id: 9, code: 'STU009', name: 'Nguyễn Văn I', birthday: '18/10/1997', address: '753 Lý Thường Kiệt-Q08', score: 5.9 },
      { id: 10, code: 'STU010', name: 'Nguyễn Văn J', birthday: '22/11/1998', address: '852 Hoàng Văn Thụ-Q10', score: 8.5 },
      { id: 11, code: 'STU011', name: 'Nguyễn Văn K', birthday: '02/02/1999', address: '123 Nguyễn Trãi-Q11', score: 7.2 },
      { id: 12, code: 'STU012', name: 'Nguyễn Văn L', birthday: '14/04/2000', address: '456 Trần Phú-Q12', score: 6.4 },
      { id: 13, code: 'STU013', name: 'Nguyễn Văn M', birthday: '30/06/2001', address: '789 Lê Văn Sỹ-Q13', score: 8.7 },
      { id: 14, code: 'STU014', name: 'Nguyễn Văn N', birthday: '19/09/2002', address: '321 Cách Mạng Tháng 8-Q14', score: 5.5 },
      { id: 15, code: 'STU015', name: 'Nguyễn Văn O', birthday: '25/12/2003', address: '654 Nguyễn Thị Minh Khai-Q15', score: 9.0 },
    ] as Student[],
    currentPage: 1,
    pageSize: 5,
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
    addStudent(newStudent: Student) {
      const maxId = this.students.reduce((max, student) => Math.max(max, student.id), 0);
      newStudent.birthday = new Date(newStudent.birthday).toLocaleDateString('en-GB');
      newStudent.id = maxId + 1;
      this.students.push(newStudent);
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
    getStudentById(id: number) {
      return this.students.find(student => student.id === id) || null;
    },
    updateStudent(updatedStudent: Student) {
      const index = this.students.findIndex(student => student.id === updatedStudent.id);
      if (index !== -1) {
      this.students[index] = {
        ...this.students[index],
        ...updatedStudent,
        score: updatedStudent.score ?? 0,
        birthday: updatedStudent.birthday ? new Date(updatedStudent.birthday).toLocaleDateString('en-GB') : '',
      };
      }
    },
    setPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
});