<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <img src="@/assets/imgs/gmo.png" alt="Logo" style="width: 120px" />
    </div>
    <div>
      <span class="mr-3">Welcome, {{ username }}</span>
      <Button label="Logout" class="p-button-text" @click="logout" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/index";
import Button from "primevue/button"; // Adjust the path as necessary

export default defineComponent({
  components: {
    Button,
  },
  data() {
    return {
      username: "",
      userStore: useUserStore(),
    };
  },
  mounted() {
    this.userStore
      .getUserInfo()
      .then(() => {
        this.username = this.userStore.username;
      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
      });
  },
  setup() {
    const router = useRouter();

    const userStore = useUserStore();
    const logout = () => {
      userStore.logout();
      router.push("/");
    };

    return {
      logout,
    };
  },
});
</script>

<style scoped></style>
