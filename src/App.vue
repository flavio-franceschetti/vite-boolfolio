<script>
import Navbar from "./components/partials/NavBar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>

<template>
  <Navbar />
  <div class="container">
    <!-- utilizzo router view per visualizzare le pagine collegate nel router -->
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 90%;
  margin: 0 auto;
}
</style>
