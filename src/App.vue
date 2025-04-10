<template>
  <div>
    <Header v-if="!isAuthPage" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "App",
  components: {
    Header,
  },
  setup() {
    const route = useRoute();

    // Check nếu đang ở trang login hoặc register thì không hiển thị Header
    const isAuthPage = computed(() => {
      return route.name === "login" || route.name === "register";
    });

    return {
      isAuthPage,
    };
  },
});
</script>
