import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import StudentManager from '../views/StudentManager.vue'
import StudentForm from '../views/StudentPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/students',
      name: 'students',
      component: StudentManager,
    },
    {
      path: '/add-student',
      name: 'add_student',
      component: StudentForm,
    },
    {
      path: '/edit-student/:id',
      name: 'edit_student',
      component: StudentForm,
    },
  ],
})

export default router
